import { SignIn } from "@clerk/nextjs";
import { clerkTheme } from "@/config/clerk-theme";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - CodePulse",
  description: "Sign in to your CodePulse account to track your productivity.",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-deep-space px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Code<span className="text-electric-indigo">Pulse</span>
          </h1>
          <p className="mt-2 text-sm text-cloud-gray">
            The Rhythm of Your Productivity
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <SignIn
          appearance={clerkTheme}
          forceRedirectUrl="/dashboard"
          signUpUrl="/sign-up"
        />

        {/* Additional info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-cloud-gray">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-soft-cyan hover:text-mint-green transition-colors"
            >
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
