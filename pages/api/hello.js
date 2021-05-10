// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "../../db/config";

export default async (req, res) => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  // res.status(200).json({ name: 'John Doe' })
  try {
    const busdata = await db.query("SELECT * FROM bus WHERE active=1", {
      type: db.QueryTypes.SELECT,
    });
    res.status(200).json({ busdata: busdata, success: 1 });
  } catch (err) {
    console.log(err);
    res.json({ error: 1 });
  }
};
