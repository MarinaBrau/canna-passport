"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ textAlign: "center", color: "#dff0e8" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Algo deu errado</h2>
        <button
          onClick={reset}
          style={{ padding: "0.5rem 1.5rem", background: "#4a9e6b", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer" }}
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
