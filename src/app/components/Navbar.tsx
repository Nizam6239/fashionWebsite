"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HoveredLink, Menu, MenuItem } from "@/app/components/ui/navbar-menu";
import { cn } from "@/app/lib/utils";
import { Button } from "./ui/moving-border";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import image1 from "../../../public/custom.cart.fill.png";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CardContext";

const Navbar: React.FC<{ className?: string }> = ({ className }) => {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { totalQuantity } = useCart();
  const isLoggedIn = status === "authenticated";

  const handleCartClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("You need to log in to access the cart.");
    }
  };

  return (
    <div className="mb-36">
      <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 text-lg", className)}>
        <Menu setActive={setActive}>
          <MenuItem onClick={() => router.push('/')} setActive={setActive} active={active} item="Home"></MenuItem>
          <MenuItem setActive={setActive} active={active} item="Products">
            <div className="flex flex-col space-y-4 text-xl">
              <HoveredLink href="/product">For Him</HoveredLink>
              <HoveredLink href="/Forher">For Her</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Categories">
            <div className="flex flex-col space-y-4 text-xl">
              <HoveredLink href="/UnskibCateogeries">Unskippable Categories</HoveredLink>
              <HoveredLink href="/Trending">TRENDING NOW</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem onClick={() => router.push('/ContactUs')} setActive={setActive} active={active} item="ContactUs"></MenuItem>
        </Menu>
      </div>
      <div className="fixed top-12 right-10 z-50 text-lg">
        {isLoggedIn ? (
          <Button onClick={() => router.push('/sign-out')}>{session?.user?.username}</Button>
        ) : (
          <Button onClick={() => router.push('/sign-up')}>Login</Button>
        )}
      </div>
      <div>
        {isLoggedIn && (
          <span>
            {totalQuantity > 0 && (
              <span className="fixed top-12 right-60 bg-red-500 text-white text-xs rounded-full px-2 py-1 z-50">
                {totalQuantity}
              </span>
            )}
          </span>
        )}
      </div>
      <div className="fixed top-16 right-64 z-50 text-lg">
        <Link href="/cart">
          <Image src={image1} alt="" height={40} width={40} />
        </Link>
      </div>
      <div className="fixed top-16 right-64 z-50 text-lg">
        <Link href={isLoggedIn ? "/cart" : "#"} onClick={handleCartClick}>
          <Image src={image1} alt="Cart Icon" height={40} width={40} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
