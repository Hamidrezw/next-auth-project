"use client";

import { useState } from "react";
import { Login } from "../actions/auth";
import { useRouter } from "next/navigation";

type SignInProps = {
  onSwitch: () => void;
};

const SignIn = ({ onSwitch }: SignInProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await Login(formData);

      if (!result || !result.success) {
        alert(result?.message || "ایمیل یا پسورد اشتباه است");
        return;
      }

      router.push("/panel");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[45%] rounded-3xl shadow-2xl p-8 bg-white">
      <form action={handleSubmit}>
        <h2 className="text-lg">ورود</h2>

        <label htmlFor="login-email">email</label>
        <input
          type="text"
          name="login-email"
          id="login-email"
          className="rounded-md w-full p-2 border-2 focus:outline-blue-600 my-3"
        />

        <label htmlFor="login-password">password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="login-password"
            id="login-password"
            className="rounded-md w-full p-2 pe-10 border-2 focus:outline-blue-600 my-3"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 inset-e-2 flex items-center text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            {showPassword ? (
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

        <button className="bg-blue-600 h-11 flex justify-center items-center w-full mt-3 rounded-2xl font-bold text-white cursor-pointer">
          ورود
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        حساب کاربری ندارید؟{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-blue-600 font-semibold hover:underline cursor-pointer"
        >
          ثبت‌نام
        </button>
      </p>
    </div>
  );
};

export default SignIn;
