import { NextResponse } from "next/server";



export const POST = async (request) => {

  const { name, email, password } = await request.json();
  console.log(name, email, password);
// create DB Collection


// Encrypt Password


// From a Db Payload

// Update Db
return new NextResponse("user has been create",{
    status:201,
})

};
