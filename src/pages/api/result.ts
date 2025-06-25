import { getXataClient } from "@/xata";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const xata = getXataClient();
    try {
        const { name, score, items } = JSON.parse(req.body);

        const record = await xata.db.results.create({
            name: name,
            score: score,
            items: items,
        });

        res.status(200).json({ message: "result created.", record });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

