// pages/api/wipes.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req: any, res: any) {
  const { page = 1, limit = 10, maximumPopulation, nextWipe, mapSize, regions, groupLimit, teamUILimit, sort, serverType, rank } = req.query;
  const offset = (page - 1) * limit;

  const filters = {
    next_wipe: { $gt: new Date() },
    name: {
      $not: {
        $regex: "(Sandbox|Noclip|Training,Creative,AimTrain)",
        $options: "i",
      },
    },
  };

  if (req.query.searchQuery) {
    filters.name = { $regex: req.query.searchQuery, $options: 'i' };
  }

  if (rank) {
    let minRank, maxRank;

    if (Array.isArray(rank)) {
      // If rank is an array (e.g., ['0', '200']), use the first two elements
      minRank = Number(rank[0]);
      maxRank = Number(rank[1]);
    } else {
      // If rank is a string, split it into min and max
      [minRank, maxRank] = rank.split(',').map(Number);
    }

    // Ensure minRank and maxRank are valid numbers before applying the filter
    if (!isNaN(minRank) && !isNaN(maxRank)) {
      filters.rank = { $gte: minRank, $lte: maxRank };
    }
  }

  if (maximumPopulation) {
    let minPop, maxPop;
    if (Array.isArray(maximumPopulation)) {
      [minPop, maxPop] = maximumPopulation.map(Number);
    } else {
      [minPop, maxPop] = maximumPopulation.split(',').map(Number);
    }
    if (!isNaN(minPop) && !isNaN(maxPop)) {
      filters.max_population_last_wipe = { $gte: 1, $lte: maxPop };
    }
  }

  if (serverType && serverType !== 'all') {
    console.log(serverType);
    filters.server_type = serverType;
  }

  if (nextWipe) {
    const [minWipe, maxWipe] = nextWipe.split(',').map(Number);
    filters.next_wipe = { $gte: new Date(Date.now() + minWipe * 60 * 1000), $lte: new Date(Date.now() + maxWipe * 60 * 1000) };
  }

  if (mapSize) {
    let minSize, maxSize;
    if (Array.isArray(mapSize)) {
      [minSize, maxSize] = mapSize.map(Number);
    } else {
      [minSize, maxSize] = mapSize.split(',').map(Number);
    }
    console.log(minSize, maxSize);
    if (!isNaN(minSize) && !isNaN(maxSize)) {
      filters.world_size = { $gte: minSize, $lte: maxSize };
    }
  }

  if (regions && regions.length) {
    filters.region = { $in: Array.isArray(regions) ? regions : regions.split(',') };
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

  let sortOption = {};
  console.log(sort);
  switch (sort) {
    case 'wipe_time':
      sortOption = { next_wipe: 1 };
      break;
    case 'rank':
      sortOption = { rank: 1 };
      break;
    case 'avg_players':
      sortOption = { max_population_last_wipe: -1 }; // Sorting by max_population_last_wipe in descending order
      break;
    default:
      sortOption = { next_wipe: 1 }; // Default sort by wipe time
  }

  try {
    const client = await clientPromise;
    const db = client.db("upcoming_wipes");
    const serversCollection = db.collection("servers");

    // Get the total number of servers
    const totalServers = await serversCollection.countDocuments(filters);

    const servers = await serversCollection
      .find(filters)
      .sort(sortOption)
      .skip(offset)
      .limit(parseInt(limit))
      .toArray();

    return res.status(200).json({ status: "success", data: servers, total: totalServers });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ status: "error", message: e.message });
  }
}
