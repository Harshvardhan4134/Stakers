import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12 border-t border-white/5 relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/[0.01] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <motion.div 
          className="text-xs text-muted-foreground font-mono"
          whileHover={{ scale: 1.05 }}
        >
          © 2024 Stakers. ALL RIGHTS RESERVED.
        </motion.div>
        
        <div className="flex gap-6 text-xs text-muted-foreground">
          {[
            { href: "#", label: "Privacy" },
            { href: "#", label: "Terms" },
            { href: "#", label: "Twitter" },
          ].map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              className="hover:text-foreground transition-colors relative"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-[1px] bg-white"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
