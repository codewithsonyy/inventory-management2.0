import { MongoClient } from "mongodb"
import { NextResponse } from "next/server";

export async function GET( Request) {
    


const uri = "mongodb+srv://merndev:wWahb6MrJfhdoyF0@cluster0.rqn8j9a.mongodb.net/";

const client = new MongoClient(uri);


  try {
    const database = client.db('appservernext');
    const movies = database.collection('inventory');

    // Query for a movie that has the title 'Back to the Future'
    const query = { };
    const movie = await movies.find(query).toArray();

    console.log(movie);
    return NextResponse.json({"a":32,movie})
} finally {
    // Ensures that the client will close when you finish/error
    await client.close();

}
}
