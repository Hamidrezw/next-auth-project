"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "../actions/auth";
import PasswordField from "./PasswordField";

type SignInProps = {
  onSwitch: () => void;
};

const SignIn = ({ onSwitch }: SignInProps) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setIsPending(true);

    try {
      const result = await Login(formData);

      if (!result?.success) {
        alert(result?.message || "ایمیل یا رمز عبور اشتباه است");
        setIsPending(false);
        return;
      }

      router.push("/panel");
      router.refresh();
    } catch (error) {
      console.log(error);
      alert("خطایی رخ داد، لطفاً دوباره تلاش کنید");
      setIsPending(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <header className="text-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          خوش آمدید
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          ورود به حساب
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label
            htmlFor="login-email"
            className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            ایمیل
          </label>
          <input
            type="email"
            name="login-email"
            id="login-email"
            autoComplete="email"
            required
            className="mt-1.5 block w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus-visible:outline-white"
          />
        </div>

        <PasswordField
          id="login-password"
          name="login-password"
          label="رمز عبور"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="mt-2 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-900 text-base font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:outline-white"
        >
          {isPending && (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white dark:border-neutral-900/30 dark:border-t-neutral-900"
            />
          )}
          {isPending ? "در حال ورود…" : "ورود"}
        </button>
      </form>

      <hr className="my-6 border-neutral-200 dark:border-neutral-800" />

      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        حساب کاربری ندارید؟{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="cursor-pointer font-medium text-neutral-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:text-white dark:focus-visible:outline-white"
        >
          ثبت‌نام
        </button>
      </p>
    </section>
  );
};

export default SignIn;
