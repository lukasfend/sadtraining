import prismadb from "@/lib/prismadb";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: Request,
    res: NextApiResponse
) {
    const {page} = await req.json();
    try {
        const user = await currentUser();
        if (!user || !user.id) {
            return new NextResponse("Unauthorized", { status: 401, statusText: "Unauthorized" });
        }
        const isEmployee = user.publicMetadata.isEmployee || false;
        if(!isEmployee) {
            return new NextResponse("Unauthorized", { status: 401, statusText: "Unauthorized - Admin access required." });
        }
        const orders: any = await prismadb.order.findMany({
            orderBy: {
                orderTime: "desc"
            },
            take: 40,
            skip: parseInt((page||0) as string)*40
        });
        const totalRows = await prismadb.order.count();
        for(let order of orders) {
            order.orderPayload = JSON.parse(order.orderPayload);
            const user: any = await clerkClient.users.getUser(order.user_id);
            order.user = {
                id: user.id,
                username: user.username,
                handle: user.externalAccounts[0].username,
                avatar: user.imageUrl || "https://cdn.clerk.dev/images/default-avatar.svg"
            }
        }
        return NextResponse.json({ success: true, orders, page: parseInt(page as string), maxPage:Math.floor(totalRows/40)+1});
    } catch(err) {
        console.log(err);
        return new NextResponse("Internal Server Error", { status: 500, statusText: "Internal Server Error" });
    }
}   