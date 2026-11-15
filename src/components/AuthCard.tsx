"use client";

import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

type Mode = "signin" | "signup";

const AuthCard = () => {
  const [mode, setMode] = useState<Mode>("signin");

  return mode === "signin" ? (
    <SignIn onSwitch={() => setMode("signup")} />
  ) : (
    <SignUp onSwitch={() => setMode("signin")} />
  );
};

export default AuthCard;