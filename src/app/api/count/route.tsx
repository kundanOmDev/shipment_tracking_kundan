import pool from '../../../Database/db';
import { NextResponse } from "next/server";

// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';


export async function POST( req: NextResponse,res: NextResponse) {
    // return new Response("Sucessfully registered")
    // let payload = await req.json();
    // console.log(payload);
  try {
    // const { email, password } = req.body;

    const query = `SELECT 'In Transit' AS shipment_status, COUNT(*) AS countdata FROM shipment_detail WHERE shipment_status = 'In Transit'
    UNION
    SELECT 'Pending' AS shipment_status, COUNT(*) AS countdata FROM shipment_detail WHERE shipment_status = 'Pending'
    UNION
    SELECT 'Delivered' AS shipment_status, COUNT(*) AS countdata FROM shipment_detail WHERE shipment_status = 'Delivered'`
    const result = await pool.query(query);
    const user = result.rows;
  

    if (!user) {
      console.log("error: Invalid email or password");
      return NextResponse.json({ error: 'Something is wrong' },{status: 401});
    }

    // const passwordMatch = await bcrypt.compare(payload.password, user.password);

    // if (!passwordMatch) {
    //   console.log("error: Invalid email or password");
    //   return NextResponse.json({ error: 'Invalid email or password' },{status: 401});
    // }else{
      
      
      return NextResponse.json({ message: 'Executed successful',data:user },{status: 200});
    // }
    // return NextResponse.redirect(new URL('/register'))
  } catch (error) {
    console.error('Error logging in:', error);
    
    return NextResponse.json({ error: 'Internal Server Error' });
  }
};


