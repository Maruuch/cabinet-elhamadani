'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from '@/lib/i18n';
import { CABINET } from '@/lib/cabinet.config';

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
    <div className="bg-white overflow-hidden">
      {/* Hero */}
      <motion.section
        className="relative bg-gradient-to-br from-navy via-navy-900 to-navy text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-10 right-20 w-96 h-96 bg-gold rounded-full filter blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

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
            className="text-xl text-slate-200"
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
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white border-2 border-slate-200 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-navy mb-8">Formulaire de contact</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    placeholder="+33 6 00 00 00 00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Service concerné
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all appearance-none bg-white cursor-pointer"
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
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
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
                    className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-center"
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
            <h2 className="text-3xl font-bold text-navy mb-8">Nous joindre</h2>

            {/* Address Card */}
            <motion.div
              className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-gold transition-colors duration-300 group"
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-4">
                <div className="text-4xl">📍</div>
                <div>
                  <h3 className="font-bold text-navy mb-2">Adresse</h3>
                  <p className="text-slate-600">
                    {CABINET.contact.adresse[locale] || CABINET.contact.adresse.fr || '[À COMPLÉTER]'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.a
              href={`mailto:${CABINET.contact.email}`}
              className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-gold transition-colors duration-300 block group"
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-4">
                <div className="text-4xl">✉️</div>
                <div>
                  <h3 className="font-bold text-navy mb-2">Email</h3>
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
              className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 hover:border-green-400 transition-colors duration-300 block group"
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-4">
                <div className="text-4xl">💬</div>
                <div>
                  <h3 className="font-bold text-navy mb-2">WhatsApp</h3>
                  <p className="text-green-600 font-semibold">
                    {CABINET.contact.whatsapp}
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Hours Card */}
            <motion.div
              className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-gold transition-colors duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="flex gap-4">
                <div className="text-4xl">🕐</div>
                <div>
                  <h3 className="font-bold text-navy mb-3">Horaires</h3>
                  <ul className="text-slate-600 text-sm space-y-1">
                    <li>Lundi - Vendredi: 9:00 - 18:00</li>
                    <li>Samedi: Sur rendez-vous</li>
                    <li>Dimanche: Fermé</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Maps Placeholder */}
            <motion.div
              className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden h-80"
              whileHover={{ y: -4 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-navy to-navy-800 flex items-center justify-center text-white relative">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-lg font-semibold mb-2">[GOOGLE_MAPS_EMBED_URL]</p>
                  <p className="text-slate-300 text-sm">Intégration Google Maps à compléter</p>
                </div>
                <iframe
                  src="[GOOGLE_MAPS_EMBED_URL]"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'none' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Bottom CTA */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white"
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
            className="inline-flex items-center justify-center gap-3 bg-white text-green-600 font-bold py-4 px-8 rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-lg"
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
