import AuthButton from '@/app/components/AuthButton';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import PostList from '@/app/components/PostList';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Blog</h1>
        <AuthButton />
      </div>
      
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
  );
}