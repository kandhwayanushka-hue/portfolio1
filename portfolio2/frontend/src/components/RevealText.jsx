import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.1 },
  },
};

const word = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.17, 0.67, 0.29, 1.0] },
  },
};

const char = {
  hidden: { y: 60, opacity: 0, rotateX: -30 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.17, 0.67, 0.29, 1.0] },
  },
};

export default function RevealText({
  text,
  as = "h2",
  className = "",
  once = true,
  mode = "words",
  stagger = 0.035,
  ...rest
}) {
  const items = mode === "chars" ? text.split("") : text.split(" ");
  const variant = mode === "chars" ? char : word;
  const Tag = motion[as] || motion.h2;

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: mode === "chars" ? 0.2 : 0.3 }}
      variants={{ ...container, visible: { transition: { staggerChildren: stagger, delayChildren: 0.1 } } }}
      className={className}
      aria-label={text}
      {...rest}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={variant}
          className={mode === "chars" ? "inline-block" : "inline-block"}
          aria-hidden="true"
          style={mode === "chars" ? { whiteSpace: item === " " ? "pre" : undefined } : undefined}
        >
          {mode === "chars" && item === " " ? "\u00A0" : item}
          {mode === "words" && i < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
