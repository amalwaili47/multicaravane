/* Contenu français. Chaque fait énoncé ici provient d'une chaîne déjà présente
   dans src/i18n.jsx ou des données transmises par le client. Lorsqu'une question
   n'a pas de réponse vérifiable - tarif, âge minimum, quoi emporter, transfert
   depuis l'hôtel - la section est omise plutôt que remplie de généralités. */

const MEETING = 'l’Hôtel Kelibia Beach, à Kélibia, Tunisie'
const LANGUAGES = 'français, anglais et italien'
const BOOKING = 'WhatsApp, au +216 25 434 499'

const booking = (activity) => ({
  q: 'Comment réserver ?',
  a: [
    `Par ${BOOKING}. Envoyez-nous le jour qui vous convient et le nombre de participants : nous confirmons l’horaire et le point de rendez-vous.`,
    `Vous pouvez aussi écrire à hello@mcaravane.tn. Les tarifs ne sont pas publiés sur cette page — demandez-les sur WhatsApp et nous établissons un devis pour votre groupe et ${activity}.`,
  ],
})

const meeting = {
  q: 'Où se retrouve-t-on ?',
  a: [`À ${MEETING}. Nous confirmons l’heure exacte au moment de la réservation.`],
}

export default {
  ui: {
    breadcrumbHome: 'Accueil',
    breadcrumbLabel: 'Fil d’Ariane',
    practicalTitle: 'Informations pratiques',
    meetingLabel: 'Point de rendez-vous',
    languagesLabel: 'Langues parlées',
    bookingLabel: 'Réservation',
    durationLabel: 'Durée',
    includesLabel: 'Ce qui est compris',
    relatedTitle: 'Les autres expériences',
    ctaTitle: 'Prêt à réserver ?',
    ctaText: 'Dites-nous le jour et le nombre de personnes, nous nous occupons du reste.',
    photosTitle: 'Photos',
  },
  nav: {
    activities: 'Activités',
    practical: 'Infos pratiques',
    about: 'À propos',
    contact: 'Contact',
  },
  pages: {
    home: {
      title: 'Quad, dromadaire et cheval à Kélibia | M’Caravane Kelibia',
      description:
        'Excursions en quad sur les dunes, balades à dromadaire et à cheval sur la plage d’El Mansoura, visite guidée du Fort. Petits groupes — réservez sur WhatsApp.',
    },

    quad: {
      title: 'Quad à Kélibia — dunes, pistes côtières et forêt de pins',
      description:
        'Excursion guidée en quad sur les dunes, pistes côtières et forêt de pins de Kélibia. Une ou deux heures, casque et briefing compris. Réservez sur WhatsApp.',
      h1: 'Quad à Kélibia',
      intro:
        'Une excursion guidée en quad sur les dunes, les pistes côtières et la forêt de pins de Kélibia, le Fort byzantin à l’horizon. Aucune expérience n’est nécessaire — le briefing, le casque et le guide font partie de la sortie — ce qui la rend accessible aux débutants comme aux groupes venus chercher l’adrénaline.',
      sections: [
        {
          q: 'En quoi consiste l’excursion en quad ?',
          a: [
            'Vous pilotez votre propre quad sur un parcours guidé à travers les dunes, les pistes côtières et la forêt de pins de l’arrière-pays de Kélibia, le Fort visible à l’horizon.',
            'Un guide accompagne le groupe sur tout le trajet et donne un briefing avant le départ : il n’y a rien à gérer seul.',
          ],
        },
        meeting,
        { q: 'Combien de temps dure la sortie ?', a: ['Une heure ou deux heures — vous choisissez à la réservation.'] },
        {
          q: 'Qu’est-ce qui est compris ?',
          a: [
            'Le quad, un casque, votre guide, de l’eau et une photo souvenir. Toutes les expériences M’Caravane sont guidées, assurées et accessibles aux débutants.',
          ],
        },
        {
          q: 'Est-ce accessible aux débutants ?',
          a: [
            'Oui. Aucune expérience préalable n’est requise : chaque sortie commence par un briefing et le guide reste avec le groupe du début à la fin.',
            'Les groupes restent petits, si bien que le rythme suit les participants plutôt qu’un horaire.',
          ],
        },
        booking('l’excursion en quad'),
      ],
      duration: '1h / 2h',
      includes: 'Quad, casque, guide, eau, photo souvenir',
      schema: {
        name: 'Excursion en quad à Kélibia',
        description:
          'Excursion guidée en quad sur les dunes, les pistes côtières et la forêt de pins de Kélibia. Briefing, casque et guide compris ; aucune expérience requise.',
        touristType: ['Débutants', 'Familles', 'Groupes d’amis'],
      },
    },

    camel: {
      title: 'Balade à dromadaire à Kélibia, plage d’El Mansoura',
      description:
        'Une caravane de dromadaires sur la plage d’El Mansoura au lever ou au coucher du soleil, sur des animaux calmes. Thé à la menthe et photos compris.',
      h1: 'Balade à dromadaire à Kélibia',
      intro:
        'Une caravane de dromadaires le long de la plage d’El Mansoura, au lever ou au coucher du soleil, au rythme lent du rivage. Les animaux sont calmes et adaptés aux familles, et le thé à la menthe comme les photos font partie de la balade.',
      sections: [
        {
          q: 'En quoi consiste la balade à dromadaire ?',
          a: [
            'Vous rejoignez une caravane qui longe la plage d’El Mansoura, au lever ou au coucher du soleil, menée par un guide qui reste avec le groupe tout du long.',
            'C’est la version lente de Kélibia : le pas des animaux, l’eau d’un côté, et une pause thé à la menthe et photos.',
          ],
        },
        meeting,
        { q: 'Combien de temps dure la balade ?', a: ['Trente minutes ou une heure — vous choisissez à la réservation.'] },
        {
          q: 'Qu’est-ce qui est compris ?',
          a: [
            'Le dromadaire, un casque, votre guide, le thé à la menthe et les photos. Toutes les expériences M’Caravane sont guidées, assurées et accessibles aux débutants.',
          ],
        },
        {
          q: 'Est-ce adapté aux familles et aux premières fois ?',
          a: [
            'Oui. Les animaux sont calmes et choisis pour les familles, et aucune expérience n’est attendue de qui que ce soit dans le groupe.',
            'Un guide mène la caravane du début à la fin, et les groupes restent petits.',
          ],
        },
        booking('la balade à dromadaire'),
      ],
      duration: '30 min / 1h',
      includes: 'Dromadaire, casque, guide, thé à la menthe, photos',
      schema: {
        name: 'Balade à dromadaire sur la plage d’El Mansoura, Kélibia',
        description:
          'Caravane guidée de dromadaires sur la plage d’El Mansoura au lever ou au coucher du soleil, sur des animaux calmes adaptés aux familles. Thé à la menthe et photos compris.',
        touristType: ['Familles', 'Couples', 'Premières balades'],
      },
    },

    horse: {
      title: 'Balade à cheval à Kélibia sur la plage d’El Mansoura',
      description:
        'Une balade à cheval le long du rivage d’El Mansoura, avec des parcours plus longs pour les cavaliers confirmés. Guidée et assurée. Réservez sur WhatsApp.',
      h1: 'Balade à cheval à Kélibia',
      intro:
        'Une balade le long du rivage d’El Mansoura, au lever ou au coucher du soleil, avec des parcours plus longs pour les cavaliers confirmés. Un guide accompagne chaque sortie, sur le même bord de mer que nos caravanes de dromadaires.',
      sections: [
        {
          q: 'En quoi consiste la balade à cheval ?',
          a: [
            'Vous longez la plage d’El Mansoura avec un guide, au lever ou au coucher du soleil, sur le même itinéraire côtier que les caravanes de dromadaires.',
            'Les cavaliers à l’aise en selle peuvent prendre les parcours plus longs plutôt que la boucle courte du rivage.',
          ],
        },
        meeting,
        {
          q: 'Combien de temps dure la balade ?',
          a: ['Trente minutes ou une heure, avec des parcours plus longs pour les cavaliers confirmés.'],
        },
        {
          q: 'Qu’est-ce qui est compris ?',
          a: [
            'Le cheval, un casque, votre guide, le thé à la menthe et les photos. Toutes les expériences M’Caravane sont guidées, assurées et accessibles aux débutants.',
          ],
        },
        {
          q: 'Puis-je monter si je n’ai jamais fait de cheval ?',
          a: [
            'Oui. Les balades sont accessibles aux débutants et un guide reste avec vous du début à la fin — ce sont les parcours longs qui demandent une certaine aisance en selle.',
          ],
        },
        booking('la balade à cheval'),
      ],
      duration: '30 min / 1h',
      includes: 'Cheval, casque, guide, thé à la menthe, photos',
      schema: {
        name: 'Balade à cheval sur la plage d’El Mansoura, Kélibia',
        description:
          'Balade à cheval guidée le long du rivage d’El Mansoura, à Kélibia, avec des parcours plus longs pour les cavaliers confirmés. Accessible aux débutants, guide compris.',
        touristType: ['Débutants', 'Cavaliers confirmés', 'Couples'],
      },
    },

    city: {
      title: 'Visite de Kélibia et de son musée avec un guide local',
      description:
        'Montez au Fort byzantin, longez le vieux port et découvrez Kélibia punique et romaine au musée, avec un guide. Trois heures ou une demi-journée.',
      h1: 'Visite de la ville et du musée de Kélibia',
      intro:
        'Deux mille cinq cents ans de Kélibia en une visite : le Fort byzantin au-dessus de la ville, le vieux port, puis les collections puniques et romaines du musée, avec un guide qui les connaît. Kerkouane peut s’ajouter au parcours.',
      sections: [
        {
          q: 'En quoi consiste la visite ?',
          a: [
            'Vous montez au Fort byzantin, longez le vieux port, puis visitez le musée — Kélibia punique et romaine — accompagné d’un guide tout du long.',
            'Kerkouane, la cité punique de la côte, est en option et peut être ajoutée à la réservation.',
          ],
        },
        meeting,
        { q: 'Combien de temps dure la visite ?', a: ['Trois heures, ou une demi-journée si vous ajoutez Kerkouane.'] },
        {
          q: 'Qu’est-ce qui est compris ?',
          a: [
            'Votre guide, les droits d’entrée et le transport local. Toutes les expériences M’Caravane sont guidées, assurées et accessibles aux débutants.',
          ],
        },
        {
          q: 'Dans quelles langues la visite est-elle assurée ?',
          a: [`En ${LANGUAGES}. Précisez votre choix au moment de réserver.`],
        },
        booking('la visite de la ville et du musée'),
      ],
      duration: '3h / demi-journée',
      includes: 'Guide, droits d’entrée, transport local',
      schema: {
        name: 'Visite de la ville et du musée de Kélibia',
        description:
          'Visite guidée du Fort byzantin, du vieux port et des collections puniques et romaines du musée de Kélibia, avec Kerkouane en option. Droits d’entrée et transport local compris.',
        touristType: ['Amateurs d’histoire', 'Familles', 'Voyageurs culturels'],
      },
    },

    activities: {
      title: 'Activités à Kélibia — quad, dromadaire, cheval, Fort',
      description:
        'Quatre façons de vivre Kélibia, entre terre, mer et histoire. Toutes guidées, assurées et accessibles aux débutants, en petits groupes. Réservez sur WhatsApp.',
      h1: 'Activités à Kélibia',
      intro:
        'Quatre façons de vivre Kélibia, entre terre, mer et histoire. Chaque expérience est guidée, assurée et accessible aux débutants, et se déroule en petit groupe avec un guide local.',
      sections: [
        {
          q: 'Puis-je combiner deux activités dans la même journée ?',
          a: [
            'Oui. Combinez deux activités ou plus et composez votre journée idéale à Kélibia — nous organisons tout, du transport au meilleur moment de la journée.',
          ],
        },
        {
          q: 'Qu’ont en commun toutes les expériences ?',
          a: [
            `Chacune est guidée, assurée et accessible aux débutants, se déroule en petit groupe et est menée en ${LANGUAGES}. Toutes partent de ${MEETING}.`,
          ],
        },
      ],
    },

    practical: {
      title: 'Infos pratiques et FAQ | Activités à Kélibia, Cap Bon',
      description:
        'Point de rendez-vous, durées, prestations comprises, langues et réservation de votre quad, dromadaire ou visite à Kélibia. Les réponses avant de réserver.',
      h1: 'Informations pratiques et FAQ',
      intro:
        'Tout ce que nous pouvons vous dire avant votre premier message WhatsApp : où l’on se retrouve, combien de temps dure chaque expérience, ce qui est compris et dans quelles langues votre guide travaille.',
      faq: [
        {
          q: 'Où commencent les activités ?',
          a: [`Toutes les expériences partent de ${MEETING}. Nous confirmons l’heure exacte à la réservation.`],
        },
        {
          q: 'Quelles langues vos guides parlent-ils ?',
          a: [`Le ${LANGUAGES}. Indiquez votre préférence à la réservation et nous attribuons un guide en conséquence.`],
        },
        {
          q: 'Comment réserver ?',
          a: [
            `Par ${BOOKING}, ou par e-mail à hello@mcaravane.tn. Envoyez le jour, l’activité et le nombre de personnes, et nous confirmons l’horaire.`,
          ],
        },
        {
          q: 'Combien de temps dure chaque activité ?',
          a: [
            'L’excursion en quad dure une ou deux heures. Les balades à dromadaire et à cheval durent trente minutes ou une heure. La visite de la ville et du musée dure trois heures, ou une demi-journée avec Kerkouane.',
          ],
        },
        {
          q: 'Faut-il de l’expérience ?',
          a: [
            'Non. Toutes les expériences sont accessibles aux débutants, et l’excursion en quad commence par un briefing. Un guide reste avec le groupe du début à la fin.',
          ],
        },
        {
          q: 'Les activités conviennent-elles aux familles ?',
          a: [
            'Les balades à dromadaire se font sur des animaux calmes choisis pour les familles, et toutes nos expériences sont guidées, assurées et accessibles aux débutants, en petits groupes.',
          ],
        },
        {
          q: 'Puis-je faire plusieurs activités dans la journée ?',
          a: [
            'Oui. Combinez deux activités ou plus et composez votre journée idéale à Kélibia — nous organisons tout, du transport au meilleur moment de la journée.',
          ],
        },
        {
          q: 'Qu’est-ce qui est compris ?',
          a: [
            'L’excursion en quad comprend le quad, un casque, votre guide, de l’eau et une photo souvenir. Les balades à dromadaire et à cheval comprennent l’animal, un casque, votre guide, le thé à la menthe et les photos. La visite de la ville et du musée comprend votre guide, les droits d’entrée et le transport local.',
          ],
        },
        {
          q: 'Où se trouve Kélibia ?',
          a: [
            'Kélibia se situe sur la presqu’île du Cap Bon, dans le gouvernorat de Nabeul, en Tunisie. Notre point de rendez-vous est l’Hôtel Kelibia Beach.',
          ],
        },
      ],
    },

    about: {
      title: 'À propos de M’Caravane — guides locaux à Kélibia, TN',
      description:
        'M’Caravane propose quad, dromadaire, cheval et patrimoine à Kélibia, avec des guides locaux et de petits groupes. La mer, le sable et l’histoire, pour de vrai.',
      h1: 'À propos de M’Caravane',
      intro:
        'M’Caravane propose des expériences authentiques entre mer, sable et histoire à Kélibia, sur la presqu’île du Cap Bon. Petits groupes, guides locaux, souvenirs qui restent.',
      sections: [
        {
          q: 'Qui sommes-nous ?',
          a: [
            'Un opérateur local de Kélibia qui propose quatre expériences : excursions en quad, balades à dromadaire, balades à cheval et visites guidées de la ville et de son musée.',
            'Chaque expérience est guidée, assurée et accessible aux débutants, et se déroule en petit groupe mené par un guide local.',
          ],
        },
        {
          q: 'Où intervenez-vous ?',
          a: [
            `À Kélibia et le long de la côte du Cap Bon — la plage d’El Mansoura, les dunes et la forêt de pins de l’arrière-pays, le Fort byzantin au-dessus de la ville. Tout part de ${MEETING}.`,
          ],
        },
        {
          q: 'Dans quelles langues travaillez-vous ?',
          a: [`En ${LANGUAGES}.`],
        },
      ],
    },

    contact: {
      title: 'Contact et réservation — M’Caravane Kélibia, Cap Bon',
      description:
        'Réservez un quad, une balade à dromadaire ou à cheval, ou une visite à Kélibia sur WhatsApp au +216 25 434 499, ou écrivez à hello@mcaravane.tn.',
      h1: 'Contact et réservation',
      intro:
        'Les réservations se font sur WhatsApp. Envoyez le jour, l’activité et le nombre de personnes : nous revenons vers vous avec un horaire, un devis et le point de rendez-vous.',
      sections: [
        {
          q: 'Comment réserver ?',
          a: [`Par ${BOOKING}. C’est le moyen le plus rapide de nous joindre, et le canal sur lequel nous confirmons.`],
        },
        {
          q: 'Où se retrouve-t-on ?',
          a: [`À ${MEETING}.`],
        },
        {
          q: 'Dans quelle langue puis-je écrire ?',
          a: [`En ${LANGUAGES}.`],
        },
      ],
    },
  },
}
