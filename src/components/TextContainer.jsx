import { motion } from "framer-motion";

const TextContainer = ({ hoveredTile, defaultTitle, defaultSecondary }) => {
  return (
    <motion.div
      className="text-container"
      initial="hidden"
      animate="visible"
      key={hoveredTile ? hoveredTile.id : "default"}
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
    >
      <motion.div className="text-title">
        {hoveredTile ? hoveredTile.title : defaultTitle}
      </motion.div>
      <motion.div className="text-secondary">
        {hoveredTile ? hoveredTile.secondary : defaultSecondary}
      </motion.div>
      <motion.div className="image-link">
        {hoveredTile ? <span>Image: {hoveredTile.link}</span> : ""}
      </motion.div>
    </motion.div>
  );
};

export default TextContainer;
