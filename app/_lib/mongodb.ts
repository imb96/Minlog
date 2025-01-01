import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

// 전역 타입 선언
declare global {
  var mongoose: { conn: any; promise: any } | undefined;
}

// 캐시된 연결 관리
let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  // 이미 연결된 경우 재사용
  if (cached.conn) {
    return cached.conn;
  }

  // 새로운 연결 생성
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  // 연결 완료 대기 후 반환
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;