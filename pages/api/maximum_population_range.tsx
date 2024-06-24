import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
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
          minPopulation: { $min: "$max_population_last_wipe" },
          maxPopulation: { $max: "$max_population_last_wipe" },
        },
      },
    ]).toArray();

    if (!minMaxValues.length) {
      return res.status(404).json({ status: "error", message: "No data found" });
    }

    const { minPopulation, maxPopulation } = minMaxValues[0];

    // Define a function to round up to the nearest step
    const roundUpToStep = (value, step) => Math.ceil(value / step) * step;

    // Calculate the step value
    const range = maxPopulation - minPopulation;
    const roughStep = range / 4;
    let step;

    if (roughStep <= 100) {
      step = Math.ceil(roughStep / 50) * 50;
    } else {
      step = Math.ceil(roughStep / 100) * 100;
    }

    // Round up maxPopulation to the nearest step
    const roundedMaxPopulation = roundUpToStep(maxPopulation, step);

    // Calculate the marks
    const marks = [];
    for (let i = 0; i <= 4; i++) {
      const value = minPopulation + i * step;
      marks.push({ value, label: value.toString() });
    }

    return res.status(200).json({
      status: "success",
      data: { minPopulation, maxPopulation: roundedMaxPopulation, marks, step },
    });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
}
