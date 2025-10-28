import { SignUp } from "@clerk/nextjs";
import { clerkTheme } from "@/config/clerk-theme";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - CodePulse",
  description: "Create your free CodePulse account and start tracking your productivity today.",
};

export default function SignUpPage() {
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

        {/* Clerk Sign Up Component */}
        <SignUp
          appearance={clerkTheme}
          forceRedirectUrl="/dashboard"
          signInUrl="/sign-in"
        />

        {/* Additional info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-cloud-gray">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-semibold text-soft-cyan hover:text-mint-green transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
