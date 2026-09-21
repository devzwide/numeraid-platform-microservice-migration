export const AuthCard = ({ title, description, children, footer }) => {
  return (
    <div className="w-full rounded-[2rem] border border-[#E8E6F0] bg-white p-5 shadow-[0_20px_40px_rgba(35,27,75,0.08)] sm:p-7">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-[-0.04em] text-[#17152B] sm:text-3xl">
          {title}
        </h1>
        {description ? <p className="mt-2 text-sm leading-6 text-[#6F6C7F]">{description}</p> : null}
      </div>

      {children}

      {footer ? <div className="mt-6 border-t border-[#E8E6F0] pt-4 text-sm text-[#6F6C7F]">{footer}</div> : null}
    </div>
  );
};
