import db from "../../../../db/config/";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await db.query(`UPDATE bus SET active=0 WHERE bus_id=${req.body.bus_id}`);
      return res
        .status(200)
        .json({ success: 1, message: "Bus deleted successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: 0, message: "Error, can't delete bus" });
    }
  }
}

export default handler;
