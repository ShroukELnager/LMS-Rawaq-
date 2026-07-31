'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { SignupSchema } from '../Schema/SignUp';
import { SignUpFormData } from '../Types';
import { signupAction } from '../Actions/SignUpAction';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import FileUploader from './FileUploader';
import { useAppDispatch } from '@/redux/hooks';
import { fetchCurrentUser } from '@/redux/features/userThunks';
import { AuthService } from '../AuthService';
import { uploadAvatarAction } from '../Actions/UploadAvatarAction';
export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  setError,
} = useForm<SignUpFormData>({
  resolver: zodResolver(SignupSchema),
});

const [avatarFile, setAvatarFile] = useState<File | null>(null);
const [accountType, setAccountType] = useState<"student" | "teacher" | null>(
  null
);

const onSubmit = async (data: SignUpFormData) => {
  try {
    let avatarUrl = '';

    if (avatarFile) {
      avatarUrl = await uploadAvatarAction(avatarFile);
    }

    const result = await signupAction({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      accountType: accountType || 'student',
      avatarUrl,
    });
    if (!result.ok) {
      const rawError = result.error;

      const errorMessage =
        rawError === 'User already registered'
          ? 'This email is already registered.'
          : rawError || 'Failed to create account.';

      toast.error(errorMessage);

      setError('root', {
        type: 'server',
        message: errorMessage,
      });

      return;
    }

    await dispatch(fetchCurrentUser()).unwrap();

    toast.success('Account created successfully!');

    router.push('/dashboard');
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Something went wrong. Please try again.';

    console.error(error);

    toast.error(errorMessage);

    setError('root', {
      type: 'server',
      message: errorMessage,
    });
  }
};

return (
  <div className="min-h-screen bg-[#F8F8FB]">
    <div className="flex min-h-screen w-full">
      {/* Left Banner */}
      <div
        className="
          hidden
          lg:flex
          w-[45%]
          min-h-screen
          bg-primary
          text-white
          flex-col
          justify-between
          px-8
          xl:px-12
          py-12
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
          <div className="w-full max-w-lg text-center">
            <h1 className="text-display-lg font-bold mb-6">Rawaq</h1>

            <p className="text-label-md leading-7">
              Welcome to Rawaq — your structured learning space. Join a
              community of dedicated mentors and eager learners in a space
              designed for focus and academic excellence.
            </p>

            <div className="flex justify-center gap-8 xl:gap-12 mt-12">
              {[
                {
                  img: '/images/courses.png',
                  text: 'Structured Courses',
                },
                {
                  img: '/images/mentors.png',
                  text: 'Expert Mentors',
                },
                {
                  img: '/images/certified.png',
                  text: 'Certified Growth',
                },
              ].map((item) => (
                <div key={item.text} className="flex flex-col items-center">
                  <div className="h-8 flex items-center justify-center">
                    <Image
                      src={item.img}
                      alt={item.text}
                      width={34}
                      height={34}
                    />
                  </div>

                  <p className="mt-4 text-xs whitespace-nowrap">{item.text}</p>
                </div>
              ))}
            </div>
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
          px-4
          sm:px-6
          lg:px-10
          py-8
        "
      >
        <div
          className="
            w-full
            max-w-xl
            bg-white
            min-h-screen
            lg:min-h-fit
            lg:rounded-2xl
            lg:shadow-lg
            p-5
            sm:p-8
          "
        >
          {/* Mobile Logo */}
          <div
            className="
              lg:hidden
              border-b
              -mx-5
              px-5
              pb-4
              mb-6
            "
          >
            <h1 className="text-display-lg text-primary font-bold">Rawaq</h1>
          </div>

          <h2 className="text-headline-md text-gray-900">Create Account</h2>

          <p className="text-label-md text-text mt-1">
            Fill in the details below to get started.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            {errors.root && (
              <div className="mb-4 text-center">
                <p className="text-sm text-red-500">{errors.root.message}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-label-md mb-2 text-gray-700">
                  First Name
                </label>

                <input
                  {...register('firstName')}
                  type="text"
                  placeholder="John"
                  className="w-full bg-surface-container rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />

                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-label-md mb-2 text-gray-700">
                  Last Name
                </label>

                <input
                  {...register('lastName')}
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-surface-container rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />

                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-label-md mb-2 text-gray-700">
                Email Address
              </label>

              <input
                {...register('email')}
                type="email"
                placeholder="john.doe@example.com"
                className="w-full bg-surface-container rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-label-md mb-2 text-gray-700">
                Password
              </label>

              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full bg-surface-container rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-label-md mb-2 text-gray-700">
                Confirm Password
              </label>

              <input
                {...register('confirmedPassword')}
                type="password"
                placeholder="••••••••"
                className="w-full bg-surface-container rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />

              {errors.confirmedPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmedPassword.message}
                </p>
              )}
            </div>

            <FileUploader onFileSelect={setAvatarFile} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                bg-primary
                hover:opacity-90
                text-white
                py-3
                rounded-xl
                mt-6
                flex
                items-center
                justify-center
                gap-2
                transition
              "
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}

              <Image
                src="/images/rightArrow.png"
                alt="Arrow"
                width={14}
                height={14}
              />
            </button>

            <p className="text-center text-sm text-text mt-5">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}
