
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
  "Development",
  "Design",
  "Marketing",
  "Business",
  "Data Science",
  "AI",
  "Languages",
  "Personal Growth",
];

const courses = [
  {
    title: "React & Next.js Masterclass",
    instructor: "Ahmed Ali",
    rating: 4.8,
    students: "4,500",
    price: "$49",
  },
  {
    title: "UI/UX Design Fundamentals",
    instructor: "Sara Mohamed",
    rating: 4.9,
    students: "3,200",
    price: "$39",
  },
  {
    title: "Digital Marketing Bootcamp",
    instructor: "Omar Hassan",
    rating: 4.7,
    students: "2,800",
    price: "$29",
  },
];

const instructors = [
  {
    name: "Ahmed Ali",
    specialty: "Frontend Development",
  },
  {
    name: "Sara Mohamed",
    specialty: "UI/UX Design",
  },
  {
    name: "Omar Hassan",
    specialty: "Marketing",
  },
];

export default function HomePage() {
  const router=useRouter()
  return (
    <div className="min-h-screen bg-surface">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-primary">
            Rawaq
          </h1>

          <div className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-label-md">
              Categories
            </Link>

            <Link href="#" className="text-label-md">
              Courses
            </Link>

            <Link href="#" className="text-label-md">
              Instructors
            </Link>
          </div>

          <div className="flex gap-3">
            <button 
            onClick={()=>{
              router.push('/login')
            }}
            className="rounded-xl border border-primary px-4 py-2 text-primary">
              Login
            </button>

            <button
              onClick={()=>{
              router.push('/signup')
            }}
             className="rounded-xl bg-primary px-4 py-2 text-white">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-surface-container px-4 py-2 text-label-md text-primary">
              Learn Smarter
            </span>

            <h1 className="mt-6 text-display-lg text-primary">
              Learn Without Limits
            </h1>

            <p className="mt-6 text-body-lg text-gray-600">
              Access expert-led courses, practical
              projects, and personalized learning paths
              designed to help you grow faster.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl bg-primary px-6 py-3 text-white">
                Explore Courses
              </button>

              <button className="rounded-xl border border-primary px-6 py-3 text-primary">
                Become Instructor
              </button>
            </div>

            <div className="mt-10 flex gap-8">
              <div>
                <h3 className="text-headline-md text-primary">
                  10K+
                </h3>
                <p className="text-label-md text-text">
                  Students
                </p>
              </div>

              <div>
                <h3 className="text-headline-md text-primary">
                  500+
                </h3>
                <p className="text-label-md text-text">
                  Courses
                </p>
              </div>

              <div>
                <h3 className="text-headline-md text-primary">
                  120+
                </h3>
                <p className="text-label-md text-text">
                  Instructors
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-surface-container p-8">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <Image
                src="/images/Illustration.png"
                alt="Learning"
                width={600}
                height={400}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-headline-md text-primary">
            Browse Categories
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 h-12 w-12 rounded-xl bg-surface-container" />

                <h3 className="font-semibold">
                  {category}
                </h3>

                <p className="mt-2 text-sm text-text">
                  120 Courses
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-headline-md text-primary">
            Featured Courses
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.title}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <div className="h-52 bg-surface-container" />

                <div className="p-6">
                  <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs text-tertiary">
                    Popular
                  </span>

                  <h3 className="mt-4 text-lg font-semibold">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-sm text-text">
                    {course.instructor}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span>
                      ⭐ {course.rating}
                    </span>

                    <span className="text-sm text-text">
                      {course.students} Students
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {course.price}
                    </span>

                    <button className="rounded-xl bg-primary px-4 py-2 text-white">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-headline-md text-primary">
            Why Learn With Rawaq?
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold">
                Expert Instructors
              </h3>

              <p className="mt-3 text-gray-600">
                Learn from professionals with
                real-world experience.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold">
                Flexible Learning
              </h3>

              <p className="mt-3 text-gray-600">
                Study at your own pace anytime,
                anywhere.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold">
                Certificates
              </h3>

              <p className="mt-3 text-gray-600">
                Earn certificates that showcase your
                achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-headline-md text-primary">
            Top Instructors
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {instructors.map((instructor) => (
              <div
                key={instructor.name}
                className="rounded-2xl border border-gray-200 p-6 text-center"
              >
                <div className="mx-auto h-24 w-24 rounded-full bg-surface-container" />

                <h3 className="mt-4 text-lg font-semibold">
                  {instructor.name}
                </h3>

                <p className="text-text">
                  {instructor.specialty}
                </p>

                <p className="mt-3 text-sm text-gray-400">
                  5,000+ Students
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-10 text-headline-md text-primary">
            What Students Say
          </h2>

          <div className="rounded-2xl bg-white p-10 shadow-sm">
            <p className="text-body-lg text-gray-600">
              “The learning experience was amazing.
              The courses are practical and helped me
              get my first job.”
            </p>

            <h4 className="mt-6 font-semibold">
              Mohamed Ahmed
            </h4>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-headline-md">
            Start Learning Today
          </h2>

          <p className="mt-4 text-body-lg opacity-90">
            Join thousands of learners and achieve your
            goals with expert-led courses.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-xl bg-white px-6 py-3 text-primary">
              Get Started
            </button>

            <button className="rounded-xl border border-white px-6 py-3">
              Browse Courses
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold text-primary">
              Rawaq
            </h3>

            <p className="mt-4 text-text">
              Learn new skills and grow your career.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">
              Company
            </h4>

            <ul className="mt-4 space-y-2 text-text">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">
              Learning
            </h4>

            <ul className="mt-4 space-y-2 text-text">
              <li>Courses</li>
              <li>Categories</li>
              <li>Certificates</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">
              Support
            </h4>

            <ul className="mt-4 space-y-2 text-text">
              <li>Help Center</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-text">
          © 2026 Rawaq. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

