import { getServerSession } from 'next-auth'
import Link from 'next/link'

import AuthButton from '@/app/components/AuthButton'
import PostList from '@/app/components/PostList'

export default async function Home() {
  const session = await getServerSession()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <PostList />
      {session && (
        <Link
          href="/posts/write"
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg"
        >
          ✍️ 글쓰기
        </Link>
      )}
    </main>
  )
}
