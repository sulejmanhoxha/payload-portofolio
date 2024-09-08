import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const rootDirectory = path.join(process.cwd(), 'src', 'content', 'blogs')

export async function getAllBlogs() {}

export type Blog = {
  metadata: BlogMetadata
  content: string
}

export type BlogMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    console.log(`Fetching blog for slug: ${slug}`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    return { metadata: { ...data, slug }, content }
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getBlogs(limit?: number): Promise<BlogMetadata[]> {
  const files = fs.readdirSync(rootDirectory)

  const posts = files
    .map((file) => getBlogMetadata(file))
    .sort((a, b) => {
      if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
        return 1
      } else {
        return -1
      }
    })

  if (limit) {
    return posts.slice(0, limit)
  }

  return posts
}

export function getBlogMetadata(filepath: string): BlogMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data } = matter(fileContent)
  return { ...data, slug }
}
