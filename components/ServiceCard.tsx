import Link from "next/link";

import { ArrowIcon } from "@/components/icons";
import { ServiceIcon } from "@/components/ServiceIcon";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href="/services"
      className="group flex flex-col rounded-3xl border border-espresso/10 bg-white/60 p-7 transition-shadow hover:shadow-lg"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blush text-rose transition-colors group-hover:bg-honey group-hover:text-white">
        <ServiceIcon icon={service.icon} />
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-widest text-honey">
        {service.category} · {service.duration}
      </p>
      <h3 className="mt-2 font-serif text-xl font-medium leading-snug">
        {service.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-cocoa">
        {service.description}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-espresso/10 pt-4">
        <span className="text-sm font-semibold">{service.price}</span>
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}