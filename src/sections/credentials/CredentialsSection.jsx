import React from "react";
import { credentials } from "@/content/credentials";
import { CredentialCard } from "./CredentialCard";

export const CredentialsSection = () => {
  return (
    <section id="credentials" className="py-20 sm:py-24 px-6 lg:px-12 border-t border-hairline/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-ember mb-2 block font-medium">
            04 · ACCREDITATIONS
          </span>
          <h2 className="font-serif-italic text-4xl sm:text-5xl md:text-6xl text-bone">
            Global Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((item, index) => (
            <CredentialCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
