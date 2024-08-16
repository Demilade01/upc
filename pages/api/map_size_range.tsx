import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("upcoming_wipes");
    const serversCollection = db.collection("servers");
    const today = new Date();

    const minMaxValues = await serversCollection.aggregate([
      {
        $match: {
          next_wipe: { $gt: today }
        }
      },
      {
        $group: {
          _id: null,
          minSize: { $min: "$world_size" },
          maxSize: { $max: "$world_size" },
        },
      },
    ]).toArray();

    if (!minMaxValues.length) {
      return res.status(404).json({ status: "error", message: "No data found" });
    }

    let { minSize, maxSize } = minMaxValues[0];

    // Adjust minSize and maxSize to be multiples of 1000
    minSize = Math.floor(minSize / 1000) * 1000;
    maxSize = Math.ceil(maxSize / 1000) * 1000;

    // Ensure there are at least 5 marks by adjusting minSize and maxSize
    while ((maxSize - minSize) / 1000 < 4) {
      if (minSize > 0) {
        minSize -= 1000;
      }
      maxSize += 1000;
    }

    // Calculate the step and ensure there are 5 marks
    const step = 1000;
    const marks = [];
    for (let i = 0; i < 5; i++) {
      marks.push({ value: minSize + i * step, label: (minSize + i * step).toString() });
    }

    return res.status(200).json({
      status: "success",
      data: { minSize, maxSize, marks, step },
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: (error instanceof Error ? error.message : "Unknown error") });
  }
}
