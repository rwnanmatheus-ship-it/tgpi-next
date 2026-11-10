
import { useId } from "react";
import { LocalizedElement } from "@/components/localization/LocalizedElement";

import { LocalizedText } from "@/components/localization/LocaleProvider";
/** TGPI's own issuer mark, never a third-party accreditation emblem. */
export default function CertificateSeal({ verified }: { verified: boolean }) {
  const goldId = `tgpi-seal-gold-${useId().replace(/:/g, "")}`;
  return (
    <LocalizedElement as="svg"
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
        <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FFF3CB" />
          <stop offset=".18" stopColor="#AA7722" />
          <stop offset=".34" stopColor="#F7DF98" />
          <stop offset=".5" stopColor="#C3943A" />
          <stop offset=".66" stopColor="#FFF2BE" />
          <stop offset=".84" stopColor="#956318" />
          <stop offset="1" stopColor="#EACB7C" />
        </linearGradient>
      </defs>
      <path d="M49 111 70 117 59 158 47 144 34 147Z M90 117 111 111 126 147 113 144 101 158Z" fill="#0B1F3A" stroke="#B58A2A" />
      {Array.from({ length: 96 }, (_, i) => {
        const a = (i * Math.PI) / 48;
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
        fill={`url(#${goldId})`}
        stroke="#B58A2A"
      />
      {Array.from({ length: 60 }, (_, i) => {
        const angle = i * Math.PI / 30;
        return <circle key={`bead-${i}`} cx={80 + 56.5 * Math.cos(angle)} cy={80 + 56.5 * Math.sin(angle)} r=".75" fill="#FFF4D0" />;
      })}
      <circle cx="80" cy="80" r="53" fill="#0B1F3A" stroke="#F0DFA7" />
      <circle
        cx="80"
        cy="80"
        r="47"
        fill="none"
        stroke="#B58A2A"
        strokeWidth=".5"
      />
      {[-1, 1].flatMap((side) => Array.from({ length: 6 }, (_, i) => {
        const angle = (210 + i * 15) * Math.PI / 180;
        const x = 80 + side * 39 * Math.cos(angle);
        const y = 80 - 39 * Math.sin(angle);
        return <ellipse key={`${side}-${i}`} cx={x} cy={y} rx="5" ry="2" transform={`rotate(${side * (35 - i * 15)} ${x} ${y})`} fill="#DABC72" />;
      }))}
      <text
        x="80"
        y="77"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="28"
        fill="#E9D397"
      ><LocalizedText text={"TGPI"} /></text>
      <text
        x="80"
        y="94"
        textAnchor="middle"
        fontFamily="Arial,sans-serif"
        fontSize="8"
        letterSpacing=".7"
        fill="white"
      >
        {verified ? <LocalizedText text={"VERIFIED"} /> : <LocalizedText text={"REVIEW"} />}
      </text>
      <text
        x="80"
        y="53"
        textAnchor="middle"
        fontFamily="Arial,sans-serif"
        fontSize="7"
        letterSpacing=".5"
        fill="#E9D397"
      ><LocalizedText text={"LEARNING"} /></text>
    </LocalizedElement>
  );
}

