import pool from '../../../Database/db';
import { NextResponse } from "next/server";

export async function POST(req: NextResponse ) {
    // return new Response("Sucessfully registered")
    let payload = await req.json();
    console.log(payload);
    try {
        console.log(req.body);
        
        const query = `UPDATE shipment_detail
        SET shipment_status= $1, plan_delivery_date=$2, 
        actual_delivery_date=$3, entered_by=$4, entered_date = now()
        WHERE shipment_id = $5`;
        const values = [ payload.shipment_status, payload.plan_delivery_date, payload.actual_delivery_date, payload.entered_by,payload.shipment_id ];
        const { rows } = await pool.query(query, values);
            
        if (rows.length === 1) {
          console.log("Successfully Updated");
          return NextResponse.json({ message: 'Data Updated successfully' },{status: 200});
        }

        return NextResponse.json({ message: 'Query Executed successfully' },{status: 200});
        
      } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ error: 'Internal Server Error' },{status: 500});
      }
}
