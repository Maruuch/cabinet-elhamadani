'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from '@/lib/i18n';
import { CABINET } from '@/lib/cabinet.config';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function ServicesPage({ params: { locale } }) {
  const t = useTranslations('services');
  const whatsappNumber = CABINET.contact.whatsapp.replace(/\D/g, '');

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-navy via-navy-900 to-navy text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute -top-20 -right-20 w-96 h-96 bg-gold rounded-full filter blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-gold rounded-full filter blur-3xl"
            animate={{ scale: [1.15, 1, 1.15], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-block bg-gold/20 border border-gold rounded-full px-6 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Nos expertises
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero_title')}
          </motion.h1>

          <motion.p
            className="text-xl text-slate-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Des solutions juridiques adaptées à chaque situation
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            {CABINET.services.map((service, idx) => (
              <motion.div
                key={service.slug}
                id={service.slug}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  className="h-full bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-gold transition-all duration-300 flex flex-col overflow-hidden relative"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy via-gold to-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-navy via-gold to-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <motion.div
                    className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {service.icon}
                  </motion.div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-navy mb-4">
                    {service.title[locale] || service.title.fr}
                  </h3>

                  <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                    {service.description[locale] || service.description.fr}
                  </p>

                  {/* How it works section */}
                  <div className="border-t border-slate-200 pt-6 mb-8">
                    <h4 className="text-sm font-semibold text-navy uppercase tracking-widest mb-4">
                      Comment ça marche
                    </h4>
                    <ul className="space-y-3">
                      {[
                        '[À COMPLÉTER] - Étape 1',
                        '[À COMPLÉTER] - Étape 2',
                        '[À COMPLÉTER] - Étape 3',
                      ].map((step, sidx) => (
                        <motion.li
                          key={sidx}
                          className="flex items-start gap-3 text-slate-600 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: sidx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 bg-gold rounded-full" />
                          </span>
                          <span>{step}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href={`https://wa.me/${whatsappNumber}?text=Bonjour, je suis intéressé par votre service: ${service.title[locale] || service.title.fr}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Demander via WhatsApp</span>
                    <span>→</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Bottom CTA Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-navy via-navy-800 to-navy text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full filter blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Vous ne trouvez pas votre service ?
          </motion.h2>

          <motion.p
            className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contactez-moi directement pour discuter de votre situation spécifique et trouver une solution adaptée.
          </motion.p>

          <motion.div
            className="flex justify-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Prendre rendez-vous
            </motion.button>
            <motion.button
              className="btn-outline-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nous contacter
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
