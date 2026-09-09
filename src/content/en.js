/* English page content. Every factual claim here comes from a string already in
   src/i18n.jsx or from the business facts in the brief. Where a question has no
   supporting fact - price, minimum age, what to bring, hotel transfer - the
   section is left out rather than filled with generic tourism copy. */

const MEETING = 'Hotel Kelibia Beach, Kélibia, Tunisia'
const LANGUAGES = 'French, English and Italian'
const BOOKING = 'WhatsApp, on +216 25 434 499'

const booking = (activity) => ({
  q: 'How do I book?',
  a: [
    `Over ${BOOKING}. Send a message with the day that suits you and how many people are coming, and we confirm the time and the meeting point.`,
    `You can also write to hello@mcaravane.tn. Prices are not published on this page — ask on WhatsApp and we quote for your group and the ${activity} you want.`,
  ],
})

const meeting = {
  q: 'Where do we meet?',
  a: [`At ${MEETING}. We confirm the exact time when you book.`],
}

export default {
  ui: {
    breadcrumbHome: 'Home',
    breadcrumbLabel: 'Breadcrumb',
    practicalTitle: 'Practical details',
    meetingLabel: 'Meeting point',
    languagesLabel: 'Languages spoken',
    bookingLabel: 'Booking',
    durationLabel: 'Duration',
    includesLabel: 'What is included',
    relatedTitle: 'The other experiences',
    ctaTitle: 'Ready to book?',
    ctaText: 'Tell us the day and the number of people, and we take it from there.',
    photosTitle: 'Photos',
  },
  nav: {
    activities: 'Activities',
    practical: 'Practical info',
    about: 'About us',
    contact: 'Contact',
  },
  pages: {
    home: {
      title: 'Quad, Camel and Horse Rides in Kélibia | M’Caravane',
      description:
        'Quad excursions over the dunes, camel and horse rides on El Mansoura beach, and guided tours of the Kélibia Fort. Small groups — book on WhatsApp.',
    },

    quad: {
      title: 'Quad Biking in Kélibia — Dunes and Pine Forest Trails',
      description:
        'A guided quad excursion over the dunes, coastal trails and pine forest of Kélibia. One or two hours, helmet and briefing included. Book on WhatsApp.',
      h1: 'Quad biking in Kélibia',
      intro:
        'A guided quad excursion over the dunes, the coastal trails and the pine forest of Kélibia, with the Byzantine Fort on the horizon. No riding experience is needed — the briefing, the helmet and the guide are part of the ride — so it suits complete beginners as much as groups looking for the adrenaline option.',
      sections: [
        {
          q: 'What does the quad excursion involve?',
          a: [
            'You ride your own quad along a guided route through the dunes, the coastal trails and the pine forest inland from Kélibia, with the Fort visible on the horizon.',
            'A guide leads the group for the whole route and gives a briefing before you set off, so there is nothing to work out on your own.',
          ],
        },
        meeting,
        { q: 'How long does it last?', a: ['One hour or two hours — you choose when you book.'] },
        {
          q: 'What is included?',
          a: [
            'The quad, a helmet, your guide, water and a souvenir photo. Every M’Caravane experience is guided, insured and beginner-friendly.',
          ],
        },
        {
          q: 'Is it suitable for beginners?',
          a: [
            'Yes. No previous experience is needed: every ride opens with a briefing, and the guide stays with the group throughout.',
            'Groups are kept small, so the pace follows the people riding rather than a timetable.',
          ],
        },
        booking('quad excursion'),
      ],
      duration: '1h / 2h',
      includes: 'Quad, helmet, guide, water, souvenir photo',
      schema: {
        name: 'Quad excursion in Kélibia',
        description:
          'Guided quad excursion over the dunes, coastal trails and pine forest of Kélibia. Briefing, helmet and guide included; no previous experience needed.',
        touristType: ['Beginners', 'Families', 'Groups of friends'],
      },
    },

    camel: {
      title: 'Camel Ride in Kélibia on El Mansoura Beach | M’Caravane',
      description:
        'A camel caravan along El Mansoura beach at sunrise or sunset, on calm animals suited to families. Mint tea and photos included. Book on WhatsApp.',
      h1: 'Camel rides on Kélibia beach',
      intro:
        'A camel caravan along El Mansoura beach at sunrise or sunset, at the slow rhythm of the shoreline. The animals are calm and suited to families, and mint tea and photos are part of the ride.',
      sections: [
        {
          q: 'What does the camel ride involve?',
          a: [
            'You join a caravan that walks along El Mansoura beach, at sunrise or at sunset, led by a guide who stays with the group the whole way.',
            'It is the slow version of Kélibia: the pace of the animals, the water on one side, and a stop for mint tea and photographs.',
          ],
        },
        meeting,
        { q: 'How long does it last?', a: ['Thirty minutes or one hour — you choose when you book.'] },
        {
          q: 'What is included?',
          a: [
            'The camel, a helmet, your guide, mint tea and photos. Every M’Caravane experience is guided, insured and beginner-friendly.',
          ],
        },
        {
          q: 'Is it suitable for families and first-timers?',
          a: [
            'Yes. The animals are calm and chosen for families, and no experience is expected of anyone in the group.',
            'A guide leads the caravan from start to finish, and groups are kept small.',
          ],
        },
        booking('camel ride'),
      ],
      duration: '30 min / 1h',
      includes: 'Camel, helmet, guide, mint tea, photos',
      schema: {
        name: 'Camel ride on El Mansoura beach, Kélibia',
        description:
          'A guided camel caravan along El Mansoura beach at sunrise or sunset, on calm animals suited to families. Mint tea and photos included.',
        touristType: ['Families', 'Couples', 'First-time riders'],
      },
    },

    horse: {
      title: 'Horse Riding in Kélibia along El Mansoura Beach Shore',
      description:
        'Ride the shoreline at El Mansoura, with longer routes for confident riders. Guided, insured and beginner-friendly. Book your ride on WhatsApp today.',
      h1: 'Horse riding in Kélibia',
      intro:
        'A ride along the shoreline at El Mansoura, at sunrise or sunset, with longer routes for confident riders. A guide leads every ride, on the same stretch of coast our camel caravans take.',
      sections: [
        {
          q: 'What does the horse ride involve?',
          a: [
            'You ride along El Mansoura beach with a guide, at sunrise or at sunset, on the same shoreline route as the camel caravans.',
            'Riders who are confident in the saddle can take the longer routes instead of the short shoreline loop.',
          ],
        },
        meeting,
        {
          q: 'How long does it last?',
          a: ['Thirty minutes or one hour, with longer routes available for confident riders.'],
        },
        {
          q: 'What is included?',
          a: [
            'The horse, a helmet, your guide, mint tea and photos. Every M’Caravane experience is guided, insured and beginner-friendly.',
          ],
        },
        {
          q: 'Can I ride if I have never ridden before?',
          a: [
            'Yes. The rides are beginner-friendly and a guide stays with you throughout — it is the longer routes that ask for some confidence in the saddle.',
          ],
        },
        booking('horse ride'),
      ],
      duration: '30 min / 1h',
      includes: 'Horse, helmet, guide, mint tea, photos',
      schema: {
        name: 'Horse ride on El Mansoura beach, Kélibia',
        description:
          'A guided horse ride along the shoreline at El Mansoura, Kélibia, with longer routes for confident riders. Beginner-friendly, guide included.',
        touristType: ['Beginners', 'Confident riders', 'Couples'],
      },
    },

    city: {
      title: 'Kélibia City and Museum Tour with a Local Guide | Fort',
      description:
        'Climb the Byzantine Fort, walk the old harbour and see Punic and Roman Kélibia in the museum, with a guide. Three hours or a half day. Book on WhatsApp.',
      h1: 'Kélibia city and museum tour',
      intro:
        'Two and a half thousand years of Kélibia in one walk: the Byzantine Fort above the town, the old harbour, and the museum’s Punic and Roman collections, with a guide who knows them. Kerkouane can be added to the route.',
      sections: [
        {
          q: 'What does the tour involve?',
          a: [
            'You climb the Byzantine Fort, walk the old harbour, and then visit the museum — Punic and Roman Kélibia — with a guide throughout.',
            'Kerkouane, the Punic town along the coast, is optional and can be added when you book.',
          ],
        },
        meeting,
        { q: 'How long does it last?', a: ['Three hours, or a half day if you add Kerkouane.'] },
        {
          q: 'What is included?',
          a: [
            'Your guide, the entrance fees and local transport. Every M’Caravane experience is guided, insured and beginner-friendly.',
          ],
        },
        {
          q: 'What languages is the tour given in?',
          a: [`${LANGUAGES}. Tell us which one you would like when you book.`],
        },
        booking('city and museum tour'),
      ],
      duration: '3h / half day',
      includes: 'Guide, entrance fees, local transport',
      schema: {
        name: 'Kélibia city and museum tour',
        description:
          'Guided tour of the Byzantine Fort, the old harbour and the museum’s Punic and Roman collections in Kélibia, with Kerkouane as an option. Entrance fees and local transport included.',
        touristType: ['History enthusiasts', 'Families', 'Cultural travellers'],
      },
    },

    activities: {
      title: 'Activities in Kélibia — Quad, Camel, Horse, History',
      description:
        'Four ways to experience Kélibia, between land, sea and history. All guided, insured and beginner-friendly, in small groups. Book yours on WhatsApp.',
      h1: 'Activities in Kélibia',
      intro:
        'Four ways to experience Kélibia, between land, sea and history. Every experience is guided, insured and beginner-friendly, and runs in a small group with a local guide.',
      sections: [
        {
          q: 'Can I combine two activities in one day?',
          a: [
            'Yes. Combine two or more activities and build your perfect day in Kélibia — we arrange everything, from transport to the best time of day.',
          ],
        },
        {
          q: 'What do all the experiences have in common?',
          a: [
            `Every one is guided, insured and beginner-friendly, runs in a small group, and is led in ${LANGUAGES}. All of them start from ${MEETING}.`,
          ],
        },
      ],
    },

    practical: {
      title: 'Practical Information and FAQ | Kélibia Activities',
      description:
        'Meeting point, durations, what is included, languages and how to book your quad, camel, horse or city tour in Kélibia. Answers before you book.',
      h1: 'Practical information and FAQ',
      intro:
        'Everything we can tell you before you send the first WhatsApp message: where we meet, how long each experience runs, what is included, and which languages your guide speaks.',
      faq: [
        {
          q: 'Where do the activities start?',
          a: [`All experiences start from ${MEETING}. We confirm the exact time when you book.`],
        },
        {
          q: 'What languages do your guides speak?',
          a: [`${LANGUAGES}. Tell us which you would prefer when you book and we assign a guide accordingly.`],
        },
        {
          q: 'How do I book?',
          a: [
            `Over ${BOOKING}, or by email at hello@mcaravane.tn. Send the day, the activity and the number of people, and we confirm the time.`,
          ],
        },
        {
          q: 'How long does each activity last?',
          a: [
            'The quad excursion runs one or two hours. Camel and horse rides run thirty minutes or one hour. The city and museum tour runs three hours, or a half day with Kerkouane.',
          ],
        },
        {
          q: 'Do I need any experience?',
          a: [
            'No. Every experience is beginner-friendly, and the quad excursion opens with a briefing. A guide stays with the group throughout.',
          ],
        },
        {
          q: 'Are the activities suitable for families?',
          a: [
            'The camel rides use calm animals chosen for families, and all our experiences are guided, insured and beginner-friendly, in small groups.',
          ],
        },
        {
          q: 'Can I do more than one activity in a day?',
          a: [
            'Yes. Combine two or more activities and build your perfect day in Kélibia — we arrange everything, from transport to the best time of day.',
          ],
        },
        {
          q: 'What is included?',
          a: [
            'The quad excursion includes the quad, a helmet, your guide, water and a souvenir photo. Camel and horse rides include the animal, a helmet, your guide, mint tea and photos. The city and museum tour includes your guide, entrance fees and local transport.',
          ],
        },
        {
          q: 'Where is Kélibia?',
          a: [
            'Kélibia is on the Cap Bon peninsula, in the Nabeul Governorate of Tunisia. Our meeting point is Hotel Kelibia Beach.',
          ],
        },
      ],
    },

    about: {
      title: 'About M’Caravane — Local Guides in Kélibia, Tunisia',
      description:
        'M’Caravane runs quad, camel, horse and heritage experiences in Kélibia with local guides and small groups. Sea, sand and history — Kelibia, for real.',
      h1: 'About M’Caravane',
      intro:
        'M’Caravane runs authentic experiences between sea, sand and history in Kélibia, on the Cap Bon peninsula. Small groups, local guides, memories that last.',
      sections: [
        {
          q: 'Who are we?',
          a: [
            'A local operator in Kélibia running four experiences: quad excursions, camel rides, horse rides, and guided tours of the town and its museum.',
            'Every experience is guided, insured and beginner-friendly, and runs in a small group led by a local guide.',
          ],
        },
        {
          q: 'Where do you operate?',
          a: [
            `In Kélibia and along the Cap Bon coast — El Mansoura beach, the dunes and pine forest inland, and the Byzantine Fort above the town. Everything starts from ${MEETING}.`,
          ],
        },
        {
          q: 'What languages do you work in?',
          a: [`${LANGUAGES}.`],
        },
      ],
    },

    contact: {
      title: 'Contact and Booking — M’Caravane Kélibia, Cap Bon TN',
      description:
        'Book a quad, camel, horse ride or city tour in Kélibia on WhatsApp +216 25 434 499, or write to hello@mcaravane.tn. We reply with times and details.',
      h1: 'Contact and booking',
      intro:
        'Bookings are made over WhatsApp. Send the day, the activity and the number of people, and we come back with a time, a quote and the meeting point.',
      sections: [
        {
          q: 'How do I book?',
          a: [`Over ${BOOKING}. It is the fastest way to reach us, and the channel we confirm on.`],
        },
        {
          q: 'Where do we meet?',
          a: [`At ${MEETING}.`],
        },
        {
          q: 'What languages can I write in?',
          a: [`${LANGUAGES}.`],
        },
      ],
    },
  },
}
