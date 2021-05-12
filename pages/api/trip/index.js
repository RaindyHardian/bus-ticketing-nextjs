import db from "../../../db/config";

async function handler(req, res) {
  try {
    const startFilter = req.query.from ? req.query.from : "";
    const destinationFilter = req.query.to
      ? req.query.to
      : "";
    const trip_dateFilter = req.query.trip_date
      ? req.query.trip_date
      : "trip_date";

    let data = await db.query(
      `SELECT * FROM trip JOIN bus ON (trip.bus_id = bus.bus_id)  WHERE start LIKE :start AND destination LIKE :destination AND trip_date=${trip_dateFilter} ORDER BY trip_id DESC;`,
      {
        replacements: {
          start: "%" + startFilter + "%",
          destination: "%" + destinationFilter + "%",
        },
        type: db.QueryTypes.SELECT,
      }
    );
    
    let currentPage = req.query.page;
    if (currentPage === undefined || currentPage === "") {
      currentPage = 1;
    }
    let perPage = 20;
    let lastIdx = currentPage * perPage;
    let firstIdx = lastIdx - perPage;
    let finalData = data.slice(firstIdx, lastIdx);

    res.json({
      trip: finalData,
      dataLength: data.length,
      perPage: perPage,
    });

  } catch (err) {
    console.log(err);
    res.json({ error: 1 });
  }
}

export default handler;
