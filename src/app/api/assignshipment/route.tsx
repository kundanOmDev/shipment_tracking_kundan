import pool from '../../../Database/db';
import { NextResponse } from "next/server";

export async function POST(req: NextResponse ) {
    // return new Response("Sucessfully registered")
    let payload = await req.json();
    console.log(payload);
    try {
        console.log(req.body);
        
        const query = `UPDATE shipment_detail
        SET assign_driver_id= $1
        WHERE shipment_id = $2`;
        const values = [ payload.driver_id, payload.shipment_id];
        const { rows } = await pool.query(query, values);
            
        if (rows.length === 1) {
          console.log("Successfully Updated");
          return NextResponse.json({ message: 'Data Updated successfully' },{status: 200});
        }

        return NextResponse.json({ message: 'Query Executed successfully' },{status: 200});
        
      } catch (error) {
        console.error('Error executing user:', error);
        return NextResponse.json({ error: 'Internal Server Error' },{status: 500});
      }
}
