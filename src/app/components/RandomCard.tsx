import { FocusCards } from "@/app/components/ui/focus-cards";

export function RandomCard() {
  const cards = [
    {
        title: "Into the Woods",
        src: "/images/index-img/andres-jasso-PqbL_mxmaUE-unsplash (1).jpg",
      },
      {
        title: "Life in Bloom",
        src: "/images/index-img/anubhav-arora-g1vk_Bef2Xk-unsplash.jpg",
      },
      {
        title: "Flowing Free",
        src: "/images/index-img/domino-studio-164_6wVEHfI-unsplash.jpg",
      },
      {
        title: "Wilderness Awaits",
        src: "/images/index-img/ethan-haddox-QHGcADeeT00-unsplash.jpg",
      },
      {
        title: "Paths Unseen",
        src: "/images/index-img/jayson-hinrichsen-qLs4WYXqLNY-unsplash.jpg",
      },
      {
        title: "Code of the Wild",
        src: "/images/index-img/raul-hender-afc4HxPy2GM-unsplash (1).jpg",
      },
      {
        title: "Rise and Wander",
        src: "/images/index-img/patrick-hodskins-B6LFgATILWI-unsplash.jpg",
      },
      {
        title: "Echoes of Silence",
        src: "/images/index-img/maksim-larin-ezdrvzA1hZw-unsplash.jpg",
      },
  ];

  return<>
  <h1 className="text-6xl text-center content-center mb-8">TRENDING NOW</h1>
  <FocusCards cards={cards} /></>;
}
