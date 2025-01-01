import { NextResponse } from 'next/server'

import connectDB from '@/app/_lib/mongodb'
import Post from '@/app/_models/Post'

// 게시글 목록 가져오기
export async function GET() {
  try {
    await connectDB()
    const posts = await Post.find({}).sort({ createdAt: -1 }) // 최신순 정렬
    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json(
      { error: '게시글을 가져오는데 실패했습니다' },
      { status: 500 },
    )
  }
}

// 새 게시글 작성하기
export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()

    const newPost = await Post.create({
      title: body.title,
      content: body.content,
      author: body.author,
    })

    return NextResponse.json(
      { message: '게시글이 생성되었습니다', post: newPost },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: '게시글 작성에 실패했습니다' },
      { status: 500 },
    )
  }
}
