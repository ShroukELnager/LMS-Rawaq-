"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { LoginForm, loginSchema } from '../Schema/Login';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAction } from '../Actions/LoginAction';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { fetchCurrentUser } from '@/redux/features/userThunks';
import { useAppDispatch } from '@/redux/hooks';

export default function LoginPage() {
  const router = useRouter();
    const dispatch = useAppDispatch();

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  setError,
} = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: '',
    password: '',
    rememberMe: false,
  },
});
  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await loginAction(data);
   if (!result.ok) {
  const rawError = result.error;

  const errorMessage =
    rawError === "Invalid login credentials"
      ? "Email or password is incorrect."
      : rawError || "Email or password is incorrect.";

  toast.error(errorMessage);

  setError("root", {
    type: "server",
    message: errorMessage,
  });

  return;
}
await dispatch(fetchCurrentUser()).unwrap();
      toast.success('Logged in successfully!');
      router.push('/dashboard');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.';


      toast.error(errorMessage);

      setError('root', {
        type: 'server',
        message: errorMessage,
      });
    }
  };
return (
  <div className="min-h-screen bg-surface">
    <div className="flex min-h-screen w-full">
      {/* Left Section */}
      <div
        className="
    hidden
    lg:flex
    w-[45%]
    min-h-screen
    bg-primary
    text-white
    flex-col
    p-10
    xl:p-14
    rounded-r-3xl
    shrink-0
  "
      >
        {/* Center Content */}
        <div
          className="
      flex-1
      flex
      items-center
      justify-center
    "
        >
          <div className="max-w-lg text-center">
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
              Welcome to Rawaq
              <br />
              — your structured
              <br />
              learning space
            </h1>

            <p className="mt-8 text-white/80 text-base leading-8">
              Step back into your journey of knowledge. Access your curated
              lessons, connect with mentors, and track your progress along the
              golden path of academic excellence.
            </p>
          </div>
        </div>

        {/* Bottom Quote */}
        <div
          className="
      bg-[#0A7480]
      rounded-xl
      p-4
      flex
      items-center
      gap-3
      w-full
      max-w-md
      mx-auto
    "
        >
          <Image
            src="/images/dr.png"
            alt="Mentor"
            width={42}
            height={42}
            className="rounded-full"
          />

          <div>
            <p className="text-sm">
              &quot;Knowledge is a garden that must be tended.&quot;
            </p>

            <p className="text-xs text-white/70">
              Dr. Amin Khalil, Senior Mentor
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div
        className="
          flex-1
          flex
          justify-center
          items-center
          px-5
          sm:px-8
          lg:px-12
          py-8
        "
      >
        <div
          className="
            w-full
            max-w-md
            lg:max-w-lg
          "
        >
          {/* Mobile Logo */}
          <div
            className="
              lg:hidden
              flex
              flex-col
              items-center
              mb-10
            "
          >
            <div
              className="
                bg-primary
                w-16
                h-16
                rounded-xl
                flex
                items-center
                justify-center
              "
            >
              <Image
                src="/images/logo.png"
                alt="Rawaq"
                width={28}
                height={28}
              />
            </div>

            <h1 className="mt-4 text-3xl font-bold text-primary">Rawaq</h1>

            <p className="text-center text-text mt-3 max-w-xs">
              Your structured learning space for deep knowledge and focus.
            </p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-10">
            <h2 className="text-4xl font-bold text-primary">Welcome back</h2>

            <p className="text-text mt-2">Log in to continue your education.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {errors.root && (
              <div className="text-center">
                <p className="text-sm text-red-500">{errors.root.message}</p>
              </div>
            )}

            <div>
              <label className="block text-sm mb-2 text-gray-700">Email</label>

              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="name@example.com"
                  className="
                    w-full
                    bg-white
                    border
                    border-gray-300
                    rounded-lg
                    py-3
                    pl-10
                    pr-4
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary
                  "
                />

                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}

                <Image
                  src="/images/email.png"
                  alt="Email"
                  width={16}
                  height={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-gray-700">Password</label>

                <Link
                  href="/forget-password"
                  className="text-xs text-primary font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="
                    w-full
                    bg-white
                    border
                    border-gray-300
                    rounded-lg
                    py-3
                    pl-10
                    pr-10
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary
                  "
                />

                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}

                <Image
                  src="/images/password.png"
                  alt="Password"
                  width={16}
                  height={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" {...register('rememberMe')} />
              Remember me
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                bg-primary
                text-white
                py-3
                rounded-lg
                font-medium
                flex
                items-center
                justify-center
                gap-2
                hover:opacity-90
                transition
                cursor-pointer
              "
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}

              <Image
                src="/images/rightArrow.png"
                alt="Arrow"
                width={14}
                height={14}
              />
            </button>

            <p className="text-center text-sm text-text pt-6">
              New to Rawaq?{' '}
              <Link href="/signup" className="text-primary font-semibold">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}
