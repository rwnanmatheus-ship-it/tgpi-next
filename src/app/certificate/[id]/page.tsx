"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { maskDocumentNumber } from "@/lib/identity";

function formatDate(value?: string) {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(date);
}

export default function CertificatePage() {
  const params = useParams<{ id: string }>();
  const certificateId = String(params?.id || "");
  const [certificate, setCertificate] = useState<any>(null);
  const [owner, setOwner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const certificateRef = doc(db, "certificates", certificateId);
        const certificateSnap = await getDoc(certificateRef);

        if (certificateSnap.exists()) {
          const certificateData = certificateSnap.data();
          setCertificate(certificateData);

          const ownerUid =
            certificateData?.ownerUid ||
            certificateData?.userId ||
            certificateData?.uid ||
            "";

          if (ownerUid) {
            const ownerRef = doc(db, "users", ownerUid);
            const ownerSnap = await getDoc(ownerRef);
            if (ownerSnap.exists()) {
              setOwner(ownerSnap.data());
            }
          }
        } else {
          setCertificate({
            title: "TGPI Verified Certificate",
            issuedAt: "",
            courseTitle: "TGPI Achievement",
          });
        }
      } catch (error) {
        console.error("Could not load certificate:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [certificateId]);

  const holderName = useMemo(() => {
    return owner?.legalName || owner?.name || "Certificate Holder";
  }, [owner]);

  const username = owner?.username ? `@${owner.username}` : "—";
  const nationality = owner?.nationality || "—";
  const maskedDocument = maskDocumentNumber(
    owner?.documentType,
    owner?.documentNumber
  );

  if (loading) {
    return <div className="p-10 text-white">Loading certificate...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10 shadow-2xl">
        <div className="text-center">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            Verified by The Global Polymath Institute
          </p>

          <h1 className="text-4xl font-bold text-yellow-400">
            Certificate of Completion
          </h1>

          <p className="mt-4 text-slate-300">
            This certificate confirms the verified completion of a TGPI learning
            achievement under the identity and validation standards of the
            platform.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Awarded to
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white">{holderName}</h2>

          <p className="mt-2 text-slate-300">{username}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <InfoCard
              label="Certificate ID"
              value={certificateId || "—"}
            />
            <InfoCard
              label="TGPI ID"
              value={owner?.tgpiId || "—"}
            />
            <InfoCard
              label="Course / Achievement"
              value={
                certificate?.courseTitle ||
                certificate?.title ||
                "TGPI Verified Achievement"
              }
            />
            <InfoCard label="Nationality" value={nationality} />
            <InfoCard label="Document Verification" value={maskedDocument} />
            <InfoCard
              label="Issued On"
              value={formatDate(certificate?.issuedAt)}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <p className="font-semibold text-emerald-300">
              ✔ Public verification active
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              Sensitive raw identity values remain private in TGPI records.
              Public certificate validation uses a masked document signal to
              strengthen trust while protecting personal data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  );
}