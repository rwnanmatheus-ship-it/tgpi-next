// This namespace inherits the deployed recursive deny rules of tgpiLearningUsers.
export const notificationRoot = "tgpiLearningUsers/_notifications";
export const notificationUserPath = (uid: string) =>
  `${notificationRoot}/users/${uid}`;
export const notificationItemPath = (uid: string, id: string) =>
  `${notificationUserPath(uid)}/inbox/${id}`;
export const notificationJobPath = (id: string) =>
  `${notificationRoot}/pushJobs/${id}`;
