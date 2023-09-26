import pool from '../../../Database/db';
import { NextResponse } from "next/server";

export async function POST(req: NextResponse ) {
    let payload = await req.json();
    console.log(payload);
    try {
        console.log(req.body);
        
        const query = 'INSERT INTO driver_detail ( driver_name, contact_number, vehicle_number, license_number) VALUES ($1, $2, $3, $4)';
        const values = [ payload.driver_name, payload.contact_number, payload.vehicle_number, payload.license_number];
        const { rows } = await pool.query(query, values);
            
            
        if (rows.length === 1) {
          console.log("Successfully registered");
          return NextResponse.json({ message: 'Data inserted successfully' },{status: 200});
        }

        return NextResponse.json({ message: 'Driver registered successfully' },{status: 200});
        
      } catch (error) {
        console.error('Error registering Driver:', error);
        return NextResponse.json({ error: 'Internal Server Error' },{status: 500});
      }
}


