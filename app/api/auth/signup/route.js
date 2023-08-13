import connectToMongo from "@/db/dbConnect";
import User from "@/db/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    let success = false;
    await connectToMongo();
    const { name, email, password } = await request.json();
    let user = await User.findOne({ email });

    if (user) {
     return new Response({success,error:"User already exists!"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    success=true;
    return new Response({authtoken,success});
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

 