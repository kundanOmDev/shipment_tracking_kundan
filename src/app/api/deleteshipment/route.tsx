import pool from '../../../Database/db';
import { NextResponse } from "next/server";

export async function POST(req: NextResponse, res: NextResponse) {
    let payload = await req.json();
    console.log(payload);
  try {
    
    // Validate the shipmentIdToDelete if needed

    const query = `
        DELETE from shipment_detail where shipment_id = $1`;
    const values = [ payload.shipment_id];
    const { rows } = await pool.query(query, values);

    if (rows.rowCount === 1) {
      return NextResponse.json({
        message: 'Shipment deleted successfully'
      }, { status: 200 });
    } else {
      return NextResponse.json({
        error: 'Shipment not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting shipment:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
