import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-electric-indigo/20 bg-graphite">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Code<span className="text-electric-indigo">Pulse</span>
            </h3>
            <p className="mt-2 text-sm text-cloud-gray">
              The Rhythm of Your Productivity
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/demo"
                  className="text-sm text-cloud-gray transition-colors hover:text-soft-cyan"
                >
                  Try Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-sm text-cloud-gray transition-colors hover:text-soft-cyan"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-white">Built With</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md bg-deep-space px-2 py-1 text-xs text-cloud-gray">
                Next.js 16
              </span>
              <span className="rounded-md bg-deep-space px-2 py-1 text-xs text-cloud-gray">
                TypeScript
              </span>
              <span className="rounded-md bg-deep-space px-2 py-1 text-xs text-cloud-gray">
                Supabase
              </span>
              <span className="rounded-md bg-deep-space px-2 py-1 text-xs text-cloud-gray">
                Tailwind CSS
              </span>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-electric-indigo/10 pt-8 sm:flex-row">
          <p className="text-sm text-cloud-gray">
            © {currentYear} CodePulse. Open source and free forever.
          </p>
          <div className="mt-4 flex items-center gap-4 sm:mt-0">
            <a
              href="https://github.com/yourusername/codepulse"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-cloud-gray transition-colors hover:text-electric-indigo"
              aria-label="View CodePulse on GitHub"
            >
              <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
