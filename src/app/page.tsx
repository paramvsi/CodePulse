import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-deep-space p-8">
      <main className="flex max-w-4xl flex-col items-center gap-8 text-center">
        <h1 className="text-5xl font-bold text-white">
          Code<span className="text-electric-indigo">Pulse</span>
        </h1>
        <p className="text-xl text-cloud-gray">
          The Rhythm of Your Productivity
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="bg-graphite border-electric-indigo/20 p-6">
            <h3 className="text-lg font-semibold text-electric-indigo mb-2">
              Electric Indigo
            </h3>
            <div className="h-16 w-full rounded bg-electric-indigo" />
            <p className="mt-2 text-sm text-cloud-gray">#635BFF</p>
          </Card>

          <Card className="bg-graphite border-soft-cyan/20 p-6">
            <h3 className="text-lg font-semibold text-soft-cyan mb-2">
              Soft Cyan
            </h3>
            <div className="h-16 w-full rounded bg-soft-cyan" />
            <p className="mt-2 text-sm text-cloud-gray">#35E2D1</p>
          </Card>

          <Card className="bg-graphite border-mint-green/20 p-6">
            <h3 className="text-lg font-semibold text-mint-green mb-2">
              Mint Green
            </h3>
            <div className="h-16 w-full rounded bg-mint-green" />
            <p className="mt-2 text-sm text-cloud-gray">#4ECDC4</p>
          </Card>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button className="bg-electric-indigo hover:bg-electric-indigo/90 text-white">
            Try Demo
          </Button>
          <Button variant="outline" className="border-soft-cyan/50 text-soft-cyan hover:bg-soft-cyan/10">
            Sign Up Free
          </Button>
        </div>

        <p className="mt-8 text-sm text-cloud-gray font-mono">
          ✨ Project initialized successfully!
        </p>
      </main>
    </div>
  );
}
