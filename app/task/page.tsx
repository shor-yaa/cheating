import { Navbar } from "@/components/layout/navbar"

export default function TaskPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="glass neon-border overflow-hidden rounded-2xl">
            <iframe
              title="Task"
              src="/task/assets/index.html"
              className="h-[calc(100vh-7rem)] w-full"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

