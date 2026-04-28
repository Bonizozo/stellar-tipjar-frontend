import React from "react";
import Link from "next/link";
import { MoveLeft, WifiOff } from "lucide-react";

import { Button } from "@/components/Button";

export default function OfflinePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="mb-6 rounded-full bg-ink/5 p-6 dark:bg-ink/10">
        <WifiOff className="h-12 w-12 text-ink/60" />
      </div>
      
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        You're Offline
      </h1>
      
      <p className="mb-8 max-w-md text-lg text-ink/60">
        It looks like you've lost your connection. Don't worry, you can still view cached content, and your tips will be queued until you're back online.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={() => window.location.reload()}
          className="px-8"
        >
          Check Connection
        </Button>
        
        <Link href="/">
          <Button variant="outline" className="px-8 flex items-center gap-2">
            <MoveLeft className="h-4 w-4" />
            Back Home
          </Button>
        </Link>
      </div>
      
      <div className="mt-12 text-sm text-ink/40">
        <p>Stellar Tip Jar • Offline Mode</p>
      </div>
    </div>
  );
}
