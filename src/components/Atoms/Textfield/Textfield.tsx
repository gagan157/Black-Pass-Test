import clsx from "clsx";
import React from "react";

interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
  onChange?: any;
  leftIcon?: any;
  rightIcon?: any;
  multiline?: boolean;
  defaultValue?: any;
  onClick?: any;
  value?: any;
  type?: string;
  className?: string;
  style?: Object;
  name?: string;
  defaultCursor?: boolean;
  ariaHidden?: boolean;
  leftButtonAriaLabel?: string;
  leftButtonRole?: string;
  rightButtonAriaLabel?: string;
  rightButtonRole?: string;
}

export const Textfield = ({
  placeHolder,
  onChange,
  leftIcon,
  rightIcon,
  multiline = false,
  defaultValue,
  onClick,
  value,
  type = "text",
  className,
  style,
  name,
  disabled,
  defaultCursor = false,
  ariaHidden = false,
  leftButtonAriaLabel,
  leftButtonRole,
  rightButtonAriaLabel,
  rightButtonRole,
  ...props
}: TextfieldProps) => {
  return (
    <div className={clsx("relative flex w-full", multiline ? "h-28" : "h-10")}>
      {multiline ? (
        <textarea
          className={clsx(
            "w-full resize-none rounded-md border border-light-gray-100 bg-light-gray-25 p-2 text-base text-light-gray-900 caret-transparent outline-none placeholder:text-light-gray-200 hover:border-light-primary-100 focus:border-light-primary-400 active:border-light-primary-400 disabled:border-light-gray-50 disabled:opacity-40",
            className
          )}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
          style={style}
          name={name}
        />
      ) : (
        <>
          {leftIcon && (
            <button
              aria-hidden={ariaHidden}
              aria-label={leftButtonAriaLabel}
              role={leftButtonRole}
              className={clsx(
                defaultCursor
                  ? "cursor-default absolute left-2 flex translate-y-1/2 items-center justify-center text-light-gray-900 outline-none disabled:text-dark-primary-500"
                  : "absolute left-2 flex translate-y-1/2 items-center justify-center text-light-gray-900 outline-none disabled:cursor-default disabled:text-dark-primary-500"
              )}
              onClick={onClick}
              disabled={disabled}
            >
              {leftIcon}
            </button>
          )}
          <input
            id="input"
            className={clsx(
              "w-full border-transparent border bg-background-light pr-1 text-base text-text-light outline-none placeholder:text-text-light hover:border-light-primary-100 hover:text-light-gray-300 focus:border-light-primary-400 focus:text-text-text-light active:border-light-primary-400 active:text-text-primary",
              "disabled:pointer-events-none disabled:border-light-gray-50 disabled:bg-transparent disabled:text-light-gray-75",
              leftIcon ? "pl-9 pr-2" : rightIcon ? "pl-2 pr-9" : "pl-2",
              "read-only:border-light-gray-100 read-only:text-light-gray-900 read-only:hover:border-light-gray-100 read-only:hover:text-light-gray-900 read-only:focus:border-light-gray-100 read-only:focus:text-light-gray-900",
              className
            )}
            type={type}
            onChange={onChange}
            placeholder={placeHolder}
            defaultValue={defaultValue}
            value={value}
            style={style}
            name={name}
            disabled={disabled}
            {...props}
          />
          {rightIcon && (
            <button
              aria-label={rightButtonAriaLabel}
              role={rightButtonRole}
              className="group absolute right-2 flex translate-y-1/2 items-center justify-center text-light-gray-900 outline-none disabled:cursor-pointer disabled:text-light-gray-75"
              onClick={onClick}
              disabled={disabled}
            >
              {rightIcon}
            </button>
          )}
        </>
      )}
    </div>
  );
};
