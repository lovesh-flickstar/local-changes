import React, { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: React.ReactNode;
}

const Button = forwardRef(
  (
    { text, children, className = '', ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        className={`
          w-full
          h-10
          mt-5
          flex
          justify-center
          items-center
          border-none
          rounded-md
          cursor-pointer
          transition-colors
          duration-300
          ease-in-out
          ${className}
        `}
        {...props}
      >
        {text || children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;