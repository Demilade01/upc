// pages/api/wipes.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req: any, res: any) {
  const { page = 1, limit = 10, maximumPopulation, nextWipe, mapSize, regions, groupLimit, teamUILimit } = req.query;
  const offset = (page - 1) * limit;

  const filters = {
    next_wipe: { $gt: new Date() },
  };

  if (maximumPopulation) {
    const [minPop, maxPop] = maximumPopulation.split(',').map(Number);
    filters.max_population_last_wipe = { $gte: minPop, $lte: maxPop };
  }

  if (nextWipe) {
    const [minWipe, maxWipe] = nextWipe.split(',').map(Number);
    filters.next_wipe = { $gte: new Date(Date.now() + minWipe * 60 * 1000), $lte: new Date(Date.now() + maxWipe * 60 * 1000) };
  }

  if (mapSize) {
    const [minSize, maxSize] = mapSize.split(',').map(Number);
    console.log(minSize, maxSize);
    filters.world_size = { $gte: minSize, $lte: maxSize };
  }

  if (regions && regions.length) {
    filters.region = { $in: regions.split(',') };
  }

  if (groupLimit) {
    const groupLimitValues = groupLimit.split(',');
    const numericLimits = groupLimitValues.filter(value => !isNaN(Number(value))).map(Number);
    const noLimit = groupLimitValues.includes('No limit');

    if (numericLimits.length) {
      filters.group_limit = { $in: numericLimits };
    }

    if (noLimit) {
      filters.$or = [
        { group_limit: { $lt: 1 } },
        { group_limit: { $gt: 12 } },
      ];
    }
  }

  if (teamUILimit) {
    const teamUILimitValues = teamUILimit.split(',');
    const numericLimits = teamUILimitValues.filter(value => !isNaN(Number(value))).map(Number);
    const noLimit = teamUILimitValues.includes('No limit');

    filters.$and = filters.$and || [];
    if (numericLimits.length) {
      filters.$and.push({ team_ui_limit: { $in: numericLimits } });
    }

    if (noLimit) {
      filters.$and.push({
        $or: [
          { team_ui_limit: { $lt: 1 } },
          { team_ui_limit: { $gt: 12 } },
        ],
      });
    }
  }

  try {
    const client = await clientPromise;
    const db = client.db("upcoming_wipes");
    const serversCollection = db.collection("servers");

    const servers = await serversCollection
      .find(filters)
      //.sort({ next_wipe: 1 })
      .skip(offset)
      .limit(limit)
      .toArray();

    return res.status(200).json({ status: "success", data: servers });
  } catch (e: any) {
    return res.status(500).json({ status: "error", message: e.message });
  }
}
