import { getLocale } from "@/lib/localization/server";
import { activationReadOnlyCopy } from "@/lib/localization/progress-copy";

export default async function ActivationProgressNotice() {
  const locale = await getLocale();
  return (
    <p className="mx-auto w-full max-w-6xl border-y border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-900" role="status">
      {activationReadOnlyCopy[locale]}
    </p>
  );
}
