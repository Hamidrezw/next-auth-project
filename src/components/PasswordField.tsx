"use client";

import { useState } from "react";

type PasswordFieldProps = {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  invalid?: boolean;
};

const PasswordField = ({
  id,
  name,
  label,
  value,
  onChange,
  autoComplete,
  invalid = false,
}: PasswordFieldProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          type={show ? "text" : "password"}
          name={name}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={invalid}
          required
          className={`block w-full rounded-xl border bg-white py-2.5 ps-3 pe-11 text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-neutral-950 dark:text-white ${
            invalid
              ? "border-red-500 focus-visible:outline-red-600"
              : "border-neutral-300 focus-visible:outline-neutral-900 dark:border-neutral-700 dark:focus-visible:outline-white"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          aria-pressed={show}
          className="absolute inset-y-0 inset-e-3 flex cursor-pointer items-center text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.8 9.8 0 0112 5c4.5 0 8.3 2.9 9.5 7a10.6 10.6 0 01-3 4.6M6.1 6.1A10.6 10.6 0 002.5 12c1.2 4.1 5 7 9.5 7 1.5 0 2.9-.3 4.1-.9"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.5 12C3.7 7.9 7.5 5 12 5s8.3 2.9 9.5 7c-1.2 4.1-5 7-9.5 7s-8.3-2.9-9.5-7z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
