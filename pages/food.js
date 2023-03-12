import clientPromise from "../lib/mongodb";

export default function Foods({ foods }) {
    return (
        <div>
            <h1>Top Foods with the Highest Carbon Footprint</h1>
            <p>
                <small>(According to My Research lol. Bababooey)</small>
            </p>
            <ul>
                {foods.map((food) => (
                    <li>
                        <h2>{food.name}</h2>
                        <h3>{food.carbonFoodprint}</h3>
                        <p>{food.units}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("foodprint");

        const foods = await db
            .collection("foods")
            .find({})
            .sort({ carbonFoodprint: -1 })
            .toArray();

        return {
            props: { foods: JSON.parse(JSON.stringify(foods)) },
        };
    } catch (e) {
        console.error(e);
    }
}