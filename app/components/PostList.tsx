'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('게시글을 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : '에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (posts.length === 0) return <div>게시글이 없습니다.</div>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article 
          key={post._id} 
          className="border rounded-lg p-6 hover:shadow-lg transition"
        >
          <Link href={`/posts/${post._id}`}>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">
              {post.content.substring(0, 200)}...
            </p>
            <div className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
              <span className="mx-2">•</span>
              {post.author}
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}