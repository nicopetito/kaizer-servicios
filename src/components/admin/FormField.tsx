interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, className = "", ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-kaizer-light mb-1.5">
        {label}
        {props.required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-[var(--radius-md)] border ${
          error ? "border-rose-300" : "border-kaizer-border"
        } bg-bg-secondary text-kaizer-white placeholder:text-kaizer-muted/60 focus:outline-none focus:ring-2 focus:ring-kaizer-cyan/30 focus:border-kaizer-cyan text-sm transition-colors ${className}`}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function FormTextarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-kaizer-light mb-1.5">
        {label}
        {props.required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <textarea
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-[var(--radius-md)] border ${
          error ? "border-rose-300" : "border-kaizer-border"
        } bg-bg-secondary text-kaizer-white placeholder:text-kaizer-muted/60 focus:outline-none focus:ring-2 focus:ring-kaizer-cyan/30 focus:border-kaizer-cyan text-sm transition-colors resize-none ${className}`}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export function FormSelect({ label, error, children, className = "", ...props }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-kaizer-light mb-1.5">
        {label}
        {props.required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <select
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-[var(--radius-md)] border ${
          error ? "border-rose-300" : "border-kaizer-border"
        } bg-bg-secondary text-kaizer-white focus:outline-none focus:ring-2 focus:ring-kaizer-cyan/30 focus:border-kaizer-cyan text-sm transition-colors ${className}`}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export function FormToggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">
      <div>
        <p className="text-sm font-medium text-kaizer-light">{label}</p>
        {description && <p className="text-xs text-kaizer-muted mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 flex-shrink-0 ${
          checked ? "bg-kaizer-cyan" : "bg-kaizer-border"
        }`}
      >
        <span
          className={`absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-5.5" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}
