import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  X,
  Instagram,
  ArrowUpRight,
  Send,
} from "lucide-react";
import { Portal } from "./ui/portal";
import { useBackButton } from "../hooks/useBackButton";

const contacts = [
  {
    name: "GitHub",
    icon: Github,
    link: "https://github.com/devdeepsaha",
    handle: "@devdeepsaha",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    link: "https://www.linkedin.com/in/devdeep-saha-3b4570260/",
    handle: "@devdeep-saha",
  },
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://instagram.com/devdeepsaha",
    handle: "@devdeepsaha",
  },
];

export function ContactTile() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleCloseModal = useCallback(() => setIsOpen(false), []);
  useBackButton(isOpen, handleCloseModal);

  const handleEmail = (e: React.MouseEvent) => {
    e.stopPropagation();

    const email = "devdeep120205@gmail.com";
    const subject = encodeURIComponent("Project Inquiry");
    const body = encodeURIComponent(
      "Hi Devdeep,\n\nI came across your portfolio and I'd like to discuss a project with you.\n\nBest,\n[Your Name]",
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* --- TILE FACE --- */}
      <motion.div
        className="bg-card border border-border rounded-[2rem] overflow-hidden cursor-pointer group h-full min-h-[140px] relative p-6 flex flex-col justify-between transition-all hover:border-primary/50"
        whileHover={{ scale: 1.01 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-between items-start z-10">
          <div className="bg-primary/10 p-2.5 rounded-full text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
            <Mail size={24} />
          </div>
          <div className="bg-secondary text-secondary-foreground text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
            Active
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-4">
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-[0.9] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
            Get In
          </h3>
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-[0.9] text-primary mt-0.5">
            Touch
          </h3>
        </div>
      </motion.div>

      {/* --- MODAL --- */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[9999] flex items-center justify-center p-0 md:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                // FIXED: Changed justify-center to justify-start on mobile to prevent top-cutoff
                className="bg-card border-none md:border border-border text-card-foreground rounded-none md:rounded-[2.5rem] p-6 pt-20 sm:p-10 max-w-3xl w-full relative h-[100dvh] md:h-auto overflow-y-auto no-scrollbar md:shadow-2xl flex flex-col justify-start md:justify-center"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-3 bg-secondary hover:bg-secondary/80 rounded-full text-foreground transition-colors z-20 shadow-md"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>

                {/* Header */}
                <div className="mb-8 relative z-10">
                  <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tighter uppercase leading-none mb-3">
                    Let's
                    <br />
                    <span className="text-primary">Connect</span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-md font-medium">
                    Have an idea? I'm always open to discussing new projects.
                  </p>
                </div>

                {/* --- MAIN EMAIL CARD (Minimal) --- */}
                <div className="mb-6 group shrink-0">
                  <div
                    onClick={handleEmail}
                    className="relative bg-secondary/20 border border-border hover:border-primary/50 hover:bg-secondary/30 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4 sm:gap-5 w-full">
                      <div className="p-3 sm:p-4 bg-background rounded-2xl text-primary shadow-sm group-hover:scale-110 transition-transform shrink-0">
                        <Mail size={28} className="sm:w-8 sm:h-8" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                          Send me a message
                        </h3>
                        <p className="text-[15px] sm:text-xl md:text-2xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight truncate">
                          devdeep120205@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold uppercase text-xs sm:text-sm tracking-wide hover:opacity-90 active:scale-95 transition-all w-full sm:w-auto justify-center mt-2 sm:mt-0">
                      <Send size={16} />
                      <span>Send Email</span>
                    </div>
                  </div>
                </div>

                {/* --- SOCIAL GRID --- */}
                {/* FIXED: Added mt-auto on mobile to push grid down if there's extra space */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto md:mt-0 shrink-0 pb-8 md:pb-0">
                  {contacts.map((contact, index) => (
                    <motion.a
                      key={contact.name}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-3 bg-secondary/10 p-6 rounded-[2rem] border border-border transition-all group hover:border-primary/50 hover:bg-secondary/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      <div className="p-3 bg-background rounded-full text-foreground group-hover:text-primary transition-colors shadow-sm group-hover:scale-110 duration-300">
                        <contact.icon size={24} />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-lg leading-none mb-1 text-foreground group-hover:text-primary transition-colors">
                          {contact.name}
                        </h3>
                        <div className="flex items-center justify-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary/80 transition-colors">
                          <span>{contact.handle}</span>
                          <ArrowUpRight size={10} />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}