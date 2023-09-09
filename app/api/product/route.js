import connectToMongo from "@/db/dbConnect";
import Product from "@/db/models/Products";
import { verify } from "jsonwebtoken";

import { NextResponse } from "next/server";

export async function GET(request) {
  const requestHeaders = new Headers(request.headers);
  const token = requestHeaders.get("auth-token");
  const data = verify(token, process.env.JWT_SECRET);

  request.user = data.user;

  try {
    await connectToMongo();

    const products = await Product.find({ user: request.user.id });

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
export async function POST(request) {
  const requestHeaders = new Headers(request.headers);
  const token = requestHeaders.get("auth-token");
  const data = verify(token, process.env.JWT_SECRET);

  request.user = data.user;
  try {
    await connectToMongo();
    let body = await request.json();
    const { slug, quantity, price } = body;

    const product = new Product({
      user: request.user.id,
      slug,
      quantity,
      price,
    });
    const savedProduct = await product.save();

    return NextResponse.json({ savedProduct, success: true });
  } catch (error) {
    console.error(error.message);
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
