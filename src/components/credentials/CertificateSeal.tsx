/** TGPI's own issuer mark, never a third-party accreditation emblem. */
export default function CertificateSeal({ verified }: { verified: boolean }) {
  return (
    <svg
      viewBox="0 0 160 160"
      role="img"
      aria-label={
        verified
          ? "TGPI verified learning - own issuer quality seal"
          : "TGPI issuer record - verification required"
      }
      className="diploma-seal"
    >
      <defs>
        <linearGradient id="tgpi-seal-gold" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F0DFA7" />
          <stop offset=".48" stopColor="#B58A2A" />
          <stop offset="1" stopColor="#F0DFA7" />
        </linearGradient>
      </defs>
      {Array.from({ length: 48 }, (_, i) => {
        const a = (i * Math.PI) / 24;
        return (
          <line
            key={i}
            x1={80 + 63 * Math.cos(a)}
            y1={80 + 63 * Math.sin(a)}
            x2={80 + 72 * Math.cos(a)}
            y2={80 + 72 * Math.sin(a)}
            stroke="#B58A2A"
            strokeWidth={i % 2 ? 1 : 2}
          />
        );
      })}
      <circle
        cx="80"
        cy="80"
        r="60"
        fill="url(#tgpi-seal-gold)"
        stroke="#B58A2A"
      />
      <circle cx="80" cy="80" r="53" fill="#0B1F3A" stroke="#F0DFA7" />
      <circle
        cx="80"
        cy="80"
        r="47"
        fill="none"
        stroke="#B58A2A"
        strokeWidth=".5"
      />
      <text
        x="80"
        y="73"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="28"
        fill="#E9D397"
      >
        TGPI
      </text>
      <text
        x="80"
        y="94"
        textAnchor="middle"
        fontFamily="Arial,sans-serif"
        fontSize="10"
        letterSpacing="1.5"
        fill="white"
      >
        {verified ? "VERIFIED" : "REVIEW"}
      </text>
      <text
        x="80"
        y="110"
        textAnchor="middle"
        fontFamily="Arial,sans-serif"
        fontSize="9"
        letterSpacing="1"
        fill="#E9D397"
      >
        LEARNING
      </text>
    </svg>
  );
}
