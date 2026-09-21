const API_BASE_URL = import.meta.env.VITE_IDENTITY_API_URL || "https://localhost:5073";

const getNestedValue = (obj, keys) => {
  if (!obj || typeof obj !== "object") {
    return undefined;
  }

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return obj[key];
    }
  }

  for (const value of Object.values(obj)) {
    const nestedValue = getNestedValue(value, keys);
    if (nestedValue !== undefined) {
      return nestedValue;
    }
  }

  return undefined;
};

const normalizeAuthPayload = (payload) => {
  const accessToken =
    getNestedValue(payload, ["accessToken", "access_token", "token"]) ||
    getNestedValue(payload, ["accessToken", "access_token", "token"]);

  const refreshToken =
    getNestedValue(payload, ["refreshToken", "refresh_token"]) ||
    getNestedValue(payload, ["refreshToken", "refresh_token"]);

  return {
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
    payload,
  };
};

const buildUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

const parseResponse = async (response) => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const extractErrorMessage = (payload, fallback) => {
  if (!payload) {
    return fallback;
  }

  if (typeof payload === "string") {
    return payload;
  }

  if (payload.detail) {
    return payload.detail;
  }

  if (payload.title) {
    return payload.title;
  }

  if (payload.message) {
    return payload.message;
  }

  if (payload.errors) {
    const firstError = Object.values(payload.errors).flat().find(Boolean);
    if (firstError) {
      return firstError;
    }
  }

  if (payload.error) {
    return payload.error;
  }

  return fallback;
};

const request = async (endpoint, { method = "GET", body, token, headers = {} } = {}) => {
  const requestHeaders = { ...headers };

  if (body !== undefined && !requestHeaders["Content-Type"]) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(endpoint), {
    method,
    credentials: "include",
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const fallbackMessage =
      method === "POST" && endpoint.includes("login")
        ? "Your email or password is incorrect."
        : method === "POST" && endpoint.includes("resetPassword")
          ? "This password reset link is no longer valid. Please request a new one."
          : "Please check the information you entered.";

    throw new Error(extractErrorMessage(payload, fallbackMessage));
  }

  return payload;
};

export const authApi = {
  register: (data) => request("/register", { method: "POST", body: data }),
  login: async (data) => {
    const response = await request("/login", { method: "POST", body: data });
    return normalizeAuthPayload(response);
  },
  refresh: async (refreshTokenValue) => {
    const response = await request("/refresh", {
      method: "POST",
      body: { refreshToken: refreshTokenValue },
    });

    return normalizeAuthPayload(response);
  },
  forgotPassword: (data) => request("/forgotPassword", { method: "POST", body: data }),
  resetPassword: (data) => request("/resetPassword", { method: "POST", body: data }),
  resendConfirmationEmail: (data) =>
    request("/resendConfirmationEmail", { method: "POST", body: data }),
  confirmEmail: async (userId, code, returnUrl) => {
    const params = new URLSearchParams();

    if (userId) {
      params.set("userId", userId);
    }

    if (code) {
      params.set("code", code);
    }

    if (returnUrl) {
      params.set("returnUrl", returnUrl);
    }

    const url = `/confirmEmail${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await fetch(buildUrl(url), {
      method: "GET",
      credentials: "include",
      redirect: "manual",
    });

    if (response.status === 302 || response.status === 303 || response.status === 307) {
      return { success: true };
    }

    const payload = await parseResponse(response);

    if (!response.ok) {
      throw new Error(
        extractErrorMessage(
          payload,
          "This email confirmation link is invalid or has expired. Please request a new one."
        )
      );
    }

    return payload ?? { success: true };
  },
  getAccountInfo: (token) => request("/manage/info", { token }),
  updateAccountInfo: (data, token) =>
    request("/manage/info", { method: "POST", body: data, token }),
  setTwoFactor: (data, token) =>
    request("/manage/2fa", { method: "POST", body: data, token }),
};

export const identityApiBaseUrl = API_BASE_URL;
