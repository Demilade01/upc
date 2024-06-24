import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("upcoming_wipes");
    const serversCollection = db.collection("servers");

    // Fetch distinct group limits excluding any unknown values
    const rawLimits = await serversCollection.distinct("group_limit", { group_limit: { $ne: "Unknown" } });

    if (!rawLimits.length) {
      return res.status(404).json({ status: "error", message: "No team limits found" });
    }

    // Categorize limits
    const categorizedLimits = rawLimits.reduce((acc, limit) => {
      if (limit >= 1 && limit <= 12) {
        acc.limited.push(limit);
      } else {
        acc.noLimit = true;
      }
      return acc;
    }, { limited: [], noLimit: false });

    const responseLimits = categorizedLimits.limited;
    if (categorizedLimits.noLimit) {
      responseLimits.push('No limit');
    }

    return res.status(200).json({
      status: "success",
      data: responseLimits,
    });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
}
