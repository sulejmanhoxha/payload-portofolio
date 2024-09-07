import { Badge } from "@/components/ui/badge";

const skills = [
  {
    category: "HTML & CSS",
    technologies: ["HTML", "CSS", "Tailwind CSS", "Bootstrap"],
    colorClass: "text-blue-900 dark:text-blue-400",
  },
  {
    category: "JavaScript & Related",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "NextJS",
      "Axios",
      "Zod",
      "React Hook Form",
      "Redux",
      "React Query",
      "Shadcn/ui",
      "Framer Motion",
      "NodeJS",
      "Express",
    ],
    colorClass: "text-yellow-900 dark:text-yellow-400",
  },
  {
    category: "Java & Related",
    technologies: ["Java", "Android", "JavaFX", "Java Swing"],
    colorClass: "text-red-900 dark:text-red-400",
  },
  {
    category: "Python & Related",
    technologies: [
      "Python",
      "Django",
      "Django Rest Framework",
      "Numpy",
      "Beautiful Soup",
    ],
    colorClass: "text-green-900 dark:text-green-400",
  },
  {
    category: "Databases",
    technologies: ["SQL", "MySQL", "SQLite", "MongoDB", "PostgreSQL"],
    colorClass: "text-indigo-900 dark:text-indigo-400",
  },
  {
    category: "Cloud Services",
    technologies: ["AWS", "EC2", "S3", "Nginx", "Vercel", "Netlify"],
    colorClass: "text-orange-900 dark:text-orange-400",
  },
  {
    category: "PHP & Related",
    technologies: ["WordPress", "LAMP"],
    colorClass: "text-purple-900 dark:text-purple-400",
  },
  {
    category: "Other Technologies",
    technologies: ["XML", "JSON", "XSLT", "UML", "Postman"],
    colorClass: "text-gray-900 dark:text-gray-400",
  },
];

export default function SkillsSection() {
  return (
    <section className="my-16">
      <h2 className="mb-4 text-lg font-medium">Skills</h2>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, categoryIndex) =>
          skill.technologies.map((tech, techIndex) => (
            <Badge
              key={`${categoryIndex}-${techIndex}`}
              className={skill.colorClass}
            >
              {tech}
            </Badge>
          )),
        )}
      </div>
    </section>
  );
}
