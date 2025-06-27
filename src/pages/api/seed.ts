import { getXataClient } from "@/xata";
import { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const xata = getXataClient();
    try {
        const total = 1000;
        const batchSize = 100;
        const batches = Math.ceil(total / batchSize);

        for (let i = 0; i < batches; i++) {
            const records = Array.from({ length: batchSize }).map(() => ({
                name: faker.person.firstName(),
                score: faker.number.int({ min: 1, max: 1000 }),
                items: {},
            }));

            await xata.db.results.create(records);
        }

        res.status(200).json({ message: "seeding finished." });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

