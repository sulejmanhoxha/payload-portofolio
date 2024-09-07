'use client'
import { formatDate } from '@/utils/formatDate'
import { useRouter } from 'next/navigation'

export const BlogCard = ({
  title,
  date,
  description,
  id,
}: {
  title: string
  date: string
  description: string
  id: string
}) => {
  const router = useRouter()
  return (
    <div
      className="rounded-md bg-secondary p-4 text-foreground transition hover:-translate-y-1.5 hover:cursor-pointer"
      onClick={() => router.push(`/blogs/${id}`)}
    >
      <h2 className="mb-1 text-lg font-medium">{title}</h2>
      <p className="mb-2 text-xs text-muted">{formatDate(date)}</p>
      <p className="line-clamp-2 text-sm text-muted">{description}</p>
    </div>
  )
}
