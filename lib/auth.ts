import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authoptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },
      async authorize(credentials: any) {
        return {
          id: 'user1',
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope:
            'openid email profile https://www.googleapis.com/auth/gmail.readonly',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.email = profile.email;
      }
      token.id = token.sub;
      /* token
      {
  name: 'Thrishank 98',
  email: 'thrishankkalluru16@gmail.com',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocLN8hVLdW3TOvAKgVanA8n92RCbWHBfT5u756JeDCVzI-5I4Q=s96-c',
  sub: '118179294646479043616',
  accessToken: 'ya29.a0AXooCgtNdm3kEmwlhj59A7L2Hfb10YzXJoULYFuin802VZz9_oWV6g4uG5oz2rmqG_2fBdoV9jnQfWKxOJkROIe7CcA9zk9bgcOFvhJ-IKE3u9KzaDhhWBx4sQh21R3-Mk4ShaC8vVAOC7Zli5XE11uZIXwjEmhotgaCgYKAVgSARISFQHGX2MidhVIxSRaSzzQgcOw-JQOvg0169',
  iat: 1717659764,
  exp: 1720251764,
  jti: '24aa080f-63a9-45ca-a9a2-1068dce679d3',
  id: '118179294646479043616'
}
      */

      return token;
    },
    async session({ session, token }: any) {
      session.user.email = token.email;
      session.user.account = token.access_token;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};
