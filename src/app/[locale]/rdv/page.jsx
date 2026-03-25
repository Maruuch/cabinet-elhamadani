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

export default function RdvPage({ params: { locale } }) {
  const t = useTranslations('rdv');
  const [formData, setFormData] = useState({
    service: '',
    mode: '',
    name: '',
    phone: '',
    email: '',
    date: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({
          ...formData,
          subject: `Demande de rendez-vous - ${formData.service}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          service: '',
          mode: '',
          name: '',
          phone: '',
          email: '',
          date: '',
          notes: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-navy via-navy-900 to-navy text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-20 right-32 w-96 h-96 bg-gold rounded-full filter blur-3xl"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 360] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-96 h-96 bg-gold rounded-full filter blur-3xl"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6 inline-block"
          >
            📅
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('title')}
          </motion.h1>

          <motion.p
            className="text-xl text-slate-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Réservez votre consultation juridique en quelques clics
          </motion.p>

          {/* Guarantee Badges */}
          <motion.div
            className="flex justify-center gap-4 sm:gap-6 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { icon: '✅', text: 'Confidentiel' },
              { icon: '⚡', text: 'Rapide' },
              { icon: '🛡️', text: 'Sécurisé' },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 flex items-center gap-2"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-sm font-semibold">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
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
          {/* Form Section */}
          <motion.div variants={itemVariants}>
            <div className="sticky top-32">
              <h2 className="text-4xl font-bold text-navy mb-8">
                Formulaire de réservation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selector - Pills */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-4">
                    Sélectionnez un service
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CABINET.services.map((service) => (
                      <motion.button
                        key={service.slug}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            service: service.title[locale] || service.title.fr,
                          }))
                        }
                        className={`p-3 rounded-lg border-2 font-semibold transition-all duration-300 ${
                          formData.service === (service.title[locale] || service.title.fr)
                            ? 'border-gold bg-gold/10 text-gold'
                            : 'border-slate-300 text-slate-600 hover:border-gold/50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mr-2">{service.icon}</span>
                        {service.title[locale] || service.title.fr}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Mode Selector - Pills */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-4">
                    Mode de consultation
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'office', label: '🏢 Cabinet', emoji: '🏢' },
                      { value: 'video', label: '📹 Visio', emoji: '📹' },
                      { value: 'phone', label: '☎️ Téléphone', emoji: '☎️' },
                    ].map((mode) => (
                      <motion.button
                        key={mode.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, mode: mode.value }))
                        }
                        className={`p-3 rounded-lg border-2 font-semibold transition-all duration-300 text-center ${
                          formData.mode === mode.value
                            ? 'border-navy bg-navy/10 text-navy'
                            : 'border-slate-300 text-slate-600 hover:border-navy/50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-2xl mb-1">{mode.emoji}</div>
                        <div className="text-xs">{mode.label.split(' ')[1]}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Name */}
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

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    placeholder="+33 6 00 00 00 00"
                  />
                </div>

                {/* Email */}
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

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Date préférée
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Notes supplémentaires
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                    placeholder="Détails supplémentaires..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-gold to-yellow-500 hover:from-gold-600 hover:to-yellow-600 text-navy font-bold py-4 px-6 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Envoi en cours...' : 'Réserver ma consultation'}
                </motion.button>

                {/* Success State */}
                {submitted && (
                  <motion.div
                    className="bg-green-50 border-2 border-green-400 rounded-lg p-4 flex items-start gap-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div
                      className="text-4xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                    >
                      ✅
                    </motion.div>
                    <div>
                      <p className="font-bold text-green-700">
                        Rendez-vous demandé!
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        Je vous recontacterai très prochainement pour confirmer.
                      </p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Calendar Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Google Calendar */}
            <div className="sticky top-32">
              <h2 className="text-3xl font-bold text-navy mb-6">
                Réservez directement via Google Agenda
              </h2>

              <div
                id="google-calendar-container"
                data-calendar-url="[GOOGLE_CALENDAR_URL]"
                className="bg-gradient-to-br from-navy to-navy-800 rounded-xl p-12 text-center text-white h-96 flex flex-col items-center justify-center relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="text-7xl mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📅
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3">
                    Google Calendar
                  </h3>

                  <p className="text-slate-300 mb-6 text-sm max-w-xs">
                    [GOOGLE_CALENDAR_EMBED]
                  </p>

                  <p className="text-slate-400 text-xs italic">
                    Votre agenda sera connectée à mon système de disponibilités
                  </p>
                </div>
              </div>

              {/* Contact Reminders */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-bold text-navy mb-4">
                  Autres moyens de me contacter
                </h3>

                {/* WhatsApp */}
                <motion.a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 hover:border-green-400 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-bold text-navy">WhatsApp</p>
                      <p className="text-sm text-slate-600">
                        {CABINET.contact.whatsapp}
                      </p>
                    </div>
                  </div>
                </motion.a>

                {/* Email */}
                <motion.a
                  href={`mailto:${CABINET.contact.email}`}
                  className="block bg-white border-2 border-slate-200 rounded-lg p-4 hover:border-gold transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <p className="font-bold text-navy">Email</p>
                      <p className="text-sm text-gold font-semibold">
                        {CABINET.contact.email}
                      </p>
                    </div>
                  </div>
                </motion.a>

                {/* Hours */}
                <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🕐</span>
                    <div>
                      <p className="font-bold text-navy mb-2">Horaires</p>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>Lun-Ven: 9:00 - 18:00</li>
                        <li>Sam: Sur RDV</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Guarantee Bar */}
      <motion.section
        className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-navy/5 to-gold/5 border-y border-navy/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: '🔒',
                title: 'Confidentialité garantie',
                desc: 'Tous vos documents sont sécurisés',
              },
              {
                icon: '⚖️',
                title: 'Expertise juridique',
                desc: 'Conseils adaptés à votre situation',
              },
              {
                icon: '⏱️',
                title: 'Respect des délais',
                desc: 'Suivi actif de votre dossier',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="font-bold text-navy">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
