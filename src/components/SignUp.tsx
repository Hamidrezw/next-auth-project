"use client";

import { useState } from "react";
import { Register } from "../actions/auth";

type SignUpProps = {
  onSwitch: () => void;
};

type PasswordFieldProps = {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const PasswordField = ({
  id,
  name,
  label,
  value,
  onChange,
}: PasswordFieldProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="rounded-md w-full p-2 pe-10 border-2 focus:outline-blue-600 my-3"
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          aria-pressed={show}
          className="absolute inset-y-0 inset-e-2 flex items-center text-gray-500 hover:text-gray-800 cursor-pointer"
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
    </>
  );
};

const SignUp = ({ onSwitch }: SignUpProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mismatch = confirmPassword.length > 0 && password !== confirmPassword;


const handleSubmit = async (formData: FormData) => {
  const result = await Register(formData);
     if (!result) {
      return console.log("sign up informatiom is not valid!!!");
    }

};

  return (
    <div className="w-[45%] rounded-3xl shadow-2xl p-8 bg-white">
      <form action={handleSubmit} >
        <h2 className="text-lg mb-3">ثبت‌نام</h2>

        <div>
          <label htmlFor="name">نام</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="rounded-md w-full p-2 border-2 focus:outline-blue-600 my-3"
          />
        </div>

        <label htmlFor="email">ایمیل</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="rounded-md w-full p-2 border-2 focus:outline-blue-600 my-3"
        />

        <PasswordField
          id="password"
          name="password"
          label="رمز عبور"
          value={password}
          onChange={setPassword}
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="تکرار رمز عبور"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        {mismatch && (
          <p role="alert" className="text-red-600 text-sm mt-1">
            رمز عبور و تکرار آن یکسان نیستند
          </p>
        )}

        <button
          type="submit"
          disabled={mismatch}
          className="bg-blue-600 h-11 flex justify-center items-center w-full mt-3 rounded-2xl font-bold text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ثبت‌نام
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-blue-600 font-semibold hover:underline cursor-pointer"
        >
          ورود
        </button>
      </p>
    </div>
  );
};

export default SignUp;
