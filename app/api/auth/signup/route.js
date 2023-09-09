import connectToMongo from "@/db/dbConnect";
import User from "@/db/models/User";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function POST(request) {
  try {
    let success = false;
    await connectToMongo();
    const { name, email, password } = await request.json();
    let user = await User.findOne({ email });
   

    if (user) {
      return new Response(
        JSON.stringify({ success: false, error: "User already exists!" })
      );
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    user = await User.create({
      name: name,
      password: secPass,
      email: email,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = sign(data, process.env.JWT_SECRET);

    return new Response(JSON.stringify({ authtoken, success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
