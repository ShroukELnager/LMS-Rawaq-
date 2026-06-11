"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetPasswordSchema } from "../Schema/ResetPassword";
import { ResetPasswordFormData } from "../Types";
import { ResetPasswordAction } from "../Actions/ResetPasswordAction";

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [validLink, setValidLink] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;

    if (!hash) {
      setValidLink(false);
      return;
    }

    const params = new URLSearchParams(hash.replace("#", ""));

    const token = params.get("access_token");
    const type = params.get("type");

    if (token && type === "recovery") {
      setAccessToken(token);
      setValidLink(true);
    } else {
      setValidLink(false);
    }
  }, []);

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      window.location.href = "/login";
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      if (!accessToken) return;

      const result = await ResetPasswordAction({
        ...data,
        accessToken,
      });

      if (!result.ok) {
        setError("root", {
          type: "manual",
          message: result.error,
        });
        return;
      }

      setSuccess(true);
    } catch {
      setError("root", {
        type: "manual",
        message: "Something went wrong",
      });
    }
  };

  if (!validLink) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-500">
            Invalid or expired reset link.
          </h1>

          <Link href="/login" className="text-primary mt-4 block">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-xl font-bold text-green-600">
            Password updated successfully
          </h1>

          <p className="text-gray-500 mt-2">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface font-sans">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
          <h1 className="text-lg font-bold text-primary">Rawaq</h1>

          <Link href="/login" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary">
            <Image
              src="/images/ArrowLeft.png"
              alt="Back"
              width={16}
              height={16}
            />
            Back to Login
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-6 shadow-md md:p-8">

            {/* ICON (UI ADDITION) */}
            <div className="mb-5 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container">
                <Image
                  src="/images/resetIcon.png"
                  alt="reset"
                  width={24}
                  height={24}
                />
              </div>
            </div>

            {/* TITLE */}
            <div className="text-center">
              <h1 className="text-[28px] font-semibold text-gray-900">
                Reset Password
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Create a new strong password
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  New Password
                </label>

                <div className="flex h-11 items-center rounded-xl border border-gray-300 px-3">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-transparent outline-none text-sm"
                    placeholder="••••••••"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  Confirm Password
                </label>

                <div className="flex h-11 items-center rounded-xl border border-gray-300 px-3">
                  <input
                    {...register("confirmedPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full bg-transparent outline-none text-sm"
                    placeholder="••••••••"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmedPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmedPassword.message}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-white transition hover:opacity-90"
              >
                {isSubmitting ? "Updating..." : "Reset Password"}
              </button>

              {errors.root && (
                <p className="text-red-500 text-sm text-center">
                  {errors.root.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPasswordPage;