import db from "../../../db/config";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { name, email, password, password2 } = req.body;

  // check if user exist in the db
  const users = await db.query("SELECT * FROM user WHERE email=:email", {
    replacements: {
      email: email,
    },
    type: db.QueryTypes.SELECT,
  });

  if (users.length != 0) {
    // if there's already a user registered with same email
    return res.status(422).json({
      message: "Email already registered",
    });
  }

  if (password != password2) {
    return res.status(422).json({
      message: "Password not match",
    });
  }

  const insert = await db.query(
    "INSERT INTO user(name,email, password, user_role_id) VALUES (:name,:email,:password, :user_role_id);",
    {
      replacements: {
        name: name,
        email: email,
        password: password,
        user_role_id: 1,
      },
      type: db.QueryTypes.INSERT,
    }
  );

  return res
    .status(201)
    .json({ message: "Account registered successfully", insert });
}
