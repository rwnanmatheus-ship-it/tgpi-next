export const tgpiClerkAppearance = {
  variables: {
    colorPrimary: "#0B1F3A",
    colorBackground: "#FFFDF8",
    colorInputBackground: "#FFFFFF",
    colorInputText: "#0B1F3A",
    colorText: "#0B1F3A",
    colorTextSecondary: "#5E6878",
    colorDanger: "#A32626",
    borderRadius: "0.9rem",
    fontFamily: "var(--tgpi-font-sans)",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "w-full border-0 bg-transparent p-0 shadow-none",
    headerTitle:
      "font-[var(--tgpi-font-display)] text-[2.3rem] font-semibold tracking-[-0.035em] text-[#0B1F3A]",
    headerSubtitle: "mt-2 text-sm leading-6 text-[#667085]",
    socialButtonsBlockButton:
      "min-h-12 border-[#D8D2C4] bg-white font-bold text-[#0B1F3A] shadow-none hover:bg-[#F8F5EE]",
    socialButtonsBlockButtonText: "font-bold text-[#0B1F3A]",
    dividerLine: "bg-[#DED8CA]",
    dividerText: "text-xs font-bold uppercase tracking-[0.14em] text-[#7A8390]",
    formFieldLabel: "text-sm font-bold text-[#0B1F3A]",
    formFieldInput:
      "min-h-12 border-[#D8D2C4] bg-white text-[#0B1F3A] shadow-none focus:border-[#B58A2A] focus:ring-[#B58A2A]/15",
    formButtonPrimary:
      "min-h-12 bg-[#0B1F3A] font-extrabold text-white shadow-[0_14px_34px_rgba(11,31,58,0.16)] hover:bg-[#173554]",
    footerActionLink: "font-extrabold text-[#956A13] hover:text-[#B58A2A]",
    identityPreviewEditButton: "text-[#956A13]",
    formResendCodeLink: "font-bold text-[#956A13]",
    otpCodeFieldInput: "border-[#D8D2C4] text-[#0B1F3A]",
    alertText: "text-sm",
  },
} as const;
