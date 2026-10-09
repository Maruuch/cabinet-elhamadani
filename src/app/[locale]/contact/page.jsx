'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from '@/lib/i18n';
import { CABINET } from '@/lib/cabinet.config';
import PageBackdrop from '@/components/ui/PageBackdrop';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function ContactPage({ params: { locale } }) {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const whatsappNumber = CABINET.contact.whatsapp.replace(/\D/g, '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/[FORMSPREE_ID]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden pt-[72px]">
      {/* Panorama de Casablanca, fixe derrière toute la page */}
      <PageBackdrop variant="casa" />
      {/* Hero */}
      <motion.section
        className="relative text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nous contacter
          </motion.h1>

          <motion.p
            className="text-xl text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Envoyez-moi un message ou appelez-moi directement pour discuter de vos besoins juridiques.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-[#0B1322]/55 border-2 border-white/10 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-8">Formulaire de contact</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all bg-white/[0.07] text-white placeholder-white/40 [color-scheme:dark]"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all bg-white/[0.07] text-white placeholder-white/40 [color-scheme:dark]"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all bg-white/[0.07] text-white placeholder-white/40 [color-scheme:dark]"
                    placeholder="+33 6 00 00 00 00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Service concerné
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all appearance-none bg-[#101B30] cursor-pointer text-white placeholder-white/40 [color-scheme:dark] [&>option]:bg-[#101B30] [&>option]:text-white"
                  >
                    <option value="">Sélectionnez un service</option>
                    {CABINET.services.map((service) => (
                      <option key={service.slug} value={service.title[locale] || service.title.fr}>
                        {service.title[locale] || service.title.fr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none bg-white/[0.07] text-white placeholder-white/40 [color-scheme:dark]"
                    placeholder="Décrivez votre situation..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                </motion.button>

                {success && (
                  <motion.div
                    className="bg-emerald-500/15 border border-emerald-400/40 rounded-lg p-4 text-emerald-200 text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="font-semibold">Message envoyé avec succès!</span>
                    <p className="text-sm mt-1">Je vous recontacterai très prochainement.</p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8">Nous joindre</h2>

            {/* Address Card */}
            <motion.div
              className="bg-[#0B1322]/55 border-2 border-white/10 rounded-xl p-6 hover:border-gold transition-colors duration-300 group"
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-4">
                <div className="text-4xl">📍</div>
                <div>
                  <h3 className="font-bold text-white mb-2">Adresse</h3>
                  <p className="text-white/80">
                    {CABINET.contact.adresse[locale] || CABINET.contact.adresse.fr || '[À COMPLÉTER]'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.a
              href={`mailto:${CABINET.contact.email}`}
              className="bg-[#0B1322]/55 border-2 border-white/10 rounded-xl p-6 hover:border-gold transition-colors duration-300 block group"
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-4">
                <div className="text-4xl">✉️</div>
                <div>
                  <h3 className="font-bold text-white mb-2">Email</h3>
                  <p className="text-gold font-semibold">
                    {CABINET.contact.email}
                  </p>
                </div>
              </div>
            </motion.a>

            {/* WhatsApp Card */}
            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-900/45 border-2 border-emerald-400/40 rounded-xl p-6 hover:border-green-400 transition-colors duration-300 block group"
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-4">
                <div className="text-4xl">💬</div>
                <div>
                  <h3 className="font-bold text-white mb-2">WhatsApp</h3>
                  <p className="text-emerald-200 font-semibold">
                    {CABINET.contact.whatsapp}
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Hours Card */}
            <motion.div
              className="bg-[#0B1322]/55 border-2 border-white/10 rounded-xl p-6 hover:border-gold transition-colors duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-4">
                <div className="text-4xl">🕐</div>
                <div>
                  <h3 className="font-bold text-white mb-3">Horaires</h3>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>Lundi - Vendredi: 9:00 - 18:00</li>
                    <li>Samedi: Sur rendez-vous</li>
                    <li>Dimanche: Fermé</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Carte Google Maps du cabinet (URL dans cabinet.config.js > contact.mapsEmbed) */}
            <div className="bg-[#0B1322]/55 border-2 border-white/10 rounded-xl overflow-hidden">
              <iframe
                src={CABINET.contact.mapsEmbed[locale] || CABINET.contact.mapsEmbed.fr}
                title={locale === 'ar' ? 'موقع المكتب على خرائط Google' : 'Localisation du cabinet sur Google Maps'}
                className="block w-full h-80"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <a
                href={CABINET.contact.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm font-semibold text-gold-light hover:text-white hover:bg-white/5 transition-colors duration-300"
              >
                <span>{locale === 'ar' ? 'فتح في خرائط Google' : 'Ouvrir dans Google Maps'}</span>
                <span aria-hidden="true">{locale === 'ar' ? '←' : '→'}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Bottom CTA */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600/20 border-t border-white/10 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contactez-moi maintenant sur WhatsApp
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Le moyen le plus rapide pour discuter de votre affaire
          </motion.p>

          <motion.a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-emerald-800 font-bold py-4 px-8 rounded-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">💬</span>
            <span>Ouvrir WhatsApp</span>
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
