"use client";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const tabs = [
  { text: "About", href: "" },
  { text: "Projects", href: "projects" },
  { text: "Blogs", href: "blogs" },
  { text: "Contact", href: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [selected, setSelected] = useState(
    tabs.find((tab) => `/${tab.href}` === pathname) || tabs[0],
  );

  return (
    <div className="mb-8 flex w-full flex-wrap items-center gap-1 bg-background md:gap-3">
      {tabs.map((tab, index) => (
        <Chip
          text={tab.text}
          href={tab.href}
          selected={selected.text === tab.text || pathname === `/${tab.href}`}
          setSelected={setSelected}
          key={index}
        />
      ))}
    </div>
  );
}

const Chip = ({
  text,
  href,
  selected,
  setSelected,
}: {
  text: string;
  href: string;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<{ text: string; href: string }>>;
}) => {
  return (
    <Link
      href={`/${href}`}
      onClick={() => setSelected({ text, href })}
      className={`${
        selected
          ? "text-background"
          : "text-foreground hover:bg-accent hover:text-accent-foreground"
      } relative rounded-md px-2.5 py-1.5 text-sm transition-colors`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-primary/80 to-primary"
        ></motion.span>
      )}
    </Link>
  );
};
