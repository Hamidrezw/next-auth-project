"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "../actions/auth";

const Panel = ({ username }: { username?: string }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const initial = username?.trim().charAt(0).toUpperCase() || "?";

  const handleLogout = async () => {
    setIsPending(true);
    try {
      await Logout();
      router.push("/");
      router.refresh();
    } catch {
      setIsPending(false);
    }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 bg-sky-950">
      <section className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div
          aria-hidden="true"
          className="mx-auto flex size-16 items-center justify-center rounded-full bg-neutral-900 text-2xl font-semibold text-white dark:bg-white dark:text-neutral-900"
        >
          {initial}
        </div>

        <p className="mt-5 text-sm text-neutral-500 dark:text-neutral-400">
          Welcome back
        </p>
        <h1 className="mt-1 break-words text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {username ?? "Guest"}
        </h1>

        <hr className="my-6 border-neutral-200 dark:border-neutral-800" />

        <button
          type="button"
          onClick={handleLogout}
          disabled={isPending}
          aria-busy={isPending}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-base font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 active:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending && (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}
          {isPending ? "Logging out…" : "Log out"}
        </button>
      </section>
    </main>
  );
};

export default Panel;
