import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("foodprint");

       const foods = await db
           .collection("foods")
           .find({})
           .sort({ carbonFoodprint: -1 })
           .toArray();

       res.json(foods);
   } catch (e) {
       console.error(e);
   }
};