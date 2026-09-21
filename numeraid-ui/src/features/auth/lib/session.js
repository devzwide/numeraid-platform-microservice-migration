export const decodeJwtPayload = (token) => {
  if (!token) {
    return null;
  }

  try {
    const payload = token.split(".")[1];
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      "="
    );

    return JSON.parse(window.atob(paddedPayload));
  } catch {
    return null;
  }
};

export const getCurrentUserFromToken = (token) => {
  const payload = decodeJwtPayload(token);

  if (!payload) {
    return null;
  }

  return {
    email: payload.email || payload.unique_name || payload.name || null,
    sub: payload.sub || null,
    exp: payload.exp || null,
  };
};
