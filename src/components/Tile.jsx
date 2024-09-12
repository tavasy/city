import { motion } from "framer-motion";

const Tile = ({
  tile,
  index,
  hoveredTile,
  isMobileOrTablet,
  setHoveredTile,
  scrollToTile,
}) => {
  const isDesktop = window.innerWidth > 1024;
  const tileVariants = (index) => ({
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: isDesktop ? (index % 2 === 0 ? -15 : 15) : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: isDesktop ? (index % 2 === 0 ? -15 : 15) : 0,
      transition: { duration: 0.5 },
    },
  });

  return (
    <motion.div
      className={`tile ${hoveredTile === tile ? "hovered" : ""}`}
      onClick={() => {
        if (isMobileOrTablet) {
          scrollToTile(document.querySelector(`#tile-${tile.id}`));
          setHoveredTile(tile);
        }
      }}
      onMouseEnter={() => !isMobileOrTablet && setHoveredTile(tile)}
      id={`tile-${tile.id}`}
      variants={tileVariants(index)}
    >
      <img src={tile.imgSrc} alt={`Tile ${tile.id}`} />
    </motion.div>
  );
};

export default Tile;
