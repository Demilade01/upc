// pages/api/wipes.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const client = await clientPromise;
        const db = client.db("upcoming_wipes");
        const serversCollection = db.collection("servers");
        
        const servers = await serversCollection.find({ next_wipe: { $gt: new Date() } }).sort({ next_wipe: 1 }).skip(offset).limit(limit).toArray();

        return res.status(200).json({ status: 'success', data: servers });
    } catch (e) {
        return res.status(500).json({ status: 'error', message: e.message });
    }
}
