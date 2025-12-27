import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, error, ...props }, ref) {
  return (
    <label className="flex flex-col gap-2 text-sm text-pine">
      <span className="uppercase tracking-[0.2em]">{label}</span>
      <input
        ref={ref}
        className="rounded-lg border border-mist bg-white/80 px-4 py-3 text-ink outline-none focus:border-rose"
        {...props}
      />
      {error ? <span className="text-xs text-rose">{error}</span> : null}
    </label>
  );
});

export default Input;

