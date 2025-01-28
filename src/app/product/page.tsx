"use client"
import React, {useState} from 'react'
import Image from 'next/image'
import { useSession } from "next-auth/react"; 
import { StaticImageData } from "next/image";
import { useCart } from "../context/CardContext";
import { toast } from "react-hot-toast";
import image1 from '../../../public/images/products-img/men/jeans1.png'
import image2 from '../../../public/images/products-img/men/jeans2.png'
import image3 from '../../../public/images/products-img/men/jeans3.png'
import image4 from '../../../public/images/products-img/men/jeans4.png'
import image5 from '../../../public/images/products-img/men/joggers1.png'
import image6 from '../../../public/images/products-img/men/joggers2.png'
import image7 from '../../../public/images/products-img/men/joggers3.png'
import image8 from '../../../public/images/products-img/men/joggers4.png'
import image9 from '../../../public/images/products-img/men/shirt1.png'
import image10 from '../../../public/images/products-img/men/shirt2.png'
import image11 from '../../../public/images/products-img/men/shirt3.png'
import image12 from '../../../public/images/products-img/men/shirt4.png'
import image13 from '../../../public/images/products-img/men/shoe1.png'
import image14 from '../../../public/images/products-img/men/shoe2.png'
import image15 from '../../../public/images/products-img/men/shoe3.png'
import image16 from '../../../public/images/products-img/men/shoe4.png'

const imgItems = [
  { id: 17, img: image1 },
  { id: 18, img: image2 },
  { id: 19, img: image3 },
  { id: 20, img: image4 },
  { id: 21, img: image5 },
  { id: 22, img: image6 },
  { id: 23, img: image7 },
  { id: 24, img: image8 },
  { id: 25, img: image9 },
  { id: 26, img: image10 },
  { id: 27, img: image11 },
  { id: 28, img: image12 },
  { id: 29, img: image13 },
  { id: 30, img: image14 },
  { id: 31, img: image15 },
  { id: 32, img: image16 },
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
    
            const addedItem = await response.json();
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
      <div className="text-center mt-16">
        <h1 className="text-4xl">
          FOR <span className="text-red-600">Him</span>
        </h1>
        <hr className="w-[250px] mx-auto border-t border-gray-400 mt-2" />
      </div>
      <div className="grid grid-cols-4 gap-12 mt-16 mx-20">
        {imgItems.map((item) => (
          <div key={item.id} className="flex flex-col">
            <Image
              src={item.img}
              alt={`Product ${item.id}`}
              width={400}
              height={450}
              className="rounded-lg h-[450px] w-[400px]"
            />
            <button
              onClick={() => {
                increment(item.id);
                handleAddToCart(item);
              }}
              className={`mt-4 py-2 px-2 rounded content-start ${
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
}

export default Page;
