import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ status: "error", message: "Invalid server ID" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("upcoming_wipes");
    const serversCollection = db.collection("servers");

    const server = await serversCollection.findOne(
        { _id: new ObjectId(id) },
        {
          projection: {
            address: 1,
            ip: 1,
            port: 1,
            name: 1,
            rank: 1,
            tags: 1,
            website_url: 1,
            world_size: 1,
            description: 1,
            group_limit: 1,
            team_ui_limit: 1,
            component_rate: 1,
            craft_rate: 1,
            gather_rate: 1,
            scrap_rate: 1,
            upkeep: 1,
            country_code: 1,
            region: 1,
            country: 1,
            wipe_schedule: 1,
            last_wipe: 1,
            next_wipe: 1,
            max_population_last_wipe: 1,
            server_type: 1,
          },
        }
      );
    if (!server) {
      return res.status(404).json({ status: "error", message: "Server not found" });
    }

    return res.status(200).json({
      status: "success",
      data: server
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "error", message: (e as Error).message });
  }
}