import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../lib/mongodb";

const BASE_URL = 'https://upcomingwipes.com'; // Replace with your actual domain

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("upcoming_wipes");
    const serversCollection = db.collection("servers");

    const servers = await serversCollection.find({}, { projection: { server_steam_id: 1 } }).toArray();
    const totalServers = await serversCollection.countDocuments();
    const totalPages = Math.ceil(totalServers / 10); // Assuming 10 servers per page

    const currentDate = new Date().toISOString();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${servers.map(server => `
        <url>
          <loc>${BASE_URL}/server/${server.server_steam_id}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>hourly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
      ${Array.from({length: totalPages}, (_, i) => i + 1).map(page => `
        <url>
          <loc>${BASE_URL}/?page=${page}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>hourly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
      <url>
        <loc>${BASE_URL}/privacy-policy</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>${BASE_URL}/terms-and-conditions</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
      </url>
    </urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error generating sitemap' });
  }
}