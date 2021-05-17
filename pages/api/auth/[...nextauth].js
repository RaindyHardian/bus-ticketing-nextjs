import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import db from "../../../db/config";

export default NextAuth({
  session: {
    jwt: true,
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

        return { name, email, role, user_id };
      },
    }),
  ],
});
