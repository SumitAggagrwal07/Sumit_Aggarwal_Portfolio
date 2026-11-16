import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { TiltSurface } from "@/components/TiltSurface";
import { SoundOnInteract } from "@/components/SoundOnInteract";

export const CredentialCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="h-full"
    >
      <TiltSurface className="p-6 sm:p-8 h-full flex flex-col justify-between border border-hairline/80 bg-surface/80">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ember font-medium">
              VERIFIED CREDENTIAL
            </span>
            <ShieldCheck className="w-4 h-4 text-ember/80" />
          </div>

          <h3 className="font-serif-italic text-2xl text-bone mb-2">
            {item.title}
          </h3>

          <p className="font-mono text-xs text-ash mb-1">
            Issuer: <span className="text-bone">{item.issuer}</span>
          </p>
          <p className="font-mono text-[11px] text-ash/80">
            Issued: {item.issueDate}
          </p>

          {item.validationId && (
            <p className="mt-3 font-mono text-[10px] text-ash/60 tracking-wider break-all">
              ID: {item.validationId}
            </p>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-hairline/60">
          <SoundOnInteract>
            <a
              href={item.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-ash hover:text-ember transition-colors"
            >
              <span>Verify credential</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </SoundOnInteract>
        </div>
      </TiltSurface>
    </motion.div>
  );
};
