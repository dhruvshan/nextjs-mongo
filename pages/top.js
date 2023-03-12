import clientPromise from "../lib/mongodb";

export default function Top({ foods }) {
  return (
    <div>
      <h1>Top Worst Foods for the Environment</h1>
      <p>
        <small>(According to Me. Bababooey)</small>
      </p>
      <ul>
        {foods.map((food) => (
          <li>
            <h2>{food.name}</h2>
            <h3>{food.carbonFootprint}</h3>
            <p>{food.units}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
    try {
        const client = await clientPromise;
        const db = client.db("foodprint");

        const foods = await db
            .collection("foods")
            .find({})
            .sort({ carbonFootprint: -1 })
            .limit(1000)
            .toArray();

        return {
            props: { foods: JSON.parse(JSON.stringify(foods)) },
        };
    } catch (e) {
        console.error(e);
    }
}
        