export default function ViralShare() {
  const url = "https://theglobalpolymath.com";

  return (
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/intent/tweet?url=${url}`}
        target="_blank"
        className="bg-blue-500 px-4 py-2 rounded-xl text-white"
      >
        Twitter
      </a>

      <a
        href={`https://wa.me/?text=${url}`}
        target="_blank"
        className="bg-green-500 px-4 py-2 rounded-xl text-white"
      >
        WhatsApp
      </a>
    </div>
  );
}