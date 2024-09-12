import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import TileContainer from "./components/TileContainer";
import TextContainer from "./components/TextContainer";

const tilesData = [
  {
    id: 1,
    imgSrc: "/1.jpg",
    title: "1920s: The Jazz Age in New York",
    secondary:
      "In the 1920s, New York becomes the epicenter of the Jazz Age, with musicians like Louis Armstrong revolutionizing music and culture.",
    link: "NJ Alumni Columbia",
  },
  {
    id: 2,
    imgSrc: "/2.jpg",
    title: "1930s: Empire State Building Rises",
    secondary:
      "Despite the Great Depression, New York completes the iconic Empire State Building in 1931.",
    link: "Artsmia",
  },
  {
    id: 3,
    imgSrc: "/3.jpg",
    title: "1940s: New York Prepares for War",
    secondary:
      "As World War II looms, New York becomes a center of military and industrial effort.",
    link: "My Modern Met",
  },
  {
    id: 4,
    imgSrc: "/4.webp",
    title: "1950s: Birth of Abstract Expressionism",
    secondary:
      "New York’s art scene thrives with abstract expressionists like Jackson Pollock leading the charge.",
    link: "Britannica",
  },
  {
    id: 5,
    imgSrc: "/5.avif",
    title: "1960s: The Moon Landing Parade",
    secondary:
      "In 1969, New York celebrates America’s monumental achievement in space exploration with a parade for the Apollo 11 astronauts.",
    link: "The Atlantic",
  },
  {
    id: 6,
    imgSrc: "/6.jpg",
    title: "1970s: Blackout of 1977",
    secondary:
      "A massive blackout throws the city into chaos, symbolizing the struggles of 1970s New York.",
    link: "Rare Historical Photos",
  },
  {
    id: 7,
    imgSrc: "/7.jpg",
    title: "1980s: Birth of Hip-Hop",
    secondary:
      "Hip-hop culture is born in the Bronx, defining a new generation of music and culture.",
    link: "The Star",
  },
  {
    id: 8,
    imgSrc: "/8.webp",
    title: "1990s: Rebirth of Times Square",
    secondary:
      "Times Square transforms from a gritty area to a revitalized tourist destination.",
    link: "Business Insider",
  },
  {
    id: 9,
    imgSrc: "/9.webp",
    title: "2000s: Resilience After 9/11",
    secondary:
      "New York unites in recovery after the tragic events of September 11, 2001.",
    link: "NY Post",
  },
];

function App() {
  const [hoveredTile, setHoveredTile] = useState(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const defaultTitle = "Moments of New York";
  const defaultSecondary = "Key moments that have shaped New York’s identity";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setHoveredTile(tilesData[0]);
        setIsMobileOrTablet(true);
      } else {
        setHoveredTile(null);
        setIsMobileOrTablet(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container">
      <Navbar />
      <TileContainer
        tilesData={tilesData}
        hoveredTile={hoveredTile}
        setHoveredTile={setHoveredTile}
        isMobileOrTablet={isMobileOrTablet}
      />
      <TextContainer
        hoveredTile={hoveredTile}
        defaultTitle={defaultTitle}
        defaultSecondary={defaultSecondary}
      />
    </div>
  );
}

export default App;
