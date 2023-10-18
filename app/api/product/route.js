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

export async function DELETE(request){
  try{
 
  const requestHeaders = new Headers(request.headers);
  const token = requestHeaders.get("auth-token");
  const data = verify(token, process.env.JWT_SECRET);

  request.user = data.user;
  await connectToMongo();
  let ID;
  try {
    const requestBody = await request.json();
    
    ID = requestBody;
    console.log(ID)
  } catch (jsonError) {
    // Handle JSON parsing error
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Invalid JSON input' }),
      { status: 400, headers: { 'content-type': 'application/json' }}
    );
  }
    
    

    const product = await Product.findById(ID)
    console.log("getProduct",product)
    if (!product) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Product not find"}),
        { status: 404, headers: { "content-type": "application/json" } }
      );
    }
     // Delete the product

     const result = await Product.findByIdAndDelete(ID)
     console.log("result",result)
     if (!result) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Failed to delete product' }),
        { status: 500, headers: { 'content-type': 'application/json' }}
      );
    }

    return new NextResponse(JSON.stringify({ success: true }));
  }catch(error){
    console.error('Error in DELETE route:', error.message);
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'content-type': 'application/json' }}
    );
  }
}
