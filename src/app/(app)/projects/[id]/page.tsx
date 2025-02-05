type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ProjectViewPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const id = slug.split('/')[1]
  return (
    <div>
      <h1>Project View Page for project {id}</h1>
    </div>
  )
}
