import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Tile from "./Tile";

const TileContainer = ({
  tilesData,
  hoveredTile,
  setHoveredTile,
  isMobileOrTablet,
}) => {
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);

  const scrollToTile = (tileElement) => {
    tileElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

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
  }, [tilesData, setHoveredTile]);

  return (
    <motion.div
      className="tiles-container"
      ref={containerRef}
      onMouseLeave={() => !isMobileOrTablet && setHoveredTile(null)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {tilesData.map((tile, index) => (
        <Tile
          key={tile.id}
          tile={tile}
          index={index}
          hoveredTile={hoveredTile}
          setHoveredTile={setHoveredTile}
          isMobileOrTablet={isMobileOrTablet}
          scrollToTile={scrollToTile}
        />
      ))}
    </motion.div>
  );
};

export default TileContainer;
