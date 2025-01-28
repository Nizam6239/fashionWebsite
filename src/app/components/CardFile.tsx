"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/app/components/ui/apple-cards-carousel";

export function CardFile() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl text-center pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Our Latest Product
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Fashion",
    title: "Chic and Confident",
    src: "/images/index-img/anton-levin-P8prss71psk-unsplash.jpg",
    content: <DummyContent />,
  },
  {
    category: "Lifestyle",
    title: "Romance in Style",
    src: "/images/index-img/bogdan-glisik-2WgOPYJuPsU-unsplash (1).jpg",
    content: <DummyContent />,
  },
  {
    category: "Glamour",
    title: "Effortlessly Elegant",
    src: "/images/index-img/calvin-lupiya--yPg8cusGD8-unsplash.jpg",
    content: <DummyContent />,
  },
  {
    category: "Photography",
    title: "Candid in Couture",
    src: "/images/index-img/dillon-kydd-npTIcA--Q4Y-unsplash.jpg",
    content: <DummyContent />,
  },
  {
    category: "Travel",
    title: "Stylish Journeys",
    src: "/images/index-img/mohammad-hossein-mirzagol-KmvSlRg2R5s-unsplash.jpg",
    content: <DummyContent />,
  },
  {
    category: "Couples",
    title: "Together in Vogue",
    src: "/images/merlin-img/merlin-2.jpg",
    content: <DummyContent />,
  },
  {
    category: "Fashion",
    title: "Bold and Beautiful",
    src: "/images/merlin-img/merlin-1.jpg",
    content: <DummyContent />,
  },
  {
    category: "Editorial",
    title: "Moments in Style",
    src: "/images/merlin-img/merlin-5.jpg",
    content: <DummyContent />,
  },
  {
    category: "Lifestyle",
    title: "Love in Layers",
    src: "/images/merlin-img/merlin-6.jpg",
    content: <DummyContent />,
  },
  {
    category: "Couples",
    title: "Classic Duo Aesthetic",
    src: "/images/merlin-img/judeus-samson-0UECcInuCR4-unsplash.jpg",
    content: <DummyContent />,
  },
  {
    category: "Fashion",
    title: "Golden Glow Glam",
    src: "/images/index-img/darko-mitev-c5t_j1zlk1Y-unsplash.jpg",
    content: <DummyContent />,
  },
  {
    category: "Style",
    title: "Sunset Silhouettes",
    src: "/images/index-img/tamara-harhai-A5nuQ2Lvg40-unsplash.jpg",
    content: <DummyContent />,
  },
  {
    category: "Couples",
    title: "Timeless Romance",
    src: "/images/index-img/brooke-cagle-dGK3ynaDNCI-unsplash.jpg",
    content: <DummyContent />,
  },
];
