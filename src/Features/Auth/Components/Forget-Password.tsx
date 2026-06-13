"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { ForgetPasswordRequest } from "../Types";
import { ForgetPasswordSchema } from "../Schema/ForgetPassword";
import { ForgetPasswordAction } from "../Actions/ForgetPasswordAction";
import { getResendCooldown } from "../lib/GetResendCooldown";

const MAX_RESEND_TRIALS = 3;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgetPasswordRequest>({
    resolver: zodResolver(ForgetPasswordSchema),
  });

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [resendTrials, setResendTrials] = useState<number>(0);

  useEffect(() => {
    const loadCooldown = async () => {
      const res = await getResendCooldown();
      if (res.remainingTime > 0) {
        setRemainingTime(res.remainingTime);
      }
    };

    loadCooldown();
  }, []);

  useEffect(() => {
    if (remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: ForgetPasswordRequest): Promise<void> => {
    try {
      const result = await ForgetPasswordAction(data);

      if (!result.ok) {
        setError("root", {
          type: "manual",
          message:
            result.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setHasSubmitted(true);
      setRemainingTime(60);
      setResendTrials(0);

      toast.success(
        "If an account exists with this email, we’ve sent a password reset link."
      );
    } catch {
      setError("root", {
        type: "manual",
        message:
          "Network error. Please check your connection and try again.",
      });
    }
  };

  const handleResend = async (): Promise<void> => {
    const email = getValues("email");

    try {
      const result = await ForgetPasswordAction({ email });

      if (!result.ok) {
        toast.error(result.error ?? "Unable to resend reset link.");
        return;
      }

      setResendTrials((prev) => prev + 1);
      setRemainingTime(60);

      toast.success(
        "If an account exists with this email, we’ve sent a password reset link."
      );
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  const isResendDisabled =
    remainingTime > 0 ||
    resendTrials >= MAX_RESEND_TRIALS ||
    isSubmitting;

  return (
    <div className="min-h-screen bg-surface font-sans">

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <h1 className="text-2xl font-bold text-primary">Rawaq</h1>

          <Link
            href="/login"
            className="flex items-center gap-2 text-sm text-gray-700 transition hover:text-primary"
          >
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

      <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center justify-center px-4 py-8 md:px-8 md:py-12">

        <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">

          <div className="hidden lg:block">

            <div className="flex justify-center">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/Illustration.png"
                  alt="Forgot Password"
                  width={488}
                  height={366}
                  className="rounded-2xl"
                  priority
                />
              </div>
            </div>

            <div className="mt-8 max-w-md">
              <h2 className="text-headline-md text-primary">
                Restore Your Path
              </h2>

              <p className="mt-4 text-label-md leading-7 text-gray-600">
                Losing access shouldn't stop your journey.
                Enter your details and we'll help you get back.
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">

            <div className="rounded-2xl bg-white p-5 shadow-sm md:border md:border-gray-200 md:p-8">

              <div className="mb-6 flex justify-center lg:hidden">
                <Image
                  src="/images/Illustration.png"
                  alt="Forgot Password"
                  width={284}
                  height={160}
                  className="rounded-xl"
                  priority
                />
              </div>

              <div className="mb-6 flex justify-center lg:justify-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-container">
                  <Image
                    src="/images/resetIcon.png"
                    alt="Reset Icon"
                    width={32}
                    height={32}
                  />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-headline-md text-gray-900">
                  Forgot Password?
                </h2>

                <p className="mt-2 text-label-md text-text">
                  Enter your email address to receive a secure link.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
              >

                <div>
                  <label className="mb-2 block text-label-md text-gray-700">
                    Email Address
                  </label>

                  <div className="flex h-12 items-center rounded-xl border border-gray-300 px-4 focus-within:border-primary">

                    <Image
                      src="/images/email.png"
                      alt="Email"
                      width={20}
                      height={20}
                    />

                    <input
                      {...register("email")}
                      type="email"
                      placeholder="name@example.com"
                      className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {errors.root && (
                  <p className="text-sm text-red-500">
                    {errors.root.message}
                  </p>
                )}

                {hasSubmitted && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                    <p className="text-sm text-green-700">
                      If an account exists with this email, we’ve sent a reset link.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-white transition hover:opacity-90"
                >
                  {isSubmitting
                    ? "Sending..."
                    : "Send Reset Link"}

                  <Image
                    src="/images/IconArrow.png"
                    alt="Arrow"
                    width={16}
                    height={16}
                  />
                </button>

                {(hasSubmitted || remainingTime > 0) && (
                  <div className="text-center">
                    <p className="text-sm text-text">
                      Don't Receive An Email?
                    </p>

                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResendDisabled}
                      className="mt-2 text-primary disabled:text-gray-400"
                    >
                      Resend
                    </button>

                    {remainingTime > 0 && (
                      <p className="mt-2 text-xs text-text">
                        Available in {formatTime(remainingTime)}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-gray-400">
                      Remaining attempts:{" "}
                      {MAX_RESEND_TRIALS - resendTrials}
                    </p>
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;