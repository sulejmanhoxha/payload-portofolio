import { Metadata } from "next";
import EducationSection from "@/components/sections/Education";
import TrainingSection from "@/components/sections/Training";
import SkillsSection from "@/components/sections/Skills";
import AboutMeSection from "@/components/sections/AboutMe";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about Sulejman Hoxha.",
};

export default function Page() {
  return (
    <>
      <AboutMeSection />
      <EducationSection />
      <TrainingSection />
      <SkillsSection />
    </>
  );
}
