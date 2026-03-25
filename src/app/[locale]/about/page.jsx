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
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function AboutPage({ params: { locale } }) {
  const t = useTranslations('about');

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Banner */}
      <motion.section
        className="relative bg-gradient-to-br from-navy via-navy to-navy-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-10 right-20 w-96 h-96 bg-gold rounded-full filter blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-block bg-gold/20 border border-gold rounded-full px-6 py-2 mb-6">
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                Cabinet juridique
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {CABINET.avocat.nom[locale] || CABINET.avocat.nom.fr}
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-gold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {CABINET.avocat.titre[locale] || CABINET.avocat.titre.fr}
          </motion.p>

          <motion.div
            className="flex justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="btn-primary">
              Prendre rendez-vous
            </button>
            <button className="btn-outline-white">
              Nous contacter
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Photo & Bio Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Photo Placeholder */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border-4 border-gold aspect-square flex items-center justify-center min-h-[500px]">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-30">📷</div>
                <p className="text-slate-500 text-lg font-semibold">[À COMPLÉTER]</p>
                <p className="text-slate-400 text-sm mt-2">Photo du cabinet</p>
              </div>
            </div>
            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold rounded-lg opacity-20 -z-10"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          {/* Bio Text */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-4xl font-bold text-navy mb-8">
              Qui suis-je ?
            </h2>

            <p className="text-slate-700 text-lg leading-relaxed">
              {t('p1')}
            </p>

            <p className="text-slate-700 text-lg leading-relaxed">
              {t('p2')}
            </p>

            <p className="text-slate-700 text-lg leading-relaxed">
              {t('p3')}
            </p>

            <motion.button
              className="btn-primary mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Découvrir nos services
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-navy text-center mb-4"
          >
            Nos valeurs
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-600 text-center mb-16 text-lg"
          >
            Les principes qui guident notre pratique
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {t.raw('values').map((value, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-navy/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-8 hover:border-gold/50 transition-colors duration-300">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-navy mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-navy text-center mb-4"
          >
            Parcours professionnel
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-600 text-center mb-16 text-lg"
          >
            Une trajectoire d'excellence et d'engagement
          </motion.p>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-navy via-gold to-navy opacity-30" />

            <div className="space-y-12">
              {[
                { year: '[À COMPLÉTER]', title: 'Formation académique', desc: '[À COMPLÉTER]' },
                { year: '[À COMPLÉTER]', title: 'Inscription au barreau', desc: '[À COMPLÉTER]' },
                { year: '[À COMPLÉTER]', title: 'Expérience 1', desc: '[À COMPLÉTER]' },
                { year: '[À COMPLÉTER]', title: 'Expérience 2', desc: '[À COMPLÉTER]' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8 items-center`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-white border-2 border-navy/20 rounded-lg p-6 hover:border-gold/50 transition-colors duration-300">
                      <div className="text-sm font-semibold text-gold mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-navy mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="w-2/12 flex justify-center">
                    <motion.div
                      className="w-6 h-6 bg-gold rounded-full border-4 border-navy z-10 shadow-lg"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                    />
                  </div>

                  {/* Empty space */}
                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-navy via-navy-800 to-navy text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full filter blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Besoin de conseils juridiques ?
          </motion.h2>

          <motion.p
            className="text-xl text-slate-200 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Je suis à votre disposition pour discuter de vos besoins et vous proposer les meilleures solutions.
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
