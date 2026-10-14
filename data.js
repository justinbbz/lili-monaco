/* Données issues de la page publique Planity de Lili Monaco (14/10/2026) : services actifs, prix, durées, horaires, avis.
   Vérification : node outils/verifier-prix.mjs (compare ce fichier à outils/planity-snapshot.json). */
window.LM = {
 "hours": {
  "0": null,
  "1": null,
  "2": [
   "09:00",
   "18:00"
  ],
  "3": [
   "09:00",
   "18:00"
  ],
  "4": [
   "09:00",
   "18:00"
  ],
  "5": [
   "09:00",
   "18:00"
  ],
  "6": [
   "09:00",
   "12:00"
  ]
 },
 "step": 30,
 "policy": {
  "depositPct": 40,
  "lateCancelHours": 48,
  "lateCancelHoursPackage": 168,
  "lateArrivalMin": 15
 },
 "groups": [
  {
   "id": "sourcils",
   "title": "Sourcils",
   "kicker": "Maquillage permanent",
   "photo": 27,
   "intro": "Une ligne naturelle, élégante et discrète : chaque tracé est pensé pour sublimer ce que vous avez déjà, pas pour transformer artificiellement.",
   "retNote": "Retouche fixatrice entre 4 et 8 semaines après la première séance ; retouche annuelle uniquement si nécessaire, après l’envoi d’une photo.",
   "items": [
    {
     "id": "microblading",
     "pid": "-NEfEOE1f5Vf6WzQtbk4",
     "name": "Microblading 3.0, poils à poils",
     "min": 120,
     "price": 210,
     "desc": "Méthode créée par Lili Monaco : une pigmentation manuelle poil par poil, sans effet tatouage, pour structurer une ligne de sourcils naturelle, élégante et discrète. Sur sourcils jamais pigmentés. Retouche fixatrice obligatoire entre 4 et 8 semaines.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "softbrows-poudre",
     "pid": "-OCKrHoEEyySbQtG12_k",
     "name": "Softbrows, effet poudré",
     "min": 150,
     "price": 220,
     "desc": "Un effet subtil, naturel et poudré, adapté à tous types de peaux et de sourcils. Sur sourcils jamais pigmentés. Retouche obligatoire entre 4 et 6 semaines, puis entretien entre 18 et 24 mois (12 à 18 mois sur peaux grasses).",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "combobrows",
     "pid": "-NlPJUms6Z1wE6EAFTZ3",
     "name": "Combobrows, hairstroke + softbrows",
     "min": 180,
     "price": 300,
     "desc": "Le mélange des deux techniques : des poils très fins pour un rendu hyper réaliste, un softbrows pour intensifier. Sur sourcils jamais pigmentés, pour tous types de peaux sauf les peaux grasses. Retouche obligatoire entre 4 et 8 semaines, puis tous les 18 à 24 mois.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "hairstroke",
     "pid": "-OoOJ_r_NwBzz0lo-41n",
     "name": "Hairstroke",
     "min": 180,
     "price": 290,
     "desc": "Une technique avancée, réalisée à la machine, pour recréer un sourcil naturel et fondu : un effet poil réaliste et indétectable, y compris en cas de restructuration marquée. Sur sourcils jamais pigmentés ailleurs.",
     "retouche": false,
     "call": true,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "correction",
     "pid": "-NlPO-3W8vVt8xersgDo",
     "name": "Correction, pigmentation réalisée ailleurs",
     "min": 120,
     "price": 250,
     "desc": "Une correction est possible dans la mesure du possible : envoyez par message une photo claire face à la lumière, un diagnostic décidera de la technique à appliquer.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ret-microblading",
     "pid": "-NEfETVMvHRzZCZ1qrHa",
     "name": "Retouche fixatrice, Microblading 3.0",
     "min": 90,
     "price": 80,
     "desc": "À réaliser obligatoirement entre 4 et 8 semaines après la première prestation.",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "ret-softbrows",
     "pid": "-OoOI_HWY0JeOVB1tuJw",
     "name": "Retouche fixatrice, Softbrows",
     "min": 120,
     "price": 80,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "ret-combo",
     "pid": "-O5ExCXt50qKX4buT3yu",
     "name": "Retouche fixatrice, Combobrows",
     "min": 150,
     "price": 90,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "ret-hairstroke",
     "pid": "-OoOP5PuOfwzIeuImfUj",
     "name": "Retouche fixatrice, Hairstroke",
     "min": 150,
     "price": 90,
     "desc": "Généralement entre 4 et 8 semaines après la première séance.",
     "retouche": true,
     "call": true,
     "cancelH": 48
    },
    {
     "id": "ret-correction",
     "pid": "-NlPO_rtA6xCLIIzyzm3",
     "name": "Retouche fixatrice, Correction",
     "min": 90,
     "price": 80,
     "desc": "À réaliser obligatoirement entre 4 et 8 semaines après la première prestation.",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "ret-annuelle-micro",
     "pid": "-NEfEWdSpURRJeBamgS_",
     "name": "Retouche annuelle, Microblading & Softbrows",
     "min": 120,
     "price": 150,
     "desc": "À partir de 12 mois après la première retouche, si la pigmentation est atténuée de plus de 60 %. Envoyez d’abord une photo pour être conseillée.",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "ret-annuelle-combo",
     "pid": "-OoOR8a3brabY8H_Vo3m",
     "name": "Retouche annuelle, Combobrows & Hairstroke",
     "min": 150,
     "price": 190,
     "desc": "À partir de 12 mois après la première retouche, si la pigmentation est atténuée de plus de 60 %. Envoyez d’abord une photo pour être conseillée.",
     "retouche": true,
     "call": false,
     "cancelH": 48
    }
   ]
  },
  {
   "id": "levres",
   "title": "Lèvres",
   "kicker": "Maquillage permanent",
   "photo": 12,
   "intro": "Un teint de lèvres naturel, repensé : un voile de pigment qui réveille la couleur sans effet maquillé.",
   "retNote": "Retouche fixatrice entre 4 et 8 semaines après la première séance.",
   "items": [
    {
     "id": "lips-blushing",
     "pid": "-NEfGiH_QOjMXBR-Rx8A",
     "name": "Lips blushing / Softlips, effet très naturel",
     "min": 180,
     "price": 280,
     "desc": "Un voile de pigment déposé dans les lèvres pour réveiller leur teinte naturelle, corriger les petites irrégularités et redonner de l’éclat au sourire. Un résultat lumineux, sans effet maquillé trop intense.",
     "retouche": false,
     "call": true,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ret-lips",
     "pid": "-NEfGkBcsWneopCNA6da",
     "name": "Retouche fixatrice, Softlips / Lips blushing",
     "min": 120,
     "price": 80,
     "desc": "À réaliser entre 4 et 8 semaines après la première prestation.",
     "retouche": true,
     "call": true,
     "cancelH": 48
    },
    {
     "id": "ret-lips-annuelle",
     "pid": "-NlOPmlmyHzgBg3uDLtA",
     "name": "Retouche annuelle, Softlips / Lips blushing (déjà cliente)",
     "min": 120,
     "price": 190,
     "desc": "À réaliser tous les 1 à 2 ans, voire plus.",
     "retouche": true,
     "call": true,
     "cancelH": 48
    }
   ]
  },
  {
   "id": "regard",
   "title": "Regard",
   "kicker": "Maquillage permanent",
   "photo": 10,
   "intro": "L’intralash, ou ras de cils : une pigmentation très légère à la base des cils pour un regard naturellement intensifié.",
   "retNote": "Retouche fixatrice entre 4 et 6 semaines après la première séance.",
   "items": [
    {
     "id": "intralash-sup",
     "pid": "-NlPQpSzceiZjbrzREtB",
     "name": "Intralash supérieur (ras de cils)",
     "min": 60,
     "price": 120,
     "desc": "Une impression de cils plus denses et d’un regard plus profond, sans trait visible : la ligne des cils est pigmentée très subtilement, selon la forme de vos yeux, la densité de vos cils et votre carnation.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "intralash-inf",
     "pid": "-NyLGAU5ISs_zr3sL5DN",
     "name": "Intralash inférieur",
     "min": 60,
     "price": 90,
     "desc": "",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ret-intralash",
     "pid": "-NlPR5k8BylqQLkjpo2o",
     "name": "Retouche fixatrice, Intralash sup / inf",
     "min": 60,
     "price": 60,
     "desc": "À effectuer entre 4 et 6 semaines après la première prestation.",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "ret-intralash-annuelle",
     "pid": "-NlPROXKc6iA6YLfWr2R",
     "name": "Retouche annuelle, Intralash sup / inf (déjà cliente)",
     "min": 60,
     "price": 90,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    }
   ]
  },
  {
   "id": "lift",
   "title": "Korean lash & brow lift",
   "kicker": "Rehaussement",
   "photo": 28,
   "intro": "Relever les cils et les sourcils dès la racine : un regard plus ouvert, des cils visiblement plus longs et plus recourbés.",
   "items": [
    {
     "id": "klash-teinture",
     "pid": "-OSzdJH17YE-oEGUllHm",
     "name": "Korean lash lift + teinture + soin botox",
     "min": 90,
     "price": 60,
     "desc": "Le rehaussement coréen relève les cils dès la racine, avec un effet lift très propre. Effet visible jusqu’à 8 semaines selon le cycle naturel des cils. Un sérum d’entretien est offert à la fin de la séance.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "klash-soin",
     "pid": "-OSzengMuHVMnPPuYSlB",
     "name": "Korean lash lift + soin botox",
     "min": 60,
     "price": 50,
     "desc": "Le rehaussement coréen sans teinture : des cils recourbés dès la racine, visiblement plus longs. Un sérum d’entretien est offert à la fin de la séance.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "klash-inf",
     "pid": "-OcB33SNuGQG2b_HyQrp",
     "name": "Korean lash lift cils inférieurs + soin botox",
     "min": 45,
     "price": 30,
     "desc": "Offrez à vos cils inférieurs la courbure qu’ils méritent.",
     "retouche": false,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "unlift",
     "pid": "-OmQhHe2kzeJTirjikk8",
     "name": "Unlift + teinture + soin",
     "min": 60,
     "price": 65,
     "desc": "Un service correctif pour rattraper ou annuler un rehaussement raté : cils trop frisés, courbés à l’extrême ou pliés.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "brow-lift-mapping",
     "pid": "-OQNO8eQph6OOTzUjner",
     "name": "Brow lift + mapping + teinture + soin botox",
     "min": 90,
     "price": 60,
     "desc": "La restructuration des sourcils par lamination : poils disciplinés, étoffés et liftés, avec une teinture adaptée à votre carnation. Recommandé toutes les 6 à 8 semaines.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "brow-lift-ligne",
     "pid": "-OQNPKExpx3ChlHt_pyF",
     "name": "Brow lift + création de ligne + soin botox",
     "min": 60,
     "price": 50,
     "desc": "Le brow lift avec création de ligne : sourcils disciplinés, étoffés et liftés. Recommandé toutes les 6 à 8 semaines.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "teinture-mapping",
     "pid": "-OQNSTNw_W4eOxzKBdDy",
     "name": "Teinture sourcils + mapping",
     "min": 45,
     "price": 30,
     "desc": "",
     "retouche": false,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "teinture-cils",
     "pid": "-OpEIpYhYUOUIfEeleSx",
     "name": "Teinture cils",
     "min": 30,
     "price": 10,
     "desc": "Idéal pour les blondes ou pour des cils plus foncés sans mascara.",
     "retouche": false,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "epil-creation",
     "pid": "-NlPMewpJ28OtYYKbPWX",
     "name": "Épilation des sourcils, création de ligne",
     "min": 30,
     "price": 20,
     "desc": "Restructuration et nettoyage de votre ligne de sourcils naturelle.",
     "retouche": false,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "epil-entretien",
     "pid": "-NlPMwiXlv8-iUQW5Tpo",
     "name": "Épilation des sourcils, entretien mensuel",
     "min": 30,
     "price": 10,
     "desc": "",
     "retouche": false,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "pack-complet",
     "pid": "-OVIAstZ7yiYCuywwv31",
     "name": "Pack : Korean lash lift + brow lift + mapping + teintures + soins botox",
     "min": 150,
     "price": 105,
     "desc": "Le pack complet : des sourcils redéfinis et un regard agrandi au naturel. 10 € de réduction si vous ne souhaitez pas de teinture.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "pack-lash",
     "pid": "-OckKNFCdMJ9uXDJZgp5",
     "name": "Pack : Korean lash lift sup + inf + teintures + soins botox",
     "min": 90,
     "price": 80,
     "desc": "Le rehaussement des cils supérieurs et inférieurs pour ouvrir le regard.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    }
   ]
  },
  {
   "id": "extensions",
   "title": "Extensions de cils",
   "kicker": "Poses sur mesure",
   "photo": 22,
   "intro": "Chaque extension est posée sur mesure : courbure, longueur et diamètre adaptés à vos cils et à la forme de vos yeux. Venez les yeux démaquillés.",
   "retNote": "Les retouches se font à 2, 3 ou 4 semaines selon la pose ; à partir de 5 semaines, elles sont comptées en pose complète.",
   "items": [
    {
     "id": "ext-classique",
     "pid": "-NEfH5aR428C7PQPNQwA",
     "name": "La Classique, pose cils à cils",
     "min": 120,
     "price": 80,
     "desc": "La pose naturelle pour celles qui veulent rester soft : plus de longueur, plus d’intensité, un effet mascara parfaitement appliqué.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ext-mixte",
     "pid": "-NEfHCZ3aNx7Y-M213Si",
     "name": "Pose mixte (hybride)",
     "min": 120,
     "price": 85,
     "desc": "Le cil à cil et le volume russe léger combinés : un rendu équilibré, plus fourni qu’un cil à cil et moins qu’un volume. Retouche conseillée toutes les 3 semaines.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ext-volume-russe",
     "pid": "-NEfHKQFGjUinlyBj8IW",
     "name": "Volume russe",
     "min": 120,
     "price": 90,
     "desc": "De très fines extensions posées en petits bouquets : plus de densité, de profondeur et d’intensité, tout en restant légères et confortables.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ext-girly",
     "pid": "-Om9nD9IyYYbd5ahYMlO",
     "name": "La Girly",
     "min": 90,
     "price": 60,
     "desc": "Nouvelle pose du studio, anciennement la pose BéBé : un travail sur la partie externe du regard pour une légère extension de longueur et un regard subtilement étiré. Se marie avec les extensions du bas (Lower lash).",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ext-poupee",
     "pid": "-Om9yY1iGNaX3LDYmlL1",
     "name": "La Poupée",
     "min": 150,
     "price": 95,
     "desc": "Un regard ouvert, lumineux et très féminin : des longueurs irrégulières créent de jolis pics qui ressortent, structurés par des cils plus courts.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ext-glamour",
     "pid": "-OmA9svVTc8jxs1N_941",
     "name": "La Glamour",
     "min": 150,
     "price": 110,
     "desc": "Une pose intense et sophistiquée : des pics plus longs entourés de cils plus fournis, pour du volume, du relief et un effet très glamour.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ext-muse",
     "pid": "-OrnLU-GJYFpjqnDWsGX",
     "name": "La Muse",
     "min": 120,
     "price": 105,
     "desc": "Pose signature et exclusive, inspirée des effets du Moyen-Orient : des longueurs très étirées et une extrême finesse pour allonger le regard sans l’alourdir. Déclinée en Doll, Squirrel ou Cat eyes selon la forme des yeux.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ext-captivante",
     "pid": "-NEfHSkCB1ZWxb4yy5zy",
     "name": "La Captivante, effet Lami Lash",
     "min": 120,
     "price": 115,
     "desc": "De fines pointes de cils très définies pour un regard lifté, étiré et hypnotique, proche d’un rehaussement mais avec plus de longueur et de structure.",
     "retouche": false,
     "call": true,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ext-angel",
     "pid": "-OqHJX0o1rumEeGzAyWz",
     "name": "Angel Lift Signature",
     "min": 150,
     "price": 89,
     "desc": "Des extensions posées sur un rehaussement coréen : effet lift, entretiens espacés, extensions invisibles. Une pose créée par Lili Monaco. Prix de lancement : 89 € au lieu de 119 €.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ext-angel-intense",
     "pid": "-OsAwfcF4pYnpUIPP3Ul",
     "name": "Angel Lift Signature Intense",
     "min": 180,
     "price": 109,
     "desc": "L’Angel Lift dans sa version la plus affirmée, complétée par les cils du bas pour un effet œil de poupée raffiné. Prix de lancement : 109 € au lieu de 149 €.",
     "retouche": false,
     "call": false,
     "main": true,
     "cancelH": 48
    },
    {
     "id": "ext-lower",
     "pid": "-Oms_eXlFLcL3Q19hCz8",
     "name": "Lower lash, extensions des cils du bas",
     "min": 60,
     "price": 40,
     "desc": "Des extensions ultra fines sur les cils inférieurs, seules ou en complément d’une pose du haut.",
     "retouche": false,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "ext-blend",
     "pid": "-OnzlcW3cXIvyUNsJDos",
     "name": "Perfect Blend",
     "min": 45,
     "price": 40,
     "desc": "Une technique experte, recommandée sur certains types de cils, pour améliorer le rendu et la tenue des extensions. À ajouter à une pose complète : elle ne peut pas être choisie seule.",
     "retouche": false,
     "call": false,
     "addon": true,
     "cancelH": 48
    },
    {
     "id": "ext-depose",
     "pid": "-NEfHb5OoguBJcIY08g-",
     "name": "Dépose des extensions",
     "min": 30,
     "price": 20,
     "desc": "",
     "retouche": false,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-classique-3",
     "pid": "-NEfH9Iq8UYZbeJIRD-j",
     "name": "La Classique, retouche 3 sem.",
     "min": 90,
     "price": 45,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-classique-4",
     "pid": "-OleqcQsatui9B628dNV",
     "name": "La Classique, retouche 4 sem.",
     "min": 90,
     "price": 55,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-mixte-3",
     "pid": "-NEfHGIX-BgVrOmRc91J",
     "name": "Pose mixte, retouche 3 sem.",
     "min": 90,
     "price": 50,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-mixte-4",
     "pid": "-Oleqq-rkXnsLrsmON-t",
     "name": "Pose mixte, retouche 4 sem.",
     "min": 90,
     "price": 60,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-volume-3",
     "pid": "-NEfHONaRXh_g7E4QZ2W",
     "name": "Volume russe, retouche 3 sem.",
     "min": 90,
     "price": 50,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-volume-4",
     "pid": "-OlerHyMLcS70uVB03zS",
     "name": "Volume russe, retouche 4 sem.",
     "min": 90,
     "price": 60,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-girly-2",
     "pid": "-Om9pRTu-cdfZpBA7iUC",
     "name": "La Girly, retouche 2 sem.",
     "min": 60,
     "price": 30,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-girly-3",
     "pid": "-Om9qFdHWHk7oaifFeuv",
     "name": "La Girly, retouche 3 sem.",
     "min": 60,
     "price": 40,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-poupee-3",
     "pid": "-OmA26mOFKYvesT8fIdE",
     "name": "La Poupée, retouche 3 sem.",
     "min": 90,
     "price": 55,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-poupee-4",
     "pid": "-OmA2N7JFed7cAwB68Lm",
     "name": "La Poupée, retouche 4 sem.",
     "min": 120,
     "price": 65,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-glamour-3",
     "pid": "-OmABZrprZhHUc6Es-kr",
     "name": "La Glamour, retouche 3 sem.",
     "min": 90,
     "price": 60,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-glamour-4",
     "pid": "-OmACFF2BPCuLxbNHZz2",
     "name": "La Glamour, retouche 4 sem.",
     "min": 120,
     "price": 70,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-muse-3",
     "pid": "-OrnvVJ4XgS7okQpiX2Q",
     "name": "La Muse, retouche 3 sem.",
     "min": 90,
     "price": 55,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-muse-4",
     "pid": "-OrnvmWS-uszcyLJf0GX",
     "name": "La Muse, retouche 4 sem.",
     "min": 90,
     "price": 65,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    },
    {
     "id": "rem-captivante-3",
     "pid": "-NEfHX_LMyas-HQqHFel",
     "name": "La Captivante, retouche 3 sem.",
     "min": 90,
     "price": 65,
     "desc": "",
     "retouche": true,
     "call": true,
     "cancelH": 48
    },
    {
     "id": "rem-captivante-4",
     "pid": "-OlerTNR_32U21HYxfH-",
     "name": "La Captivante, retouche 4 sem.",
     "min": 90,
     "price": 75,
     "desc": "",
     "retouche": true,
     "call": true,
     "cancelH": 48
    },
    {
     "id": "rem-lower-3",
     "pid": "-Omsf1Ey5u4Y6w3cjkBI",
     "name": "Lower lash, retouche 3 sem.",
     "min": 60,
     "price": 25,
     "desc": "",
     "retouche": true,
     "call": false,
     "cancelH": 48
    }
   ]
  },
  {
   "id": "angel",
   "title": "Angel Look",
   "kicker": "Collection exclusive",
   "photo": 20,
   "intro": "L’expérience regard la plus exclusive du studio : sourcils en maquillage permanent et pose Angel Lift réunis, puis retouche des deux à 6 semaines. Une transformation complète du regard, naturelle et durable.",
   "items": [
    {
     "id": "angel-microblading",
     "pid": "-OueloiHW855PEs0ruHt",
     "name": "Angel Look · Microblading 3.0 édition",
     "min": 270,
     "price": 499,
     "desc": "Mon Microblading nouvelle génération associé à l’Angel Lift Signature. Réalisés lors du même rendez-vous, puis retouche des deux prestations à 6 semaines. Tarif privilégié pour le parcours complet (valeur réelle 528 €). 40 % à la réservation, le solde le jour de la prestation puis à la retouche. Annulation ou déplacement jusqu’à 7 jours avant.",
     "retouche": false,
     "call": false,
     "main": true,
     "pkg": true,
     "cancelH": 168
    },
    {
     "id": "angel-softbrow",
     "pid": "-Ouf-igpiVV-nJG-qaKP",
     "name": "Angel Look · Soft brow édition",
     "min": 300,
     "price": 510,
     "desc": "Le Soft brows (effet poudré) associé à l’Angel Lift Signature. Réalisés lors du même rendez-vous, puis retouche des deux prestations à 6 semaines. Tarif privilégié pour le parcours complet (valeur réelle 538 €). 40 % à la réservation, le solde le jour de la prestation puis à la retouche. Annulation ou déplacement jusqu’à 7 jours avant.",
     "retouche": false,
     "call": false,
     "main": true,
     "pkg": true,
     "cancelH": 168
    },
    {
     "id": "angel-combo",
     "pid": "-Ouf0tXsmdUpU9-mElrK",
     "name": "Angel Look · Combo brows édition",
     "min": 300,
     "price": 600,
     "desc": "Le Combo brows (microblading + soft brows) associé à l’Angel Lift Signature. Réalisés lors du même rendez-vous, puis retouche des deux prestations à 6 semaines. Tarif privilégié pour le parcours complet (valeur réelle 628 €). 40 % à la réservation, le solde le jour de la prestation puis à la retouche. Annulation ou déplacement jusqu’à 7 jours avant.",
     "retouche": false,
     "call": false,
     "main": true,
     "pkg": true,
     "cancelH": 168
    }
   ]
  }
 ],
 "photos": [
  {
   "n": 1,
   "w": 1170,
   "h": 1009,
   "tag": "levres",
   "alt": "Lèvres après maquillage permanent"
  },
  {
   "n": 2,
   "w": 1536,
   "h": 1024,
   "tag": "visages",
   "alt": "Portrait après prestation"
  },
  {
   "n": 3,
   "w": 1536,
   "h": 1024,
   "tag": "visages",
   "alt": "Portrait après prestation"
  },
  {
   "n": 4,
   "w": 1536,
   "h": 1024,
   "tag": "sourcils",
   "alt": "Sourcils après maquillage permanent"
  },
  {
   "n": 5,
   "w": 1170,
   "h": 882,
   "tag": "sourcils",
   "alt": "Microblading : résultat"
  },
  {
   "n": 6,
   "w": 922,
   "h": 710,
   "tag": "visages",
   "alt": "Portrait après prestation"
  },
  {
   "n": 7,
   "w": 1536,
   "h": 1057,
   "tag": "sourcils",
   "alt": "Sourcils après maquillage permanent"
  },
  {
   "n": 8,
   "w": 1350,
   "h": 1800,
   "tag": "cils",
   "alt": "Regard et cils après prestation"
  },
  {
   "n": 9,
   "w": 1536,
   "h": 1024,
   "tag": "sourcils",
   "alt": "Sourcils après maquillage permanent"
  },
  {
   "n": 10,
   "w": 1169,
   "h": 794,
   "tag": "sourcils",
   "alt": "Regard et sourcils après maquillage permanent"
  },
  {
   "n": 11,
   "w": 1536,
   "h": 1024,
   "tag": "sourcils",
   "alt": "Sourcils après maquillage permanent"
  },
  {
   "n": 12,
   "w": 1536,
   "h": 1024,
   "tag": "levres",
   "alt": "Lèvres après maquillage permanent"
  },
  {
   "n": 13,
   "w": 1170,
   "h": 1054,
   "tag": "cils",
   "alt": "Regard et cils après prestation"
  },
  {
   "n": 14,
   "w": 1024,
   "h": 839,
   "tag": "cils",
   "alt": "Regard et cils après prestation"
  },
  {
   "n": 15,
   "w": 1024,
   "h": 883,
   "tag": "levres",
   "alt": "Lèvres après maquillage permanent"
  },
  {
   "n": 16,
   "w": 705,
   "h": 554,
   "tag": "levres",
   "alt": "Lèvres après maquillage permanent"
  },
  {
   "n": 17,
   "w": 1140,
   "h": 729,
   "tag": "cils",
   "alt": "Regard et cils après prestation"
  },
  {
   "n": 18,
   "w": 1067,
   "h": 748,
   "tag": "sourcils",
   "alt": "Brow lift, mapping et teinture : résultat"
  },
  {
   "n": 19,
   "w": 1536,
   "h": 1024,
   "tag": "sourcils",
   "alt": "Sourcils après maquillage permanent"
  },
  {
   "n": 20,
   "w": 1170,
   "h": 700,
   "tag": "cils",
   "alt": "Angel Lift Signature Intense : résultat"
  },
  {
   "n": 21,
   "w": 1170,
   "h": 705,
   "tag": "sourcils",
   "alt": "Microblading 3.0 : résultat"
  },
  {
   "n": 22,
   "w": 1170,
   "h": 819,
   "tag": "cils",
   "alt": "La Muse : résultat"
  },
  {
   "n": 23,
   "w": 1170,
   "h": 695,
   "tag": "cils",
   "alt": "La Muse : résultat"
  },
  {
   "n": 24,
   "w": 1170,
   "h": 690,
   "tag": "sourcils",
   "alt": "Soft brows : résultat"
  },
  {
   "n": 25,
   "w": 1170,
   "h": 701,
   "tag": "sourcils",
   "alt": "Soft brows : résultat"
  },
  {
   "n": 26,
   "w": 1170,
   "h": 701,
   "tag": "cils",
   "alt": "La Muse : résultat"
  },
  {
   "n": 27,
   "w": 1170,
   "h": 693,
   "tag": "sourcils",
   "alt": "Soft brows : résultat"
  },
  {
   "n": 28,
   "w": 1170,
   "h": 700,
   "tag": "cils",
   "alt": "Combo brows et Korean lash lift : résultat"
  },
  {
   "n": 29,
   "w": 1170,
   "h": 686,
   "tag": "sourcils",
   "alt": "Microblading : résultat"
  },
  {
   "n": 30,
   "w": 1170,
   "h": 700,
   "tag": "cils",
   "alt": "La Muse : résultat"
  }
 ],
 "reviews": [
  {
   "date": "2026-09-05",
   "text": "Cela fait quelques temps que Aurélie s’occupe de mes cils  , je vous la recommande à mille pour cent",
   "rating": 5
  },
  {
   "date": "2026-09-04",
   "text": "Aurélie  est très professionnel et passionné par son métier.\nJe suis venu faire un korean lash lift et c’est clairement le plus beau rehaussement de cils que j’ai pu avoir.\nNe doute jamais de toi ! ✨",
   "rating": 5
  },
  {
   "date": "2026-08-06",
   "text": "Aurélie nous reçoit dans un très beau lieu, avec beaucoup de douceur et d’attention. La qualité de la prestation est à la hauteur de ses compétences. J’y retournerai pour d’autres prestations sans au.",
   "rating": 5
  },
  {
   "date": "2026-07-24",
   "text": "Une. Prestation tout simplement exceptionnelle ! Un travail d’une précision et d’une qualité remarquable! Au-delà de son immense talent, on sent la passion qu’elle met dans son métier 🥰",
   "rating": 5
  },
  {
   "date": "2026-07-01",
   "text": "Un grand merci à Aurélie pour son accueil chaleureux, sa douceur et son travail juste sublime pour mon cil à cil je recommande vivement 👍👍👍",
   "rating": 5
  },
  {
   "date": "2026-06-01",
   "text": "C'était comme d'habitude, parfait",
   "rating": 5
  },
  {
   "date": "2026-02-18",
   "text": "Comme d'habitude, parfait toujours à l'heure travail soigné, cabine propre,",
   "rating": 5
  },
  {
   "date": "2026-02-06",
   "text": "Au top comme d’habitude 🤩",
   "rating": 5
  },
  {
   "date": "2026-01-27",
   "text": "J'ai fait un softbrown et j'en suis ravie, très professionnelle et à l'écoute, très gentille on se sent très vite à l'aise, hygiène au top je recommande++++ .",
   "rating": 5
  },
  {
   "date": "2026-01-14",
   "text": "C'est le troisième browlift que je fais chez Aurélie et j'y retournerai sans hésiter!!! \nAttentive douce professionnelle passionnée,elle a su répondre à mes attentes et mes craintes ☺️ \nA très vite",
   "rating": 5
  },
  {
   "date": "2025-12-19",
   "text": "La meilleure 🤩",
   "rating": 5
  },
  {
   "date": "2025-12-12",
   "text": "Ponctuelle, chaleureuse, à l’écoute, perfectionniste, très professionnelle ! Je recommande à 100%.",
   "rating": 5
  },
  {
   "date": "2025-11-09",
   "text": "Pétillante, toujours de bonne humeur et tellement pro! J’attends mes rendez-vous vous avec envie!!! Je recommande tellement !!!!!",
   "rating": 5
  },
  {
   "date": "2025-11-05",
   "text": "Cliente depuis un petit moment déjà, toujours satisfaite de mes prestations, sourcils et cils juste au top ! très douce et a l’écoute, je recommande",
   "rating": 5
  },
  {
   "date": "2025-10-04",
   "text": "Très joli cadre ,très satisfaite de la prestation, aurélie est très douce , ma ligne de sourcils est juste parfaite",
   "rating": 5
  },
  {
   "date": "2025-09-09",
   "text": "Aurélie est très professionnelle et minutieuse, à l’écoute de nos envies. \nTrès satisfaite de mon microblading, résultat ultra naturel ! Je recommande fortement",
   "rating": 5
  },
  {
   "date": "2025-06-25",
   "text": "Aurélie est professionnelle et a l'écoute.\nJe suis ravie 😍",
   "rating": 5
  },
  {
   "date": "2025-05-17",
   "text": "Très professionnelle  et sympathique \nMerci  Lili",
   "rating": 5
  },
  {
   "date": "2025-04-29",
   "text": "La meilleure !!",
   "rating": 5
  },
  {
   "date": "2025-04-10",
   "text": "La meilleure sur les cils :)",
   "rating": 5
  }
 ],
 "rating": {
  "global": 4.99,
  "count": 60,
  "details": [
   [
    "Prestation",
    5
   ],
   [
    "Hygiène",
    5
   ],
   [
    "Accueil",
    5
   ],
   [
    "Ambiance",
    4.97
   ]
  ]
 }
};
