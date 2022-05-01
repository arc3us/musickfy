import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { refreshAccessToken } from "spotify-web-api-node/src/server-methods";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // Convert seconds to milliseconds and add to current time
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // If refresh token is not returned, keep the old one
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "Refresh token failed",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],

  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, account, user }) {
      //initial sign in
      if (account && user) {
        //sign in
        return {
          token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      //Return previous token if access token is still valid
      if (Date.now() < accessTokenExpires) {
        console.log("Token valid");
        return token;
      }

      //Refresh token
      console.log("Token expired, refreshing");
      return await refreshAccessToken(token);
    },

    async session({ token, session }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
