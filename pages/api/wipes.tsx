import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../lib/mongodb";
import { Sort } from 'mongodb';

interface FilterCondition {
  $gt?: Date | number;
  $gte?: number;
  $lte?: number;
  $lt?: number;
  $in?: string[] | number[];
  $regex?: string;
  $options?: string;
  $not?: {
    $regex: string;
    $options: string;
  };
}

interface Filters {
  next_wipe?: FilterCondition;
  name?: FilterCondition | string;
  rank?: FilterCondition;
  max_population_last_wipe?: FilterCondition;
  server_type?: string;
  world_size?: FilterCondition;
  region?: FilterCondition;
  group_limit?: FilterCondition;
  team_ui_limit?: FilterCondition;
  $or?: Array<{ [key: string]: FilterCondition }>;
  $and?: Array<{ [key: string]: FilterCondition } | { $or: Array<{ [key: string]: FilterCondition }> }>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = '1', limit = '10', maximumPopulation, nextWipe, mapSize, regions, groupLimit, teamUILimit, sort, serverType, rank, searchQuery } = req.query;
  const currentPage = Math.max(1, parseInt(page as string));
  const itemsPerPage = parseInt(limit as string);
  const offset = (currentPage - 1) * itemsPerPage;

  const filters: Filters = {
    next_wipe: { $gt: new Date() },
    name: {
      $not: {
        $regex: "(Sandbox|Noclip|Training,Creative,AimTrain)",
        $options: "i",
      },
    },
  };

  if (searchQuery && typeof searchQuery === 'string') {
    filters.name = { $regex: searchQuery, $options: 'i' };
  }

  if (rank) {
    let minRank: number, maxRank: number;

    if (Array.isArray(rank)) {
      [minRank, maxRank] = rank.map(Number);
    } else {
      [minRank, maxRank] = (rank as string).split(',').map(Number);
    }

    if (!isNaN(minRank) && !isNaN(maxRank)) {
      filters.rank = { $gte: minRank, $lte: maxRank };
    }
  }

  if (maximumPopulation) {
    let minPop: number, maxPop: number;
    if (Array.isArray(maximumPopulation)) {
      [minPop, maxPop] = maximumPopulation.map(Number);
    } else {
      [minPop, maxPop] = (maximumPopulation as string).split(',').map(Number);
    }
    if (!isNaN(minPop) && !isNaN(maxPop)) {
      filters.max_population_last_wipe = { $gte: minPop, $lte: maxPop };
    }
  }

  if (serverType && serverType !== 'all') {
    filters.server_type = serverType as string;
  }

  if (nextWipe && typeof nextWipe === 'string') {
    const [minWipe, maxWipe] = nextWipe.split(',').map(Number);
    filters.next_wipe = {
      $gte: Date.now() + minWipe * 60 * 1000,
      $lte: Date.now() + maxWipe * 60 * 1000
    };
  }

  if (mapSize) {
    let minSize: number, maxSize: number;
    if (Array.isArray(mapSize)) {
      [minSize, maxSize] = mapSize.map(Number);
    } else {
      [minSize, maxSize] = (mapSize as string).split(',').map(Number);
    }
    if (!isNaN(minSize) && !isNaN(maxSize)) {
      filters.world_size = { $gte: minSize, $lte: maxSize };
    }
  }

  if (regions) {
    const selectedRegions = Array.isArray(regions) ? regions : regions.split(',');
    if (selectedRegions.length > 0) {
      filters.region = { $in: selectedRegions };
    }
  }

  if (groupLimit) {
    const groupLimitValues = Array.isArray(groupLimit) ? groupLimit : [groupLimit];
    const numericLimits = groupLimitValues
      .map(value => parseInt(value, 10))
      .filter(value => !isNaN(value));
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
    const teamUILimitValues = Array.isArray(teamUILimit) ? teamUILimit : [teamUILimit];
    const numericLimits = teamUILimitValues
      .map(value => parseInt(value, 10))
      .filter(value => !isNaN(value));
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

  let sortOption: Sort = { next_wipe: 1 }; // Default sort
  if (typeof sort === 'string') {
    switch (sort) {
      case 'wipe_time':
        sortOption = { next_wipe: 1 };
        break;
      case 'rank':
        sortOption = { rank: 1 };
        break;
      case 'avg_players':
        sortOption = { max_population_last_wipe: -1 };
        break;
    }
  }

  try {
    const client = await clientPromise;
    const db = client.db("upcoming_wipes");
    const serversCollection = db.collection("servers");

    const totalServers = await serversCollection.countDocuments(filters);

    const projection = {
      next_wipe: 1,
      country_code: 1,
      name: 1,
      rank: 1,
      server_type: 1,
      max_population_last_wipe: 1,
      ip: 1,
      address: 1,
    };

    const servers = await serversCollection
      .find(filters)
      .project(projection)
      .sort(sortOption)
      .skip(offset)
      .limit(itemsPerPage)
      .toArray();

    return res.status(200).json({
      status: "success",
      data: servers,
      total: totalServers,
      currentPage: currentPage,
      totalPages: Math.ceil(totalServers / itemsPerPage)
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "error", message: (e as Error).message });
  }
}