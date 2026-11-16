import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, ArrowUpRight, FileDown } from "lucide-react";
import { connectChannels } from "@/content/connectChannels";
import { SoundOnInteract } from "@/components/SoundOnInteract";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-28 px-6 lg:px-12 border-t border-hairline/40 bg-surface/30">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest text-ember mb-4 block font-medium"
        >
          05 · INITIATE CONVERSATION
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif-italic text-5xl sm:text-6xl md:text-8xl text-bone leading-[0.95] mb-6"
        >
          Let's build something together.
        </motion.h2>

        <p className="font-mono text-xs sm:text-sm text-ash max-w-xl mb-12 uppercase tracking-wider">
          Currently open to full-time engineering roles, backend systems design, and high-impact distributed web architectures.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <SoundOnInteract>
            <a
              href={connectChannels.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-hairline/90 bg-surface/90 hover:border-ember/60 hover:bg-raised text-bone text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-md group"
            >
              <MessageCircle className="w-4 h-4 text-ember group-hover:scale-110 transition-transform" />
              <span>Chat on WhatsApp</span>
            </a>
          </SoundOnInteract>

          <SoundOnInteract>
            <a
              href={connectChannels.email.href}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-bone text-canvas hover:bg-ember hover:text-bone text-xs font-mono uppercase tracking-wider font-semibold transition-colors duration-200 shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Send an email</span>
            </a>
          </SoundOnInteract>

          <SoundOnInteract>
            <a
              href={connectChannels.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-hairline bg-surface/90 hover:bg-raised text-bone text-xs font-mono uppercase tracking-wider font-medium transition-colors duration-200"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </SoundOnInteract>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-hairline/60 w-full">
          {connectChannels.socials.map((social) => (
            <SoundOnInteract key={social.platform}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-ash hover:text-bone transition-colors"
              >
                <span>{social.platform}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ember/80" />
              </a>
            </SoundOnInteract>
          ))}
        </div>
      </div>
    </section>
  );
};
