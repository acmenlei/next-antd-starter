"use client"; // Error components must be Client Components

import { Button } from "antd";
import * as React from "react";
import { RiAlarmWarningFill } from "react-icons/ri";

export default function Error({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main>
      <section>
        <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
          <RiAlarmWarningFill
            size={60}
            className="drop-shadow-glow animate-flicker text-red-500"
          />
          <h1 className="mt-8 text-4xl md:text-6xl">网站发生了一些错误...</h1>
          <Button onClick={reset} className="mt-4">
            重新尝试
          </Button>
        </div>
      </section>
    </main>
  );
}
