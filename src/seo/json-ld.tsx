export type JsonLdPrimitive = boolean | number | string | null;
export type JsonLdValue =
  | JsonLdPrimitive
  | JsonLdObject
  | readonly JsonLdValue[];
export type JsonLdObject = { readonly [key: string]: JsonLdValue | undefined };

type JsonLdProps = {
  data: JsonLdObject;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
