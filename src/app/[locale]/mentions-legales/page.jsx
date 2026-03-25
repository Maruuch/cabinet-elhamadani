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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function MentionsLegalesPage({ params: { locale: localeProp } }) {
  const locale = localeProp || 'fr'
  const t = useTranslations('mentions');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <motion.section
        className="relative bg-gradient-to-br from-navy via-navy-900 to-navy text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute -top-20 right-20 w-96 h-96 bg-gold rounded-full filter blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Mentions légales
          </motion.h1>

          <motion.p
            className="text-lg text-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Informations légales et données relatives au cabinet
          </motion.p>
        </div>
      </motion.section>

      {/* Content */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Section 1: Éditeur */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-navy mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Éditeur du site
            </h2>

            <div className="bg-slate-50 border-l-4 border-gold rounded-lg p-8 space-y-4">
              <div>
                <h3 className="font-bold text-navy mb-2">Nom du cabinet</h3>
                <p className="text-slate-700">
                  {CABINET.avocat.nom[locale] || CABINET.avocat.nom.fr || '[À COMPLÉTER]'}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-2">Adresse</h3>
                <p className="text-slate-700">
                  {CABINET.contact.adresse[locale] || CABINET.contact.adresse.fr || '[À COMPLÉTER]'}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-2">Numéro de SIRET</h3>
                <p className="text-slate-700">[À COMPLÉTER]</p>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-2">Numéro d'inscription au barreau</h3>
                <p className="text-slate-700">[À COMPLÉTER]</p>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-2">Email</h3>
                <a href={`mailto:${CABINET.contact.email}`} className="text-gold hover:text-gold-600 font-semibold">
                  {CABINET.contact.email}
                </a>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-2">Téléphone</h3>
                <p className="text-slate-700">{CABINET.contact.whatsapp || '[À COMPLÉTER]'}</p>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Hébergement */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-navy mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Hébergement
            </h2>

            <div className="bg-slate-50 border-l-4 border-gold rounded-lg p-8 space-y-4">
              <div>
                <h3 className="font-bold text-navy mb-2">Prestataire d'hébergement</h3>
                <p className="text-slate-700">[À COMPLÉTER]</p>
                <p className="text-sm text-slate-600 mt-2">
                  Adresse du serveur: [À COMPLÉTER]
                </p>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-2">Service d'hébergement</h3>
                <p className="text-slate-700">[À COMPLÉTER]</p>
              </div>

              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <p className="text-slate-600 text-sm italic">
                  Ce site est hébergé sur une infrastructure sécurisée et conforme aux normes de protection des données personnelles.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Protection des données */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-navy mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Protection des données personnelles
            </h2>

            <div className="bg-slate-50 border-l-4 border-gold rounded-lg p-8 space-y-4">
              <div>
                <h3 className="font-bold text-navy mb-2">Conformité RGPD</h3>
                <p className="text-slate-700">
                  Ce site respecte les dispositions du Réglement Général sur la Protection des Données (RGPD) et de la loi Informatique et Libertés.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-2">Collecte de données</h3>
                <p className="text-slate-700">
                  Les données personnelles collectées via les formulaires sont utilisées exclusivement pour répondre à votre demande. [À COMPLÉTER]
                </p>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-2">Droits des utilisateurs</h3>
                <ul className="text-slate-700 space-y-2 ml-6">
                  <li className="list-disc">Droit d'accès à vos données</li>
                  <li className="list-disc">Droit de rectification</li>
                  <li className="list-disc">Droit de suppression</li>
                  <li className="list-disc">Droit à la portabilité</li>
                  <li className="list-disc">Droit à l'oubli</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-2">Responsable de traitement</h3>
                <p className="text-slate-700">
                  {CABINET.avocat.nom[locale] || CABINET.avocat.nom.fr || '[À COMPLÉTER]'} - {CABINET.contact.email}
                </p>
              </div>

              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <p className="text-slate-600 text-sm">
                  Pour toute question concernant vos données personnelles, veuillez nous contacter à: {' '}
                  <a href={`mailto:${CABINET.contact.email}`} className="text-gold font-semibold hover:text-gold-600">
                    {CABINET.contact.email}
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 4: Propriété intellectuelle */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold text-navy mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-gold rounded-full" />
              Propriété intellectuelle
            </h2>

            <div className="bg-slate-50 border-l-4 border-gold rounded-lg p-8 space-y-4">
              <div>
                <h3 className="font-bold text-navy mb-2">Droits d'auteur</h3>
                <p className="text-slate-700">
                  Tous les contenus présents sur ce site (textes, images, graphiques, logos) sont la propriété exclusive du cabinet ou de ses partenaires. [À COMPLÉTER]
                </p>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-2">Utilisation du contenu</h3>
                <p className="text-slate-700">
                  Toute reproduction, distribution ou transmission du contenu de ce site est interdite sans autorisation préalable écrite. [À COMPLÉTER]
                </p>
              </div>

              <div>
                <h3 className="font-bold text-navy mb-2">Cookies</h3>
                <p className="text-slate-700">
                  Ce site utilise des cookies pour améliorer votre expérience utilisateur. [À COMPLÉTER]
                </p>
              </div>

              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <p className="text-slate-600 text-sm italic">
                  © {new Date().getFullYear()} {CABINET.avocat.nom[locale] || CABINET.avocat.nom.fr || '[Cabinet]'}. Tous droits réservés.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Back Home Link */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8 border-t border-slate-200"
          >
            <Link href="/">
              <motion.button
                className="inline-flex items-center gap-2 text-gold hover:text-gold-600 font-semibold transition-colors duration-300"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>←</span>
                <span>Retour à l'accueil</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Note */}
      <motion.section
        className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-navy/5 to-gold/5 border-t border-navy/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600 text-sm">
            Ces mentions légales peuvent être mises à jour à tout moment. La dernière mise à jour remonte au {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
