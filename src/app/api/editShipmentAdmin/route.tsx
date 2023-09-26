import pool from '../../../Database/db';
import { NextResponse } from "next/server";

export async function POST(req: NextResponse ) {
    // return new Response("Sucessfully registered")
    let payload = await req.json();
    console.log(payload);
    try {
        console.log(req.body);
        
        const query = `UPDATE shipment_detail
        SET customer_name= $1, destination_address= $2, shipment_status= $3, plan_delivery_date=$4,
        actual_delivery_date=$5, modified_by=$6, modified_date = now()
        WHERE shipment_id = $7`;
        const values = [ payload.customer_name, payload.destination_address, payload.shipment_status, payload.plan_delivery_date, payload.actual_delivery_date, payload.modified_by, payload.shipment_id ];
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
