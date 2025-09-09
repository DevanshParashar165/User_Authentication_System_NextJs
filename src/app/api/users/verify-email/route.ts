import { connect } from "@/db/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { token } = await request.json();
    console.log("Token received:", token);

    if (!token) {
      return NextResponse.json({ error: "Token missing" }, { status: 400 });
    }

    // Find all users with unexpired tokens
    const users = await User.find({ verifyTokenExpiry: { $gt: Date.now() } });

    if (!users.length) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Compare token with each user's hashed token
    let userFound = null;
    for (const user of users) {
      const isMatch = await bcrypt.compare(token, user.verifyToken || "");
      if (isMatch) {
        userFound = user;
        break;
      }
    }

    if (!userFound) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }

    // Mark user as verified
    userFound.isVerified = true;
    userFound.verifyToken = undefined;
    userFound.verifyTokenExpiry = undefined;
    await userFound.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
