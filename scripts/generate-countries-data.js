// scripts/generate-countries-data.js

const fs = require("fs");
const path = require("path");

const countries = [
  ["afghanistan", "Afghanistan", "🇦🇫", "Asia", "Dari / Pashto", "Afghan Afghani (AFN)", "AFN", "Kabul"],
  ["albania", "Albania", "🇦🇱", "Europe", "Albanian", "Albanian Lek (ALL)", "ALL", "Tirana"],
  ["algeria", "Algeria", "🇩🇿", "Africa", "Arabic / Tamazight", "Algerian Dinar (DZD)", "DZD", "Algiers"],
  ["andorra", "Andorra", "🇦🇩", "Europe", "Catalan", "Euro (EUR)", "EUR", "Andorra la Vella"],
  ["angola", "Angola", "🇦🇴", "Africa", "Portuguese", "Angolan Kwanza (AOA)", "AOA", "Luanda"],
  ["antigua-and-barbuda", "Antigua and Barbuda", "🇦🇬", "North America", "English", "East Caribbean Dollar (XCD)", "XCD", "Saint John's"],
  ["argentina", "Argentina", "🇦🇷", "South America", "Spanish", "Argentine Peso (ARS)", "ARS", "Buenos Aires"],
  ["armenia", "Armenia", "🇦🇲", "Asia", "Armenian", "Armenian Dram (AMD)", "AMD", "Yerevan"],
  ["australia", "Australia", "🇦🇺", "Oceania", "English", "Australian Dollar (AUD)", "AUD", "Canberra"],
  ["austria", "Austria", "🇦🇹", "Europe", "German", "Euro (EUR)", "EUR", "Vienna"],
  ["azerbaijan", "Azerbaijan", "🇦🇿", "Asia", "Azerbaijani", "Azerbaijani Manat (AZN)", "AZN", "Baku"],
  ["bahamas", "Bahamas", "🇧🇸", "North America", "English", "Bahamian Dollar (BSD)", "BSD", "Nassau"],
  ["bahrain", "Bahrain", "🇧🇭", "Asia", "Arabic", "Bahraini Dinar (BHD)", "BHD", "Manama"],
  ["bangladesh", "Bangladesh", "🇧🇩", "Asia", "Bengali", "Bangladeshi Taka (BDT)", "BDT", "Dhaka"],
  ["barbados", "Barbados", "🇧🇧", "North America", "English", "Barbadian Dollar (BBD)", "BBD", "Bridgetown"],
  ["belarus", "Belarus", "🇧🇾", "Europe", "Belarusian / Russian", "Belarusian Ruble (BYN)", "BYN", "Minsk"],
  ["belgium", "Belgium", "🇧🇪", "Europe", "Dutch / French / German", "Euro (EUR)", "EUR", "Brussels"],
  ["belize", "Belize", "🇧🇿", "North America", "English", "Belize Dollar (BZD)", "BZD", "Belmopan"],
  ["benin", "Benin", "🇧🇯", "Africa", "French", "West African CFA Franc (XOF)", "XOF", "Porto-Novo"],
  ["bhutan", "Bhutan", "🇧🇹", "Asia", "Dzongkha", "Bhutanese Ngultrum (BTN)", "BTN", "Thimphu"],
  ["bolivia", "Bolivia", "🇧🇴", "South America", "Spanish", "Boliviano (BOB)", "BOB", "Sucre"],
  ["bosnia-and-herzegovina", "Bosnia and Herzegovina", "🇧🇦", "Europe", "Bosnian / Croatian / Serbian", "Convertible Mark (BAM)", "BAM", "Sarajevo"],
  ["botswana", "Botswana", "🇧🇼", "Africa", "English / Setswana", "Botswana Pula (BWP)", "BWP", "Gaborone"],
  ["brazil", "Brazil", "🇧🇷", "South America", "Portuguese", "Brazilian Real (BRL)", "BRL", "Brasília"],
  ["brunei", "Brunei", "🇧🇳", "Asia", "Malay", "Brunei Dollar (BND)", "BND", "Bandar Seri Begawan"],
  ["bulgaria", "Bulgaria", "🇧🇬", "Europe", "Bulgarian", "Bulgarian Lev (BGN)", "BGN", "Sofia"],
  ["burkina-faso", "Burkina Faso", "🇧🇫", "Africa", "French", "West African CFA Franc (XOF)", "XOF", "Ouagadougou"],
  ["burundi", "Burundi", "🇧🇮", "Africa", "Kirundi / French / English", "Burundian Franc (BIF)", "BIF", "Gitega"],
  ["cabo-verde", "Cabo Verde", "🇨🇻", "Africa", "Portuguese", "Cape Verdean Escudo (CVE)", "CVE", "Praia"],
  ["cambodia", "Cambodia", "🇰🇭", "Asia", "Khmer", "Cambodian Riel (KHR)", "KHR", "Phnom Penh"],
  ["cameroon", "Cameroon", "🇨🇲", "Africa", "French / English", "Central African CFA Franc (XAF)", "XAF", "Yaoundé"],
  ["canada", "Canada", "🇨🇦", "North America", "English / French", "Canadian Dollar (CAD)", "CAD", "Ottawa"],
  ["central-african-republic", "Central African Republic", "🇨🇫", "Africa", "French / Sango", "Central African CFA Franc (XAF)", "XAF", "Bangui"],
  ["chad", "Chad", "🇹🇩", "Africa", "French / Arabic", "Central African CFA Franc (XAF)", "XAF", "N'Djamena"],
  ["chile", "Chile", "🇨🇱", "South America", "Spanish", "Chilean Peso (CLP)", "CLP", "Santiago"],
  ["china", "China", "🇨🇳", "Asia", "Mandarin Chinese", "Chinese Yuan (CNY)", "CNY", "Beijing"],
  ["colombia", "Colombia", "🇨🇴", "South America", "Spanish", "Colombian Peso (COP)", "COP", "Bogotá"],
  ["comoros", "Comoros", "🇰🇲", "Africa", "Comorian / Arabic / French", "Comorian Franc (KMF)", "KMF", "Moroni"],
  ["congo", "Congo", "🇨🇬", "Africa", "French", "Central African CFA Franc (XAF)", "XAF", "Brazzaville"],
  ["costa-rica", "Costa Rica", "🇨🇷", "North America", "Spanish", "Costa Rican Colón (CRC)", "CRC", "San José"],
  ["croatia", "Croatia", "🇭🇷", "Europe", "Croatian", "Euro (EUR)", "EUR", "Zagreb"],
  ["cuba", "Cuba", "🇨🇺", "North America", "Spanish", "Cuban Peso (CUP)", "CUP", "Havana"],
  ["cyprus", "Cyprus", "🇨🇾", "Europe", "Greek / Turkish", "Euro (EUR)", "EUR", "Nicosia"],
  ["czechia", "Czechia", "🇨🇿", "Europe", "Czech", "Czech Koruna (CZK)", "CZK", "Prague"],
  ["democratic-republic-of-the-congo", "Democratic Republic of the Congo", "🇨🇩", "Africa", "French", "Congolese Franc (CDF)", "CDF", "Kinshasa"],
  ["denmark", "Denmark", "🇩🇰", "Europe", "Danish", "Danish Krone (DKK)", "DKK", "Copenhagen"],
  ["djibouti", "Djibouti", "🇩🇯", "Africa", "French / Arabic", "Djiboutian Franc (DJF)", "DJF", "Djibouti"],
  ["dominica", "Dominica", "🇩🇲", "North America", "English", "East Caribbean Dollar (XCD)", "XCD", "Roseau"],
  ["dominican-republic", "Dominican Republic", "🇩🇴", "North America", "Spanish", "Dominican Peso (DOP)", "DOP", "Santo Domingo"],
  ["ecuador", "Ecuador", "🇪🇨", "South America", "Spanish", "United States Dollar (USD)", "USD", "Quito"],
  ["egypt", "Egypt", "🇪🇬", "Africa / Middle East", "Arabic", "Egyptian Pound (EGP)", "EGP", "Cairo"],
  ["el-salvador", "El Salvador", "🇸🇻", "North America", "Spanish", "United States Dollar (USD)", "USD", "San Salvador"],
  ["equatorial-guinea", "Equatorial Guinea", "🇬🇶", "Africa", "Spanish / French / Portuguese", "Central African CFA Franc (XAF)", "XAF", "Malabo"],
  ["eritrea", "Eritrea", "🇪🇷", "Africa", "Tigrinya / Arabic / English", "Eritrean Nakfa (ERN)", "ERN", "Asmara"],
  ["estonia", "Estonia", "🇪🇪", "Europe", "Estonian", "Euro (EUR)", "EUR", "Tallinn"],
  ["eswatini", "Eswatini", "🇸🇿", "Africa", "Swazi / English", "Swazi Lilangeni (SZL)", "SZL", "Mbabane"],
  ["ethiopia", "Ethiopia", "🇪🇹", "Africa", "Amharic", "Ethiopian Birr (ETB)", "ETB", "Addis Ababa"],
  ["fiji", "Fiji", "🇫🇯", "Oceania", "English / Fijian / Hindi", "Fijian Dollar (FJD)", "FJD", "Suva"],
  ["finland", "Finland", "🇫🇮", "Europe", "Finnish / Swedish", "Euro (EUR)", "EUR", "Helsinki"],
  ["france", "France", "🇫🇷", "Europe", "French", "Euro (EUR)", "EUR", "Paris"],
  ["gabon", "Gabon", "🇬🇦", "Africa", "French", "Central African CFA Franc (XAF)", "XAF", "Libreville"],
  ["gambia", "Gambia", "🇬🇲", "Africa", "English", "Gambian Dalasi (GMD)", "GMD", "Banjul"],
  ["georgia", "Georgia", "🇬🇪", "Asia / Europe", "Georgian", "Georgian Lari (GEL)", "GEL", "Tbilisi"],
  ["germany", "Germany", "🇩🇪", "Europe", "German", "Euro (EUR)", "EUR", "Berlin"],
  ["ghana", "Ghana", "🇬🇭", "Africa", "English", "Ghanaian Cedi (GHS)", "GHS", "Accra"],
  ["greece", "Greece", "🇬🇷", "Europe", "Greek", "Euro (EUR)", "EUR", "Athens"],
  ["grenada", "Grenada", "🇬🇩", "North America", "English", "East Caribbean Dollar (XCD)", "XCD", "St. George's"],
  ["guatemala", "Guatemala", "🇬🇹", "North America", "Spanish", "Guatemalan Quetzal (GTQ)", "GTQ", "Guatemala City"],
  ["guinea", "Guinea", "🇬🇳", "Africa", "French", "Guinean Franc (GNF)", "GNF", "Conakry"],
  ["guinea-bissau", "Guinea-Bissau", "🇬🇼", "Africa", "Portuguese", "West African CFA Franc (XOF)", "XOF", "Bissau"],
  ["guyana", "Guyana", "🇬🇾", "South America", "English", "Guyanese Dollar (GYD)", "GYD", "Georgetown"],
  ["haiti", "Haiti", "🇭🇹", "North America", "Haitian Creole / French", "Haitian Gourde (HTG)", "HTG", "Port-au-Prince"],
  ["honduras", "Honduras", "🇭🇳", "North America", "Spanish", "Honduran Lempira (HNL)", "HNL", "Tegucigalpa"],
  ["hungary", "Hungary", "🇭🇺", "Europe", "Hungarian", "Hungarian Forint (HUF)", "HUF", "Budapest"],
  ["iceland", "Iceland", "🇮🇸", "Europe", "Icelandic", "Icelandic Króna (ISK)", "ISK", "Reykjavík"],
  ["india", "India", "🇮🇳", "Asia", "Hindi / English", "Indian Rupee (INR)", "INR", "New Delhi"],
  ["indonesia", "Indonesia", "🇮🇩", "Asia", "Indonesian", "Indonesian Rupiah (IDR)", "IDR", "Jakarta"],
  ["iran", "Iran", "🇮🇷", "Asia", "Persian", "Iranian Rial (IRR)", "IRR", "Tehran"],
  ["iraq", "Iraq", "🇮🇶", "Asia", "Arabic / Kurdish", "Iraqi Dinar (IQD)", "IQD", "Baghdad"],
  ["ireland", "Ireland", "🇮🇪", "Europe", "English / Irish", "Euro (EUR)", "EUR", "Dublin"],
  ["israel", "Israel", "🇮🇱", "Asia", "Hebrew / Arabic", "Israeli New Shekel (ILS)", "ILS", "Jerusalem"],
  ["italy", "Italy", "🇮🇹", "Europe", "Italian", "Euro (EUR)", "EUR", "Rome"],
  ["ivory-coast", "Ivory Coast", "🇨🇮", "Africa", "French", "West African CFA Franc (XOF)", "XOF", "Yamoussoukro"],
  ["jamaica", "Jamaica", "🇯🇲", "North America", "English", "Jamaican Dollar (JMD)", "JMD", "Kingston"],
  ["japan", "Japan", "🇯🇵", "Asia", "Japanese", "Japanese Yen (JPY)", "JPY", "Tokyo"],
  ["jordan", "Jordan", "🇯🇴", "Asia", "Arabic", "Jordanian Dinar (JOD)", "JOD", "Amman"],
  ["kazakhstan", "Kazakhstan", "🇰🇿", "Asia", "Kazakh / Russian", "Kazakhstani Tenge (KZT)", "KZT", "Astana"],
  ["kenya", "Kenya", "🇰🇪", "Africa", "Swahili / English", "Kenyan Shilling (KES)", "KES", "Nairobi"],
  ["kiribati", "Kiribati", "🇰🇮", "Oceania", "English / Gilbertese", "Australian Dollar (AUD)", "AUD", "Tarawa"],
  ["kuwait", "Kuwait", "🇰🇼", "Asia", "Arabic", "Kuwaiti Dinar (KWD)", "KWD", "Kuwait City"],
  ["kyrgyzstan", "Kyrgyzstan", "🇰🇬", "Asia", "Kyrgyz / Russian", "Kyrgyzstani Som (KGS)", "KGS", "Bishkek"],
  ["laos", "Laos", "🇱🇦", "Asia", "Lao", "Lao Kip (LAK)", "LAK", "Vientiane"],
  ["latvia", "Latvia", "🇱🇻", "Europe", "Latvian", "Euro (EUR)", "EUR", "Riga"],
  ["lebanon", "Lebanon", "🇱🇧", "Asia", "Arabic", "Lebanese Pound (LBP)", "LBP", "Beirut"],
  ["lesotho", "Lesotho", "🇱🇸", "Africa", "Sesotho / English", "Lesotho Loti (LSL)", "LSL", "Maseru"],
  ["liberia", "Liberia", "🇱🇷", "Africa", "English", "Liberian Dollar (LRD)", "LRD", "Monrovia"],
  ["libya", "Libya", "🇱🇾", "Africa", "Arabic", "Libyan Dinar (LYD)", "LYD", "Tripoli"],
  ["liechtenstein", "Liechtenstein", "🇱🇮", "Europe", "German", "Swiss Franc (CHF)", "CHF", "Vaduz"],
  ["lithuania", "Lithuania", "🇱🇹", "Europe", "Lithuanian", "Euro (EUR)", "EUR", "Vilnius"],
  ["luxembourg", "Luxembourg", "🇱🇺", "Europe", "Luxembourgish / French / German", "Euro (EUR)", "EUR", "Luxembourg"],
  ["madagascar", "Madagascar", "🇲🇬", "Africa", "Malagasy / French", "Malagasy Ariary (MGA)", "MGA", "Antananarivo"],
  ["malawi", "Malawi", "🇲🇼", "Africa", "English / Chichewa", "Malawian Kwacha (MWK)", "MWK", "Lilongwe"],
  ["malaysia", "Malaysia", "🇲🇾", "Asia", "Malay", "Malaysian Ringgit (MYR)", "MYR", "Kuala Lumpur"],
  ["maldives", "Maldives", "🇲🇻", "Asia", "Dhivehi", "Maldivian Rufiyaa (MVR)", "MVR", "Malé"],
  ["mali", "Mali", "🇲🇱", "Africa", "French", "West African CFA Franc (XOF)", "XOF", "Bamako"],
  ["malta", "Malta", "🇲🇹", "Europe", "Maltese / English", "Euro (EUR)", "EUR", "Valletta"],
  ["marshall-islands", "Marshall Islands", "🇲🇭", "Oceania", "Marshallese / English", "United States Dollar (USD)", "USD", "Majuro"],
  ["mauritania", "Mauritania", "🇲🇷", "Africa", "Arabic", "Mauritanian Ouguiya (MRU)", "MRU", "Nouakchott"],
  ["mauritius", "Mauritius", "🇲🇺", "Africa", "English / French", "Mauritian Rupee (MUR)", "MUR", "Port Louis"],
  ["mexico", "Mexico", "🇲🇽", "North America", "Spanish", "Mexican Peso (MXN)", "MXN", "Mexico City"],
  ["micronesia", "Micronesia", "🇫🇲", "Oceania", "English", "United States Dollar (USD)", "USD", "Palikir"],
  ["moldova", "Moldova", "🇲🇩", "Europe", "Romanian", "Moldovan Leu (MDL)", "MDL", "Chișinău"],
  ["monaco", "Monaco", "🇲🇨", "Europe", "French", "Euro (EUR)", "EUR", "Monaco"],
  ["mongolia", "Mongolia", "🇲🇳", "Asia", "Mongolian", "Mongolian Tögrög (MNT)", "MNT", "Ulaanbaatar"],
  ["montenegro", "Montenegro", "🇲🇪", "Europe", "Montenegrin", "Euro (EUR)", "EUR", "Podgorica"],
  ["morocco", "Morocco", "🇲🇦", "Africa", "Arabic / Tamazight", "Moroccan Dirham (MAD)", "MAD", "Rabat"],
  ["mozambique", "Mozambique", "🇲🇿", "Africa", "Portuguese", "Mozambican Metical (MZN)", "MZN", "Maputo"],
  ["myanmar", "Myanmar", "🇲🇲", "Asia", "Burmese", "Myanmar Kyat (MMK)", "MMK", "Naypyidaw"],
  ["namibia", "Namibia", "🇳🇦", "Africa", "English", "Namibian Dollar (NAD)", "NAD", "Windhoek"],
  ["nauru", "Nauru", "🇳🇷", "Oceania", "Nauruan / English", "Australian Dollar (AUD)", "AUD", "Yaren"],
  ["nepal", "Nepal", "🇳🇵", "Asia", "Nepali", "Nepalese Rupee (NPR)", "NPR", "Kathmandu"],
  ["netherlands", "Netherlands", "🇳🇱", "Europe", "Dutch", "Euro (EUR)", "EUR", "Amsterdam"],
  ["new-zealand", "New Zealand", "🇳🇿", "Oceania", "English / Māori", "New Zealand Dollar (NZD)", "NZD", "Wellington"],
  ["nicaragua", "Nicaragua", "🇳🇮", "North America", "Spanish", "Nicaraguan Córdoba (NIO)", "NIO", "Managua"],
  ["niger", "Niger", "🇳🇪", "Africa", "French", "West African CFA Franc (XOF)", "XOF", "Niamey"],
  ["nigeria", "Nigeria", "🇳🇬", "Africa", "English", "Nigerian Naira (NGN)", "NGN", "Abuja"],
  ["north-korea", "North Korea", "🇰🇵", "Asia", "Korean", "North Korean Won (KPW)", "KPW", "Pyongyang"],
  ["north-macedonia", "North Macedonia", "🇲🇰", "Europe", "Macedonian", "Macedonian Denar (MKD)", "MKD", "Skopje"],
  ["norway", "Norway", "🇳🇴", "Europe", "Norwegian", "Norwegian Krone (NOK)", "NOK", "Oslo"],
  ["oman", "Oman", "🇴🇲", "Asia", "Arabic", "Omani Rial (OMR)", "OMR", "Muscat"],
  ["pakistan", "Pakistan", "🇵🇰", "Asia", "Urdu / English", "Pakistani Rupee (PKR)", "PKR", "Islamabad"],
  ["palau", "Palau", "🇵🇼", "Oceania", "Palauan / English", "United States Dollar (USD)", "USD", "Ngerulmud"],
  ["palestine", "Palestine", "🇵🇸", "Asia", "Arabic", "Israeli New Shekel (ILS)", "ILS", "Ramallah"],
  ["panama", "Panama", "🇵🇦", "North America", "Spanish", "Balboa / United States Dollar (PAB/USD)", "PAB", "Panama City"],
  ["papua-new-guinea", "Papua New Guinea", "🇵🇬", "Oceania", "English / Tok Pisin / Hiri Motu", "Papua New Guinean Kina (PGK)", "PGK", "Port Moresby"],
  ["paraguay", "Paraguay", "🇵🇾", "South America", "Spanish / Guaraní", "Paraguayan Guaraní (PYG)", "PYG", "Asunción"],
  ["peru", "Peru", "🇵🇪", "South America", "Spanish", "Peruvian Sol (PEN)", "PEN", "Lima"],
  ["philippines", "Philippines", "🇵🇭", "Asia", "Filipino / English", "Philippine Peso (PHP)", "PHP", "Manila"],
  ["poland", "Poland", "🇵🇱", "Europe", "Polish", "Polish Złoty (PLN)", "PLN", "Warsaw"],
  ["portugal", "Portugal", "🇵🇹", "Europe", "Portuguese", "Euro (EUR)", "EUR", "Lisbon"],
  ["qatar", "Qatar", "🇶🇦", "Asia", "Arabic", "Qatari Riyal (QAR)", "QAR", "Doha"],
  ["romania", "Romania", "🇷🇴", "Europe", "Romanian", "Romanian Leu (RON)", "RON", "Bucharest"],
  ["russia", "Russia", "🇷🇺", "Europe / Asia", "Russian", "Russian Ruble (RUB)", "RUB", "Moscow"],
  ["rwanda", "Rwanda", "🇷🇼", "Africa", "Kinyarwanda / English / French", "Rwandan Franc (RWF)", "RWF", "Kigali"],
  ["saint-kitts-and-nevis", "Saint Kitts and Nevis", "🇰🇳", "North America", "English", "East Caribbean Dollar (XCD)", "XCD", "Basseterre"],
  ["saint-lucia", "Saint Lucia", "🇱🇨", "North America", "English", "East Caribbean Dollar (XCD)", "XCD", "Castries"],
  ["saint-vincent-and-the-grenadines", "Saint Vincent and the Grenadines", "🇻🇨", "North America", "English", "East Caribbean Dollar (XCD)", "XCD", "Kingstown"],
  ["samoa", "Samoa", "🇼🇸", "Oceania", "Samoan / English", "Samoan Tala (WST)", "WST", "Apia"],
  ["san-marino", "San Marino", "🇸🇲", "Europe", "Italian", "Euro (EUR)", "EUR", "San Marino"],
  ["sao-tome-and-principe", "São Tomé and Príncipe", "🇸🇹", "Africa", "Portuguese", "São Tomé and Príncipe Dobra (STN)", "STN", "São Tomé"],
  ["saudi-arabia", "Saudi Arabia", "🇸🇦", "Asia", "Arabic", "Saudi Riyal (SAR)", "SAR", "Riyadh"],
  ["senegal", "Senegal", "🇸🇳", "Africa", "French", "West African CFA Franc (XOF)", "XOF", "Dakar"],
  ["serbia", "Serbia", "🇷🇸", "Europe", "Serbian", "Serbian Dinar (RSD)", "RSD", "Belgrade"],
  ["seychelles", "Seychelles", "🇸🇨", "Africa", "Seychellois Creole / English / French", "Seychellois Rupee (SCR)", "SCR", "Victoria"],
  ["sierra-leone", "Sierra Leone", "🇸🇱", "Africa", "English", "Sierra Leonean Leone (SLE)", "SLE", "Freetown"],
  ["singapore", "Singapore", "🇸🇬", "Asia", "English / Malay / Mandarin / Tamil", "Singapore Dollar (SGD)", "SGD", "Singapore"],
  ["slovakia", "Slovakia", "🇸🇰", "Europe", "Slovak", "Euro (EUR)", "EUR", "Bratislava"],
  ["slovenia", "Slovenia", "🇸🇮", "Europe", "Slovene", "Euro (EUR)", "EUR", "Ljubljana"],
  ["solomon-islands", "Solomon Islands", "🇸🇧", "Oceania", "English", "Solomon Islands Dollar (SBD)", "SBD", "Honiara"],
  ["somalia", "Somalia", "🇸🇴", "Africa", "Somali / Arabic", "Somali Shilling (SOS)", "SOS", "Mogadishu"],
  ["south-africa", "South Africa", "🇿🇦", "Africa", "Multiple official languages", "South African Rand (ZAR)", "ZAR", "Pretoria"],
  ["south-korea", "South Korea", "🇰🇷", "Asia", "Korean", "South Korean Won (KRW)", "KRW", "Seoul"],
  ["south-sudan", "South Sudan", "🇸🇸", "Africa", "English", "South Sudanese Pound (SSP)", "SSP", "Juba"],
  ["spain", "Spain", "🇪🇸", "Europe", "Spanish", "Euro (EUR)", "EUR", "Madrid"],
  ["sri-lanka", "Sri Lanka", "🇱🇰", "Asia", "Sinhala / Tamil", "Sri Lankan Rupee (LKR)", "LKR", "Sri Jayawardenepura Kotte"],
  ["sudan", "Sudan", "🇸🇩", "Africa", "Arabic / English", "Sudanese Pound (SDG)", "SDG", "Khartoum"],
  ["suriname", "Suriname", "🇸🇷", "South America", "Dutch", "Surinamese Dollar (SRD)", "SRD", "Paramaribo"],
  ["sweden", "Sweden", "🇸🇪", "Europe", "Swedish", "Swedish Krona (SEK)", "SEK", "Stockholm"],
  ["switzerland", "Switzerland", "🇨🇭", "Europe", "German / French / Italian / Romansh", "Swiss Franc (CHF)", "CHF", "Bern"],
  ["syria", "Syria", "🇸🇾", "Asia", "Arabic", "Syrian Pound (SYP)", "SYP", "Damascus"],
  ["tajikistan", "Tajikistan", "🇹🇯", "Asia", "Tajik", "Tajikistani Somoni (TJS)", "TJS", "Dushanbe"],
  ["tanzania", "Tanzania", "🇹🇿", "Africa", "Swahili / English", "Tanzanian Shilling (TZS)", "TZS", "Dodoma"],
  ["thailand", "Thailand", "🇹🇭", "Asia", "Thai", "Thai Baht (THB)", "THB", "Bangkok"],
  ["timor-leste", "Timor-Leste", "🇹🇱", "Asia", "Tetum / Portuguese", "United States Dollar (USD)", "USD", "Dili"],
  ["togo", "Togo", "🇹🇬", "Africa", "French", "West African CFA Franc (XOF)", "XOF", "Lomé"],
  ["tonga", "Tonga", "🇹🇴", "Oceania", "Tongan / English", "Tongan Paʻanga (TOP)", "TOP", "Nukuʻalofa"],
  ["trinidad-and-tobago", "Trinidad and Tobago", "🇹🇹", "North America", "English", "Trinidad and Tobago Dollar (TTD)", "TTD", "Port of Spain"],
  ["tunisia", "Tunisia", "🇹🇳", "Africa", "Arabic", "Tunisian Dinar (TND)", "TND", "Tunis"],
  ["turkey", "Turkey", "🇹🇷", "Asia / Europe", "Turkish", "Turkish Lira (TRY)", "TRY", "Ankara"],
  ["turkmenistan", "Turkmenistan", "🇹🇲", "Asia", "Turkmen", "Turkmenistan Manat (TMT)", "TMT", "Ashgabat"],
  ["tuvalu", "Tuvalu", "🇹🇻", "Oceania", "Tuvaluan / English", "Australian Dollar (AUD)", "AUD", "Funafuti"],
  ["uganda", "Uganda", "🇺🇬", "Africa", "English / Swahili", "Ugandan Shilling (UGX)", "UGX", "Kampala"],
  ["ukraine", "Ukraine", "🇺🇦", "Europe", "Ukrainian", "Ukrainian Hryvnia (UAH)", "UAH", "Kyiv"],
  ["united-arab-emirates", "United Arab Emirates", "🇦🇪", "Asia", "Arabic", "UAE Dirham (AED)", "AED", "Abu Dhabi"],
  ["united-kingdom", "United Kingdom", "🇬🇧", "Europe", "English", "Pound Sterling (GBP)", "GBP", "London"],
  ["united-states", "United States", "🇺🇸", "North America", "English", "United States Dollar (USD)", "USD", "Washington, D.C."],
  ["uruguay", "Uruguay", "🇺🇾", "South America", "Spanish", "Uruguayan Peso (UYU)", "UYU", "Montevideo"],
  ["uzbekistan", "Uzbekistan", "🇺🇿", "Asia", "Uzbek", "Uzbekistani Som (UZS)", "UZS", "Tashkent"],
  ["vanuatu", "Vanuatu", "🇻🇺", "Oceania", "Bislama / English / French", "Vanuatu Vatu (VUV)", "VUV", "Port Vila"],
  ["vatican-city", "Vatican City", "🇻🇦", "Europe", "Italian / Latin", "Euro (EUR)", "EUR", "Vatican City"],
  ["venezuela", "Venezuela", "🇻🇪", "South America", "Spanish", "Venezuelan Bolívar (VES)", "VES", "Caracas"],
  ["vietnam", "Vietnam", "🇻🇳", "Asia", "Vietnamese", "Vietnamese Đồng (VND)", "VND", "Hanoi"],
  ["yemen", "Yemen", "🇾🇪", "Asia", "Arabic", "Yemeni Rial (YER)", "YER", "Sana'a"],
  ["zambia", "Zambia", "🇿🇲", "Africa", "English", "Zambian Kwacha (ZMW)", "ZMW", "Lusaka"],
  ["zimbabwe", "Zimbabwe", "🇿🇼", "Africa", "English / Shona / Ndebele", "Zimbabwe Gold (ZWG)", "ZWG", "Harare"],
];

const regionProfiles = {
  Europe: { cost: "high", difficulty: "medium", quality: 84, safety: 82, english: 66, budget: 2200 },
  Asia: { cost: "medium", difficulty: "hard", quality: 72, safety: 69, english: 48, budget: 1400 },
  "Asia / Europe": { cost: "medium", difficulty: "medium", quality: 72, safety: 67, english: 48, budget: 1300 },
  "Europe / Asia": { cost: "medium", difficulty: "hard", quality: 70, safety: 65, english: 45, budget: 1350 },
  Africa: { cost: "low", difficulty: "medium", quality: 60, safety: 56, english: 48, budget: 900 },
  "Africa / Middle East": { cost: "low", difficulty: "medium", quality: 64, safety: 62, english: 50, budget: 1000 },
  "North America": { cost: "medium", difficulty: "medium", quality: 76, safety: 70, english: 72, budget: 1900 },
  "South America": { cost: "medium", difficulty: "medium", quality: 68, safety: 61, english: 43, budget: 1100 },
  Oceania: { cost: "high", difficulty: "medium", quality: 80, safety: 78, english: 75, budget: 2300 },
};

const overrides = {
  japan: { cost: "high", difficulty: "hard", quality: 92, safety: 94, english: 55, budget: 180000, score: 91 },
  brazil: { cost: "medium", difficulty: "medium", quality: 74, safety: 58, english: 48, budget: 3500, score: 80 },
  egypt: { cost: "low", difficulty: "medium", quality: 68, safety: 64, english: 52, budget: 12000, score: 76 },
  "united-states": { cost: "high", difficulty: "medium", quality: 86, safety: 70, english: 95, budget: 2800, score: 90 },
  canada: { cost: "high", difficulty: "medium", quality: 89, safety: 88, english: 92, budget: 2600, score: 91 },
  australia: { cost: "high", difficulty: "medium", quality: 88, safety: 86, english: 94, budget: 2800, score: 90 },
  germany: { cost: "high", difficulty: "medium", quality: 88, safety: 84, english: 76, budget: 2300, score: 89 },
  portugal: { cost: "medium", difficulty: "easy", quality: 82, safety: 85, english: 68, budget: 1600, score: 88 },
  spain: { cost: "medium", difficulty: "easy", quality: 84, safety: 82, english: 62, budget: 1700, score: 87 },
  france: { cost: "high", difficulty: "medium", quality: 86, safety: 76, english: 60, budget: 2300, score: 86 },
  "united-kingdom": { cost: "high", difficulty: "medium", quality: 85, safety: 78, english: 96, budget: 2700, score: 88 },
  singapore: { cost: "high", difficulty: "medium", quality: 90, safety: 95, english: 90, budget: 3000, score: 92 },
  "new-zealand": { cost: "high", difficulty: "medium", quality: 88, safety: 90, english: 94, budget: 2600, score: 90 },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createStableVariation(slug) {
  return slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % 17;
}

function detectMainGoal(region, language) {
  if (region.includes("Europe")) return "Study and live abroad";
  if (region.includes("North America")) return "Work and mobility";
  if (region.includes("Asia")) return "Work, culture and adaptation";
  if (region.includes("Oceania")) return "Study, work and lifestyle";
  if (language.includes("Portuguese")) return "Language and cultural integration";
  return "Cultural learning";
}

function detectIdealFor(region, language) {
  const goals = new Set(["travel", "cultural"]);

  if (region.includes("Europe") || region.includes("North America") || region.includes("Oceania")) {
    goals.add("study");
    goals.add("work");
    goals.add("live");
  }

  if (region.includes("Asia")) {
    goals.add("work");
    goals.add("study");
  }

  if (language.includes("Portuguese") || language.includes("English") || language.includes("Spanish")) {
    goals.add("live");
    goals.add("work");
  }

  return Array.from(goals);
}

function createCountry(row) {
  const [slug, name, emoji, region, language, currency, currencyCode, capital] = row;
  const base = regionProfiles[region] || regionProfiles.Asia;
  const variation = createStableVariation(slug);
  const custom = overrides[slug] || {};

  const costLevel = custom.cost || base.cost;
  const difficulty = custom.difficulty || base.difficulty;

  const qualityOfLifeScore = custom.quality ?? clamp(base.quality + variation - 8, 35, 96);
  const safetyScore = custom.safety ?? clamp(base.safety + variation - 8, 30, 96);
  const englishFriendliness = custom.english ?? clamp(base.english + variation - 8, 20, 96);
  const averageMonthlyBudget = custom.budget ?? Math.round((base.budget + variation * 35) / 50) * 50;

  const tgpiScore =
    custom.score ??
    clamp(
      Math.round(
        qualityOfLifeScore * 0.34 +
          safetyScore * 0.26 +
          englishFriendliness * 0.16 +
          (costLevel === "low" ? 14 : costLevel === "medium" ? 10 : 6) +
          (difficulty === "easy" ? 10 : difficulty === "medium" ? 7 : 4),
      ),
      42,
      94,
    );

  const mainGoal = detectMainGoal(region, language);
  const idealFor = detectIdealFor(region, language);

  return {
    slug,
    name,
    emoji,
    region,
    language,
    currency,
    currencyCode,
    capital,
    mainGoal,
    shortDescription: `${language} access, ${region} context, cost profile, adaptation signals, and TGPI readiness for international decisions.`,
    longDescription: `Build readiness for ${name} through language awareness, cultural intelligence, cost planning, mobility context, and the practical decisions required to live, study, work or travel with more clarity.`,
    tags: Array.from(new Set([language.split("/")[0].trim(), region, mainGoal, currencyCode])),
    costOfLife: [
      { label: "Coffee", amount: Math.max(1, Math.round(averageMonthlyBudget * 0.003)) },
      { label: "Local Transport Ticket", amount: Math.max(1, Math.round(averageMonthlyBudget * 0.004)) },
      { label: "Casual Meal", amount: Math.max(4, Math.round(averageMonthlyBudget * 0.018)) },
      { label: "Monthly Mobile Plan", amount: Math.max(8, Math.round(averageMonthlyBudget * 0.035)) },
      { label: "Shared Rent Estimate", amount: Math.max(120, Math.round(averageMonthlyBudget * 0.45)) },
      { label: "Estimated Monthly Budget", amount: averageMonthlyBudget },
    ],
    costLevel,
    difficulty,
    tgpiScore,
    idealFor,
    intelligence: {
      summary: `${name} is a ${costLevel}-cost ${region} country for people evaluating international life with attention to language, safety, culture, cost and long-term adaptability.`,
      strengths: [
        `${language} creates a clear language and integration profile.`,
        `${capital} works as the main reference point for national orientation and mobility planning.`,
        `TGPI score ${tgpiScore}/100 indicates the current strategic readiness signal for comparison.`,
      ],
      warnings: [
        "Costs, salaries, visa rules and safety conditions can vary by city and over time.",
        "Do not choose a country only by aesthetics, tourism content or isolated opinions.",
        "Validate official immigration, legal, tax and financial information before making decisions.",
      ],
      bestFor: [
        "People comparing countries strategically",
        "Students and professionals planning international options",
        "Travelers who want more than surface-level tourism",
      ],
      immigrationDifficulty: difficulty,
      qualityOfLifeScore,
      englishFriendliness,
      safetyScore,
      averageMonthlyBudget,
    },
  };
}

const generatedCountries = countries.map(createCountry);

const output = `export type CostItem = {
  label: string;
  amount: number;
};

export type CountryGoal = "work" | "study" | "live" | "travel" | "cultural";

export type CountryCostLevel = "low" | "medium" | "high";
export type CountryDifficulty = "easy" | "medium" | "hard";

export type CountryIntelligence = {
  summary: string;
  strengths: string[];
  warnings: string[];
  bestFor: string[];
  immigrationDifficulty: CountryDifficulty;
  qualityOfLifeScore: number;
  englishFriendliness: number;
  safetyScore: number;
  averageMonthlyBudget: number;
};

export type Country = {
  slug: string;
  name: string;
  emoji: string;
  region: string;
  language: string;
  currency: string;
  currencyCode: string;
  capital: string;
  mainGoal: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  costOfLife: CostItem[];
  costLevel: CountryCostLevel;
  difficulty: CountryDifficulty;
  tgpiScore: number;
  idealFor: CountryGoal[];
  intelligence: CountryIntelligence;
};

export const countries: Country[] = ${JSON.stringify(generatedCountries, null, 2)};

export function getCountryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug);
}

export function getCountrySlugs() {
  return countries.map((country) => country.slug);
}
`;

const targetPath = path.join(process.cwd(), "src", "data", "countries.ts");

fs.writeFileSync(targetPath, output, "utf8");

console.log(`Generated ${generatedCountries.length} countries at ${targetPath}`);

if (generatedCountries.length !== 195) {
  console.error(`Expected 195 countries, got ${generatedCountries.length}`);
  process.exit(1);
}