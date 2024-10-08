export const menuVariants = {
    open: {
      clipPath: "inset(0% 0% 0% 0% round 10px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.1,
        staggerChildren: 0.05
      }
    },
    closed: {
      clipPath: "inset(10% 0% 95% 0% round 10px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.1,
        staggerChildren: 0.05
      }
    },
  };

export const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
    }
  },
  closed: {
      opacity: 0,
      y: 20,
      transition: {
          duration: 0.2
      }
  }
};