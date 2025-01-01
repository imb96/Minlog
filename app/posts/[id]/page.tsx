import { notFound } from 'next/navigation';
import connectDB from '@/app/_lib/mongodb';
import Post from '@/app/_models/Post';

// 게시글 상세 페이지
async function PostPage({ params }: { params: { id: string } }) {
  await connectDB();
  const { id } = await params;
  
  try {
    const post = await Post.findById(id);
    
    if (!post) {
      return notFound();
    }

    return (
      <article className="max-w-4xl mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
        </div>
        
        <div className="prose max-w-none">
          {post.content}
        </div>
      </article>
    );
  } catch (error) {
    return notFound();
  }
}

export default PostPage;