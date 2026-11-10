import Image from "@/components/localization/LocalizedImage";

type CountryFlagProps = {
  iso2: string;
  width?: number;
};

/** Local SVG flags render consistently on Windows, macOS, Android and iOS.
 * Decorative: the adjacent country name supplies the accessible label.
 */
export default function CountryFlag({ iso2, width = 28 }: CountryFlagProps) {
  const code = iso2.toLowerCase();
  if (!/^[a-z]{2}$/.test(code)) return null;

  return (
    <Image
      src={`/images/country-flags/${code}.svg`}
      alt=""
      aria-hidden="true"
      width={width}
      height={width * 0.75}
      unoptimized
      draggable={false}
      data-country-flag={code}
      style={{
        display: "inline-block",
        width,
        height: width * 0.75,
        objectFit: "contain",
        verticalAlign: "-0.125em",
        flexShrink: 0,
      }}
    />
  );
}
