import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const tilesData = [
  {
    id: 1,
    imgSrc: "/1.jpg",
    title: "hello there",
    secondary: "A memorable moment 1",
  },
  {
    id: 2,
    imgSrc: "/2.jpg",
    title: "New York City Moments 2",
    secondary: "A memorable moment 2",
  },
  {
    id: 3,
    imgSrc: "/3.jpg",
    title: "New York City Moments 3",
    secondary: "A memorable moment 3",
  },
  {
    id: 4,
    imgSrc: "/4.jpg",
    title: "New York City Moments 4",
    secondary: "A memorable moment 4",
  },
  {
    id: 5,
    imgSrc: "/5.jpg",
    title: "New York City Moments 5",
    secondary: "A memorable moment 5",
  },
  {
    id: 6,
    imgSrc: "/6.webp",
    title: "New York City Moments 6",
    secondary: "A memorable moment 6",
  },
  {
    id: 7,
    imgSrc: "/7.webp",
    title: "New York City Moments 7",
    secondary: "A memorable moment 7",
  },
];

function App() {
  const [hoveredTile, setHoveredTile] = useState(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const containerRef = useRef(null);
  let scrollTimeout = useRef(null);

  const defaultTitle = "Moments of New York";
  const defaultSecondary = "Significant city's moments";

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

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        const containerCenter = container.offsetWidth / 2;

        let closestTile = null;
        let closestDistance = Infinity;

        tilesData.forEach((tile) => {
          const tileElement = document.querySelector(`#tile-${tile.id}`);
          const tileRect = tileElement.getBoundingClientRect();
          const tileCenter = tileRect.left + tileRect.width / 2;

          const distanceToCenter = Math.abs(containerCenter - tileCenter);

          if (distanceToCenter < closestDistance) {
            closestDistance = distanceToCenter;
            closestTile = tile;
          }
        });

        if (closestTile) {
          const tileElement = document.querySelector(`#tile-${closestTile.id}`);
          tileElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });

          setHoveredTile(closestTile);
        }
      }, 150);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [tilesData]);

  const scrollToTile = (tile) => {
    tile.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div className="container">
      <div className="navbar-container">
        <div className="navbar-text">Moments</div>
      </div>

      <div
        className="tiles-container"
        ref={containerRef}
        onMouseLeave={() => !isMobileOrTablet && setHoveredTile(null)}
      >
        {tilesData.map((tile) => (
          <div
            key={tile.id}
            className={`tile ${hoveredTile === tile ? "hovered" : ""}`}
            onClick={() => {
              if (isMobileOrTablet) {
                scrollToTile(document.querySelector(`#tile-${tile.id}`));
                setHoveredTile(tile);
              }
            }}
            onMouseEnter={() => !isMobileOrTablet && setHoveredTile(tile)}
            id={`tile-${tile.id}`}
          >
            <img src={tile.imgSrc} alt={`Tile ${tile.id}`} />
          </div>
        ))}
      </div>

      <div className="text-container">
        <div className="text-title">
          {hoveredTile ? hoveredTile.title : defaultTitle}
        </div>
        <div className="text-secondary">
          {hoveredTile ? hoveredTile.secondary : defaultSecondary}
        </div>
      </div>
    </div>
  );
}

export default App;
