import mongoose, { Schema } from 'mongoose';

interface Post {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

// Schema 정의
const PostSchema = new Schema<Post>({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now
  }
});

// 모델 생성 및 내보내기
export default mongoose.models.Post || mongoose.model<Post>('Post', PostSchema);