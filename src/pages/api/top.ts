import { getXataClient } from "@/xata";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const xata = getXataClient();
    try {
        // const records = await xata.db.results.aggregate({
        //     ratingsAboveEight: {
        //         count: {
        //             filter: {
        //                 rating: { $gt: score },
        //             },
        //         },
        //     },
        // });

        // res.status(200).json({ records });

        // const higerData = await xata.db.results
        //     .select(["xata_id", "items", "name", "score"])
        //     .sort("score", "desc")
        //     .filter({
        //         score: { $gt: Number(score) || 0 },
        //     })
        //     .getAll();

        const top3 = await xata.db.results
            .select(["xata_id", "items", "name", "score"])
            .sort("score", "desc")
            .sort("xata_createdat", "desc")
            .getMany({ pagination: { size: 6 } });

        res.status(200).json(top3);
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

