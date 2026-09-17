"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  equipment,
  equipmentCategories,
  statusLabel,
  type EquipmentCategory,
} from "@/data/equipment";
import { thumb } from "@/data/assets";
import { clsx } from "../ui/clsx";

/**
 * Fleet catalogue.
 *
 * Column priority is deliberate and is the whole point of the table: at mobile
 * the middle three columns (capacity, location, units) drop and the row keeps
 * NAME + STATUS, because availability is what a renting customer came for.
 * Do not "simplify" this to hiding everything after column two.
 */
const grid = "grid gap-3.5 grid-cols-[1fr_max-content] lg:grid-cols-[1.7fr_.85fr_.85fr_.7fr_.6fr]";
const midCols = "hidden lg:block";

export function FleetTable() {
  const [filter, setFilter] = useState<EquipmentCategory | "all">("all");

  const rows = useMemo(
    () => (filter === "all" ? equipment : equipment.filter((e) => e.category === filter)),
    [filter]
  );

  return (
    <>
      <div className="flex flex-wrap gap-2.5">
        {equipmentCategories.map((c) => {
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id as EquipmentCategory | "all")}
              aria-pressed={active}
              className={clsx(
                "whitespace-nowrap border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors",
                active
                  ? "border-navy bg-navy text-white"
                  : "border-navy/20 text-navy hover:border-green hover:text-green"
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="mt-7 lg:mt-11">
        <div className={clsx(grid, "border-b border-navy/20 pb-2.5")}>
          <span className="t-cap">Equipment</span>
          <span className={clsx("t-cap", midCols)}>Capacity / class</span>
          <span className={clsx("t-cap", midCols)}>Location</span>
          <span className={clsx("t-cap", midCols)}>Units</span>
          <span className="t-cap text-right">Status</span>
        </div>

        {rows.map((e) => (
          <div
            key={e.id}
            className={clsx(grid, "items-center border-b border-navy/10 py-4 transition-colors last:border-b-0 hover:bg-green/5")}
          >
            <span className="flex min-w-0 items-center gap-3.5">
              <Image
                src={thumb(e.photo)}
                alt=""
                width={62}
                height={44}
                className="h-11 w-[62px] shrink-0 border border-navy/15 object-cover"
              />
              <span className="min-w-0">
                <span className="t-h3 block text-[15px]">{e.name}</span>
                <span className="t-cap mt-1.5 block">{e.kicker}</span>
              </span>
            </span>
            <span className={clsx("t-body text-[13px]", midCols)}>{e.spec}</span>
            <span className={clsx("t-body text-[13px]", midCols)}>{e.location}</span>
            <span className={clsx("font-mono text-[15px] font-bold text-navy", midCols)}>
              {e.units}
            </span>
            <span
              className={clsx(
                "t-cap whitespace-nowrap text-right",
                e.status === "available" && "text-green",
                e.status === "maintenance" && "text-red"
              )}
            >
              {statusLabel(e)}
            </span>
          </div>
        ))}
      </div>

      <p className="t-cap mt-5.5 max-w-[44em] leading-[1.7]">
        Unit counts and availability are indicative and updated weekly. Specifications follow
        manufacturer data sheets; exact model and configuration are confirmed at quotation. Rental
        rates are issued on request and depend on duration, location and whether operator and fuel
        are included.
      </p>
    </>
  );
}
