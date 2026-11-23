import CourseDirectory, { directoryMetadata } from "@/components/courses/CourseDirectory";
export const generateMetadata = () => directoryMetadata(1);
export default function Page() { return <CourseDirectory page={1} />; }
