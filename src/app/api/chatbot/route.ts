import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Commands from "@/app/models/Chat.model";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { command } = body;
    if (!command) {
      return NextResponse.json(
        { error: "command is required" },
        { status: 400 }
      );
    }
    const response = await Commands.findOne({ command: command });
    if (response) {
      return NextResponse.json({ Response: response.response });
    }
    return NextResponse.json({ botMessage: "Sorry, I don't understand that." });
  } catch (error) {
    console.error("Error in chatbot route:", error);
    return NextResponse.json(
      { error: "Failed to process chatbot request" },
      { status: 500 }
    );
  }
}
