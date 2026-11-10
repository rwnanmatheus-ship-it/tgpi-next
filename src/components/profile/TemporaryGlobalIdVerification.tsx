"use client";

import { useEffect, useState } from "react";
import { verifyTemporaryGlobalId } from "@/app/verify/global-key/actions";
import { isGlobalKeyShareToken } from "@/lib/global-key-share";
import type { GlobalKeyVerification } from "@/lib/global-key";
import GlobalKeyVerificationResult from "./GlobalKeyVerificationResult";

export default function TemporaryGlobalIdVerification() {
  const [result, setResult] = useState<GlobalKeyVerification | "checking" | null>(null);

  useEffect(() => {
    let latest = 0;
    let mounted = true;

    async function checkLink() {
      if (!mounted) return;
      const request = ++latest;
      const values = new URLSearchParams(window.location.hash.slice(1)).getAll("share");
      if (!values.length) {
        setResult(null);
        return;
      }
      if (values.length !== 1 || !isGlobalKeyShareToken(values[0])) {
        setResult({ status: "invalid" });
        return;
      }

      setResult("checking");
      try {
        const verification = await verifyTemporaryGlobalId(values[0]);
        if (mounted && latest === request) setResult(verification);
      } catch {
        if (mounted && latest === request) setResult({ status: "unavailable" });
      }
    }

    queueMicrotask(() => void checkLink());
    window.addEventListener("hashchange", checkLink);
    return () => {
      mounted = false;
      window.removeEventListener("hashchange", checkLink);
    };
  }, []);

  return <GlobalKeyVerificationResult result={result} />;
}
