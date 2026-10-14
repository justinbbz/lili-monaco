/* Réglages du site Lili Monaco : seul fichier à modifier pour brancher l'agenda et le paiement.
   Voir RESERVATION-AGENDA.md (agenda) et worker/README.md (paiement Stripe).
   Les prix, durées et règles d'acompte et d'annulation sont dans data.js (relus sur Planity) ;
   vérification : node outils/verifier-prix.mjs */
window.LILI = {
  /* true = démonstration : créneaux d'exemple, aucun paiement réel, aucune demande envoyée. */
  DEMO_MODE: true,

  /* Agenda (Make → Google Agenda). Contrat décrit dans RESERVATION-AGENDA.md. */
  BOOKING_WEBHOOK: '',      // reçoit le rendez-vous (POST JSON) et crée l'événement horaire
  AVAILABILITY_URL: '',     // renvoie les créneaux déjà pris (GET ?from=AAAA-MM-JJ&to=AAAA-MM-JJ)

  /* Paiement de l'acompte.
     'demo'   : simulation claire, aucune carte demandée (état actuel)
     'stripe' : redirection vers Stripe Checkout via le Worker Cloudflare (worker/checkout.js)
     'none'   : pas de paiement en ligne, la demande est envoyée à l'agenda et l'acompte se règle au studio */
  PAYMENT_MODE: 'demo',
  CHECKOUT_ENDPOINT: '',    // ex. https://lili-monaco-paiement.<compte>.workers.dev/checkout

  /* Réservation. Planity : planning ouvert 3 mois à l'avance, créneaux de 30 min, aucun délai minimum
     (24 h ici par prudence : à ajuster). */
  MIN_NOTICE_HOURS: 24,
  MAX_DAYS_AHEAD: 90,
  SLOT_STEP_MIN: 30,
  MAX_TOTAL_MIN: 360,

  /* Studio. L'adresse exacte n'est donnée qu'après la réservation (comme sur sa fiche Planity). */
  PHONE_DISPLAY: '06 77 93 34 53',
  PHONE_TEL: '+33677933453',
  AREA: 'Dauphin (04)',
  ADDRESS: '385 chemin de Saint Jean, 04300 Dauphin',
  LAT: 43.90110,
  LNG: 5.77751,
  OWNER: 'Aurélie',
  BRAND: 'Lili Monaco'
};
