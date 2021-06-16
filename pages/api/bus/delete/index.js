import db from "../../../../db/config/";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (session == null) {
      return res.status(500).json({ message: "user not logged in" });
    }

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
