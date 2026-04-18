export function generateCertificate(userName: string, course: string) {
  return {
    title: "TGPI Certificate",
    name: userName,
    course,
    date: new Date().toLocaleDateString(),
  };
}