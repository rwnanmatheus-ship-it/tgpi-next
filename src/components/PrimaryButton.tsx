type PrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function PrimaryButton({
  href,
  children,
}: PrimaryButtonProps) {
  return (
    <a
      href={href}
      className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
    >
      {children}
    </a>
  );
}