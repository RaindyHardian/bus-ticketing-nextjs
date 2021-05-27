import db from "../../../db/config";
async function handler(req, res) {
  try {
    let data = await db.query(
      "SELECT user_id, name, email, created_at, updated_at, user.user_role_id, user_role.type as role FROM user JOIN user_role ON (user.user_role_id=user_role.user_role_id) ORDER BY user_id DESC;",
      {
        type: db.QueryTypes.SELECT,
      }
    );
    return res.status(200).json({ success: 1, user: data });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ success: 0, message: "Error, getting user failed" });
  }
}
export default handler;
