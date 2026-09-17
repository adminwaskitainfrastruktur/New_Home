import Image from "next/image";
import Link from "next/link";
import { footerNav, utilityInfo } from "@/lib/nav";
import { Container } from "../ui/Layout";

const socials = ["Instagram", "Facebook", "X", "TikTok"];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="pb-7 pt-12 lg:pt-[84px]">
        <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-11">
          <div>
            {/* White chip: the logo is full-colour and must not sit on navy. */}
            <div className="inline-flex bg-white px-3 py-2.5">
              <Image
                src="/brand/logo-wki.png"
                alt="PT Waskita Karya Infrastruktur"
                width={519}
                height={404}
                className="h-[42px] w-auto"
              />
            </div>
            <a
              href={utilityInfo.mapsUrl}
              className="mt-5 block text-[13px] leading-[1.72] text-white/65 hover:text-green"
            >
              {utilityInfo.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </a>
            <p className="mt-4 font-mono text-[12px] leading-[1.8] text-white/65">
              {utilityInfo.phone}
              <br />
              {utilityInfo.email}
            </p>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <p className="t-eyebrow mb-4">{group.heading}</p>
              {group.links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="block py-[7px] text-[13px] leading-none text-white/65 hover:text-green"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5.5 lg:mt-14">
          <span className="font-mono text-[11.5px] text-white/55">
            &copy; {new Date().getFullYear()} PT Waskita Karya Infrastruktur. All rights reserved.
          </span>
          <div className="flex flex-wrap gap-[18px]">
            {socials.map((s) => (
              <a key={s} href="#" className="font-mono text-[11.5px] text-white/55 hover:text-green">
                {s}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
