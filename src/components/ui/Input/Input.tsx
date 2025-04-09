import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InputField = forwardRef(
  (
    { className = '', ...props }: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`
          relative
          w-full
          px-4
          py-2
          border
          border-[var(--gray-light)]
          text-[var(--gray-light)]
          rounded-md
          focus:outline-none
          focus:ring-2
          focus:ring-primary
          focus:border-transparent
          transition-all
          duration-200
          outline-none
          ${className}
        `}
      />
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;