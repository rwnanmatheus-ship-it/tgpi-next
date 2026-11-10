
import { LocalizedText } from "@/components/localization/LocaleProvider";
type StatCardProps = {
  title: string;
  description: string;
};

export default function StatCard({ title, description }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <strong className="mb-1 block text-xl text-yellow-400"><LocalizedText text={title} /></strong>
      <p className="text-sm text-slate-300"><LocalizedText text={description} /></p>
    </div>
  );
}