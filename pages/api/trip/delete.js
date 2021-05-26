import db from "../../../db/config"

async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      await db.query(`UPDATE trip SET active=0 WHERE trip_id=${req.body.trip_id}`);
      return res
        .status(200)
        .json({ success: 1, message: "Trip deleted successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: 0, message: "Error, can't delete trip" });
    }
  }
}

export default handler;
