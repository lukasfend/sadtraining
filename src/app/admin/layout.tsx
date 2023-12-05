import { currentUser, useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import "./orderlayout.scss";
import AdminNavBar from "@/components/AdminNavBar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await currentUser();
    if(user?.id && user.publicMetadata.isEmployee === true) {
        return <div className="order_layout">
            <AdminNavBar />
            {children}
        </div>
    } else {
        redirect("/");
        return;
    }

};