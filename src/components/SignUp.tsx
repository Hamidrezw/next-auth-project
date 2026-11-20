"use client";

import { useState } from "react";
import { Register } from "../actions/auth";
import PasswordField from "./PasswordField";

type SignUpProps = {
  onSwitch: () => void;
};

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus-visible:outline-white";

const labelClass = "text-sm font-medium text-neutral-700 dark:text-neutral-300";

const SignUp = ({ onSwitch }: SignUpProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const mismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setIsPending(true);
    try {
      const result = await Register(formData);
      if (!result) {
        setError("اطلاعات ثبت‌نام معتبر نیست");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <header className="text-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          حساب جدید
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          ثبت‌نام
        </h1>
      </header>

      <form action={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="name" className={labelClass}>
            نام
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            required
            className={inputClass}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className={labelClass}>
            ایمیل
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>

        <PasswordField
          id="password"
          name="password"
          label="رمز عبور"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="تکرار رمز عبور"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          invalid={mismatch}
        />

        {mismatch && (
          <p role="alert" className="-mt-2 mb-4 text-sm text-red-600">
            رمز عبور و تکرار آن یکسان نیستند
          </p>
        )}

        {error && (
          <p role="alert" className="mb-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={mismatch || isPending}
          aria-busy={isPending}
          className="mt-2 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-900 text-base font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:outline-white"
        >
          {isPending && (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white dark:border-neutral-900/30 dark:border-t-neutral-900"
            />
          )}
          {isPending ? "در حال ثبت‌نام…" : "ثبت‌نام"}
        </button>
      </form>

      <hr className="my-6 border-neutral-200 dark:border-neutral-800" />

      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="cursor-pointer font-medium text-neutral-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:text-white dark:focus-visible:outline-white"
        >
          ورود
        </button>
      </p>
    </section>
  );
};

export default SignUp;
