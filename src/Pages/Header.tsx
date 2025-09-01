import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { cn } from "@/lib/utils";

function Header() {
    const [isAtTop, setIsAtTop] = useState(true);

    const [openSearch, setOpenSearch] = useState(false);

    useEffect(() => {
        function handleScrollTop() {
            setIsAtTop(window.scrollY === 0);
        }

        window.addEventListener("scroll", handleScrollTop);

        return () => window.removeEventListener("scroll", handleScrollTop);
    }, []);

    return (
        <header
            className={clsx(
                "top-0 flex h-16 w-full items-center justify-between px-4 transition-all duration-100 lg:fixed",
                !isAtTop ? "lg:h-17 lg:bg-black" : "lg:h-22",
            )}
        >
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <ButtonX className={`${openSearch && "hidden"}`}></ButtonX>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Chủ đề</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className={`flex gap-4 ${openSearch && "w-full"}`}>
                <div
                    className={`relative flex w-full items-center ${!openSearch && "hidden"}`}
                >
                    <Search className="absolute left-4" />
                    <Input
                        type="text"
                        placeholder="Tìm kiếm phim, diễn viên"
                        className="w-full p-6 pl-14"
                    />
                </div>
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setOpenSearch(!openSearch)}
                >
                    <Search className="text-red-600" />
                </button>
            </div>
            {/* <Input type="text" placeholder="Tìm kiếm phim, diễn viên" /> */}
        </header>
    );
}

function ButtonX({ className }: React.ComponentProps<"button">) {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <button
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
            className={cn("cursor-pointer space-y-1", className)}
        >
            <span
                className={clsx(
                    "block h-0.5 w-5 border-0 bg-black transition-transform duration-300",
                    openMenu &&
                        "translate-y-0.75 rotate-45 border-red-600 bg-red-600",
                )}
            ></span>
            <span
                className={clsx(
                    "block h-0.5 w-3.5 border-0 bg-black transition-transform duration-300",
                    openMenu && "hidden rotate-45",
                )}
            ></span>
            <span
                className={clsx(
                    "block h-0.5 w-5 border-0 bg-black transition-transform duration-300",
                    openMenu &&
                        "-translate-y-0.75 -rotate-45 border-red-600 bg-red-600",
                )}
            ></span>
        </button>
    );
}

export default Header;
