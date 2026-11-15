import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import ConnectToDB from "../configs/db";
import User from "../models/user";


export const generateToken = (userId) => {
  return jwt.sign(
    {
      userId: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );
};

export const getUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload.userId) {
      console.log("get user null");
    }

    await ConnectToDB();

    const user = await User.findById(payload.userId);

    if (!user) {
      return null;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("GetUser Error:", error);
    return null;
  }
};
