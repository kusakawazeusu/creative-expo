import { getXataClient } from "@/xata";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const xata = getXataClient();
    try {
        const id = req.query.id as string;

        const me = await xata.db.results.read(id);
        if (!me) {
            return res.status(404).json({ message: "result not found." });
        }

        const higherRecords = await xata.db.results
            .select(["xata_id", "items", "name", "score"])
            .sort("score", "desc")
            .filter({
                score: { $ge: me.score || 0 },
            })
            .getAll();

        const previous2 = higherRecords
            .slice(-3)
            .filter((record) => record.xata_id !== id);

        res.status(200).json({ me, rank: higherRecords.length, previous2 });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

