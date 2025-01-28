import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/User.models";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    // Parse JSON from the request
    const { firstName, lastName, username, email, password } = await request.json();

    // Check if the username already exists
    const existingUserName = await UserModel.findOne({ username });
    if (existingUserName) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Username is already taken",
        }),
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingByEmail = await UserModel.findOne({ email });
    if (existingByEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email is already taken",
        }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Registering User:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Error Registering User",
      }),
      { status: 500 }
    );
  }
}
