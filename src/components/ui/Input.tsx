import * as React from 'react';

import { cn } from 'src/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconClassName?: {
    righIcon?: string;
    leftIcon?: string;
  };
  parentClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      parentClassName,
      type,
      leftIcon,
      rightIcon,
      iconClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('relative w-full', parentClassName)}>
        <input
          {...props}
          ref={ref}
          type={type ? type : 'text'}
          className={cn(
            'flex h-10 items-center rounded-lg rounded-replaceable border border-input bg-white text-sm  focus-within:ring-info shadow-sm w-full p-4 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed focus:ring-info/20 focus:ring-2 text-neutral-700',
            props.disabled &&
              'opacity-100 bg-neutral-50 text-neutral-500 cursor-not-allowed',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
        />
        {rightIcon && (
          <div
            className={cn('absolute right-4 top-3', iconClassName?.righIcon)}>
            {rightIcon}
          </div>
        )}
        {leftIcon && (
          <div className={cn('absolute left-3 top-3', iconClassName?.leftIcon)}>
            {leftIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
