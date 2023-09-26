import pool from '../../../Database/db';
import { NextResponse } from "next/server";

import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';


export async function POST( req: NextResponse,res: NextResponse) {
    // return new Response("Sucessfully registered")
    let payload = await req.json();
    console.log(payload);
  try {
    // const { email, password } = req.body;

    const query = 'SELECT * FROM users_details WHERE email = $1';
    const result = await pool.query(query, [payload.email]);
    const user = result.rows[0];
  

    if (!user) {
      console.log("error: Invalid email or password");
      return NextResponse.json({ error: 'Invalid email or password' },{status: 401});
    }

    const passwordMatch = await bcrypt.compare(payload.password, user.password);

    if (!passwordMatch) {
      console.log("error: Invalid email or password");
      return NextResponse.json({ error: 'Invalid email or password' },{status: 401});
    }else{
      
      
      return NextResponse.json({ message: 'Login successful',data:user },{status: 200});
    }
    // return NextResponse.redirect(new URL('/register'))
  } catch (error) {
    console.error('Error logging in:', error);
    
    return NextResponse.json({ error: 'Internal Server Error' });
  }
};


