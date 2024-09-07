import { BookOpenText } from "lucide-react";

export default function EducationSection() {
  return (
    <section className="my-16">
      <h2 className="mb-4 text-lg font-medium">Education</h2>
      <div className="flex items-center gap-4">
        <BookOpenText className="size-6 text-muted/75" />
        <div>
          <p className="text-base font-medium">
            Bachelors in Information Systems and Technology
          </p>
          <p className="text-sm text-muted/75">University of Donja Gorica</p>
          {/* <a
          href="#"
          className="relative block w-fit text-sm text-muted/75 after:absolute after:block after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-muted after:transition after:duration-300 after:content-[''] after:hover:scale-x-100"
        >
          University of Donja Gorica
        </a> */}
        </div>
      </div>
    </section>
  );
}
