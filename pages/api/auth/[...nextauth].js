import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import db from "../../../db/config";

export default NextAuth({
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;

        if (email == "" || password == "") {
          return res.status(400).json({
            errors: [{ msg: "Please fill all the credentials" }],
          });
        }
        // check email and password on the db
        const user = await db.query("SELECT * FROM user WHERE email=:email", {
          replacements: {
            email: email,
          },
          type: db.QueryTypes.SELECT,
        });

        if (user.length == 0) {
          throw new Error("User not found");
        }

        if (user[0].password !== credentials.password) {
          throw new Error("Could not log you in");
        }

        const name = user[0].name;

        const role = user[0].user_role_id;
        const user_id = user[0].user_id;

        const userJwt = {
          name: name,
          email: email,
          role: role,
          user_id: user_id,
        };
        
        return userJwt;
      },
    }),
  ],
  callbacks: {
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      // if (account?.accessToken) {
      //   token.accessToken = account.accessToken;
      // }
      // return token;
      user && (token.user = user);
      return Promise.resolve(token);
    },
    async session(session, user, sessionToken) {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
});
