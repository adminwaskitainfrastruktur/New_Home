"use client";

import { useEffect, useRef, useState } from "react";

/**
 * National asset map.
 *
 * The map itself is a standalone HTML document (public/maps/wki-asset-map.html)
 * that renders real Natural Earth geometry with d3-geo + topojson. It is NOT a
 * React component on purpose: d3 needs a measured container at script time, and
 * the pinned, integrity-checked CDN tags have to sit in a document <head>.
 *
 * Two rules this component enforces, both learned the hard way:
 *  1. Mount only when visible. A 0×0 iframe boots d3 and measures zero.
 *  2. Never render two instances of the same layer on one screen.
 *
 * Pin clicks arrive as a postMessage; wire `onSelect` to route to the detail page.
 */
export type MapLayer = "projects" | "equipment";

export type MapPin = {
  n: string;
  k: string;
  loc: string;
  lon: number;
  lat: number;
  st: string;
  pct: number;
};

export function AssetMap({
  layer,
  className,
  onSelect,
}: {
  layer: MapLayer;
  className?: string;
  onSelect?: (pin: MapPin) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!onSelect) return;
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "wki:pin" && e.data.layer === layer) onSelect(e.data.item as MapPin);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [layer, onSelect]);

  return (
    <div ref={hostRef} className={className ?? "h-[300px] w-full bg-shell lg:h-[500px]"}>
      {visible && (
        <iframe
          src={`/maps/wki-asset-map.html?layer=${layer}`}
          title={layer === "equipment" ? "Fleet deployment map" : "National project map"}
          className="block h-full w-full border-0"
        />
      )}
    </div>
  );
}

/** Navy rail that sits beside the map: tallies, bars, totals. */
export function MapRail({
  eyebrow,
  title,
  note,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  note: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 bg-navy p-5 text-white lg:p-8.5">
      <div>
        <p className="t-eyebrow flex items-center gap-2">
          <span className="h-[7px] w-[7px] shrink-0 animate-pulse rounded-full bg-green" />
          {eyebrow}
        </p>
        <h2 className="t-h3 mt-3 text-white">{title}</h2>
        <p className="t-body mt-2.5 text-[12.5px] text-white/65">{note}</p>
      </div>
      <div className="flex flex-col gap-3.5">{children}</div>
      {footer && (
        <div className="mt-auto border-t border-white/20 pt-4.5">{footer}</div>
      )}
    </div>
  );
}
