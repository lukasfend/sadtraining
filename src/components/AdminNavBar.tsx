import { UserButton } from "@clerk/nextjs";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";


export default function AdminNavBar() {
    return (
        <div style={{width: "100vw"}}>
            <Navbar maxWidth="full" isBordered={true}>
                <NavbarBrand>
                    <p className="font-bold text-inherit" style={{ fontFamily: "Teko, sans-serif", fontSize: "22pt"}}>
                        <span style={{ color: "#05b4ff"}}>SAD&apos;s</span> Training Service
                    </p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem isActive>
                        <Link color="foreground" href="#">
                            Order overview
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="#" aria-current="page">
                            User List
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            coming soon
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <UserButton />
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </div>
    )
}