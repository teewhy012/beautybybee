import Link from "next/link";

import { ArrowIcon } from "@/components/icons";
import { ServiceIcon } from "@/components/ServiceIcon";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href="/services"
      className="group flex flex-col rounded-[2rem] border border-espresso/10 bg-bone/70 p-7 transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-espresso/15 text-cocoa transition-colors group-hover:bg-espresso group-hover:text-cream">
        <ServiceIcon icon={service.icon} />
      </div>
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-cocoa">
        {service.category} · {service.duration}
      </p>
      <h3 className="mt-3 font-serif text-xl font-medium leading-snug">
        {service.name}
      </h3>
      <p className="editorial-text mt-3 flex-1 text-sm text-cocoa">
        {service.description}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-espresso/10 pt-5">
        <span className="text-sm font-semibold">{service.price}</span>
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}