import connectToMongo from "@/db/dbConnect";
import Product from "@/db/models/Products";
import { verify } from "jsonwebtoken";
import mongoose from "mongoose";

import { NextResponse } from "next/server";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");
  const requestHeaders = new Headers(request.headers);
  const token = requestHeaders.get("auth-token");
  const data = verify(token, process.env.JWT_SECRET);

  let id = data.user.id;

  try {
    await connectToMongo();

    const products = await Product.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(id),
          $and: [
            { slug: { $regex: query, $options: "i" } }, // Partial matching for name field
          ],
        },
      },
    ]);

    return NextResponse.json({
      success: true,

      products,
    });
  } catch (error) {
    console.error(error.message);
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
