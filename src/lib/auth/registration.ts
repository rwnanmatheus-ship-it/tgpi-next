export const registrationLanguages = ["English", "Portuguese", "Spanish", "French", "German", "Italian", "Mandarin"] as const;
export const registrationCountryCodes = "AF AL DZ AD AO AG AR AM AU AT AZ BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG BF BI CV KH CM CA CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GD GT GN GW GY HT HN HU IS IN ID IR IQ IE IL IT JM JP JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MG MW MY MV ML MT MH MR MU MX FM MD MC MN ME MA MZ MM NA NR NP NL NZ NI NE NG MK NO OM PK PW PS PA PG PY PE PH PL PT QA RO RU RW KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB SO ZA SS ES LK SD SR SE CH SY TJ TZ TH TL TG TO TT TN TR TM TV UG UA AE GB US UY UZ VU VA VE VN YE ZM ZW".split(" ");
export type RegistrationInput = { firstName: string; lastName: string; currentCountry: string; preferredLanguage: string; acceptedTerms: true };
export function validateRegistration(value: unknown): RegistrationInput | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const cleanName = (v: unknown) => typeof v === "string" ? v.trim().replace(/\s+/gu, " ") : "";
  const firstName = cleanName(data.firstName);
  const lastName = cleanName(data.lastName);
  const validName = (name: string) => name.length >= 1 && name.length <= 60 && /\p{L}/u.test(name) && !/[\p{Cc}\p{Cf}<>]/u.test(name);
  if (!validName(firstName) || !validName(lastName) || typeof data.currentCountry !== "string" || !registrationCountryCodes.includes(data.currentCountry) || typeof data.preferredLanguage !== "string" || !registrationLanguages.some(language => language === data.preferredLanguage) || data.acceptedTerms !== true) return null;
  return { firstName, lastName, currentCountry: data.currentCountry, preferredLanguage: data.preferredLanguage, acceptedTerms: true };
}
