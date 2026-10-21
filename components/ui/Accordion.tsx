"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { FaqItem } from "@/lib/data/faq";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <dl className="w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="border-b border-moss">
            <dt>
              <button
                type="button"
                id={`faq-trigger-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left sm:py-8"
              >
                <span className="text-card-title font-bold uppercase leading-[1.6] transition-colors group-hover:text-moss-dark">
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden
                  className={`mt-1 size-5 shrink-0 text-moss transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </dt>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.dd
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex max-w-[65ch] flex-col items-start pb-6 sm:pb-8">
                    <p className="text-body">{item.answer}</p>
                    {item.link && (
                      <Link
                        href={item.link.href}
                        // Ink text with a moss underline: moss text on white is 3.4:1, short
                        // of the 4.5:1 that 18px text needs.
                        className="inline-flex min-h-11 items-center gap-1.5 text-body font-bold underline decoration-moss decoration-2 underline-offset-4 hover:text-moss-dark"
                      >
                        {item.link.label}
                        <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    )}
                  </div>
                </motion.dd>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </dl>
  );
}
