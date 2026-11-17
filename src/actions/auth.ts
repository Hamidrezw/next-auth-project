"use server";

import bcrypt from "bcryptjs";
import ConnectToDB from "../configs/db";
import User from "../models/user";
import { registerSchema } from "../validator/auth";
import { generateToken } from "../utils/auth";
import { cookies } from "next/headers";

export const Register = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const result = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await ConnectToDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return console.log("User exists!!!");
  }

  if (typeof password !== "string" || !password) {
    return {
      success: false,
      message: "اطلاعات ورود نامعتبر است",
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      return alert("کاربر با موفقیت ثبت شد :)");
    }
  } catch (err) {
    console.log(err);
  }
};

export const Login = async (formData: FormData) => {
  const email = formData.get("login-email");
  const password = formData.get("login-password");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return {
      success: false,
      message: "اطلاعات ورود نامعتبر است",
    };
  }

  try {
    await ConnectToDB();

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return {
        success: false,
        message: "ایمیل یا رمز عبور اشتباه است",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "ایمیل یا رمز عبور اشتباه است",
      };
    }

    const token = generateToken(user._id.toString());

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return {
      success: true,
      message: "ورود با موفقیت انجام شد",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "خطایی رخ داد، لطفاً دوباره تلاش کنید",
    };
  }
};

export const Logout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("token");

  return {
    success: true,
    message: "با موفقیت خارج شدید",
  };
};
