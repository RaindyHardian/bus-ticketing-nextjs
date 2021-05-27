import db from "../../../db/config";

async function handler(req, res) {
  const user_id = req.query.userId;
  try {
    let data = await db.query(
      "SELECT user_id, name, email, created_at, updated_at, user.user_role_id, user_role.type as role FROM user JOIN user_role ON (user.user_role_id=user_role.user_role_id) WHERE user.user_id=:user_id ORDER BY user_id DESC;",
      {
        replacements: {
          user_id: user_id,
        },
        type: db.QueryTypes.SELECT,
      }
    );

    let ticketData = await db.query(
      "SELECT ticket.*, trip.*, seat.* from ticket JOIN user ON (ticket.user_id=user.user_id) JOIN trip ON (trip.trip_id=ticket.trip_id) JOIN seat ON (ticket.seat_id=seat.seat_id) WHERE ticket.active=1 AND ticket.user_id=:user_id",
      {
        replacements: {
          user_id: user_id,
        },
        type: db.QueryTypes.SELECT,
      }
    );
    return res.status(200).json({ success: 1, user: data[0], ticket: ticketData });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ success: 0, message: "Error, getting user failed" });
  }
}
export default handler;
