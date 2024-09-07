export default function ProjectViewPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>Project View Page for project {id}</h1>
    </div>
  );
}
