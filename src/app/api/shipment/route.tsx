import pool from '../../../Database/db';
import { NextResponse } from "next/server";

export async function POST(req: NextResponse ) {
    // return new Response("Sucessfully registered")
    let payload = await req.json();
    console.log(payload);
    try {
        console.log(req.body);
        
        const query = 'INSERT INTO shipment_detail ( customer_name, destination_address, shipment_status, plan_delivery_date, actual_delivery_date, entered_by, entered_date) VALUES ($1, $2, $3, $4, $5, $6, now())';
        const values = [ payload.customer_name, payload.destination_address, payload.shipment_status, payload.plan_delivery_date, payload.actual_delivery_date, payload.entered_by];
        const { rows } = await pool.query(query, values);
            
        if (rows.length === 1) {
          console.log("Successfully executed");
          return NextResponse.json({ message: 'Data inserted successfully' },{status: 200});
        }

        return NextResponse.json({ message: 'Query Executed successfully' },{status: 200});
        
      } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ error: 'Internal Server Error' },{status: 500});
      }
}
