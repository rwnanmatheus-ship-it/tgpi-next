import { getCourseProgressStatus, getDocumentReviewStatus, type TgpiActivationProgress } from "./activation-progress";

export function getGlobalRankSignals(activation: TgpiActivationProgress) {
  return {
    comparisons: activation.comparisons.length,
    documentReviews: Object.values(activation.documentReviews).filter(item => getDocumentReviewStatus(item) === "completed").length,
    learningPaths: Object.values(activation.courseProgress).filter(item => getCourseProgressStatus(item) === "completed").length,
    savedCountries: activation.savedCountries.length,
  };
}
