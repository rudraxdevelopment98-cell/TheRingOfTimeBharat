import { PrismaClient, Era, MaturityRating, PersonRole, CollectionType, TextDirection, EditionFormat } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ─────────────────────────────────────────────
  // 1. LANGUAGES
  // ─────────────────────────────────────────────
  console.log('Seeding languages...');

  const languagesData = [
    { code: 'en', name: 'English',    nativeName: 'English',    script: 'Latin',    direction: TextDirection.LTR, flagEmoji: '🇬🇧', isFeatured: true },
    { code: 'ar', name: 'Arabic',     nativeName: 'العربية',    script: 'Arabic',   direction: TextDirection.RTL, flagEmoji: '🇸🇦', isFeatured: true },
    { code: 'zh', name: 'Chinese',    nativeName: '中文',        script: 'Han',      direction: TextDirection.LTR, flagEmoji: '🇨🇳', isFeatured: true },
    { code: 'es', name: 'Spanish',    nativeName: 'Español',    script: 'Latin',    direction: TextDirection.LTR, flagEmoji: '🇪🇸', isFeatured: true },
    { code: 'fr', name: 'French',     nativeName: 'Français',   script: 'Latin',    direction: TextDirection.LTR, flagEmoji: '🇫🇷', isFeatured: true },
    { code: 'de', name: 'German',     nativeName: 'Deutsch',    script: 'Latin',    direction: TextDirection.LTR, flagEmoji: '🇩🇪', isFeatured: true },
    { code: 'ru', name: 'Russian',    nativeName: 'Русский',    script: 'Cyrillic', direction: TextDirection.LTR, flagEmoji: '🇷🇺', isFeatured: true },
    { code: 'fa', name: 'Persian',    nativeName: 'فارسی',      script: 'Arabic',   direction: TextDirection.RTL, flagEmoji: '🇮🇷', isFeatured: true },
    { code: 'sa', name: 'Sanskrit',   nativeName: 'संस्कृतम्',   script: 'Devanagari', direction: TextDirection.LTR, flagEmoji: '🇮🇳', isFeatured: true },
    { code: 'la', name: 'Latin',      nativeName: 'Latina',     script: 'Latin',    direction: TextDirection.LTR, flagEmoji: '🏛️',  isFeatured: true },
    { code: 'el', name: 'Greek',      nativeName: 'Ελληνικά',   script: 'Greek',    direction: TextDirection.LTR, flagEmoji: '🇬🇷', isFeatured: true },
    { code: 'ja', name: 'Japanese',   nativeName: '日本語',      script: 'Kanji',    direction: TextDirection.LTR, flagEmoji: '🇯🇵', isFeatured: true },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português',  script: 'Latin',    direction: TextDirection.LTR, flagEmoji: '🇵🇹', isFeatured: true },
    { code: 'sw', name: 'Swahili',    nativeName: 'Kiswahili',  script: 'Latin',    direction: TextDirection.LTR, flagEmoji: '🇰🇪', isFeatured: true },
    { code: 'hi', name: 'Hindi',      nativeName: 'हिन्दी',     script: 'Devanagari', direction: TextDirection.LTR, flagEmoji: '🇮🇳', isFeatured: true },
  ];

  for (const lang of languagesData) {
    await prisma.language.upsert({
      where: { code: lang.code },
      update: {},
      create: lang,
    });
  }

  // ─────────────────────────────────────────────
  // 2. GENRES
  // ─────────────────────────────────────────────
  console.log('Seeding genres...');

  const genresData = [
    { name: 'Philosophy',              slug: 'philosophy',              color: '#6B7280' },
    { name: 'Fiction',                 slug: 'fiction',                 color: '#8B5CF6' },
    { name: 'History',                 slug: 'history',                 color: '#D97706' },
    { name: 'Science',                 slug: 'science',                 color: '#10B981' },
    { name: 'Poetry',                  slug: 'poetry',                  color: '#EC4899' },
    { name: 'Religion & Spirituality', slug: 'religion-spirituality',   color: '#F59E0B' },
    { name: 'Politics',                slug: 'politics',                color: '#EF4444' },
    { name: 'Mathematics',             slug: 'mathematics',             color: '#3B82F6' },
    { name: 'Art & Architecture',      slug: 'art-architecture',        color: '#F97316' },
    { name: 'Biography',               slug: 'biography',               color: '#14B8A6' },
    { name: 'Travel & Geography',      slug: 'travel-geography',        color: '#84CC16' },
    { name: 'Economics',               slug: 'economics',               color: '#6366F1' },
    { name: 'Drama',                   slug: 'drama',                   color: '#A855F7' },
    { name: 'Mythology',               slug: 'mythology',               color: '#F43F5E' },
  ];

  const genres: Record<string, string> = {};
  for (const g of genresData) {
    const genre = await prisma.genre.upsert({
      where: { slug: g.slug },
      update: {},
      create: g,
    });
    genres[g.slug] = genre.id;
  }

  // ─────────────────────────────────────────────
  // 3. SUBJECTS
  // ─────────────────────────────────────────────
  console.log('Seeding subjects...');

  // Root-level subjects first
  const rootSubjectsData = [
    { name: 'Philosophy',  slug: 'subject-philosophy',  level: 0 },
    { name: 'Science',     slug: 'subject-science',     level: 0 },
    { name: 'History',     slug: 'subject-history',     level: 0 },
    { name: 'Literature',  slug: 'subject-literature',  level: 0 },
    { name: 'Religion',    slug: 'subject-religion',    level: 0 },
    { name: 'Politics',    slug: 'subject-politics',    level: 0 },
    { name: 'Art',         slug: 'subject-art',         level: 0 },
    { name: 'Mathematics', slug: 'subject-mathematics', level: 0 },
    { name: 'Technology',  slug: 'subject-technology',  level: 0 },
    { name: 'Psychology',  slug: 'subject-psychology',  level: 0 },
  ];

  const subjects: Record<string, string> = {};
  for (const s of rootSubjectsData) {
    const subject = await prisma.subject.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
    subjects[s.slug] = subject.id;
  }

  // Level-1 children
  const childSubjectsData = [
    { name: 'Ancient Philosophy', slug: 'ancient-philosophy', parentId: subjects['subject-philosophy'], level: 1 },
    { name: 'Existentialism',     slug: 'existentialism',     parentId: subjects['subject-philosophy'], level: 1 },
    { name: 'Ethics',             slug: 'ethics',             parentId: subjects['subject-philosophy'], level: 1 },
    { name: 'Physics',            slug: 'physics',            parentId: subjects['subject-science'],    level: 1 },
  ];

  for (const s of childSubjectsData) {
    const subject = await prisma.subject.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
    subjects[s.slug] = subject.id;
  }

  // Level-2 grandchildren
  const grandchildSubjectsData = [
    { name: 'Stoicism', slug: 'stoicism', parentId: subjects['ancient-philosophy'], level: 2 },
  ];

  for (const s of grandchildSubjectsData) {
    const subject = await prisma.subject.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
    subjects[s.slug] = subject.id;
  }

  // ─────────────────────────────────────────────
  // 4. PERSONS (AUTHORS)
  // ─────────────────────────────────────────────
  console.log('Seeding persons...');

  const personsData = [
    {
      slug: 'plato',
      name: 'Plato',
      birthYear: -428,
      deathYear: -348,
      nationality: 'Greek',
      languagesWritten: ['el'],
      bio: 'Plato was an ancient Greek philosopher, student of Socrates, and teacher of Aristotle. His works, written in the form of dialogues, explore justice, beauty, equality, politics, and metaphysics.',
    },
    {
      slug: 'aristotle',
      name: 'Aristotle',
      birthYear: -384,
      deathYear: -322,
      nationality: 'Greek',
      languagesWritten: ['el'],
      bio: 'Aristotle was an ancient Greek philosopher and polymath, a student of Plato. He founded the Lyceum and wrote extensively on logic, metaphysics, ethics, biology, and politics.',
    },
    {
      slug: 'marcus-aurelius',
      name: 'Marcus Aurelius',
      birthYear: 121,
      deathYear: 180,
      nationality: 'Roman',
      languagesWritten: ['el', 'la'],
      bio: 'Marcus Aurelius was Roman Emperor from 161 to 180 AD and a Stoic philosopher. His personal writings, collected as Meditations, remain one of the most revered works of Stoic philosophy.',
    },
    {
      slug: 'epictetus',
      name: 'Epictetus',
      birthYear: 50,
      deathYear: 135,
      nationality: 'Greek',
      languagesWritten: ['el'],
      bio: 'Epictetus was a Greek Stoic philosopher who was born a slave and later became one of the most influential Stoic teachers. His teachings were recorded by his student Arrian.',
    },
    {
      slug: 'seneca',
      name: 'Seneca the Younger',
      birthYear: -4,
      deathYear: 65,
      nationality: 'Roman',
      languagesWritten: ['la'],
      bio: 'Lucius Annaeus Seneca was a Roman Stoic philosopher, statesman, dramatist, and satirist. He served as advisor to Emperor Nero and wrote extensively on ethics and the good life.',
    },
    {
      slug: 'dante',
      name: 'Dante Alighieri',
      birthYear: 1265,
      deathYear: 1321,
      nationality: 'Italian',
      languagesWritten: ['it', 'la'],
      bio: 'Dante Alighieri was an Italian poet and philosopher, widely considered the father of the Italian language. His magnum opus, the Divine Comedy, is a foundational work of Western literature.',
    },
    {
      slug: 'cervantes',
      name: 'Miguel de Cervantes',
      birthYear: 1547,
      deathYear: 1616,
      nationality: 'Spanish',
      languagesWritten: ['es'],
      bio: 'Miguel de Cervantes was a Spanish novelist, poet, and playwright. Don Quixote, widely regarded as the first modern novel, is his most celebrated work.',
    },
    {
      slug: 'shakespeare',
      name: 'William Shakespeare',
      birthYear: 1564,
      deathYear: 1616,
      nationality: 'English',
      languagesWritten: ['en'],
      bio: 'William Shakespeare was an English playwright, poet, and actor, widely regarded as the greatest writer in the English language. His works include 37 plays and 154 sonnets.',
    },
    {
      slug: 'jane-austen',
      name: 'Jane Austen',
      birthYear: 1775,
      deathYear: 1817,
      nationality: 'English',
      languagesWritten: ['en'],
      bio: 'Jane Austen was an English novelist known for her six major novels which interpret, critique, and comment upon the British landed gentry at the end of the 18th century.',
    },
    {
      slug: 'dostoevsky',
      name: 'Fyodor Dostoevsky',
      birthYear: 1821,
      deathYear: 1881,
      nationality: 'Russian',
      languagesWritten: ['ru'],
      bio: 'Fyodor Dostoevsky was a Russian novelist and short story writer whose works explore human psychology in the context of the troubled political and social atmosphere of 19th-century Russia.',
    },
    {
      slug: 'tolstoy',
      name: 'Leo Tolstoy',
      birthYear: 1828,
      deathYear: 1910,
      nationality: 'Russian',
      languagesWritten: ['ru'],
      bio: 'Leo Tolstoy was a Russian writer who is regarded as one of the greatest authors of all time. His masterpieces War and Peace and Anna Karenina represent in their scope and realism the highest point of realist fiction.',
    },
    {
      slug: 'nietzsche',
      name: 'Friedrich Nietzsche',
      birthYear: 1844,
      deathYear: 1900,
      nationality: 'German',
      languagesWritten: ['de'],
      bio: 'Friedrich Nietzsche was a German philosopher, poet, and cultural critic. He challenged the foundations of Christianity and traditional morality and developed concepts such as the Übermensch and the will to power.',
    },
    {
      slug: 'virginia-woolf',
      name: 'Virginia Woolf',
      birthYear: 1882,
      deathYear: 1941,
      nationality: 'English',
      languagesWritten: ['en'],
      bio: 'Virginia Woolf was an English writer, considered one of the most important modernist 20th-century authors and a pioneer in the use of stream of consciousness as a narrative device.',
    },
    {
      slug: 'kafka',
      name: 'Franz Kafka',
      birthYear: 1883,
      deathYear: 1924,
      nationality: 'Czech',
      languagesWritten: ['de'],
      bio: 'Franz Kafka was a German-speaking Bohemian novelist and short-story writer, widely regarded as one of the major figures of 20th-century literature. His works feature themes of alienation, existential anxiety, and absurd bureaucracy.',
    },
    {
      slug: 'camus',
      name: 'Albert Camus',
      birthYear: 1913,
      deathYear: 1960,
      nationality: 'French-Algerian',
      languagesWritten: ['fr'],
      bio: 'Albert Camus was a French-Algerian philosopher, author, and journalist. He won the Nobel Prize in Literature in 1957 and is best known for his works exploring absurdism.',
    },
    {
      slug: 'garcia-marquez',
      name: 'Gabriel García Márquez',
      birthYear: 1927,
      deathYear: 2014,
      nationality: 'Colombian',
      languagesWritten: ['es'],
      bio: 'Gabriel García Márquez was a Colombian novelist, short-story writer, screenwriter and journalist. He won the Nobel Prize in Literature in 1982 and is known for pioneering magical realism.',
    },
    {
      slug: 'achebe',
      name: 'Chinua Achebe',
      birthYear: 1930,
      deathYear: 2013,
      nationality: 'Nigerian',
      languagesWritten: ['en'],
      bio: 'Chinua Achebe was a Nigerian novelist, poet, and critic. His debut novel Things Fall Apart is the most widely read book in modern African literature.',
    },
    {
      slug: 'simone-de-beauvoir',
      name: 'Simone de Beauvoir',
      birthYear: 1908,
      deathYear: 1986,
      nationality: 'French',
      languagesWritten: ['fr'],
      bio: 'Simone de Beauvoir was a French existentialist philosopher, writer, and social theorist. Her work The Second Sex is a detailed analysis of women\'s oppression and a foundational text of feminism.',
    },
    {
      slug: 'rumi',
      name: 'Jalal ad-Din Rumi',
      birthYear: 1207,
      deathYear: 1273,
      nationality: 'Persian',
      languagesWritten: ['fa', 'ar'],
      bio: 'Rumi was a 13th-century Persian poet, Islamic scholar, and Sufi mystic. His major work, the Masnavi, is a vast poem that explores the soul\'s longing for union with the divine.',
    },
    {
      slug: 'murasaki-shikibu',
      name: 'Murasaki Shikibu',
      birthYear: 973,
      deathYear: 1025,
      nationality: 'Japanese',
      languagesWritten: ['ja'],
      bio: 'Murasaki Shikibu was a Japanese novelist, poet, and lady-in-waiting at the Imperial court. She is best known as the author of The Tale of Genji, often considered the world\'s first novel.',
    },
    {
      slug: 'homer',
      name: 'Homer',
      birthYear: -800,
      deathYear: -701,
      nationality: 'Greek',
      languagesWritten: ['el'],
      bio: 'Homer is the legendary ancient Greek poet to whom the Iliad and the Odyssey are attributed. These epic poems are foundational works of ancient Greek literature.',
    },
    {
      slug: 'laozi',
      name: 'Laozi',
      birthYear: -601,
      deathYear: -531,
      nationality: 'Chinese',
      languagesWritten: ['zh'],
      bio: 'Laozi was an ancient Chinese philosopher and writer, the reputed founder of Taoism. He is credited with writing the Tao Te Ching, the fundamental text of Taoist philosophy.',
    },
    {
      slug: 'george-eliot',
      name: 'George Eliot',
      birthYear: 1819,
      deathYear: 1880,
      nationality: 'English',
      languagesWritten: ['en'],
      bio: 'George Eliot was the pen name of Mary Ann Evans, a leading English Victorian novelist. Her novel Middlemarch is widely considered one of the greatest works in the English language.',
    },
    {
      slug: 'hesse',
      name: 'Hermann Hesse',
      birthYear: 1877,
      deathYear: 1962,
      nationality: 'German-Swiss',
      languagesWritten: ['de'],
      bio: 'Hermann Hesse was a German-born Swiss poet, novelist, and painter. He won the Nobel Prize in Literature in 1946 and his works explore the individual\'s search for authenticity and self-knowledge.',
    },
  ];

  const persons: Record<string, string> = {};
  for (const p of personsData) {
    const person = await prisma.person.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...p,
      },
    });
    persons[p.slug] = person.id;
  }

  // ─────────────────────────────────────────────
  // 5. BOOKS
  // ─────────────────────────────────────────────
  console.log('Seeding books...');

  const booksData = [
    {
      slug: 'meditations',
      title: 'Meditations',
      originalTitle: 'Τὰ εἰς ἑαυτόν',
      description: 'A series of personal writings by Roman Emperor Marcus Aurelius, reflecting on Stoic philosophy and the nature of the good life. Written as a private journal, it was never intended for publication. The work offers timeless wisdom on resilience, duty, and the pursuit of virtue.',
      yearWritten: 180,
      era: Era.ANCIENT,
      originalLanguage: 'el',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'A Roman emperor\'s private journal of Stoic wisdom that has guided leaders and philosophers for nearly two millennia.',
      aiThemes: ['Stoicism', 'Self-discipline', 'Impermanence', 'Virtue', 'Leadership'],
      averageRating: 4.8,
      ratingsCount: 95000,
    },
    {
      slug: 'the-republic',
      title: 'The Republic',
      originalTitle: 'Πολιτεία',
      description: 'Plato\'s most famous work explores justice, the nature of the ideal state, and the philosopher-king. Through the voice of Socrates, Plato examines the soul, virtue, and the famous Allegory of the Cave. It remains the most influential work of political philosophy ever written.',
      yearWritten: -375,
      era: Era.ANCIENT,
      originalLanguage: 'el',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Plato\'s timeless dialogue on justice and the perfect society asks whether the just life is the happiest life.',
      aiThemes: ['Justice', 'Ideal State', 'Philosophy', 'Education', 'The Soul'],
      averageRating: 4.5,
      ratingsCount: 72000,
    },
    {
      slug: 'nicomachean-ethics',
      title: 'Nicomachean Ethics',
      originalTitle: 'Ἠθικὰ Νικομάχεια',
      description: 'Aristotle\'s foundational work on ethics investigates the nature of the good life and human flourishing. Central to the work is the concept of eudaimonia (happiness or flourishing) and the virtuous life. It remains the starting point for Western ethical thought.',
      yearWritten: -350,
      era: Era.ANCIENT,
      originalLanguage: 'el',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Aristotle\'s masterwork on living well argues that happiness is achieved through the practice of virtue.',
      aiThemes: ['Ethics', 'Virtue', 'Happiness', 'Friendship', 'The Good Life'],
      averageRating: 4.4,
      ratingsCount: 45000,
    },
    {
      slug: 'divine-comedy',
      title: 'The Divine Comedy',
      originalTitle: 'La Divina Commedia',
      description: 'Dante\'s epic poem describes the poet\'s journey through Hell (Inferno), Purgatory (Purgatorio), and Heaven (Paradiso). Guided first by Virgil and then by Beatrice, the poem is an allegory for the soul\'s journey towards God. It is considered the supreme work of Italian literature.',
      yearWritten: 1320,
      era: Era.MEDIEVAL,
      originalLanguage: 'it',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Dante\'s epic journey through the afterlife is the most ambitious poem in Western literature, mapping the moral universe of the Middle Ages.',
      aiThemes: ['Religion', 'Sin and Redemption', 'Love', 'The Afterlife', 'Politics'],
      averageRating: 4.7,
      ratingsCount: 68000,
    },
    {
      slug: 'don-quixote',
      title: 'Don Quixote',
      originalTitle: 'El ingenioso hidalgo don Quijote de la Mancha',
      description: 'Often cited as the first modern novel, Don Quixote follows a man who, driven mad by reading too many chivalric romances, sets out to revive chivalry and become a knight. His adventures with his squire Sancho Panza form a profound meditation on idealism, reality, and the nature of fiction.',
      yearPublished: 1605,
      era: Era.RENAISSANCE,
      originalLanguage: 'es',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'The world\'s first modern novel follows an idealist who mistakes fiction for reality in a story that blurs the line between the two.',
      aiThemes: ['Idealism vs Reality', 'Chivalry', 'Madness', 'Identity', 'Storytelling'],
      averageRating: 4.4,
      ratingsCount: 55000,
    },
    {
      slug: 'hamlet',
      title: 'Hamlet',
      description: 'Shakespeare\'s great tragedy follows Prince Hamlet as he grapples with his father\'s murder, his mother\'s hasty remarriage, and his own inability to act. The play\'s exploration of revenge, mortality, and the corruption of the Danish court remains as potent today as ever.',
      yearPublished: 1603,
      era: Era.RENAISSANCE,
      originalLanguage: 'en',
      maturityRating: MaturityRating.TEEN,
      aiSummaryShort: 'Shakespeare\'s greatest tragedy asks whether it is nobler to suffer in silence or to take up arms against a sea of troubles.',
      aiThemes: ['Revenge', 'Mortality', 'Madness', 'Betrayal', 'Corruption'],
      averageRating: 4.6,
      ratingsCount: 88000,
    },
    {
      slug: 'pride-and-prejudice',
      title: 'Pride and Prejudice',
      description: 'Jane Austen\'s beloved novel follows the spirited Elizabeth Bennet as she navigates issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry. Her relationship with the proud Mr. Darcy is one of the great love stories in literature.',
      yearPublished: 1813,
      era: Era.ENLIGHTENMENT,
      originalLanguage: 'en',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Austen\'s razor-sharp comedy of manners follows a witty heroine who must overcome her own prejudice to find love in a society obsessed with wealth.',
      aiThemes: ['Marriage', 'Social Class', 'Pride', 'Love', 'Female Independence'],
      averageRating: 4.7,
      ratingsCount: 125000,
    },
    {
      slug: 'crime-and-punishment',
      title: 'Crime and Punishment',
      originalTitle: 'Преступление и наказание',
      description: 'Dostoevsky\'s psychological thriller follows Raskolnikov, a destitute student in St. Petersburg who formulates a theory that extraordinary people have the right to commit crimes. After murdering a pawnbroker, he is tormented by guilt and paranoia. The novel is a profound investigation of conscience, suffering, and redemption.',
      yearPublished: 1866,
      era: Era.MODERN,
      originalLanguage: 'ru',
      maturityRating: MaturityRating.ADULT,
      aiSummaryShort: 'Dostoevsky\'s searing psychological study asks whether a brilliant mind can justify murder — and whether the human conscience allows any escape.',
      aiThemes: ['Guilt', 'Redemption', 'Psychology', 'Morality', 'Poverty'],
      averageRating: 4.7,
      ratingsCount: 98000,
    },
    {
      slug: 'war-and-peace',
      title: 'War and Peace',
      originalTitle: 'Война и мир',
      description: 'Tolstoy\'s monumental novel interweaves the stories of five Russian aristocratic families against the backdrop of Napoleon\'s invasion of Russia. Celebrated for its historical scope and the depth of its characters, it is widely considered one of the greatest novels ever written.',
      yearPublished: 1869,
      era: Era.MODERN,
      originalLanguage: 'ru',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Tolstoy\'s vast panorama of Russian society during the Napoleonic wars is the ultimate novel about history, free will, and the search for meaning.',
      aiThemes: ['War', 'History', 'Love', 'Russian Society', 'Fate vs Free Will'],
      averageRating: 4.6,
      ratingsCount: 72000,
    },
    {
      slug: 'thus-spoke-zarathustra',
      title: 'Thus Spoke Zarathustra',
      originalTitle: 'Also sprach Zarathustra',
      description: 'Nietzsche\'s philosophical novel presents the fictional prophet Zarathustra who descends from his mountain retreat to share his wisdom with humanity. The book introduces the concepts of the Übermensch, eternal recurrence, and the will to power.',
      yearPublished: 1883,
      era: Era.MODERN,
      originalLanguage: 'de',
      maturityRating: MaturityRating.ADULT,
      aiSummaryShort: 'Nietzsche\'s literary masterpiece announces the death of God and calls for a radical revaluation of all values through the prophet Zarathustra.',
      aiThemes: ['Nihilism', 'Übermensch', 'Will to Power', 'Eternal Recurrence', 'Morality'],
      averageRating: 4.4,
      ratingsCount: 52000,
    },
    {
      slug: 'mrs-dalloway',
      title: 'Mrs Dalloway',
      description: 'Virginia Woolf\'s modernist novel unfolds over a single day in post-World War I London, following Clarissa Dalloway as she prepares for a party. Woolf\'s pioneering stream-of-consciousness technique weaves together interior monologue and external observation.',
      yearPublished: 1925,
      era: Era.MODERN,
      originalLanguage: 'en',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Woolf\'s modernist masterpiece unfolds in a single day to reveal the inner lives of those traumatised by war and stifled by society.',
      aiThemes: ['Memory', 'Time', 'Mental Health', 'Social Class', 'War\'s Aftermath'],
      averageRating: 4.2,
      ratingsCount: 42000,
    },
    {
      slug: 'the-metamorphosis',
      title: 'The Metamorphosis',
      originalTitle: 'Die Verwandlung',
      description: 'Kafka\'s novella begins with traveling salesman Gregor Samsa waking to find himself transformed into a giant insect. The story explores his family\'s reaction and Gregor\'s gradual withdrawal from the world. It is Kafka\'s most celebrated work and a defining text of existentialist and absurdist literature.',
      yearPublished: 1915,
      era: Era.MODERN,
      originalLanguage: 'de',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Kafka\'s surreal tale of a man transformed into a giant insect is the most powerful metaphor for alienation ever written.',
      aiThemes: ['Alienation', 'Family', 'Identity', 'Work and Capitalism', 'Absurdism'],
      averageRating: 4.3,
      ratingsCount: 78000,
    },
    {
      slug: 'the-stranger',
      title: 'The Stranger',
      originalTitle: "L'Étranger",
      description: 'Camus\'s debut novel follows Meursault, a detached French Algerian who commits a senseless murder on a sun-drenched beach. His indifference to his own trial and execution embodies Camus\'s philosophy of the absurd — the conflict between humanity\'s desire for meaning and the universe\'s silence.',
      yearPublished: 1942,
      era: Era.CONTEMPORARY,
      originalLanguage: 'fr',
      maturityRating: MaturityRating.ADULT,
      aiSummaryShort: 'Camus\'s defining novel confronts us with a man whose radical detachment forces us to question society\'s moral judgements.',
      aiThemes: ['Absurdism', 'Existentialism', 'Alienation', 'Colonialism', 'Death'],
      averageRating: 4.3,
      ratingsCount: 95000,
    },
    {
      slug: 'one-hundred-years-of-solitude',
      title: 'One Hundred Years of Solitude',
      originalTitle: 'Cien años de soledad',
      description: 'García Márquez\'s landmark novel follows the Buendía family across seven generations in the fictional town of Macondo. Blending the miraculous and the mundane in the style known as magical realism, it is an allegory of Colombian and Latin American history.',
      yearPublished: 1967,
      era: Era.CONTEMPORARY,
      originalLanguage: 'es',
      maturityRating: MaturityRating.ADULT,
      aiSummaryShort: 'García Márquez\'s Nobel-winning masterpiece weaves a century of family history into a mythic tapestry of love, violence, and magical wonder.',
      aiThemes: ['Magical Realism', 'History', 'Family', 'Solitude', 'Latin America'],
      averageRating: 4.6,
      ratingsCount: 108000,
    },
    {
      slug: 'things-fall-apart',
      title: 'Things Fall Apart',
      description: 'Chinua Achebe\'s landmark novel depicts the life of Okonkwo, a respected warrior of the Umuofia clan in Nigeria, and the disruption caused by colonialism and the arrival of Christian missionaries. It is the most widely read novel in African literature.',
      yearPublished: 1958,
      era: Era.CONTEMPORARY,
      originalLanguage: 'en',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Achebe\'s groundbreaking novel tells the story of colonialism\'s destruction of Igbo society from the inside, giving voice to Africa\'s own story.',
      aiThemes: ['Colonialism', 'Cultural Identity', 'Tradition vs Change', 'Masculinity', 'Religion'],
      averageRating: 4.4,
      ratingsCount: 65000,
    },
    {
      slug: 'the-second-sex',
      title: 'The Second Sex',
      originalTitle: 'Le Deuxième Sexe',
      description: 'De Beauvoir\'s landmark feminist analysis examines the treatment and perception of women throughout history. The book introduces the famous declaration "One is not born, but rather becomes, a woman," challenging the biological determinism that had long confined women.',
      yearPublished: 1949,
      era: Era.CONTEMPORARY,
      originalLanguage: 'fr',
      maturityRating: MaturityRating.ADULT,
      aiSummaryShort: 'De Beauvoir\'s revolutionary feminist manifesto dismantled centuries of assumptions about womanhood and laid the groundwork for modern feminism.',
      aiThemes: ['Feminism', 'Gender', 'Existentialism', 'Oppression', 'Identity'],
      averageRating: 4.3,
      ratingsCount: 38000,
    },
    {
      slug: 'tale-of-genji',
      title: 'The Tale of Genji',
      originalTitle: '源氏物語',
      description: 'Written in the early 11th century, Murasaki Shikibu\'s masterpiece is considered the world\'s first novel. It follows the romantic life of the son of an ancient Japanese emperor and explores the culture and customs of the Heian period with extraordinary psychological depth.',
      yearWritten: 1021,
      era: Era.MEDIEVAL,
      originalLanguage: 'ja',
      maturityRating: MaturityRating.ADULT,
      aiSummaryShort: 'The world\'s first novel, written by a lady-in-waiting a thousand years ago, remains a timeless exploration of beauty, love, and impermanence.',
      aiThemes: ['Love', 'Japanese Culture', 'Beauty', 'Court Life', 'Impermanence'],
      averageRating: 4.2,
      ratingsCount: 22000,
    },
    {
      slug: 'masnavi',
      title: 'Masnavi',
      originalTitle: 'مثنوی معنوی',
      description: 'Rumi\'s great spiritual poem, written in Persian, is one of the most influential works of Sufism. Spanning six volumes, it uses stories, parables, and extended metaphors to explore themes of divine love, spiritual longing, and the path to union with God.',
      yearWritten: 1258,
      era: Era.MEDIEVAL,
      originalLanguage: 'fa',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Rumi\'s vast mystical poem is a spiritual ocean in which every drop reflects the longing of the human soul for union with the divine.',
      aiThemes: ['Sufism', 'Divine Love', 'Spiritual Journey', 'Poetry', 'Islamic Mysticism'],
      averageRating: 4.7,
      ratingsCount: 31000,
    },
    {
      slug: 'the-odyssey',
      title: 'The Odyssey',
      originalTitle: 'Ὀδύσσεια',
      description: 'Homer\'s epic poem recounts the ten-year journey of Odysseus as he tries to return home to Ithaca after the fall of Troy. Along the way he encounters monsters, seductive goddesses, and the wrath of Poseidon. It is a foundational text of Western literature.',
      yearWritten: -800,
      era: Era.ANCIENT,
      originalLanguage: 'el',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Homer\'s epic of homecoming is the original adventure story — a journey through monsters and temptations that asks what it means to truly belong somewhere.',
      aiThemes: ['Journey', 'Homecoming', 'Cunning vs Strength', 'Loyalty', 'Greek Mythology'],
      averageRating: 4.5,
      ratingsCount: 87000,
    },
    {
      slug: 'the-iliad',
      title: 'The Iliad',
      originalTitle: 'Ἰλιάς',
      description: 'Homer\'s epic poem set during the Trojan War focuses on the wrath of the Greek hero Achilles. It explores themes of glory, fate, honor, and the devastating human cost of war. The poem is one of the oldest and most influential works of literature in the Western canon.',
      yearWritten: -850,
      era: Era.ANCIENT,
      originalLanguage: 'el',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'The original war epic asks whether glory won in battle is worth the unbearable cost of human suffering and loss.',
      aiThemes: ['War', 'Honor', 'Fate', 'Grief', 'Greek Heroes'],
      averageRating: 4.4,
      ratingsCount: 75000,
    },
    {
      slug: 'tao-te-ching',
      title: 'Tao Te Ching',
      originalTitle: '道德經',
      description: 'Attributed to the sage Laozi, the Tao Te Ching is a foundational text of Taoism. In eighty-one short chapters of poetry and prose, it describes the Tao (the Way) as the source and ideal of all existence. It is one of the most translated texts in world history.',
      yearWritten: -400,
      era: Era.ANCIENT,
      originalLanguage: 'zh',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'In eighty-one short verses, Laozi describes a way of being in harmony with the universe that has guided Eastern thought for two and a half millennia.',
      aiThemes: ['Taoism', 'Nature', 'Wisdom', 'Non-action', 'Harmony'],
      averageRating: 4.6,
      ratingsCount: 62000,
    },
    {
      slug: 'brothers-karamazov',
      title: 'The Brothers Karamazov',
      originalTitle: 'Братья Карамазовы',
      description: 'Dostoevsky\'s final and most ambitious novel follows the Karamazov brothers as they deal with questions of faith, doubt, free will, and the murder of their father. The Grand Inquisitor section is considered one of the most profound philosophical passages in literature.',
      yearPublished: 1880,
      era: Era.MODERN,
      originalLanguage: 'ru',
      maturityRating: MaturityRating.ADULT,
      aiSummaryShort: 'Dostoevsky\'s final masterpiece is a passionate debate about God, freedom, and morality played out through a family consumed by passion and crime.',
      aiThemes: ['Faith vs Doubt', 'Free Will', 'Family', 'Russian Soul', 'Murder'],
      averageRating: 4.8,
      ratingsCount: 82000,
    },
    {
      slug: 'anna-karenina',
      title: 'Anna Karenina',
      originalTitle: 'Анна Каренина',
      description: 'Tolstoy\'s novel follows the tragic story of Anna Karenina, a married aristocrat who falls into a passionate affair with the dashing Count Vronsky. Set against the backdrop of Russian high society, it is a profound exploration of hypocrisy, love, and social convention.',
      yearPublished: 1878,
      era: Era.MODERN,
      originalLanguage: 'ru',
      maturityRating: MaturityRating.ADULT,
      aiSummaryShort: 'Tolstoy\'s tragic portrait of a woman destroyed by society\'s double standards begins with the most famous opening sentence in literature.',
      aiThemes: ['Love and Passion', 'Social Convention', 'Hypocrisy', 'Family', 'Russian Society'],
      averageRating: 4.6,
      ratingsCount: 89000,
    },
    {
      slug: 'middlemarch',
      title: 'Middlemarch',
      description: 'George Eliot\'s masterpiece is a panoramic novel of English provincial life set in the fictional Midlands town of Middlemarch between 1829 and 1832. Through interlocking stories, it explores marriage, idealism, political reform, and the subtle tragedy of unlived potential.',
      yearPublished: 1871,
      era: Era.MODERN,
      originalLanguage: 'en',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Often called the greatest English novel, Middlemarch is an extraordinarily compassionate study of ordinary people\'s extraordinary inner lives.',
      aiThemes: ['Marriage', 'Idealism', 'Social Reform', 'Ambition', 'Compassion'],
      averageRating: 4.5,
      ratingsCount: 48000,
    },
    {
      slug: 'siddhartha',
      title: 'Siddhartha',
      description: 'Hermann Hesse\'s novel follows Siddhartha, a young Indian man who leaves his family to seek spiritual enlightenment. He passes through asceticism, worldly pleasure, and commerce before finally finding peace by a river. It is a lyrical meditation on the individual\'s search for self-knowledge.',
      yearPublished: 1922,
      era: Era.MODERN,
      originalLanguage: 'de',
      maturityRating: MaturityRating.ALL_AGES,
      aiSummaryShort: 'Hesse\'s luminous novel follows one soul\'s lifelong quest for enlightenment, weaving Eastern philosophy into a timeless story of awakening.',
      aiThemes: ['Enlightenment', 'Spiritual Journey', 'Self-Discovery', 'Buddhism', 'Inner Peace'],
      averageRating: 4.4,
      ratingsCount: 71000,
    },
  ];

  const books: Record<string, string> = {};
  for (const b of booksData) {
    const book = await prisma.book.upsert({
      where: { slug: b.slug },
      update: {},
      create: b,
    });
    books[b.slug] = book.id;
  }

  // ─────────────────────────────────────────────
  // 6. BOOK-PERSON JOIN RECORDS (Authors)
  // ─────────────────────────────────────────────
  console.log('Seeding book-person relations...');

  const bookPersonData = [
    { bookSlug: 'meditations',                    personSlug: 'marcus-aurelius' },
    { bookSlug: 'the-republic',                   personSlug: 'plato' },
    { bookSlug: 'nicomachean-ethics',             personSlug: 'aristotle' },
    { bookSlug: 'divine-comedy',                  personSlug: 'dante' },
    { bookSlug: 'don-quixote',                    personSlug: 'cervantes' },
    { bookSlug: 'hamlet',                         personSlug: 'shakespeare' },
    { bookSlug: 'pride-and-prejudice',            personSlug: 'jane-austen' },
    { bookSlug: 'crime-and-punishment',           personSlug: 'dostoevsky' },
    { bookSlug: 'war-and-peace',                  personSlug: 'tolstoy' },
    { bookSlug: 'thus-spoke-zarathustra',         personSlug: 'nietzsche' },
    { bookSlug: 'mrs-dalloway',                   personSlug: 'virginia-woolf' },
    { bookSlug: 'the-metamorphosis',              personSlug: 'kafka' },
    { bookSlug: 'the-stranger',                   personSlug: 'camus' },
    { bookSlug: 'one-hundred-years-of-solitude',  personSlug: 'garcia-marquez' },
    { bookSlug: 'things-fall-apart',              personSlug: 'achebe' },
    { bookSlug: 'the-second-sex',                 personSlug: 'simone-de-beauvoir' },
    { bookSlug: 'tale-of-genji',                  personSlug: 'murasaki-shikibu' },
    { bookSlug: 'masnavi',                        personSlug: 'rumi' },
    { bookSlug: 'the-odyssey',                    personSlug: 'homer' },
    { bookSlug: 'the-iliad',                      personSlug: 'homer' },
    { bookSlug: 'tao-te-ching',                   personSlug: 'laozi' },
    { bookSlug: 'brothers-karamazov',             personSlug: 'dostoevsky' },
    { bookSlug: 'anna-karenina',                  personSlug: 'tolstoy' },
    { bookSlug: 'middlemarch',                    personSlug: 'george-eliot' },
    { bookSlug: 'siddhartha',                     personSlug: 'hesse' },
  ];

  await prisma.bookPerson.createMany({
    data: bookPersonData.map(({ bookSlug, personSlug }) => ({
      bookId: books[bookSlug],
      personId: persons[personSlug],
      role: PersonRole.AUTHOR,
    })),
    skipDuplicates: true,
  });

  // ─────────────────────────────────────────────
  // 7. EDITIONS
  // ─────────────────────────────────────────────
  console.log('Seeding editions...');

  // Helper: isPublicDomain for works published before 1930
  const isPublicDomain = (yearPublished?: number | null, yearWritten?: number | null) => {
    const year = yearPublished ?? yearWritten ?? 9999;
    return year < 1930;
  };

  const editionsData: Array<{
    bookSlug: string;
    language: string;
    publishYear?: number;
    isOriginal: boolean;
    isPublicDomain: boolean;
    format: EditionFormat;
    publisher?: string;
    pageCount?: number;
  }> = [];

  // Generate original-language editions for all books
  const bookOriginalLang: Record<string, { lang: string; year?: number; writtenYear?: number }> = {
    'meditations':                   { lang: 'el', writtenYear: 180 },
    'the-republic':                  { lang: 'el', writtenYear: -375 },
    'nicomachean-ethics':            { lang: 'el', writtenYear: -350 },
    'divine-comedy':                 { lang: 'it', writtenYear: 1320 },
    'don-quixote':                   { lang: 'es', year: 1605 },
    'hamlet':                        { lang: 'en', year: 1603 },
    'pride-and-prejudice':           { lang: 'en', year: 1813 },
    'crime-and-punishment':          { lang: 'ru', year: 1866 },
    'war-and-peace':                 { lang: 'ru', year: 1869 },
    'thus-spoke-zarathustra':        { lang: 'de', year: 1883 },
    'mrs-dalloway':                  { lang: 'en', year: 1925 },
    'the-metamorphosis':             { lang: 'de', year: 1915 },
    'the-stranger':                  { lang: 'fr', year: 1942 },
    'one-hundred-years-of-solitude': { lang: 'es', year: 1967 },
    'things-fall-apart':             { lang: 'en', year: 1958 },
    'the-second-sex':                { lang: 'fr', year: 1949 },
    'tale-of-genji':                 { lang: 'ja', writtenYear: 1021 },
    'masnavi':                       { lang: 'fa', writtenYear: 1258 },
    'the-odyssey':                   { lang: 'el', writtenYear: -800 },
    'the-iliad':                     { lang: 'el', writtenYear: -850 },
    'tao-te-ching':                  { lang: 'zh', writtenYear: -400 },
    'brothers-karamazov':            { lang: 'ru', year: 1880 },
    'anna-karenina':                 { lang: 'ru', year: 1878 },
    'middlemarch':                   { lang: 'en', year: 1871 },
    'siddhartha':                    { lang: 'de', year: 1922 },
  };

  for (const [slug, info] of Object.entries(bookOriginalLang)) {
    editionsData.push({
      bookSlug: slug,
      language: info.lang,
      publishYear: info.year ?? info.writtenYear,
      isOriginal: true,
      isPublicDomain: isPublicDomain(info.year, info.writtenYear),
      format: EditionFormat.PAPERBACK,
    });

    // Also add English edition for non-English originals
    if (info.lang !== 'en') {
      editionsData.push({
        bookSlug: slug,
        language: 'en',
        isOriginal: false,
        isPublicDomain: isPublicDomain(info.year, info.writtenYear),
        format: EditionFormat.PAPERBACK,
      });
    }
  }

  for (const e of editionsData) {
    await prisma.edition.create({
      data: {
        bookId: books[e.bookSlug],
        language: e.language,
        publishYear: e.publishYear,
        isOriginal: e.isOriginal,
        isPublicDomain: e.isPublicDomain,
        format: e.format,
        publisher: e.publisher,
        pageCount: e.pageCount,
      },
    });
  }

  // ─────────────────────────────────────────────
  // 8. QUOTES
  // ─────────────────────────────────────────────
  console.log('Seeding quotes...');

  const quotesData = [
    {
      bookSlug: 'meditations',
      personSlug: 'marcus-aurelius',
      text: 'You have power over your mind, not outside events. Realize this, and you will find strength.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'meditations',
      personSlug: 'marcus-aurelius',
      text: 'The impediment to action advances action. What stands in the way becomes the way.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'meditations',
      personSlug: 'marcus-aurelius',
      text: 'Waste no more time arguing about what a good man should be. Be one.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'the-republic',
      personSlug: 'plato',
      text: 'The only true wisdom is in knowing you know nothing.',
      context: 'Attributed to Socrates via Plato',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'the-republic',
      personSlug: 'plato',
      text: 'Wise men speak because they have something to say; fools because they have to say something.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'nicomachean-ethics',
      personSlug: 'aristotle',
      text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'hamlet',
      personSlug: 'shakespeare',
      text: 'To be, or not to be, that is the question.',
      chapter: 'Act 3, Scene 1',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'hamlet',
      personSlug: 'shakespeare',
      text: 'This above all: to thine own self be true.',
      chapter: 'Act 1, Scene 3',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'pride-and-prejudice',
      personSlug: 'jane-austen',
      text: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'crime-and-punishment',
      personSlug: 'dostoevsky',
      text: 'Pain and suffering are always inevitable for a large intelligence and a deep heart.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'thus-spoke-zarathustra',
      personSlug: 'nietzsche',
      text: 'That which does not kill us makes us stronger.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'the-stranger',
      personSlug: 'camus',
      text: 'In the midst of winter, I found there was, within me, an invincible summer.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'things-fall-apart',
      personSlug: 'achebe',
      text: 'When the moon is shining the cripple becomes hungry for a walk.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'masnavi',
      personSlug: 'rumi',
      text: 'Out beyond ideas of wrongdoing and rightdoing, there is a field. I\'ll meet you there.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'masnavi',
      personSlug: 'rumi',
      text: 'Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'anna-karenina',
      personSlug: 'tolstoy',
      text: 'All happy families are alike; each unhappy family is unhappy in its own way.',
      language: 'en',
      isVerified: true,
    },
    {
      bookSlug: 'brothers-karamazov',
      personSlug: 'dostoevsky',
      text: 'Love in action is a harsh and dreadful thing compared with love in dreams.',
      language: 'en',
      isVerified: true,
    },
  ];

  await prisma.quote.createMany({
    data: quotesData.map(q => ({
      bookId: books[q.bookSlug],
      personId: persons[q.personSlug],
      text: q.text,
      context: q.context,
      chapter: q.chapter,
      language: q.language,
      isVerified: q.isVerified,
    })),
    skipDuplicates: true,
  });

  // ─────────────────────────────────────────────
  // 9. COLLECTIONS
  // ─────────────────────────────────────────────
  console.log('Seeding collections...');

  const collectionsData = [
    {
      slug: 'nobel-prize-literature',
      name: 'Nobel Prize in Literature',
      description: 'Works by Nobel Prize laureates in Literature, celebrating the most honoured writers in the world.',
      type: CollectionType.OFFICIAL,
      isFeatured: true,
      isPublic: true,
    },
    {
      slug: 'ancient-sacred-texts',
      name: 'Ancient & Sacred Texts',
      description: 'The foundational texts of human civilisation — from Homer to the Tao Te Ching — that have shaped religion, philosophy, and culture for millennia.',
      type: CollectionType.OFFICIAL,
      isFeatured: true,
      isPublic: true,
    },
    {
      slug: '100-books-changed-history',
      name: '100 Books That Changed History',
      description: 'A curated selection of books that fundamentally altered the course of human history, science, politics, and culture.',
      type: CollectionType.OFFICIAL,
      isFeatured: true,
      isPublic: true,
    },
    {
      slug: 'philosophy-through-ages',
      name: 'Philosophy Through the Ages',
      description: 'From ancient Greece to the 20th century, the essential works of Western and Eastern philosophical tradition.',
      type: CollectionType.OFFICIAL,
      isFeatured: false,
      isPublic: true,
    },
    {
      slug: 'science-changed-everything',
      name: 'Science That Changed Everything',
      description: 'Landmark scientific works that revolutionised our understanding of the natural world.',
      type: CollectionType.OFFICIAL,
      isFeatured: false,
      isPublic: true,
    },
    {
      slug: 'banned-books-history',
      name: 'Banned Books of History',
      description: 'Controversial, censored, and suppressed books throughout history — and the stories of their banning.',
      type: CollectionType.OFFICIAL,
      isFeatured: false,
      isPublic: true,
    },
    {
      slug: 'african-literature',
      name: 'African Literature: Across Centuries',
      description: 'Essential works from African writers across the centuries, from ancient texts to contemporary voices.',
      type: CollectionType.OFFICIAL,
      isFeatured: false,
      isPublic: true,
    },
    {
      slug: 'islamic-golden-age',
      name: 'The Islamic Golden Age',
      description: 'Works from the Islamic Golden Age (8th–14th centuries) that preserved ancient knowledge and advanced science, philosophy, and art.',
      type: CollectionType.OFFICIAL,
      isFeatured: false,
      isPublic: true,
    },
    {
      slug: 'feminist-literature',
      name: 'Feminist Literature: A Century',
      description: 'A century of feminist writing — from the first wave to today — that challenged and changed our understanding of gender and society.',
      type: CollectionType.OFFICIAL,
      isFeatured: false,
      isPublic: true,
    },
    {
      slug: 'endangered-languages',
      name: 'Books in Endangered Languages',
      description: 'Literature written in or translated into languages that are at risk of disappearing, preserving cultural heritage through the written word.',
      type: CollectionType.OFFICIAL,
      isFeatured: false,
      isPublic: true,
    },
  ];

  const collections: Record<string, string> = {};
  for (const c of collectionsData) {
    const collection = await prisma.collection.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    collections[c.slug] = collection.id;
  }

  // ─────────────────────────────────────────────
  // 10. COLLECTION-BOOK JOIN RECORDS
  // ─────────────────────────────────────────────
  console.log('Seeding collection-book relations...');

  const collectionBooksData: Array<{ collectionSlug: string; bookSlug: string; position: number; curatorNote?: string }> = [
    // Nobel Prize in Literature
    { collectionSlug: 'nobel-prize-literature', bookSlug: 'one-hundred-years-of-solitude', position: 1, curatorNote: 'García Márquez won the Nobel Prize in 1982.' },
    { collectionSlug: 'nobel-prize-literature', bookSlug: 'things-fall-apart', position: 2, curatorNote: 'Achebe was widely expected to receive the Nobel Prize.' },
    { collectionSlug: 'nobel-prize-literature', bookSlug: 'the-stranger', position: 3, curatorNote: 'Camus was awarded the Nobel Prize in Literature in 1957.' },
    { collectionSlug: 'nobel-prize-literature', bookSlug: 'siddhartha', position: 4, curatorNote: 'Hesse received the Nobel Prize in Literature in 1946.' },

    // Ancient & Sacred Texts
    { collectionSlug: 'ancient-sacred-texts', bookSlug: 'the-odyssey', position: 1 },
    { collectionSlug: 'ancient-sacred-texts', bookSlug: 'the-iliad', position: 2 },
    { collectionSlug: 'ancient-sacred-texts', bookSlug: 'the-republic', position: 3 },
    { collectionSlug: 'ancient-sacred-texts', bookSlug: 'meditations', position: 4 },
    { collectionSlug: 'ancient-sacred-texts', bookSlug: 'tao-te-ching', position: 5 },
    { collectionSlug: 'ancient-sacred-texts', bookSlug: 'masnavi', position: 6 },

    // 100 Books That Changed History
    { collectionSlug: '100-books-changed-history', bookSlug: 'the-republic', position: 1 },
    { collectionSlug: '100-books-changed-history', bookSlug: 'the-second-sex', position: 2 },
    { collectionSlug: '100-books-changed-history', bookSlug: 'things-fall-apart', position: 3 },
    { collectionSlug: '100-books-changed-history', bookSlug: 'don-quixote', position: 4 },
    { collectionSlug: '100-books-changed-history', bookSlug: 'crime-and-punishment', position: 5 },
    { collectionSlug: '100-books-changed-history', bookSlug: 'tao-te-ching', position: 6 },

    // Philosophy Through the Ages
    { collectionSlug: 'philosophy-through-ages', bookSlug: 'the-republic', position: 1 },
    { collectionSlug: 'philosophy-through-ages', bookSlug: 'nicomachean-ethics', position: 2 },
    { collectionSlug: 'philosophy-through-ages', bookSlug: 'meditations', position: 3 },
    { collectionSlug: 'philosophy-through-ages', bookSlug: 'thus-spoke-zarathustra', position: 4 },
    { collectionSlug: 'philosophy-through-ages', bookSlug: 'tao-te-ching', position: 5 },
    { collectionSlug: 'philosophy-through-ages', bookSlug: 'the-second-sex', position: 6 },
    { collectionSlug: 'philosophy-through-ages', bookSlug: 'siddhartha', position: 7 },

    // Banned Books of History
    { collectionSlug: 'banned-books-history', bookSlug: 'don-quixote', position: 1 },
    { collectionSlug: 'banned-books-history', bookSlug: 'crime-and-punishment', position: 2 },
    { collectionSlug: 'banned-books-history', bookSlug: 'thus-spoke-zarathustra', position: 3 },
    { collectionSlug: 'banned-books-history', bookSlug: 'the-stranger', position: 4 },
    { collectionSlug: 'banned-books-history', bookSlug: 'one-hundred-years-of-solitude', position: 5 },
    { collectionSlug: 'banned-books-history', bookSlug: 'the-second-sex', position: 6 },

    // African Literature
    { collectionSlug: 'african-literature', bookSlug: 'things-fall-apart', position: 1, curatorNote: 'The foundational novel of modern African literature.' },
    { collectionSlug: 'african-literature', bookSlug: 'the-stranger', position: 2, curatorNote: 'Camus was born and raised in colonial Algeria.' },

    // Islamic Golden Age
    { collectionSlug: 'islamic-golden-age', bookSlug: 'masnavi', position: 1, curatorNote: 'Rumi\'s masterwork of Sufi mysticism.' },

    // Feminist Literature
    { collectionSlug: 'feminist-literature', bookSlug: 'the-second-sex', position: 1, curatorNote: 'The foundational text of modern feminism.' },
    { collectionSlug: 'feminist-literature', bookSlug: 'mrs-dalloway', position: 2 },
    { collectionSlug: 'feminist-literature', bookSlug: 'middlemarch', position: 3 },
    { collectionSlug: 'feminist-literature', bookSlug: 'pride-and-prejudice', position: 4 },
  ];

  await prisma.collectionBook.createMany({
    data: collectionBooksData.map(({ collectionSlug, bookSlug, position, curatorNote }) => ({
      collectionId: collections[collectionSlug],
      bookId: books[bookSlug],
      position,
      curatorNote,
    })),
    skipDuplicates: true,
  });

  console.log('✅ Seed complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
