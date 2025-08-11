"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type GalleryItem = {
  src: string;
  alt: string;
  href?: string;
  size?: "square" | "horizontal" | "vertical"; // optional layout hint
};

export default function AboutGallery({ items }: { items: GalleryItem[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-xl font-semibold">Gallery</h2>
      </div>

      <div className="grid grid-cols-4 auto-rows-[150px] gap-[2px]">
        {items.map((it, i) => (
          <Tile key={i} {...it} />
        ))}
      </div>
    </section>
  );
}

function Tile({ src, alt, href, size = "square" }: GalleryItem) {
  let colSpan = "col-span-1";
  let rowSpan = "row-span-1";

  if (size === "horizontal") {
    colSpan = "col-span-2";
  }
  if (size === "vertical") {
    rowSpan = "row-span-2";
  }

  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden ${colSpan} ${rowSpan}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 50vw, 25vw"
      />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}
