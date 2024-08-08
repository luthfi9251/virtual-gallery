import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req, props) {
    try {
        let fileName = props.params.filename[0];
        let filePath = path.join(
            process.cwd(),
            "public",
            "bukti_transfer",
            fileName
        );
        let file = fs.readFileSync(filePath);
        const requestHeaders = new Headers(req.headers);
        return new NextResponse(file, {
            status: 200,
            statusText: "OK",
            headers: requestHeaders,
        });
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}
