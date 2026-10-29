import { aiWorkCourseDraft } from "./ai";
import { careerEnglishDraft } from "./english";
import { spreadsheetsDraft } from "./spreadsheets";
import { internationalCareerDraft } from "./career";
import { dataAnalysisDraft } from "./data-analysis";
import { projectManagementDraft } from "./projects";
import { marketingDraft } from "./marketing";
import { digitalSecurityDraft } from "./security";
import { pythonAutomationDraft } from "./python";
import { interculturalCommunicationDraft } from "./communication";

/** Authoring only: importing this registry never makes a course commercially available. */
export const professionalCourseDrafts = [
  aiWorkCourseDraft, careerEnglishDraft, spreadsheetsDraft, internationalCareerDraft,
  dataAnalysisDraft, projectManagementDraft, marketingDraft, digitalSecurityDraft,
  pythonAutomationDraft, interculturalCommunicationDraft,
];
