import { NextResponse } from "next/server";



export const POST = async (request) => {

  const { name, email, password } = await request.json();
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }
// create DB Collection


// Encrypt Password


// From a Db Payload

// Update Db
return new NextResponse("user has been create",{
    status:201,
})

};
