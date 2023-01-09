// noinspection SpellCheckingInspection

import { CollectionType, LanguageISO } from './types';
import { Translation, TranslationCreate } from '../client/api';

type Keyword = {
  [T in LanguageISO]: string;
};

type Keywords = {
  [T in string]: Keyword;
};

const generalKeywords = {
  welcome: {
    de: 'Willkommen, bitte anmelden!',
    it: 'Benvenuto, per favore accedere!',
    en: 'Welcome, please login!',
  },
  me: {
    de: 'Ich',
    it: 'Io',
    en: 'Me',
  },
  loading: {
    de: 'Lade...',
    it: 'Caricamento...',
    en: 'Loading...',
  },
  not_implemented: {
    de: 'Noch nicht implementiert.',
    it: 'Non ancora implementato.',
    en: 'Not implemented yet.',
  },
  credentials_wrong: {
    de: 'Anmeldedaten nicht korrekt',
    it: 'Dati di accesso errati',
    en: 'Wrong credentials supplied',
  },
  serverError: {
    de: 'Es hat sich ein Serverproblem ergeben, bitte später probieren.',
    it: 'Si è verificato un problema con il server, riprova più tardi.',
    en: 'There is a server error, please try again later.',
  },
  noConnection: {
    de: 'Bitte kontrolliere deine Verbindung zum Internet!',
    it: 'Controlla la tua conessione internet!',
    en: 'Please check your connection to the internet!',
  },
  whoops: {
    de: 'Whoops',
    it: 'Whoops',
    en: 'Whoops',
  },
  chooseLanguage: {
    de: 'Sprache wählen',
    it: 'Seleziona lingua',
    en: 'Choose language',
  },
  chooseProvince: {
    de: 'Provinz wählen',
    it: 'Seleziona provincia',
    en: 'Choose province',
  },
  no_user_found: {
    de: 'User nicht gefunden!',
    it: 'User non trovato!',
    en: 'User not found!',
  },
  not_registered: {
    de: 'Noch nicht registriert',
    it: 'Non registrato',
    en: 'Not registered',
  },
  login_required: {
    de: 'Anmeldung erforderlich',
    it: 'Login necessario',
    en: 'Login required',
  },
  logInSuccess: {
    de: 'Erfolgreich angemeldet',
    it: 'Effettuato il login con successo',
    en: 'Logged in successfully',
  },
  skip: {
    de: 'Überspringen',
    it: 'Salta',
    en: 'Skip',
  },
  continue: {
    de: 'Weiter',
    it: 'Continua',
    en: 'Continue',
  },
  choose_picker: {
    de: '-- Bitte wählen --',
    it: '-- Seleziona --',
    en: '-- Choose --',
  },
  first_open: {
    de: 'Willkommen auf Clava-Sports, Sie sind das erste mal hier? Zwei kurze schritte bevor wir beginnen:',
    it: 'Benvenuto in Clava-Sports, sei qui per la prima volta? Due rapidi passaggi prima di iniziare:',
    en: 'Welcome to Clava-Sports, are you here for the first time? Two quick steps before we begin:',
  },
  error_occurred: {
    de: 'Ups... da ist ein Fehler aufgetreten!',
    it: 'Ops... si è verificato un errore!',
    en: "Ops... we're encountering some issues!",
  },
  matches: {
    de: 'Spiele',
    it: 'Partite',
    en: 'Matches',
  },
  table: {
    de: 'Tabelle',
    it: 'Classifica',
    en: 'Table',
  },
  statistics: {
    de: 'Statistiken',
    it: 'Statistiche',
    en: 'Statistics',
  },
  transfers: {
    de: 'Transfers',
    it: 'Video',
    en: 'Videos',
  },
  videos: {
    de: 'Videos',
    it: 'Video',
    en: 'Videos',
  },
  bulletins: {
    de: 'Rundschreiben',
    it: 'Communicati',
    en: 'Bulletins',
  },
  noMatches: {
    de: 'Keine Spiele',
    en: 'No matches',
    it: 'Nessuna partita',
  },
  matchDay: {
    de: 'Spieltag',
    it: 'Giornata',
    en: 'Matchday ',
  },
  loadingMatches: {
    de: 'Spiele werden geladen',
    it: 'Caricamento partite',
    en: 'Loading matches',
  },
  chooseMatchday: {
    de: 'Spieltag wählen',
    it: 'Seleziona giornata',
    en: 'Select matchday',
  },
  chooseDate: {
    de: 'Datum wählen',
    it: 'Selezionare la data',
    en: 'Choose date',
  },
  againExit: {
    de: 'Drücke nochmal, um die App zu schließen',
    it: "Premi di nuovo per chiudere l'app",
    en: 'Press again to close the app',
  },
  overall: {
    de: 'Gesamt',
    it: 'Totale',
    en: 'Total',
  },
  home: {
    de: 'Heim',
    it: 'Casa',
    en: 'Home',
  },
  away: {
    de: 'Auswärts',
    it: 'Trasferta',
    en: 'Away',
  },
  share: {
    de: 'teilen',
    it: 'condividi',
    en: 'share',
  },
  shareTitle: {
    de: 'Teilen',
    it: 'Condividi',
    en: 'Share',
  },
  tie: {
    de: 'Unentschieden',
    it: 'Pareggio',
    en: 'Tie',
  },
  difference: {
    de: 'DIF',
    it: 'DIF',
    en: 'DIF',
  },
  matchesShort: {
    de: 'SP',
    it: 'G',
    en: 'M',
  },
  points: {
    de: 'PT',
    it: 'PT',
    en: 'PTS',
  },
  halftime: {
    de: 'Halbzeit',
    it: 'Intervallo',
    en: 'Halftime',
  },
  fulltime: {
    de: 'Ende',
    it: 'Fine',
    en: 'Fulltime',
  },
  reportError: {
    de: 'Fehler melden',
    it: 'Segnala errore',
    en: 'Report error',
  },
  lineupMissing: {
    de: 'Keine Aufstellung eingetragen',
    it: 'Nessuna formazione inserita',
    en: 'Lineup missing',
  },
  changes: {
    de: 'Wechsel',
    it: 'Cambi',
    en: 'Changes',
  },
  noChanges: {
    de: 'Keine Wechsel',
    it: 'Nessun cambio',
    en: 'No changes',
  },
  shareScore: {
    de: 'Ergebniss [team1] - [team2]: [goal1] - [goal2]! \nGesehen auf Clava!',
    it: 'Risultato [team1] - [team2]: [goal1] - [goal2]! \nGesehen auf Clava!',
    en: 'Result [team1] - [team2]: [goal1] - [goal2]! \nGesehen auf Clava!',
  },
  noLineupEntered: {
    de: 'Keine Aufstellung eingetragen!',
    it: 'Nessuna formazione inserita!',
    en: 'Lineup not entered!',
  },
  noEventsEntered: {
    de: 'Keine Ereignisse eingetragen!',
    it: 'Nessuna evento inserita!',
    en: 'No events entered!',
  },
  enterLineup: {
    de: 'Aufstellung eintragen!',
    it: 'Inserisci formazione!',
    en: 'Enter lineup!',
  },
  results: {
    de: 'Treffer',
    it: 'Risultati',
    en: 'Hits',
  },
  prevQueries: {
    de: 'Suchverlauf...',
    it: 'Storia della ricerca...',
    en: 'Search history...',
  },
  searches: {
    de: 'Anfragen',
    it: 'Richieste',
    en: 'Searches',
  },
  showAll: {
    de: 'Mehr anzeigen',
    it: 'Mostra di più',
    en: 'Show more',
  },
  showLess: {
    de: 'Weniger anzeigen',
    it: 'Mostra di meno',
    en: 'Show less',
  },
  showMore: {
    de: 'Mehr anzeigen',
    it: 'Mostra di più',
    en: 'Show more',
  },
  matchesDone: {
    de: 'Bereits gespielt',
    it: 'Terminate',
    en: 'Already finished',
  },
  matchesToPlay: {
    de: 'Noch zu spielen',
    it: 'Ancora da giocare',
    en: 'Yet to play',
  },
  mainSponsors: {
    de: 'Hauptsponsoren',
    it: 'Sponsor principali',
    en: 'Main sponsor',
  },
  teamInfo: {
    de: 'Vereinsinfos',
    it: 'Info società',
    en: 'Club info',
  },
  teamLocation: {
    de: 'Spielstätte',
    it: 'Stadio',
    en: 'Stadium',
  },
  teamFounded: {
    de: 'Gründungsjahr',
    it: 'Anno di fondazione',
    en: 'Foundation year',
  },
  teamPresident: {
    de: 'Präsident',
    it: 'Presidente',
    en: 'President',
  },
  teamTel: {
    de: 'Telefon',
    it: 'Telefono',
    en: 'Phone',
  },
  teamMail: {
    de: 'E-Mail',
    it: 'E-mail',
    en: 'Email',
  },
  teamtitle: {
    de: 'Erfolge',
    it: 'Titoli',
    en: 'Trophies',
  },
  minutes: {
    de: 'Min',
    it: 'Min',
    en: 'Min',
  },
  goals: {
    de: 'Tore',
    it: 'Gol',
    en: 'Goals',
  },
  wins: {
    de: 'W',
    it: 'V',
    en: 'W',
  },
  draws: {
    de: 'D',
    it: 'N',
    en: 'D',
  },
  losses: {
    de: 'L',
    it: 'P',
    en: 'L',
  },
  goalsOut: {
    de: 'F',
    it: 'F',
    en: 'F',
  },
  goalsIn: {
    de: 'A',
    it: 'S',
    en: 'A',
  },
  lineup: {
    de: 'Lineup',
    it: 'Formazione',
    en: 'Lineup',
  },
  list: {
    de: 'Liste',
    it: 'Lista',
    en: 'List',
  },
  teams: {
    de: 'Mannschaften',
    it: 'Squadre',
    en: 'Teams',
  },
  leagues: {
    de: 'Ligen',
    it: 'Campionati',
    en: 'Leagues',
  },
  players: {
    de: 'Spieler',
    it: 'Giocatori',
    en: 'Players',
  },
  language: {
    de: 'Sprache',
    it: 'Lingua',
    en: 'Language',
  },
  darkMode: {
    de: 'Dark Mode',
    it: 'Dark Mode',
    en: 'Dark Mode',
  },
  notifications: {
    de: 'Benachrichtigungen',
    it: 'Notifiche',
    en: 'Notifications',
  },
  areaOfInterest: {
    de: 'Provinz',
    it: 'Provincia',
    en: 'Provinz',
  },
  chooseAoi: {
    de: 'Provinz wechseln',
    it: 'Cambia provincia',
    en: 'Change area',
  },
  contactUs: {
    de: 'Kontaktiere uns',
    it: 'Contattaci',
    en: 'Contact us',
  },
  rateUs: {
    de: 'Bewerte uns',
    it: 'Scrivi una recensione',
    en: 'Rate us',
  },
  adsOnClava: {
    de: 'Deine Werbung auf Clava',
    it: 'Fai pubblicità su Clava',
    en: 'Your ads on Clava',
  },
  aboutUs: {
    de: 'Über uns',
    it: 'Chi siamo',
    en: 'About us',
  },
  shareFriends: {
    de: 'Mit Freunden teilen',
    it: 'Condividi con amici',
    en: 'Share with friends',
  },
  impressum: {
    de: 'Impressum',
    it: 'Impressum',
    en: 'Impressum',
  },
  privacy: {
    de: 'Privacy',
    it: 'Privacy',
    en: 'Privacy',
  },
  tos: {
    de: 'Agb',
    it: 'Tos',
    en: 'Tos',
  },
  cancelledShort: {
    de: 'Abges.',
    it: 'Cancel',
    en: 'Cancel',
  },
  addTeam: {
    de: 'Mannschaft hinzufügen',
    it: 'Aggiungi squadra',
    en: 'Add team',
  },
  noFavsFor: {
    de: 'Oh... noch [type] favorisiert',
    it: 'Oh... noch [type] favorisato',
    en: 'Oh... [type] favorites',
  },
  noTeam: {
    de: 'Keine Mannschaft',
    it: 'Nessuna squadra',
    en: 'No team',
  },
  noMatch: {
    de: 'Kein Spiel',
    it: 'Nessuna partita',
    en: 'No match',
  },
  register: {
    de: 'Registrieren',
    it: 'Registrati',
    en: 'Register',
  },
  login: {
    de: 'Anmelden',
    it: 'Accedi',
    en: 'Login',
  },
  logout: {
    de: 'Abmelden',
    it: 'Esci',
    en: 'Log out',
  },
  alreadyRegistered: {
    de: 'Hast du bereits ein Profil?',
    it: 'Hai già un profilo?',
    en: 'Do you already have a profile?',
  },
  beInsider: {
    de: 'Clava Insider werden',
    it: 'Diventa Clava Insider',
    en: 'Become Clava Insider',
  },
  insider: {
    de: 'Insider',
    it: 'Insider',
    en: 'Insider',
  },
  dev: {
    de: 'DEV',
    it: 'DEV',
    en: 'DEV',
  },
  prod: {
    de: 'PROD',
    it: 'PROD',
    en: 'PROD',
  },
  beta: {
    de: 'BETA',
    it: 'BETA',
    en: 'BETA',
  },
  teamInsider: {
    de: 'Vereinsmanager',
    it: 'Club manager',
    en: 'Club manager',
  },
  yourTeams: {
    de: 'Meine Mannschaften',
    it: 'Le mie squadre',
    en: 'My teams',
  },
  moreStats: {
    de: 'MEHR STATISTIKEN,',
    it: 'PIÙ STATISTICHE,',
    en: 'MORE STATISTICS,',
  },
  moreInsights: {
    de: 'MEHR INSIGHTS,',
    it: 'PIÙ NOTIZIE,',
    en: 'MORE INSIGHTS,',
  },
  moreSport: {
    de: 'MEHR SPORT!',
    it: 'PIÙ SPORT!',
    en: 'MORE SPORT!',
  },
  premium: {
    de: 'Clava Premium',
    it: 'Clava Premium',
    en: 'Clava Premium',
  },
  welcomePremium: {
    de: 'WILLKOMMEN BEI CLAVA PREMIUM',
    it: 'BENVENUTO DA CLAVA PREMIUM',
    en: 'WELCOME AT CLAVA PREMIUM',
  },
  welcomeInsider: {
    de: 'WERDE CLAVA INSIDER',
    it: 'DIVENTA CLAVA INSIDER',
    en: 'BECOME CLAVA INSIDER',
  },
  givenName: {
    de: 'Vorname',
    it: 'Nome',
    en: 'Given Name',
  },
  familyName: {
    de: 'Nachname',
    it: 'Cognome',
    en: 'Family Name',
  },
  mailAddress: {
    de: 'E-Mail Adresse',
    it: 'Indirizzo e-mail',
    en: 'Email address',
  },
  password: {
    de: 'Passwort',
    it: 'Password',
    en: 'Password',
  },
  passwordRepeat: {
    de: 'Passwort wiederholen',
    it: 'Ripeti password',
    en: 'Repeat password',
  },
  pwNotSame: {
    de: 'Passwörter stimmen nicht überein',
    it: 'Le passwords non corrispondono',
    en: 'Passwords do not match',
  },
  mailInvalid: {
    de: 'E-Mail Adresse ungültig',
    it: 'Indirizzo e-mail non valido',
    en: 'Email invalid',
  },
  mailGiven: {
    de: 'E-Mail Adresse bereits vergeben',
    it: 'Indirizzo e-mail già utilizzato',
    en: 'Email adress already taken',
  },
  usernameGiven: {
    de: 'Benutzername bereits vergeben',
    it: 'Nome utente già utilizzato',
    en: 'Username already taken',
  },
  failed: {
    de: 'Fehler bei der Registrierung',
    it: 'Errore durante la registrazione',
    en: 'Registration failed',
  },
  pwNotValid: {
    de: 'Passwort unsicher',
    it: 'Password incerta',
    en: 'Password not safe enough',
  },
  pwWrong: {
    de: 'E-Mail oder Passwort falsch',
    it: 'E-mail o password errata',
    en: 'Email or passwort wrong',
  },
  notRegistered: {
    de: 'Benutzer nicht gefunden',
    it: 'Utente non trovato',
    en: 'User not found',
  },
  registerNow: {
    de: 'Konto erstellen',
    it: 'Crea un account',
    en: 'Create account',
  },
  confirmMailShort: {
    de: 'E-Mail bestätigen',
    it: 'Conferma e-mail',
    en: 'Confirm email',
  },
  chooseTeamInsider: {
    de: 'Für welche Mannschaft möchtest du eintragen?',
    it: 'Per quale squadra vuoi inserire?',
    en: 'Which team would you like to manage?',
  },
  confirmMail: {
    de: 'Du hast einen Code per E-Mail erhalten, bitte tippe ihn hier ein! (Spamordner Kontrollrollieren)',
    it: 'Hai ricevuto un codice via e-mail, inseriscilo qui! (Spamordner Kontrollrollieren)',
    en: 'You have received a code via email, please enter it here! (Spamordner Kontrollrollieren)',
  },
  pwForgotMail: {
    de: 'Du hast einen Code per E-Mail erhalten, bitte tippe ihn hier ein!',
    it: 'Hai ricevuto un codice via e-mail, inseriscilo qui!',
    en: 'You have received a code via email, please enter it here!',
  },
  codeInvalid: {
    de: 'Der eingegebene Code ist ungültig!',
    it: 'Il codice inserito non è valido!',
    en: 'Der eingegebene Code ist ungültig!',
  },
  submit: {
    de: 'Absenden',
    it: 'Invia',
    en: 'Submit',
  },
  code: {
    de: 'Bestätigungscode',
    it: 'Codice di conferma',
    en: 'Confirmatin code',
  },
  premiumPrice: {
    de: '14,99 € im Jahr',
    it: '14,99 € al anno',
    en: '14,99 € per year',
  },
  getPremium: {
    de: 'Jetzt Premium Account sichern!',
    it: 'Assicurati la versione Premium!',
    en: 'Get your Premium Account!',
  },
  insiderCont: {
    de: 'Als Insider kannst du die Spiele, Resultate und Aufstellungen deiner Mannschaft verwalten.',
    it: 'Come Insider, puoi gestire le partite, i risultati e le formazioni della tua squadra.',
    en: "As an Insider, you can manage your team's games, results and lineups.",
  },
  downloadRights: {
    de: 'Erfahre mehr',
    it: 'Scopri di più',
    en: 'More info',
  },
  beInsiderNow: {
    de: 'Jetzt Insider werden',
    it: 'Diventa Insider',
    en: 'Become an Insider',
  },
  insiderRequestInfo: {
    de: 'Der Antrag wird an den jeweiligen Vereinsmanager gestellt. Dieser ist für den gesamten Verein zuständig. Er hat das Recht Insider und andere Vereinsmanager hinzuzufügen und zu entfernen.',
    it: "La domanda va presentata al rispettivo club manager. È responsabile dell'intero club. Ha il diritto di aggiungere e rimuovere Insider e altri club manager.",
    en: 'The application is submitted to the respective club manager. He is responsible for the whole club. He has the right to add and remove Insiders and other club managers.',
  },
  createNew: {
    de: 'Neu erstellen',
    it: 'Crea nuovo',
    en: 'Create new',
  },
  premiumAccount: {
    de: 'Premium Account',
    it: 'Premium Account',
    en: 'Premium Account',
  },
  noMatchforSearch: {
    de: 'Nichts gefunden',
    it: 'Nichts gefunden',
    en: 'Nichts gefunden',
  },
  changeTeamThumb: {
    de: 'Mannschaftsfoto ändern',
    it: 'Cambia foto',
    en: 'Change foto',
  },
  earlier: {
    de: 'Früher',
    it: 'Prima',
    en: 'Earlier',
  },
  later: {
    de: 'Später',
    it: 'Dopo',
    en: 'Later',
  },
  today: {
    de: 'Heute',
    it: 'Oggi',
    en: 'Today',
  },
  tomorrow: {
    de: 'Morgen',
    it: 'Domani',
    en: 'Tomorrow',
  },
  yesterday: {
    de: 'Gestern',
    it: 'Ieri',
    en: 'Yesterday',
  },
  featuredNews: {
    de: 'Featured News',
    it: 'Featured News',
    en: 'Featured News',
  },
  modifySponsor: {
    de: 'Sponsor bearbeiten',
    it: 'Modifica sponsor',
    en: 'Edit sponsor',
  },
  addSponsor: {
    de: 'Hinzufügen',
    it: 'Aggiungi',
    en: 'Add',
  },
  insertMatch: {
    de: 'Spiel eintragen',
    it: 'Inserisci partita',
    en: 'Insert match',
  },
  doTransfer: {
    de: 'Transfer eintragen',
    it: 'Effettuare trasferimenti',
    en: 'Make a transfer',
  },
  editSquad: {
    de: 'Kader bearbeiten',
    it: 'Modifica rosa',
    en: 'Modify team',
  },
  save: {
    de: 'Speichern',
    it: 'Salva',
    en: 'Save',
  },
  voteMotmNow: {
    de: 'Man of the Match wählen',
    it: 'Vota il Man of the Match',
    en: 'Vote the Man of the Match',
  },
  voteMotm: {
    de: 'MAN OF THE MATCH WÄHLEN',
    it: 'VOTA IL MAN OF THE MATCH',
    en: 'VOTE MAN OF THE MATCH',
  },
  voteNow: {
    de: 'Jetzt wählen!',
    it: 'Vota ora!',
    en: 'Vote now!',
  },
  infoVoteMotm: {
    de: 'Der Man of the Match wird von den Usern auf Basis seiner Leistung gewählt. Nur die drei Erstplatzierten nach Stimmen werden angezeigt.',
    it: 'Il Man of the Match viene scelto dagli utenti in base alla sua prestazione. Vengono visualizzati solo i primi tre per voti.',
    en: 'The Man of the Match is chosen by the users based on his performance. Only the top three by votes are displayed.',
  },
  toFewVotes: {
    de: 'Zu wenig Stimmen',
    it: 'Troppo pochi voti',
    en: 'To few votes',
  },
  choosePlayer: {
    de: 'Spieler wählen',
    it: 'Seleziona giocatore',
    en: 'Choose player',
  },
  chooseAssist: {
    de: 'Assist wählen',
    it: 'Seleziona giocatore',
    en: 'Choose player',
  },
  whoComesOut: {
    de: 'Wer wird ausgewechselt?',
    it: 'Chi esce?',
    en: 'Who will be substituted (OUT)?',
  },
  whoComesIn: {
    de: 'Wer wird eingewechselt?',
    it: 'Chi entra?',
    en: 'Who will be substituted (IN)?',
  },
  scorer: {
    de: 'Torschütze',
    it: 'Marcatore',
    en: 'Scorer',
  },
  injured: {
    de: 'Verletzung',
    it: 'Lesione',
    en: 'Injury',
  },
  assist: {
    de: 'Assist',
    it: 'Assist',
    en: 'Assist',
  },
  player: {
    de: 'Spieler',
    it: 'Giocatore',
    en: 'Player',
  },
  wrongdoer: {
    de: 'Übeltäter',
    it: 'Giocatore',
    en: 'Wrongdoer',
  },
  newTeam: {
    de: 'Neue Mannschaft',
    it: 'Nuova squadra',
    en: 'New team',
  },
  oldTeam: {
    de: 'Aus Team',
    it: 'Aus Team',
    en: 'Aus Team',
  },
  chooseLeague: {
    de: 'Liga wählen',
    it: 'Seleziona campionato',
    en: 'Choose league',
  },
  chooseTeam: {
    de: 'Mannschaft wählen',
    it: 'Seleziona squadra',
    en: 'Choose team',
  },
  transferIn: {
    de: 'Neuzugang',
    it: 'Arrivo',
    en: 'Arrival',
  },
  transferOut: {
    de: 'Abgang',
    it: 'Partenza',
    en: 'Departure',
  },
  resetPw: {
    de: 'Passwort zurücksetzen',
    it: 'Resetta la password',
    en: 'Reset password',
  },
  pwForgot: {
    de: 'Hast du dein Passwort vergessen?',
    it: 'Hai dimenticato la tua password?',
    en: 'Did you forgot your password?',
  },
  enterEvent: {
    de: 'Ereignis eintragen',
    it: 'Inserire evento',
    en: 'Enter event',
  },
  editMatch: {
    de: 'Spiel verwalten',
    it: 'Modifica partita',
    en: 'Edit game',
  },
  cancelMatch: {
    de: 'Spiel absagen',
    it: 'Annula la partita',
    en: 'Cancel game',
  },
  matchTime: {
    de: 'Datum & Uhrzeit',
    it: 'Data & orario',
    en: 'Date & Time',
  },
  changeMatchTime: {
    de: 'Datum & Uhrzeit ändern',
    it: 'Cambia data & orario',
    en: 'Change date & time',
  },
  changeMatchLocation: {
    de: 'Spielstätte ändern',
    it: 'Cambia luogo',
    en: 'Change field',
  },
  successGroupRequest: {
    de: 'Deine Anfrage wurde versendet. Du siehst deine laufenden Anfragen hier!',
    it: 'La tua richiesta è stata inviata. Puoi vedere le tue richieste in corso qui!',
    en: 'Your request has been sent. You can see your ongoing requests here!',
  },
  gameMinute: {
    de: 'Spielminute',
    it: 'Minuto',
    en: 'Minute',
  },
  goal: {
    de: 'Tor',
    it: 'Gol',
    en: 'Goal',
  },
  chance: {
    de: 'Chance',
    it: 'Occasione',
    en: 'Chance',
  },
  whatHappened: {
    de: 'Was ist passiert?',
    it: 'Che cosa è successo?',
    en: 'What happened?',
  },
  card: {
    de: 'Karte',
    it: 'Cartellino',
    en: 'Card',
  },
  change: {
    de: 'Wechsel',
    it: 'Cambio',
    en: 'Change',
  },
  cancel: {
    de: 'Abbrechen',
    it: 'Annulla',
    en: 'Cancel',
  },
  selectDate: {
    de: 'Datum wählen',
    it: 'Seleziona data',
    en: 'Choose date',
  },
  tel: {
    de: 'Telefon',
    it: 'Telefono',
    en: 'Phone',
  },
  message: {
    de: 'Nachricht',
    it: 'Messagio',
    en: 'Message',
  },
  requests: {
    de: 'Anträge',
    it: 'Richieste',
    en: 'Requests',
  },
  infoRequests: {
    de: 'Jeder kann einen Antrag stellen um Insider zu werden. Bitte überprüfe genau wem du diese Rolle zuweist',
    it: 'Chiunque può candidarsi per diventare un insider. Controlla attentamente a chi assegni questo ruolo',
    en: 'Anyone can apply to become an insider. Please check carefully who you assign this role to',
  },
  request: {
    de: 'Antrag',
    it: 'Richiesta',
    en: 'Request',
  },
  accept: {
    de: 'Annehmen',
    it: 'Accettare',
    en: 'Accept',
  },
  decline: {
    de: 'Ablehnen',
    it: 'Declinare',
    en: 'Decline',
  },
  noOtherInsiders: {
    de: 'Keine anderen Vereinsmanager oder Insider',
    it: 'Nessun altro club manager o insider',
    en: 'No other club managers or insiders',
  },
  infoTeamInsider: {
    de: 'Der Vereinsmanager kann nicht nur Ergebnisse, Ereignisse und Aufstellungen eintragen, sondern ist auch dazu befugt Vereinsdaten, Mannschaftsbilder und weitere Details zu ändern sowie Transfers zu tätigen. Sei also vorsichtig, wenn du zum Vereinsmanager ernennst!',
    it: 'Il club manager non può solo inserire risultati, eventi e formazioni, ma è anche autorizzato a modificare il profilo del club, le foto della squadra e ad effettuare trasferimenti. Quindi fai attenzione quando nominerai un manager di club!',
    en: 'The club manager can not only enter results, events and line-ups, but is also authorized to change the club data, team pictures and to make transfers. So be careful when you appoint as a club manager!',
  },
  infoInsider: {
    de: 'Insider können Ergebnisse, Ereignisse und Aufstellungen für alle Mannschaften deines Vereins eintragen sowie Spiele absagen oder verschieben.',
    it: 'Gli Insider possono pubblicare risultati, eventi e formazioni per tutte le squadre del tuo club, nonché annullare o riprogrammare le partite.',
    en: 'Insiders can post results, events and line-ups for all teams in your club, as well as cancel or reschedule games.',
  },
  infoTel: {
    de: 'Die Telefonnummer kann vom Vereinsmanger eingesehen werden, um in direkten Kontakt mit dir zu treten',
    it: 'Il numero di telefono può essere visto dal manager del club per mettersi in contatto diretto con te',
    en: 'The phone number can be seen by the club manager to get in direct contact with you',
  },
  infoMessage: {
    de: 'Begründe warum du Ergebnisse für diese Mannschaft eintragen möchtest.',
    it: 'Spiega perché vuoi inserire i risultati per questa squadra.',
    en: 'Justify why you want to enter results for this team.',
  },
  info: {
    de: 'Hinweis',
    it: 'Avviso',
    en: 'Notice',
  },
  teamRanking: {
    de: 'Team Statistiken',
    it: 'Team Rankings',
    en: 'Team Rankings',
  },
  playerRanking: {
    de: 'Spieler Statistiken',
    it: 'Player Rankings',
    en: 'Player Rankings',
  },
  tow: {
    de: 'Team of the Week',
    it: 'Team of the Week',
    en: 'Team of the Week',
  },
  noPosition: {
    de: 'Keine Position zugewiesen!',
    it: 'Nessuna posizione assegnata!',
    en: 'No position assigned!',
  },
  chooseFavoriteTeam: {
    de: 'Wähle deine Lieblingsmannschaften',
    it: 'Seleziona le tue squadre preferite',
    en: 'Choose your favourite teams',
  },
  needCamPermission: {
    de: 'Kamera Zugriff',
    it: 'Accesso alla telecamera',
    en: 'Camera access',
  },
  needCamPermissionCont: {
    de: 'Wir benötigen die Berechtigung, um auf die Kamera zuzugreifen!',
    it: 'Abbiamo bisogno del permesso per accedere alla fotocamera!',
    en: 'We need permission to access the camera!!',
  },
  grantPermission: {
    de: 'Erlauben',
    it: 'Permettere',
    en: 'Allow',
  },
  upload: {
    de: 'Upload',
    it: 'Upload',
    en: 'Upload',
  },
  addNewTitle: {
    de: 'Titel hinzufügen',
    it: 'Aggiungi titolo',
    en: 'Add title',
  },
  addNewLocation: {
    de: 'Spielstätte hinzufügen',
    it: 'Aggiungi luogo',
    en: 'Add location',
  },
  addNewLocationInfo: {
    de: 'In diesem Feld kannst du nach einem neuen Spielort suchen',
    it: 'In questo campo puoi cercare una nuova posizione di gioco',
    en: 'In this field you can search for a new game location',
  },
  jersey: {
    de: 'Trikotnummer',
    it: 'Numero maglia',
    en: 'Number jersey',
  },
  sponsorName: {
    de: 'Name',
    it: 'Nome',
    en: 'Name',
  },
  sponsorLink: {
    de: 'Link',
    it: 'Link',
    en: 'Link',
  },
  deleteSponsor: {
    de: 'Löschen',
    it: 'Elimina',
    en: 'Delete',
  },
  changeImage: {
    de: 'Bild ändern',
    it: 'Cambia foto',
    en: 'Change image',
  },
  profile: {
    de: 'Profil',
    it: 'Profilo',
    en: 'Profile',
  },
  myLeagues: {
    de: 'Favoriten',
    it: 'Favoriti',
    en: 'Favorites',
  },
  news: {
    de: 'News',
    it: 'News',
    en: 'News',
  },
  search: {
    de: 'Suche',
    it: 'Ricerca',
    en: 'Search',
  },
  allLeagues: {
    de: 'Alle Ligen',
    it: 'Tutti i campionati',
    en: 'All leagues',
  },
  MatchHistory: {
    de: 'Spielverlauf',
    it: 'Riassunto',
    en: 'Summary',
  },
  MatchLineup: {
    de: 'Aufstellung',
    it: 'Rosa',
    en: 'Lineup',
  },
  MatchInfo: {
    de: 'Info',
    it: 'Info',
    en: 'Info',
  },
  yourBet: {
    de: 'Dein Tipp?',
    it: 'Risultato finale?',
    en: 'Your Bet?',
  },
  MatchStatistics: {
    de: 'Statistiken',
    it: 'Statistiche',
    en: 'Statistics',
  },
  MatchMotm: {
    de: 'Man of the Match',
    it: 'Man of the Match',
    en: 'Man of the Match',
  },
  TeamInfo: {
    de: 'Info',
    it: 'Info',
    en: 'Info',
  },
  TeamMatches: {
    de: 'Spiele',
    it: 'Partite',
    en: 'Matches',
  },
  TeamTable: {
    de: 'Tabelle',
    it: 'Classifica',
    en: 'Table',
  },
  TeamSquad: {
    de: 'Kader',
    it: 'Squadra',
    en: 'Squad',
  },
  TeamStatistics: {
    de: 'Statistiken',
    it: 'Statistiche',
    en: 'Stats',
  },
  errorMailSubject: {
    de: 'Fehler beim Spiel [id]',
    it: 'Errore partita [id]',
    en: 'Error in game [id]',
  },
  errorMailBody: {
    de: 'Fehlerbeschreibung:\n\n\ngemeldet von [user_id]',
    it: 'Descrizione errore:\n\n\ngemeldet von [user_id]',
    en: 'Description error:\n\n\ngemeldet von [user_id]',
  },
  newVersion: {
    de: 'Neue App Version',
    it: "Nuova versione dell'app",
    en: 'New app version',
  },
  newVersionRequired: {
    de: 'App Version veraltet',
    it: "È richiesta una nuova versione dell'app",
    en: 'New app version required',
  },
  newVersionBody: {
    de: 'Hurra, wir haben neue Features für dich! Bitte aktualisiere deine App, um alle Neuheiten zu sehen.',
    it: 'Evviva, abbiamo nuove funzionalità per te! Aggiorna la tua app per vedere le novità.',
    en: "Hooray, we have new features for you! Please update your app to see what's new",
  },
  newVersionRequiredBody: {
    de: 'Deine App Version ist veraltet, einige Sachen könnten nicht mehr funktionieren. Bitte aktualisiere die App!',
    it: "La versione dell'app non è aggiornata, alcune cose potrebbero non funzionare più. Si prega di aggiornare l'app!",
    en: 'Your app version is out of date, some things may not work anymore. Please update the app!',
  },
  update: {
    de: 'Jetzt updaten',
    it: 'Aggiorna ora',
    en: 'Update now',
  },
  loadingLeagues: {
    de: 'Lade Ligen',
    it: 'Carica campionati',
    en: 'Load leagues',
  },
  changedIn: {
    de: 'Eingewechselt',
    it: 'Entra',
    en: 'Sub IN',
  },
  changedOut: {
    de: 'Ausgewechselt',
    it: 'Esce',
    en: 'Sub OUT',
  },
  assists: {
    de: 'Assists',
    it: 'Assist',
    en: 'Assist',
  },
  playedMinutes: {
    de: 'Gespielte Minuten',
    it: 'Minuti giocati',
    en: 'Minutes played',
  },
  back: {
    de: 'Zurück',
    it: 'Indietro',
    en: 'Back',
  },
  shapeComparison: {
    de: 'Formvergleich',
    it: 'Confronto forma',
    en: 'Shape comparison',
  },
  // De 3 sein fürn Formvergleich, tauscht do di buachstobn aus wias enk passt
  win: {
    de: 'S', // Sieg
    it: 'V', // Vinto
    en: 'W', // Win
  },
  draw: {
    de: 'U', // Unentschieden
    it: 'N', // Nulle
    en: 'D', // Draw
  },
  loss: {
    de: 'N', // Niederlage
    it: 'P', // Perso
    en: 'L', // Loss
  },
  seasonOverview: {
    de: 'Saison im Überblick',
    it: 'Overview della stagione',
    en: 'Season overview',
  },
  goalDistribution: {
    de: 'Zeitpunkt der Tore',
    it: 'Minuti dei gol',
    en: 'Time of goals',
  },
  goalDistributionInfo: {
    de: 'Zeitpunkt der Tore, in welcher die Mannschaft statistisch gesehen die Tore schießt.', // Mari, Ivan, des verändert sich nimmer sobold is match vorbei isch, also de statistik isch über di leschtn X matches vo den match aus gsechn, kannt man do villeicht eini schreibn.
    it: 'Tempistica dei goal in cui la squadra segna statisticamente i goal.', // PS: olles wos noch den '//' steat isch a kommentar und werd im code ignoriert, also wenn es des gemocht hop kennt es den kommentar a löschen, i hon sischt a oftramol no a poor kommentare stian
    en: 'Timing of the goals at which the team statistically scores the goals.',
  },
  playerInFocus: {
    de: 'Spieler im Fokus',
    it: 'Giocatori in forma',
    en: 'Player in focus',
  },
  playerInFocusInfo: {
    de: 'Spieler, die in den letzten Spielen am meisten Stimmen bei der Wahl zum Man of the Match erhalten haben.',
    it: 'I giocatori che hanno ricevuto il maggior numero di voti Man of the Match nelle ultime partite.',
    en: 'Players who have received the most Man of the Match votes in recent games.',
  },
  tablePos: {
    de: 'Tabellenplatz',
    it: 'Posto',
    en: 'Place',
  },
  pointsExt: {
    de: 'Punkte',
    it: 'Punti',
    en: 'Poins',
  },
  winsExt: {
    de: 'Siege',
    it: 'Vittorie',
    en: 'Wins',
  },
  lossesExt: {
    de: 'Niederlagen',
    it: 'Sconfitte',
    en: 'Defeats',
  },
  drawsExt: {
    de: 'Unentschieden',
    it: 'Pareggi',
    en: 'Draws',
  },
  goalsOutExt: {
    de: 'Ø Tore',
    it: 'Ø Gol',
    en: 'Ø Goal',
  },
  goalsInExt: {
    de: 'Ø Gegentore',
    it: 'Ø gol subiti',
    en: 'Ø Gegentore',
  },
  sixth1: {
    de: "0' - 15'",
    it: "0' - 15'",
    en: "0' - 15'",
  },
  sixth2: {
    de: "16' - 30'",
    it: "16' - 30'",
    en: "16' - 30'",
  },
  sixth3: {
    de: "31' - 45'",
    it: "31' - 45'",
    en: "31' - 45'",
  },
  sixth4: {
    de: "46' - 60'",
    it: "46' - 60'",
    en: "46' - 60'",
  },
  sixth5: {
    de: "61' - 75'",
    it: "61' - 75'",
    en: "61' - 75'",
  },
  sixth6: {
    de: "76' - 90'",
    it: "76' - 90'",
    en: "76' - 90'",
  },
  history: {
    de: 'Historie',
    it: 'Storia',
    en: 'History',
  },
  chooseOrTake: {
    de: 'Bild hochladen',
    it: 'Carica immagine',
    en: 'Upload photo',
  },
  chooseOrTakeCont: {
    de: 'Foto machen oder aus der Gallerie auswählen? Achtung: die Bilder werden im Format [format] zugeschnitten.',
    it: 'Scattare una foto o scegliere dalla galleria? Attenzione: le immagini vengono ritagliate in formato [format].',
    en: 'Take a photo or choose from the gallery? Attention: the images are cropped in format [format].',
  },
  takePicture: {
    de: 'Kamera öffnen',
    it: 'Apri camera',
    en: 'Take picture',
  },
  choosePicture: {
    de: 'Gallerie öffnen',
    it: 'Apri galleria',
    en: 'Choose picture',
  },
  rotateForMore: {
    de: 'Handy drehen für mehr Infos',
    it: 'Ruota per più info',
    en: 'Rotate for more',
  },
  Transfers: {
    de: 'Transfers',
    it: 'Trasferimenti',
    en: 'Transfers',
  },
  noNews: {
    de: 'Noch keine News',
    it: 'Ancora nessuna notizia',
    en: 'No news yet - coming soon',
  },
  noTransen: {
    de: 'Noch keine Transfers',
    it: 'Ancora nessun trasferimento',
    en: 'No transfers - coming soon',
  },
  noVideos: {
    de: 'Noch keine Videos - coming soon',
    it: 'Ancora nessun video - coming soon',
    en: 'No vidoes yet - coming soon',
  },
  viewExtern: {
    de: 'Weiterlesen',
    it: 'Continua',
    en: 'Learn more',
  },
  matchNotStarted: {
    de: 'Das Spiel hat noch nicht begonnen!',
    it: 'Partita non ancora iniziata!',
    en: 'Match not started yet!',
  },
  sureCancelMatch: {
    de: 'Bist du sicher dass du das Spiel absagen möchtest?',
    it: 'Sei sicuro di cancellare la partita?',
    en: 'Are you sure you want to cancel the game?',
  },
  yes: {
    de: 'Ja',
    it: 'Si',
    en: 'Yes',
  },
  no: {
    de: 'Nein',
    it: 'No',
    en: 'No',
  },
  canceled: {
    de: 'Abgesagt',
    it: 'Cancellato',
    en: 'Canceled',
  },
  deleteAccount: {
    de: 'Account löschen?',
    it: "Cancellare l'account?",
    en: 'Delete account?',
  },
  deleteAccountCont: {
    de: 'Bist du sicher dass du deinen Account mit allen deinen Daten löschen möchtest?',
    it: 'Sei sicuro di voler cancellare il tuo account con tutti i tuoi dati?',
    en: 'Are you sure you want to delete your account with all your data?',
  },
  versionNews: {
    de: 'Neu in dieser Version',
    it: 'Nuovo in questa versione',
    en: 'New in this version',
  },
  versionNewsBody: {
    de:
      'v0.9.93:\n' +
      'Neu:\n' +
      '- Vereinsmanager sehen nun in der Navigationsleiste ob es neue Insider-Anfragen gibt\n' +
      '\n' +
      'Bugfix:\n' +
      '- Fehler in der Transfer-Ansicht wurden behoben\n' +
      '- Fehler behoben bei Mannschaftsinfo / Sponsoren bearbeiten\n' +
      '- On-screen keyboard hat Daten verdeckt \n' +
      '- Manchmal waren falsche Fehlermeldungen sichtbar (z.b. "Bitte kontrolliere deine Verbindung zum Internet!")\n' +
      '- Navigations-fehler behoben\n' +
      '- Fehler behoben bei der Verwaltung der Spieler\n' +
      '- Fehler behoben das die Posizion transferierter Spieler nicht mehr verändert werden konnte\n' +
      '\n' +
      'v0.9.92\n' +
      'Bugfix:\n' +
      '- Spielernamen konnten nicht verändert werden\n' +
      '- Deep-Links\n',
    it:
      'v0.9.93:\n' +
      'Nuovo:\n' +
      '- I manager del club ora possono vedere nella barra di navigazione se ci sono nuove richieste di Insider\n' +
      '\n' +
      'Bugifx:\n' +
      '- I bug nella vista di trasferimento sono stati corretti\n' +
      '- Risolti errori durante la modifica delle informazioni sulla squadra e degli sponsor\n' +
      '- Risolto bug con la tastiera su schermo\n' +
      '- Sono stati corretti messaggi errati (ad es. "Verifica la tua connessione a Internet!")\n' +
      '- Risolti bug di navigazione\n' +
      '- Sono stati corretti gli errori di gestione dei giocatori\n' +
      '\n' +
      'v0.9.92\n' +
      'Bugfix:\n' +
      '- Ora si può cambiare il nome dei giocatori\n' +
      '- Deep-Links',
    en:
      'v0.9.93:\n' +
      'New: \n' +
      '- Team manager see in the Bottom bar if they got any new insider requests\n' +
      '\n' +
      'Bugfix:\n' +
      '- Bug fixed in the Transfer-view\n' +
      '- Bugs fixed in the Teaminfo view\n' +
      '- On-screen keyboard has hidden some data\n' +
      '- Sometimes wrong error messages were displayed (f.e. "Please check your connection to the internet!")\n' +
      '- Navigation-Bugfix\n' +
      '- Bugs fixed that occured during managing players\n' +
      '\n' +
      'v0.9.92:\n' +
      'Bugfix:\n' +
      '- Player name could not be changed\n' +
      '- Deep-Links',
  },
  awesome: {
    de: 'Hurra!',
    it: 'Grande!',
    en: 'Awesome!',
  },
  CreateNews: {
    de: 'Beitrag erstellen',
    it: 'Crea una notizia',
    en: 'Create new blog news',
  },
  deu: {
    de: 'DEU',
    it: 'TED',
    en: 'GER',
  },
  ita: {
    de: 'ITA',
    it: 'ITA',
    en: 'ITA',
  },
  eng: {
    de: 'ENG',
    it: 'ING',
    en: 'ENG',
  },
  title: {
    de: 'Titel',
    it: 'Titolo',
    en: 'Title',
  },
  link: {
    de: 'Link',
    it: 'Link',
    en: 'Redirect link',
  },
  body: {
    de: 'Haupttext',
    it: 'Body',
    en: 'Body',
  },
  preview: {
    de: 'Vorschau',
    it: 'Preview',
    en: 'Preview',
  },
  choosePosition: {
    de: 'Posizion wählen',
    it: 'Seleziona posizione',
    en: 'Select position',
  },
  upTo3Players: {
    de: 'Wähle bis zu 3 Spieler',
    it: 'Puoi selezionare 3 giocatori',
    en: 'Vote 3 players',
  },
  canVote3: {
    de: 'Noch [num] Spieler wählen',
    it: 'Vota ancora [num]',
    en: 'Vote another [num]',
  },
  matchStartsShortly: {
    de: 'Das Spiel startet in Kürze',
    it: 'La partita inizierà tra poco',
    en: 'The match starts soon',
  },
  motmAfter80Min: {
    de: 'Der Man of the Match kann erst am Ende des Spiels gewählt werden.',
    it: 'Il Man of the Match può essere votato solo a fine partita.',
    en: 'Man of the Match can be voted at the end of the match.',
  },
  noTowForMatchday: {
    de: 'Noch kein Team of the Week für diesen Spieltag',
    it: 'Ancora nessun Team of the Week per questa giornata',
    en: '',
  },
  optional: {
    de: '(optional)',
    it: '(optional)',
    en: '(optional)',
  },
  chooseScorerInfo: {
    de: 'Falls eine Aufstellung eingetragen wurde, werden nur die Spieler auf dem Platz angzeigt. Anderenfalls der gesamte Kader.',
    it: 'Se è stata inserita una formazione, vengono mostrati solo i giocatori in campo. Altrimenti tutta la rosa.',
    en: 'If the line-up has been entered, only the players on the pitch are displayed, otherwise the whole squad.',
  },
  becomeInsider: {
    de: 'Werde Insider',
    it: 'Diventa Insider',
    en: 'Become an Insider',
  },
  onlyLetters: {
    de: 'Nur Buchstaben und Leerzeichen',
    it: 'Solo lettere e spazi',
    en: 'Nur Buchstaben und Leerzeichen',
  },
  deleteEvent: {
    de: 'Löschen',
    it: 'Elimina',
    en: 'Delete event',
  },
  sureWantDelete: {
    de: 'Bist du sicher dass du [title] löschen möchten?', // Konn man laar lossn
    it: 'Bist du sicher dass du [title] löschen möchten?',
    en: 'Bist du sicher dass du [title] löschen möchten?',
  },
  sureWantDeleteCARD: {
    de: 'Bist du sicher, dass du diese Karte löschen möchtest?',
    it: 'Sei sicuro di cancellare il cartellino?',
    en: 'Are you sure to delete this card?',
  },
  sureWantDeleteGOAL: {
    de: 'Bist du sicher, dass du dieses Tor löschen möchtest?',
    it: 'Sei sicuro di cancellare il gol?',
    en: 'Are you sure to delete this goal?',
  },
  sureWantDeleteCHANGE: {
    de: 'Bist du sicher, dass du den Wechsel löschen möchtest?',
    it: 'Sei sicuro di cancellare il cambio?',
    en: 'Are you sure to delete this change?',
  },
  sureWantDeleteCHANCE: {
    de: 'Bist du sicher, dass du diese Chance löschen möchtest?',
    it: "Sei sicuro di cancellare l'occasione?",
    en: 'Are you sure to delete this opportunity?',
  },
  hideFuture: {
    de: 'Nicht mehr nachfragen!',
    it: 'Non chiedere più!',
    en: 'Want to hide this message in the future!',
  },
  now: {
    de: 'Jetzt!',
    it: 'Adesso!',
    en: 'Now!',
  },
  startBefore: {
    de: 'Vor [min] Min.',
    it: '[min] min. fa',
    en: '[min] min ago',
  },
  startAfter: {
    de: 'In [min] Min.',
    it: 'Tra [min] min.',
    en: 'In [min] min.',
  },
  startMatch: {
    de: 'Anpfiff!',
    it: "Calcio d'inizio!",
    en: 'Kick-off!',
  },
  LEAGUE: {
    de: 'Meisterschaften',
    it: 'Campionati',
    en: 'Leagues',
  },
  CUP: {
    de: 'Pokal',
    it: 'Coppa',
    en: 'Pokal',
  },
  YOUTH: {
    de: 'Jugend',
    it: 'Giovanili',
    en: 'Youth',
  },
  WOMEN: {
    de: 'Frauen',
    it: 'Femminile',
    en: 'Women',
  },
  statsSoonAvailable: {
    de: 'Bald verfügbar',
    it: 'Disponibile a breve',
    en: 'Available soon',
  },
  highlights: {
    de: 'Highlights',
    it: 'Highlights',
    en: 'Highlights',
  },
  hideTeam: {
    de: '[team] ausblenden',
    it: 'Nascondi [team]',
    en: 'Hide [team]',
  },
  format: {
    de: 'Format',
    it: 'Formato',
    en: 'Format',
  },
  showDetail: {
    de: 'Detailierte Ansicht',
    it: 'Visto dettaglio',
    en: 'Detailed view',
  },
  minimize: {
    de: 'Verkleinern',
    it: 'Minimare',
    en: 'Minimize',
  },
  youWantBeInsider: {
    de: 'Möchtest du Ergebnisse eintragen?',
    it: 'Vuoi inserire eventi (gol, formazioni, ecc.)?',
    en: 'Do you want to enter Events?',
  },
  users: {
    de: 'Benutzer',
    it: 'Utenti',
    en: 'Users',
  },
  ads: {
    de: 'Werbung',
    it: 'Pubblicitá',
    en: 'Ads',
  },
  administration: {
    de: 'Administrazion',
    it: 'Administrazione',
    en: 'Administration',
  },
  adminpanel: {
    de: 'Backoffice',
    it: 'Backoffice',
    en: 'Backoffice',
  },
  yourNotAdmin: {
    de: 'Nur für Admins Sichtbar. Bitte als Admin anmelden!',
    it: 'Nur für Admins Sichtbar. Bitte als Admin anmelden!',
    en: 'Nur für Admins Sichtbar. Bitte als Admin anmelden!',
  },
  createVideo: {
    de: 'Video Erstellen',
    it: 'Crea Video',
    en: 'Create Video',
  },
  length: {
    de: 'Länge',
    it: 'Lunghezza',
    en: 'Length',
  },
  url: {
    de: 'Link',
    it: 'Link',
    en: 'Link',
  },
  date: {
    de: 'Datum',
    it: 'Datum',
    en: 'Datum',
  },
  summary: {
    de: 'Zusammenfassung',
    it: 'Zusammenfassung',
    en: 'Zusammenfassung',
  },
  thumbnailUrl: {
    de: 'Link zum Vorschaubild',
    it: 'Link per il preview',
    en: 'Preview Link',
  },
  searchVideo: {
    de: 'Nach Video suchen',
    it: 'Nach Video suchen',
    en: 'Nach Video suchen',
  },
  editVideo: {
    de: 'Video Bearbeiten',
    it: 'Video Bearbeiten',
    en: 'Edit Video',
  },
  deleteVideo: {
    de: 'Video löschen',
    it: 'Video löschen',
    en: 'Delete Video',
  },
  deleteMatch: {
    de: 'Spiel löschen',
    it: 'Spiel löschen',
    en: 'Delete Match',
  },
  createMatch: {
    de: 'Spiel Erstellen',
    it: 'Spiel Erstellen',
    en: 'Create Match',
  },
  searchMatches: {
    de: 'Nach Spiel Suchen',
    it: 'Nach Spiel Suchen',
    en: 'Nach Spiel Suchen',
  },
  searchLocation: {
    de: 'Spielstätte (optional)',
    it: 'Location (optional)',
    en: 'Location (optional)',
  },
  reset: {
    de: 'Zurücksetzen',
    it: 'Reset',
    en: 'Reset',
  },
  searchLeague: {
    de: 'Liga',
    it: 'Liga',
    en: 'League',
  },
  searchTeam1: {
    de: 'Heimmannschaft',
    it: 'Heimmannschaft',
    en: 'Home Team',
  },
  searchTeam2: {
    de: 'Andere Mannschaft',
    it: 'Andere Mannschaft',
    en: 'Away Team',
  },
  matchNotFound: {
    de: 'Spiel nicht gefunden',
    it: 'Spiel nicht gefunden',
    en: 'Spiel nicht gefunden',
  },
  createBulk: {
    de: 'Mehrere Erstellen',
    it: 'Mehrere Erstellen',
    en: 'Mehrere Erstellen',
  },
  uploadSheet: {
    de: 'Liste hochladen',
    it: 'Liste hochladen',
    en: 'Liste hochladen',
  },
  validateSheet: {
    de: 'Auswerten',
    it: 'Auswerten',
    en: 'Auswerten',
  },
  allowedSheets: {
    de: 'Folgene formate werden unterstützt: .xml, .xlsx, .csv',
    it: 'Folgene formate werden unterstützt: .xml, .xlsx, .csv',
    en: 'Folgene formate werden unterstützt: .xml, .xlsx, .csv',
  },
  couldNotParseFile: {
    de: 'Datei [file] konnte nicht glesen werden',
    it: 'Datei [file] konnte nicht glesen werden',
    en: 'Datei [file] konnte nicht glesen werden',
  },
  wrongLine: {
    de: '[file]: Zeile [line] konnte nicht glesen werden',
    it: '[file]: Zeile [line] konnte nicht glesen werden',
    en: '[file]: Zeile [line] konnte nicht glesen werden',
  },
  noMatchday: {
    de: '[file]: Zeile [line] konnte nicht glesen werden (Spieltag)',
    it: '[file]: Zeile [line] konnte nicht glesen werden (Spieltag)',
    en: '[file]: Zeile [line] konnte nicht glesen werden (Spieltag)',
  },
  probablyHeader: {
    de: '[file]: Header? auf Zeile [line] übersprungen',
    it: '[file]: Header? auf Zeile [line] übersprungen',
    en: '[file]: Header? auf Zeile [line] übersprungen',
  },
  newMatch: {
    de: 'Neues Spiel',
    it: 'Neues Spiel',
    en: 'Neues Spiel',
  },
  submitAll: {
    de: 'Alle Senden',
    it: 'Alle Senden',
    en: 'Alle Senden',
  },
  searchAds: {
    de: 'Nach Ad suchen',
    it: 'Nach Ad suchen',
    en: 'Nach Ad suchen',
  },
  editAd: {
    de: 'Ad Bearbeiten',
    it: 'Ad Bearbeiten',
    en: 'Ad Bearbeiten',
  },
  deleteAd: {
    de: 'Ad Löschen',
    it: 'Ad Löschen',
    en: 'Ad Löschen',
  },
  createAd: {
    de: 'Ad Erstellen',
    it: 'Ad Erstellen',
    en: 'Ad Erstellen',
  },
  homeMatchAd: {
    de: 'Startseite',
    it: 'Startseite',
    en: 'Startseite',
  },
  matchHistoryBottomAd: {
    de: 'Spielverlauf',
    it: 'Spielverlauf',
    en: 'Spielverlauf',
  },
  leagueMatchAd: {
    de: 'Liga-Spiele',
    it: 'Liga-Spiele',
    en: 'Liga-Spiele',
  },
  adPosition: {
    de: 'Posizion',
    it: 'Position',
    en: 'Position',
  },
  startDate: {
    de: 'Start-Datum',
    it: 'Start-Datum',
    en: 'Start-Datum',
  },
  stopDate: {
    de: 'End-Datum',
    it: 'End-Datum',
    en: 'End-Datum',
  },
  priority: {
    de: 'Priorität',
    it: 'Priorität',
    en: 'Priorität',
  },
  paused: {
    de: 'Pausiert',
    it: 'Pausiert',
    en: 'Pausiert',
  },
  color: {
    de: 'Farbe',
    it: 'Farbe',
    en: 'Farbe',
  },
  uploadError: {
    de: 'Fehler beim hochladen',
    it: 'Fehler beim hochladen',
    en: 'Fehler beim hochladen',
  },
  chooseEndpoint: {
    de: 'Server wählen',
    it: 'Server wählen',
    en: 'Server wählen',
  },
  deleteImageToChoose: {
    de: 'Die Bilder müssen neu hochgeladen werden wenn die Posizion verändert wird, bitte löschen',
    it: 'Die Bilder müssen neu hochgeladen werden wenn die Posizion verändert wird, bitte löschen',
    en: 'Die Bilder müssen neu hochgeladen werden wenn die Posizion verändert wird, bitte löschen',
  },
  useSameFile: {
    de: 'Gleiches Bild für Desktop und Mobile',
    it: 'Gleiches Bild für Desktop und Mobile',
    en: 'Gleiches Bild für Desktop und Mobile',
  },
  key: {
    de: 'Admin Key',
    it: 'Admin Key',
    en: 'Admin Key',
  },
  clearCache: {
    de: 'Cache leeren ( Behebt manchmal Fehler )',
    it: 'Cache leeren ( Behebt manchmal Fehler )',
    en: 'Cache leeren ( Behebt manchmal Fehler )',
  },
  recalculateSqua: {
    de: 'Spieler-Werte neu berechnen ( Gesp. Minuten, Tore, etc. )',
    it: 'Spieler-Werte neu berechnen ( Gesp. Minuten, Tore, etc. )',
    en: 'Spieler-Werte neu berechnen ( Gesp. Minuten, Tore, etc. )',
  },
  recalculateStat: {
    de: 'Alle Statistiken neu berechnen',
    it: 'Alle Statistiken neu berechnen',
    en: 'Alle Statistiken neu berechnen',
  },
  taskCreateSuccess: {
    de: 'Task erfolgreich erstellt',
    it: 'Task erfolgreich erstellt',
    en: 'Task erfolgreich erstellt',
  },
  taskCreateFailed: {
    de: 'Task konnte nicht erstellt werden',
    it: 'Task konnte nicht erstellt werden',
    en: 'Task konnte nicht erstellt werden',
  },
  saveKey: {
    de: 'Admin Key speichern',
    it: 'Admin Key speichern',
    en: 'Admin Key speichern',
  },
  transfer: {
    de: 'Transfer',
    it: 'Transfer',
    en: 'Transfer',
  },
  errorTeam1: {
    de: 'Heimmannschaft nicht gesetzt',
    it: 'Heimmannschaft nicht gesetzt',
    en: 'Heimmannschaft nicht gesetzt',
  },
  errorTeam2: {
    de: 'Andere Mannschaft nicht gesetzt',
    it: 'Andere Mannschaft nicht gesetzt',
    en: 'Andere Mannschaft nicht gesetzt',
  },
  errorLeague: {
    de: 'Liga nicht gesetzt',
    it: 'Liga nicht gesetzt',
    en: 'Liga nicht gesetzt',
  },
  errorDate: {
    de: 'Datum nicht gesetzt',
    it: 'Datum nicht gesetzt',
    en: 'Datum nicht gesetzt',
  },
  nameDE: {
    de: 'Name Deutsch',
    it: 'Name tedesco',
    en: 'Name german',
  },
  nameIT: {
    de: 'Name Italienisch',
    it: 'Nome italiano',
    en: 'Name italian',
  },
  nameEN: {
    de: 'Name Englisch',
    it: 'Nome inglese',
    en: 'Name english',
  },
  leagueCategory: {
    de: 'Categorie',
    it: 'Categoria',
    en: 'Category',
  },
  leagueRating: {
    de: 'Tabellenberechnung',
    it: 'Tabellenberechnung',
    en: 'Tabellenberechnung',
  },
  southtyrol: {
    de: 'Südtirol',
    it: 'Alto Adige',
    en: 'Southtyrol',
  },
  trentino: {
    de: 'Trient',
    it: 'Trentino',
    en: 'Trentino',
  },
  year: {
    de: 'Jahr',
    it: 'Anno',
    en: 'Year',
  },
  mainLeague: {
    de: 'Hauptliga',
    it: 'Hauptliga',
    en: 'Main league',
  },
  editLeague: {
    de: 'Liga bearbeiten',
    it: 'Liga bearbeiten',
    en: 'Liga bearbeiten',
  },
  deleteLeague: {
    de: 'Liga löschen',
    it: 'Liga löschen',
    en: 'Liga löschen',
  },
  searchLeagues: {
    de: 'Nach Liga suchen',
    it: 'Nach Liga suchen',
    en: 'Nach Liga suchen',
  },
  createLeague: {
    de: 'Liga erstellen',
    it: 'Liga erstellen',
    en: 'Liga erstellen',
  },
  emptyString: {
    de: ' ',
    it: '',
    en: '',
  },
};

export declare type TranslatorKeys = keyof typeof generalKeywords;
export type Translatable = CollectionType &
  (
    | {
        name: Translation;
      }
    | {
        customName: string;
      }
  );
const keywords: Keywords = { ...generalKeywords };

export function translate(
  key: TranslatorKeys | Translation | TranslationCreate,
  lang: LanguageISO,
  params?: { [T in string]: string },
): string {
  if (typeof key === 'object') return showTranslated(key, lang);
  const keyword: Keyword = keywords[key];

  if (typeof keyword === 'undefined') {
    return key;
  }
  if (params === undefined) {
    return keyword[lang];
  }
  let text = keyword[lang];
  const paramKeys = Object.keys(params);
  paramKeys.forEach((param) => {
    text = text.replace(param, params[param]);
  });
  return text;
}

/**
 *
 * @param translation
 * @param lang
 */
export function showTranslated(
  translation: Translation | TranslationCreate,
  lang: LanguageISO,
): string {
  switch (lang) {
    case 'de':
      return translation.textDE;
    case 'en':
      return translation.textEN;
    case 'it':
      return translation.textIT;
    default:
      return 'text' in translation ? translation.text : translation.textDE;
  }
}
