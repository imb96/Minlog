'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function WritePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [content])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          author: '김민재',
        }),
      })

      if (response.ok) {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">새 글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
          >
            {isPreview ? '수정하기' : '미리보기'}
          </button>

          {isPreview ? (
            <div className="border rounded p-4 prose prose-lg dark:prose-invert min-h-[400px] w-full max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="마크다운으로 내용을 입력하세요"
              className="w-full p-4 border rounded min-h-[400px] font-mono overflow-hidden resize-none"
              required
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          게시하기
        </button>
      </form>
    </div>
  )
}
