import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OrderStatus, OrderType } from "@prisma/client";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const user = await currentUser();
        
        if(!user || !user.id) {
            return new NextResponse("Unauthorized", { status: 401, statusText: "Unauthorized" });
        }
        const isEmployee = user.publicMetadata.isEmployee || false;
        // when accessed by an employee, they may pass an owner as user id
        // defaults back to current user's id
        const user_id = (body.user_id && isEmployee) ? body.user_id : user.id;

        const new_order = await prismadb.order.create({
            data: {
                type: body.orderType.toUpperCase() as OrderType,
                user_id,
                status: "REQUESTING_BOOST" as OrderStatus,
                loginEmail: "",
                loginPassword: "",
                isIronman: (body.isIronman == null) ? false : body.isIronman,
                orderPayload: JSON.stringify(body.payload),
                price: null
            }
        });

        return NextResponse.json({...new_order, success: true });


    } catch(err) {
        console.log(err)
        return new NextResponse("Internal Error", { status: 500, statusText: "Internal Error" });
    }
};