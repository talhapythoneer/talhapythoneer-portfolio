"use client";

import { useState } from "react";

/**
 * Renders a country flag as an image (flagcdn) rather than an emoji.
 * Flag emoji don't render on Windows/some browsers (they show the country
 * code like "US"), so we use SVG images for consistent cross-platform flags.
 */
export default function Flag({
  code,
  className = "",
}: {
  code: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const cc = (code || "").toLowerCase();
  const valid = /^[a-z]{2}$/.test(cc);

  if (!valid || failed) {
    return <span className={className}>🌍</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/${cc}.svg`}
      alt={code.toUpperCase()}
      className={`inline-block object-cover rounded-[3px] ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
