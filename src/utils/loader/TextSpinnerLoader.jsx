import { motion, useAnimate } from "framer-motion";
import "./styles.css";
import { useEffect } from "react";

export default function TextSpinnerLoader() {
  const text = "THANK YOU FOR WAITING. ALMOST THERE.";
  const characters = text.split("");

  const radius = 80;
  const fontSize = "12px";
  const letterSpacing = 10;

  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateLoader = async () => {
      const letterAnimation = [];
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 0 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" }
        ]);
      });
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 1 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" }
        ]);
      });
      animate(letterAnimation, {
        ease: "linear",
        repeat: Infinity
      });
      animate(
        scope.current,
        { rotate: 360 },
        { duration: 6, ease: "linear", repeat: Infinity }
      );
    };
    animateLoader();
  }, []);

  return (
    <div className="circle-container">
        <motion.div ref={scope} className="circle" style={{ width: radius * 2 }}>
          <p aria-label={text} />
          <p aria-hidden="true" className="text">
            {characters.map((ch, i) => (
              <motion.span
                key={i}
                className={`letter letter-${i}`}
                style={{
                  transformOrigin: `0 ${radius}px`,
                  transform: `rotate(${i * letterSpacing}deg)`,
                  fontSize
                }}
              >
                {ch}
              </motion.span>
            ))}
          </p>
        </motion.div>
    </div>
  );
}