import pool from '../../../Database/db';
import { NextResponse } from "next/server";



export async function POST( req: NextResponse,res: NextResponse) {
  try {

    const query = `SELECT u.*, d.*
    FROM users_details u
    INNER JOIN driver_detail d ON u.driver_id = d.driver_id
    WHERE u.role='Driver'`;
    const result = await pool.query(query);
    const user = result.rows;
  

    if (!user) {
      console.log("error: Something went wrong");
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


