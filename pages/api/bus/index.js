import db from "../../../db/config";

async function handler(req, res) {
  try {
    let data = await db.query(
      `SELECT * FROM bus WHERE active=1 ORDER BY bus_id DESC;`,
      {
        type: db.QueryTypes.SELECT,
      }
    );

    res.status(200).json({
      success: 1,
      ticketdata: data,
      dataLength: data.length,
      // perPage: perPage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: 0, message: "Failed getting data" });
  }
}

export default handler;
