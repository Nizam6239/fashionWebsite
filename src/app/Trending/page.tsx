"use client";
import React, {useState} from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { useCart } from "../context/CardContext"; // Import the Cart context
import { useSession } from "next-auth/react"; 
import {toast} from "react-hot-toast";// Import useSession for authentication
import image1 from "../../../public/images/categories-img/category1.png";
import image2 from "../../../public/images/categories-img/category2.png";
import image3 from "../../../public/images/categories-img/category3.png";
import image4 from "../../../public/images/categories-img/category4.png";
import image5 from "../../../public/images/categories-img/category5.png";
import image6 from "../../../public/images/categories-img/category6.png";
import image7 from "../../../public/images/categories-img/category7.png";
import image8 from "../../../public/images/categories-img/brands-for-him1.png";
import image9 from "../../../public/images/categories-img/brands-for-him2.png";
import image10 from "../../../public/images/categories-img/brands-for-him3.png";
import image11 from "../../../public/images/categories-img/brands-for-him4.png";
import image12 from "../../../public/images/categories-img/brands-for-him5.png";

const imgItems = [
  { id: 33, img: image1 },
  { id: 34, img: image2 },
  { id: 35, img: image3 },
  { id: 36, img: image4 },
  { id: 37, img: image5 },
  { id: 38, img: image6 },
  { id: 39, img: image7 },
  { id: 40, img: image8 },
  { id: 41, img: image9 },
  { id: 42, img: image10 },
  { id: 43, img: image11 },
  { id: 44, img: image12 },
];

const Page = () => {
    const { addToCart } = useCart();
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  
    const increment = (id: number) => {
      setQuantities((prev) => ({
        ...prev,
        [id]: (prev[id] || 1) + 1,
      }));
    };
  
    const handleAddToCart = async (item: {id : number, img : StaticImageData}) => {
      const quantity = quantities[item.id] || 1;
      if (isLoggedIn) {
        try {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: session?.user?.username,
              productId: item.id,
              quantity,
            }),
          });
  
          if (!response.ok) {
            throw new Error("Failed to add item to the cart");
          }
          addToCart({ ...item, quantity });
          toast.success("Successfully Added to Cart");
        } catch (err) {
          console.error("Error adding item to cart:", err);
          toast.error("Error adding item to cart");
        }
      } else {
        toast.error("You need to log in to add items to your cart.");
      }
    };

  return (
    <>
      <div className="flex justify-center content-center items-center">
        <h1 className="text-5xl text-yellow-600">TRENDING NOW</h1>
      </div>
      <div className="grid grid-cols-3 justify-center content-center">
        {imgItems.map((item) => (
          <div key={item.id} className="mt-8 mx-14">
            <Image
              src={item.img}
              alt={`Image ${item.id}`}
              height={400}
              width={400}
              className="rounded-3xl border-8 border-red-700 h-[600px] w-[570px]"
            />
            <button
              onClick={() => {
                increment(item.id);
                handleAddToCart(item);
              }}
              className={`mt-4 py-2 px-4 rounded ${
                isLoggedIn
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-700"
              }`}
            >
              {isLoggedIn ? "Add to Cart" : "Log in to Add Cart"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
