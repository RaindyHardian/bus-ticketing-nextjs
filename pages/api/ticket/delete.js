import db from "../../../db/config"

async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      await db.query(`UPDATE ticket SET active=0 WHERE ticket_id=${req.body.ticket_id}`);
      return res
        .status(200)
        .json({ success: 1, message: "Ticket deleted successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: 0, message: "Error, can't delete ticket" });
    }
  }
}

export default handler;
