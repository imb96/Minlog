import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({ user }) {
      return user.email === process.env.ALLOWED_EMAIL;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  }
});

export { handler as GET, handler as POST };