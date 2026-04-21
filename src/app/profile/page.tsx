"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import {
  normalizeUsername,
  prettifySex,
  validateUsername,
} from "@/lib/identity";

type ProfileForm = {
  name: string;
  legalName: string;
  username: string;
  dateOfBirth: string;
  sex: string;
  nationality: string;
  documentType: string;
  documentNumber: string;
  currentCountry: string;
  currentCity: string;
  targetCountry: string;
  travelIntent: string;
  bio: string;
};

const defaultForm: ProfileForm = {
  name: "",
  legalName: "",
  username: "",
  dateOfBirth: "",
  sex: "",
  nationality: "",
  documentType: "passport",
  documentNumber: "",
  currentCountry: "",
  currentCity: "",
  targetCountry: "",
  travelIntent: "work",
  bio: "",
};

export default function ProfilePage() {
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState<ProfileForm>(defaultForm);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      setUid(user.uid);
      setEmail(user.email || "");

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        const data = snap.exists() ? snap.data() : {};

        setForm({
          name: String(data?.name || user.displayName || ""),
          legalName: String(data?.legalName || ""),
          username: String(data?.username || ""),
          dateOfBirth: String(data?.dateOfBirth || ""),
          sex: String(data?.sex || ""),
          nationality: String(data?.nationality || ""),
          documentType: String(data?.documentType || "passport"),
          documentNumber: String(data?.documentNumber || ""),
          currentCountry: String(data?.currentCountry || ""),
          currentCity: String(data?.currentCity || ""),
          targetCountry: String(data?.targetCountry || data?.countryGoal || ""),
          travelIntent: String(data?.travelIntent || "work"),
          bio: String(data?.bio || ""),
        });
      } catch (err) {
        console.error("Could not load profile:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const usernamePreview = useMemo(
    () => normalizeUsername(form.username),
    [form.username]
  );

  function updateField<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setError("");
    setSuccess("");

    if (!uid) {
      setError("You need to be logged in to save your profile.");
      return;
    }

    const usernameError = validateUsername(form.username);
    if (usernameError) {
      setError(usernameError);
      return;
    }

    const normalizedUsername = normalizeUsername(form.username);

    try {
      setSaving(true);

      const usernameQuery = query(
        collection(db, "users"),
        where("usernameLower", "==", normalizedUsername),
        limit(1)
      );

      const usernameSnapshot = await getDocs(usernameQuery);
      const takenByAnotherUser = usernameSnapshot.docs.some(
        (item) => item.id !== uid
      );

      if (takenByAnotherUser) {
        setError("This username is already in use.");
        setSaving(false);
        return;
      }

      const ref = doc(db, "users", uid);

      await setDoc(
        ref,
        {
          uid,
          email,
          name: form.name,
          legalName: form.legalName,
          username: normalizedUsername,
          usernameLower: normalizedUsername,
          dateOfBirth: form.dateOfBirth,
          sex: form.sex,
          nationality: form.nationality,
          documentType: form.documentType,
          documentNumber: form.documentNumber,
          currentCountry: form.currentCountry,
          currentCity: form.currentCity,
          targetCountry: form.targetCountry,
          travelIntent: form.travelIntent,
          bio: form.bio,
          profileCompleted: true,
        },
        { merge: true }
      );

      setSuccess("Profile identity saved successfully.");
      setForm((prev) => ({ ...prev, username: normalizedUsername }));
    } catch (err) {
      console.error("Could not save profile:", err);
      setError("Could not save profile right now.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-10 text-white">Loading profile...</div>;
  }

  if (!uid) {
    return (
      <div className="p-10 text-white">
        <h1 className="text-3xl font-bold text-yellow-400">Profile</h1>
        <p className="mt-4 text-slate-300">
          Sign in to edit your identity profile and certificate data.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            Identity & Certificate Data
          </p>

          <h1 className="text-4xl font-bold text-yellow-400">
            Profile Identity Layer
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Add your personal identity, username, travel objective, and document
            data to increase certificate credibility and strengthen your TGPI
            public profile. Sensitive document values stay private in the system
            and appear masked on public validation pages.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Core Identity
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field
                label="Public Name"
                value={form.name}
                onChange={(value) => updateField("name", value)}
                placeholder="Your public display name"
              />

              <Field
                label="Legal Full Name"
                value={form.legalName}
                onChange={(value) => updateField("legalName", value)}
                placeholder="Your legal full name"
              />

              <Field
                label="Username"
                value={form.username}
                onChange={(value) => updateField("username", value)}
                placeholder="username"
              />

              <Field
                label="Date of Birth"
                type="date"
                value={form.dateOfBirth}
                onChange={(value) => updateField("dateOfBirth", value)}
              />

              <SelectField
                label="Sex"
                value={form.sex}
                onChange={(value) => updateField("sex", value)}
                options={[
                  { value: "", label: "Select" },
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "non_binary", label: "Non-binary" },
                  { value: "prefer_not_to_say", label: "Prefer not to say" },
                ]}
              />

              <Field
                label="Nationality"
                value={form.nationality}
                onChange={(value) => updateField("nationality", value)}
                placeholder="Brazilian"
              />
            </div>

            <h2 className="mt-10 text-2xl font-bold text-yellow-400">
              Document & Location
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <SelectField
                label="Document Type"
                value={form.documentType}
                onChange={(value) => updateField("documentType", value)}
                options={[
                  { value: "passport", label: "Passport" },
                  { value: "cpf", label: "CPF" },
                  { value: "ssn", label: "Social Security Number" },
                  { value: "national_id", label: "National ID" },
                  { value: "other", label: "Other" },
                ]}
              />

              <Field
                label="Document Number"
                value={form.documentNumber}
                onChange={(value) => updateField("documentNumber", value)}
                placeholder="Private system record"
              />

              <Field
                label="Current Country"
                value={form.currentCountry}
                onChange={(value) => updateField("currentCountry", value)}
                placeholder="Brazil"
              />

              <Field
                label="Current City"
                value={form.currentCity}
                onChange={(value) => updateField("currentCity", value)}
                placeholder="Campinas"
              />
            </div>

            <h2 className="mt-10 text-2xl font-bold text-yellow-400">
              International Goal
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field
                label="Target Country"
                value={form.targetCountry}
                onChange={(value) => updateField("targetCountry", value)}
                placeholder="Canada"
              />

              <SelectField
                label="Travel Intent"
                value={form.travelIntent}
                onChange={(value) => updateField("travelIntent", value)}
                options={[
                  { value: "work", label: "Work" },
                  { value: "relocation", label: "Relocation" },
                  { value: "tourism", label: "Tourism" },
                  { value: "study", label: "Study" },
                  { value: "networking", label: "Networking" },
                ]}
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm text-slate-300">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                placeholder="Tell the world about your global goals, professional interests, and international vision."
              />
            </div>

            {error ? (
              <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            ) : null}

            {success ? (
              <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {success}
              </div>
            ) : null}

            <div className="mt-8">
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Saving..." : "Save Identity Profile"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="text-2xl font-bold text-yellow-400">
                Public Preview
              </h2>

              <div className="mt-6 space-y-4">
                <PreviewRow label="Email" value={email || "—"} />
                <PreviewRow label="Username" value={usernamePreview ? `@${usernamePreview}` : "—"} />
                <PreviewRow label="Public Name" value={form.name || "—"} />
                <PreviewRow label="Legal Name" value={form.legalName || "—"} />
                <PreviewRow label="Sex" value={prettifySex(form.sex)} />
                <PreviewRow label="Nationality" value={form.nationality || "—"} />
                <PreviewRow label="Target Country" value={form.targetCountry || "—"} />
                <PreviewRow label="Travel Intent" value={form.travelIntent || "—"} />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="text-2xl font-bold text-yellow-400">
                Certificate Trust Layer
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                TGPI can use your legal name, username, nationality, and a
                masked version of your document to add credibility to issued
                certificates while keeping raw sensitive values private.
              </p>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
      >
        {options.map((option) => (
          <option key={`${label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}