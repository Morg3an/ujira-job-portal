'use client'

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from '../ui/button';
import { AlignJustify, Moon } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/clerk-react";
import { useTheme } from "next-themes";


function Header({ user, profileInfo }) {

    const { theme, setTheme } = useTheme();


    const menuItems = [
        {
            label: "Home",
            path: "/",
            show: true,
        },
        {
            label: "Feed",
            path: "/feed",
            show: user && profileInfo,
        },
        {
            label: "Login",
            path: "/sign-in",
            show: !user
        },
        {
            label: "Register",
            path: "/sign-up",
            show: !user,
        },
        {
            label: "Jobs",
            path: "/jobs",
            show: user,
        },
        {
            label: "Activity",
            path: "/activity",
            show: user && profileInfo?.role === "candidate",
        },
        {
            label: "Companies",
            path: "/companies",
            show: user && profileInfo?.role === "candidate",
        },
        {
            label: "Membership",
            path: "/membership",
            show: user,
        },
        {
            label: "Account",
            path: "/account",
            show: user,
        }
    ];


    return (
        <div>
            <header className="flex h-16 w-full shrink-0 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="lg:hidden">
                            <AlignJustify className="h-6 w-6" />
                            <span className="sr-only">Toggle Navigation Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link className="mr-6 font-bold text-4xl hidden lg:flex" href={"/"}>
                            <h3>Ujira.</h3>
                        </Link>
                        <div className="grid gap-2 py-6">
                            {
                                menuItems.map((menuItem) =>
                                    menuItem.show ?
                                        <Link
                                            key={menuItem.id || menuItem.label}
                                            href={menuItem.path} className="flex w-full items-center py-2 text-lg font-semibold"
                                        >
                                            {menuItem.label}
                                        </Link>
                                        : null
                                )
                            }
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SheetContent>
                </Sheet>
                <Link className="hidden font-bold text-4xl lg:flex mr-6" href={"/"}>
                    Ujira.
                </Link>
                <nav className="ml-auto hidden lg:flex gap-6 items-center">
                    {
                        menuItems.map((menuItem) => menuItem.show ?
                            <Link href={menuItem.path}
                                key={menuItem.id || menuItem.label}
                                className="group inline-flex h-9 w-max items-center rounded-md px-4 py-2 text-sm font-medium"
                                onClick={() => sessionStorage.removeItem("filterParams")}
                            >
                                {menuItem.label}
                            </Link>
                            : null)
                    }
                    <Moon
                        className="cursor-pointer mt-4 mb-4"
                        fill={theme === "light" ? "dark" : "dark"}
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    />
                    <UserButton afterSignOutUrl="/" />
                </nav>
            </header>
        </div>
    );
}

export default Header;