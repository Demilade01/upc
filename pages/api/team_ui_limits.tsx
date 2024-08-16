import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("upcoming_wipes");
    const serversCollection = db.collection("servers");

    // Fetch distinct team UI limits excluding any unknown values
    const rawLimits = await serversCollection.distinct("team_ui_limit", { team_ui_limit: { $ne: "Unknown" } });

    if (!rawLimits.length) {
      return res.status(404).json({ status: "error", message: "No team UI limits found" });
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
  } catch (error: any) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}
