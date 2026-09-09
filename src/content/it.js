/* Contenuti italiani. Ogni dato riportato qui proviene da una stringa già
   presente in src/i18n.jsx o dalle informazioni fornite dal cliente. Quando una
   domanda non ha una risposta verificabile - prezzo, età minima, cosa portare,
   transfer dall'hotel - la sezione viene omessa invece di essere riempita con
   frasi turistiche generiche.

   Scritto direttamente in italiano per il mercato italiano, non tradotto dal
   francese: il lessico e il ritmo delle frasi sono quelli che un viaggiatore
   italiano si aspetta di leggere. */

const MEETING = 'l’Hotel Kelibia Beach, a Kelibia, in Tunisia'
const LANGUAGES = 'francese, inglese e italiano'
const BOOKING = 'WhatsApp, al +216 25 434 499'

const booking = (activity) => ({
  q: 'Come si prenota?',
  a: [
    `Su ${BOOKING}. Scriveteci il giorno che preferite e quante persone siete: vi confermiamo l’orario e il punto d’incontro.`,
    `Potete anche scrivere a hello@mcaravane.tn. I prezzi non sono pubblicati su questa pagina — chiedeteli su WhatsApp e prepariamo un preventivo per il vostro gruppo e per ${activity}.`,
  ],
})

const meeting = {
  q: 'Dove ci si incontra?',
  a: [`Presso ${MEETING}. L’orario esatto viene confermato al momento della prenotazione.`],
}

export default {
  ui: {
    breadcrumbHome: 'Home',
    breadcrumbLabel: 'Percorso di navigazione',
    practicalTitle: 'Informazioni pratiche',
    meetingLabel: 'Punto d’incontro',
    languagesLabel: 'Lingue parlate',
    bookingLabel: 'Prenotazione',
    durationLabel: 'Durata',
    includesLabel: 'Cosa è incluso',
    relatedTitle: 'Le altre esperienze',
    ctaTitle: 'Pronti a prenotare?',
    ctaText: 'Diteci il giorno e quante persone siete, al resto pensiamo noi.',
    photosTitle: 'Foto',
  },
  nav: {
    activities: 'Attività',
    practical: 'Info pratiche',
    about: 'Chi siamo',
    contact: 'Contatti',
  },
  pages: {
    home: {
      title: 'Quad, cammelli e cavalli a Kélibia | M’Caravane Kelibia',
      description:
        'Escursioni in quad tra le dune, giri in cammello e a cavallo sulla spiaggia di El Mansoura, visite guidate al Forte. Piccoli gruppi — prenota su WhatsApp.',
    },

    quad: {
      title: 'Escursione in quad a Kélibia tra dune e pineta costiera',
      description:
        'Escursione guidata in quad tra le dune, i sentieri costieri e la pineta di Kelibia. Una o due ore, casco e briefing inclusi. Prenota su WhatsApp.',
      h1: 'Escursione in quad a Kelibia',
      intro:
        'Un’escursione guidata in quad tra le dune, i sentieri costieri e la pineta di Kelibia, con il Forte bizantino all’orizzonte. Non serve alcuna esperienza — il briefing, il casco e la guida fanno parte dell’uscita — quindi va bene sia per chi non è mai salito su un quad sia per chi cerca l’adrenalina.',
      sections: [
        {
          q: 'In che cosa consiste l’escursione in quad?',
          a: [
            'Guidate il vostro quad lungo un percorso guidato tra le dune, i sentieri costieri e la pineta dell’entroterra di Kelibia, con il Forte visibile all’orizzonte.',
            'Una guida accompagna il gruppo per tutto il tragitto e tiene un briefing prima della partenza: non c’è nulla da organizzare da soli.',
          ],
        },
        meeting,
        { q: 'Quanto dura?', a: ['Un’ora o due ore — si sceglie al momento della prenotazione.'] },
        {
          q: 'Che cosa è incluso?',
          a: [
            'Il quad, il casco, la guida, l’acqua e una foto ricordo. Tutte le esperienze M’Caravane sono guidate, assicurate e adatte ai principianti.',
          ],
        },
        {
          q: 'È adatta ai principianti?',
          a: [
            'Sì. Non serve esperienza: ogni uscita inizia con un briefing e la guida resta con il gruppo dall’inizio alla fine.',
            'I gruppi sono piccoli, così il ritmo segue le persone e non l’orologio.',
          ],
        },
        booking('l’escursione in quad'),
      ],
      duration: '1h / 2h',
      includes: 'Quad, casco, guida, acqua, foto ricordo',
      schema: {
        name: 'Escursione in quad a Kelibia',
        description:
          'Escursione guidata in quad tra le dune, i sentieri costieri e la pineta di Kelibia. Briefing, casco e guida inclusi; non serve esperienza.',
        touristType: ['Principianti', 'Famiglie', 'Gruppi di amici'],
      },
    },

    camel: {
      title: 'Giro in cammello a Kélibia, spiaggia di El Mansoura',
      description:
        'Una carovana di cammelli sulla spiaggia di El Mansoura all’alba o al tramonto, su animali tranquilli. Tè alla menta e foto inclusi. Prenota su WhatsApp.',
      h1: 'Giro in cammello a Kelibia',
      intro:
        'Una carovana di cammelli lungo la spiaggia di El Mansoura, all’alba o al tramonto, al passo lento della riva. Gli animali sono tranquilli e adatti alle famiglie, e il tè alla menta e le foto fanno parte del giro.',
      sections: [
        {
          q: 'In che cosa consiste il giro in cammello?',
          a: [
            'Vi unite a una carovana che percorre la spiaggia di El Mansoura, all’alba o al tramonto, guidata da una persona che resta con il gruppo per tutto il percorso.',
            'È la versione lenta di Kelibia: il passo degli animali, l’acqua da un lato e una sosta per il tè alla menta e le foto.',
          ],
        },
        meeting,
        { q: 'Quanto dura?', a: ['Trenta minuti o un’ora — si sceglie al momento della prenotazione.'] },
        {
          q: 'Che cosa è incluso?',
          a: [
            'Il cammello, il casco, la guida, il tè alla menta e le foto. Tutte le esperienze M’Caravane sono guidate, assicurate e adatte ai principianti.',
          ],
        },
        {
          q: 'È adatto alle famiglie e a chi non l’ha mai fatto?',
          a: [
            'Sì. Gli animali sono tranquilli e scelti per le famiglie, e non si richiede esperienza a nessuno del gruppo.',
            'Una guida accompagna la carovana dall’inizio alla fine e i gruppi restano piccoli.',
          ],
        },
        booking('il giro in cammello'),
      ],
      duration: '30 min / 1h',
      includes: 'Cammello, casco, guida, tè alla menta, foto',
      schema: {
        name: 'Giro in cammello sulla spiaggia di El Mansoura, Kelibia',
        description:
          'Carovana guidata di cammelli sulla spiaggia di El Mansoura all’alba o al tramonto, su animali tranquilli adatti alle famiglie. Tè alla menta e foto inclusi.',
        touristType: ['Famiglie', 'Coppie', 'Prima volta'],
      },
    },

    horse: {
      title: 'Passeggiata a cavallo a Kélibia, spiaggia El Mansoura',
      description:
        'Una passeggiata a cavallo lungo la riva di El Mansoura, con percorsi più lunghi per chi ha esperienza. Guidata e assicurata. Prenota su WhatsApp.',
      h1: 'Passeggiata a cavallo a Kelibia',
      intro:
        'Una passeggiata lungo la riva di El Mansoura, all’alba o al tramonto, con percorsi più lunghi per chi è a proprio agio in sella. Una guida accompagna ogni uscita, sullo stesso tratto di costa delle nostre carovane di cammelli.',
      sections: [
        {
          q: 'In che cosa consiste la passeggiata a cavallo?',
          a: [
            'Percorrete la spiaggia di El Mansoura con una guida, all’alba o al tramonto, sullo stesso itinerario costiero delle carovane di cammelli.',
            'Chi è a proprio agio in sella può scegliere i percorsi più lunghi invece del giro breve lungo la riva.',
          ],
        },
        meeting,
        {
          q: 'Quanto dura?',
          a: ['Trenta minuti o un’ora, con percorsi più lunghi per chi ha esperienza in sella.'],
        },
        {
          q: 'Che cosa è incluso?',
          a: [
            'Il cavallo, il casco, la guida, il tè alla menta e le foto. Tutte le esperienze M’Caravane sono guidate, assicurate e adatte ai principianti.',
          ],
        },
        {
          q: 'Posso partecipare se non sono mai salito a cavallo?',
          a: [
            'Sì. Le passeggiate sono adatte ai principianti e una guida resta con voi per tutto il percorso — sono i tragitti più lunghi a richiedere una certa dimestichezza in sella.',
          ],
        },
        booking('la passeggiata a cavallo'),
      ],
      duration: '30 min / 1h',
      includes: 'Cavallo, casco, guida, tè alla menta, foto',
      schema: {
        name: 'Passeggiata a cavallo sulla spiaggia di El Mansoura, Kelibia',
        description:
          'Passeggiata a cavallo guidata lungo la riva di El Mansoura, a Kelibia, con percorsi più lunghi per chi ha esperienza in sella. Adatta ai principianti, guida inclusa.',
        touristType: ['Principianti', 'Cavalieri esperti', 'Coppie'],
      },
    },

    city: {
      title: 'Visita di Kélibia e del suo museo con guida locale',
      description:
        'Salite al Forte bizantino, percorrete il vecchio porto e scoprite Kelibia punica e romana al museo, con una guida. Tre ore o mezza giornata.',
      h1: 'Visita della città e del museo di Kelibia',
      intro:
        'Duemilacinquecento anni di Kelibia in una sola visita: il Forte bizantino sopra la città, il vecchio porto e le collezioni puniche e romane del museo, con una guida che le conosce. Kerkouane si può aggiungere al percorso.',
      sections: [
        {
          q: 'In che cosa consiste la visita?',
          a: [
            'Si sale al Forte bizantino, si percorre il vecchio porto e poi si visita il museo — Kelibia punica e romana — sempre accompagnati da una guida.',
            'Kerkouane, la città punica lungo la costa, è facoltativa e si può aggiungere al momento della prenotazione.',
          ],
        },
        meeting,
        { q: 'Quanto dura?', a: ['Tre ore, oppure mezza giornata se si aggiunge Kerkouane.'] },
        {
          q: 'Che cosa è incluso?',
          a: [
            'La guida, i biglietti d’ingresso e il trasporto locale. Tutte le esperienze M’Caravane sono guidate, assicurate e adatte ai principianti.',
          ],
        },
        {
          q: 'In quali lingue si svolge la visita?',
          a: [`In ${LANGUAGES}. Indicate la vostra preferenza al momento della prenotazione.`],
        },
        booking('la visita della città e del museo'),
      ],
      duration: '3h / mezza giornata',
      includes: 'Guida, biglietti d’ingresso, trasporto locale',
      schema: {
        name: 'Visita della città e del museo di Kelibia',
        description:
          'Visita guidata al Forte bizantino, al vecchio porto e alle collezioni puniche e romane del museo di Kelibia, con Kerkouane come opzione. Biglietti d’ingresso e trasporto locale inclusi.',
        touristType: ['Appassionati di storia', 'Famiglie', 'Viaggiatori culturali'],
      },
    },

    activities: {
      title: 'Attività a Kélibia — quad, cammello, cavallo, storia',
      description:
        'Quattro modi di vivere Kelibia, tra terra, mare e storia. Tutte guidate, assicurate e adatte ai principianti, in piccoli gruppi. Prenota su WhatsApp.',
      h1: 'Attività a Kelibia',
      intro:
        'Quattro modi di vivere Kelibia, tra terra, mare e storia. Ogni esperienza è guidata, assicurata e adatta ai principianti, e si svolge in piccoli gruppi con una guida locale.',
      sections: [
        {
          q: 'Posso combinare due attività nella stessa giornata?',
          a: [
            'Sì. Combinate due o più attività e costruite la vostra giornata ideale a Kelibia — organizziamo tutto noi, dal trasporto al momento migliore della giornata.',
          ],
        },
        {
          q: 'Che cosa hanno in comune tutte le esperienze?',
          a: [
            `Sono tutte guidate, assicurate e adatte ai principianti, si svolgono in piccoli gruppi e sono condotte in ${LANGUAGES}. Tutte partono da ${MEETING}.`,
          ],
        },
      ],
    },

    practical: {
      title: 'Informazioni pratiche e FAQ | Attività a Kélibia, Cap Bon',
      description:
        'Punto d’incontro, durate, che cosa è incluso, lingue e come prenotare quad, cammello, cavallo o visita a Kelibia. Le risposte prima di prenotare.',
      h1: 'Informazioni pratiche e FAQ',
      intro:
        'Tutto quello che possiamo dirvi prima del primo messaggio WhatsApp: dove ci si incontra, quanto dura ogni esperienza, che cosa è incluso e in quali lingue lavora la guida.',
      faq: [
        {
          q: 'Da dove partono le attività?',
          a: [`Tutte le esperienze partono da ${MEETING}. L’orario esatto viene confermato al momento della prenotazione.`],
        },
        {
          q: 'Che lingue parlano le guide?',
          a: [`${LANGUAGES.charAt(0).toUpperCase()}${LANGUAGES.slice(1)}. Indicate la lingua che preferite al momento della prenotazione e assegniamo la guida di conseguenza.`],
        },
        {
          q: 'Come si prenota?',
          a: [
            `Su ${BOOKING}, oppure via e-mail a hello@mcaravane.tn. Scrivete il giorno, l’attività e il numero di persone, e vi confermiamo l’orario.`,
          ],
        },
        {
          q: 'Quanto dura ogni attività?',
          a: [
            'L’escursione in quad dura una o due ore. I giri in cammello e a cavallo durano trenta minuti o un’ora. La visita della città e del museo dura tre ore, o mezza giornata con Kerkouane.',
          ],
        },
        {
          q: 'Serve esperienza?',
          a: [
            'No. Tutte le esperienze sono adatte ai principianti e l’escursione in quad inizia con un briefing. Una guida resta con il gruppo dall’inizio alla fine.',
          ],
        },
        {
          q: 'Le attività sono adatte alle famiglie?',
          a: [
            'I giri in cammello si fanno su animali tranquilli scelti per le famiglie, e tutte le nostre esperienze sono guidate, assicurate e adatte ai principianti, in piccoli gruppi.',
          ],
        },
        {
          q: 'Posso fare più di un’attività in un giorno?',
          a: [
            'Sì. Combinate due o più attività e costruite la vostra giornata ideale a Kelibia — organizziamo tutto noi, dal trasporto al momento migliore della giornata.',
          ],
        },
        {
          q: 'Che cosa è incluso?',
          a: [
            'L’escursione in quad comprende il quad, il casco, la guida, l’acqua e una foto ricordo. I giri in cammello e a cavallo comprendono l’animale, il casco, la guida, il tè alla menta e le foto. La visita della città e del museo comprende la guida, i biglietti d’ingresso e il trasporto locale.',
          ],
        },
        {
          q: 'Dove si trova Kelibia?',
          a: [
            'Kelibia si trova sulla penisola di Cap Bon, nel governatorato di Nabeul, in Tunisia. Il nostro punto d’incontro è l’Hotel Kelibia Beach.',
          ],
        },
      ],
    },

    about: {
      title: 'Chi siamo — M’Caravane, guide locali a Kélibia, Cap Bon',
      description:
        'M’Caravane propone escursioni in quad, cammelli, cavalli e patrimonio a Kelibia, con guide locali e piccoli gruppi. Mare, sabbia e storia, per davvero.',
      h1: 'Chi siamo',
      intro:
        'M’Caravane propone esperienze autentiche tra mare, sabbia e storia a Kelibia, sulla penisola di Cap Bon. Piccoli gruppi, guide locali, ricordi che restano.',
      sections: [
        {
          q: 'Chi siamo?',
          a: [
            'Un operatore locale di Kelibia che propone quattro esperienze: escursioni in quad, giri in cammello, passeggiate a cavallo e visite guidate della città e del suo museo.',
            'Ogni esperienza è guidata, assicurata e adatta ai principianti, e si svolge in piccoli gruppi con una guida locale.',
          ],
        },
        {
          q: 'Dove operate?',
          a: [
            `A Kelibia e lungo la costa di Cap Bon — la spiaggia di El Mansoura, le dune e la pineta dell’entroterra, il Forte bizantino sopra la città. Tutto parte da ${MEETING}.`,
          ],
        },
        {
          q: 'In quali lingue lavorate?',
          a: [`In ${LANGUAGES}.`],
        },
      ],
    },

    contact: {
      title: 'Contatti e prenotazioni — M’Caravane Kélibia, Cap Bon',
      description:
        'Prenotate quad, cammello, cavallo o visita della città a Kelibia su WhatsApp al +216 25 434 499, oppure scrivete a hello@mcaravane.tn. Rispondiamo subito.',
      h1: 'Contatti e prenotazioni',
      intro:
        'Le prenotazioni si fanno su WhatsApp. Scriveteci il giorno, l’attività e quante persone siete: vi rispondiamo con un orario, un preventivo e il punto d’incontro.',
      sections: [
        {
          q: 'Come si prenota?',
          a: [`Su ${BOOKING}. È il modo più rapido per raggiungerci e il canale su cui confermiamo.`],
        },
        {
          q: 'Dove ci si incontra?',
          a: [`Presso ${MEETING}.`],
        },
        {
          q: 'In che lingua posso scrivere?',
          a: [`In ${LANGUAGES}.`],
        },
      ],
    },
  },
}
