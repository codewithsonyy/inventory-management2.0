import connectToMongo from "@/db/dbConnect";
import User from "@/db/models/User";

import { verify } from "jsonwebtoken";

export async function GET(request) {
  let success = true;
  try {
    await connectToMongo();
    const requestHeaders = new Headers(request.headers);
    const token = requestHeaders.get("auth-token");
    const data = verify(token, process.env.JWT_SECRET);

    request.user = data.user;
    let id = data.user.id;

    let user = await User.findById(id);

    if (!user) {
      success = false;

      return new Response(
        JSON.stringify({ success, error: " Please Enter valid id!" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ user, token, success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
