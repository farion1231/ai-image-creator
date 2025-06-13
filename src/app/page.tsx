"use client";

import { ImageGenerator } from "@/components/ImageGenerator";

export default function Home() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <ImageGenerator />
      </div>
    </div>
  );
}
