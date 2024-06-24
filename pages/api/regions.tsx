import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("upcoming_wipes");
    const serversCollection = db.collection("servers");

    // Fetch distinct regions
    const regions = await serversCollection.distinct("region", { region: { $ne: "Unknown" } });

    if (!regions.length) {
      return res.status(404).json({ status: "error", message: "No regions found" });
    }

    return res.status(200).json({
      status: "success",
      data: regions,
    });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
}
