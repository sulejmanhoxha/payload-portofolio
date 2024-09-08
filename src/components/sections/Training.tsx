const training = [
  {
    title: 'Development of backend web applications with Django',
    date: 'Nov 2022 — Aug 2023',
    institution: 'DevelopersLab',
  },
  {
    title: 'Basics of web development with React',
    date: 'Jan 2023 — Aug 2023',
    institution: 'ICT Cortex Academia',
  },
  {
    title: 'FrontEnd Web Development with React',
    date: 'Feb 2024 — Present',
    institution: 'DevelopersLab',
  },
  {
    title: 'Backend Web development with NodeJS',
    date: 'Feb 2024 — Present',
    institution: 'ICT Cortex Academia',
  },
]

type Training = {
  title: string
  date: string
  institution: string
}
export default function TrainingSection() {
  return (
    <section className="my-16">
      <h2 className="mb-4 text-lg font-medium">Training</h2>
      <ol className="relative ml-1 border-s border-muted/30">
        {training.map((training, index) => (
          <TrainingItem key={index} training={training} />
        ))}
      </ol>
    </section>
  )
}

const TrainingItem = ({ training }: { training: Training }) => {
  return (
    <li className="mb-10 ms-4">
      <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-border bg-primary" />
      <div className="font-medium text-foreground">{training.title}</div>
      <div className="text-sm font-normal text-muted/75">{training.date}</div>
      <div className="mb-4 text-sm font-normal text-muted/75">{training.institution}</div>
    </li>
  )
}
