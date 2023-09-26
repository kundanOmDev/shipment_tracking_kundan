import pool from '../../../Database/db';
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(req: NextResponse ) {
    // return new Response("Sucessfully registered")
    let payload = await req.json();
    console.log(payload);
    try {
        // const { id, username, email, password, confirm_password } = req.body;
        console.log(req.body);
            const hashedPassword = await bcrypt.hash(payload.password, 10);
        
        const query = 'INSERT INTO users_details ( username, email, password, status, role) VALUES ($1, $2, $3, $4, $5)';
        const values = [ payload.username, payload.email, hashedPassword , payload.status,payload.role ];
        // const { rows } = await pool.query(query, values);
            
        const driverQuery = "INSERT INTO driver_detail (vehicle_number, license_number, contact_number) VALUES ($1, $2, $3)";
        const driverValues = [payload.vehicle_number, payload.license_number, payload.contact_number];

    // Start a transaction
    await pool.query("BEGIN");

    // Insert user data
    await pool.query(query, values);

    // Insert driver data
    await pool.query(driverQuery, driverValues);

    // Commit the transaction
    await pool.query("COMMIT");
        return NextResponse.json({ message: 'User registered successfully' },{status: 200});
        
      } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ error: 'Internal Server Error' },{status: 500});
      }
}


