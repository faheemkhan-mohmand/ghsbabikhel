export interface Chapter {
  id: number;
  title: string;
  description: string;
  readTime: string;
}

export interface Subject {
  slug: string;
  name: string;
  emoji: string;
  color: string;
  chapters: Chapter[];
}

export interface ClassData {
  classNumber: number;
  emoji: string;
  color: string;
  subjects: Subject[];
}

const mathChapters6: Chapter[] = [
  { id: 1, title: "Whole Numbers", description: "Understanding whole numbers, place values, and basic operations", readTime: "15 min" },
  { id: 2, title: "Factors and Multiples", description: "HCF, LCM, prime factorization and divisibility rules", readTime: "20 min" },
  { id: 3, title: "Integers", description: "Positive and negative numbers, number line, operations on integers", readTime: "18 min" },
  { id: 4, title: "Fractions", description: "Types of fractions, operations, simplification and word problems", readTime: "22 min" },
  { id: 5, title: "Decimals", description: "Decimal fractions, conversions, and arithmetic operations", readTime: "16 min" },
  { id: 6, title: "Ratio and Proportion", description: "Understanding ratios, proportions, and unitary method", readTime: "14 min" },
  { id: 7, title: "Introduction to Algebra", description: "Variables, expressions, and simple equations", readTime: "20 min" },
  { id: 8, title: "Basic Geometry", description: "Points, lines, angles, triangles, and quadrilaterals", readTime: "25 min" },
  { id: 9, title: "Perimeter and Area", description: "Perimeter and area of rectangles, squares, and triangles", readTime: "18 min" },
  { id: 10, title: "Data Handling", description: "Bar graphs, pictographs, and basic statistics", readTime: "15 min" },
];

const englishChapters6: Chapter[] = [
  { id: 1, title: "The Little Match Girl", description: "A classic story teaching compassion and empathy", readTime: "20 min" },
  { id: 2, title: "Nouns and Pronouns", description: "Types of nouns, pronouns, and their usage in sentences", readTime: "15 min" },
  { id: 3, title: "Verbs and Tenses", description: "Present, past, and future tenses with examples", readTime: "18 min" },
  { id: 4, title: "Adjectives and Adverbs", description: "Describing words and their proper placement", readTime: "14 min" },
  { id: 5, title: "Comprehension Passages", description: "Reading and understanding short passages", readTime: "22 min" },
  { id: 6, title: "Essay Writing", description: "Structure and format of basic essays", readTime: "20 min" },
  { id: 7, title: "Letter Writing", description: "Formal and informal letter formats", readTime: "16 min" },
  { id: 8, title: "Poetry Appreciation", description: "Understanding rhyme, rhythm, and meaning in poems", readTime: "18 min" },
];

const scienceChapters6: Chapter[] = [
  { id: 1, title: "Food and Nutrition", description: "Nutrients, balanced diet, and food preservation", readTime: "18 min" },
  { id: 2, title: "Living Things", description: "Characteristics of living organisms and classification", readTime: "20 min" },
  { id: 3, title: "Matter and Materials", description: "States of matter, properties, and changes", readTime: "16 min" },
  { id: 4, title: "Force and Motion", description: "Types of forces, friction, and simple machines", readTime: "22 min" },
  { id: 5, title: "Light and Shadows", description: "Sources of light, reflection, and shadow formation", readTime: "15 min" },
  { id: 6, title: "Water and Air", description: "Water cycle, air composition, and weather", readTime: "18 min" },
  { id: 7, title: "Plants and Animals", description: "Plant parts, photosynthesis, and animal habitats", readTime: "20 min" },
  { id: 8, title: "Our Environment", description: "Pollution, conservation, and ecosystems", readTime: "17 min" },
];

const urduChapters6: Chapter[] = [
  { id: 1, title: "حمد و نعت", description: "حمد اور نعت کی تعریف اور اہمیت", readTime: "15 min" },
  { id: 2, title: "کہانی - سچائی کی طاقت", description: "سچ بولنے کی اہمیت پر مبنی کہانی", readTime: "20 min" },
  { id: 3, title: "اسم اور فعل", description: "اردو قواعد - اسم اور فعل کی اقسام", readTime: "18 min" },
  { id: 4, title: "نظم - وطن سے محبت", description: "وطن سے محبت پر مبنی نظم", readTime: "14 min" },
  { id: 5, title: "خط لکھنا", description: "رسمی اور غیر رسمی خطوط کے اصول", readTime: "16 min" },
  { id: 6, title: "مضمون نگاری", description: "مضمون لکھنے کے اصول اور طریقے", readTime: "20 min" },
];

const mathChapters7: Chapter[] = [
  { id: 1, title: "Rational Numbers", description: "Properties and operations on rational numbers", readTime: "20 min" },
  { id: 2, title: "Exponents and Powers", description: "Laws of exponents and scientific notation", readTime: "18 min" },
  { id: 3, title: "Algebraic Expressions", description: "Simplification and evaluation of expressions", readTime: "22 min" },
  { id: 4, title: "Linear Equations", description: "Solving linear equations in one variable", readTime: "20 min" },
  { id: 5, title: "Lines and Angles", description: "Types of angles, parallel lines, and transversals", readTime: "18 min" },
  { id: 6, title: "Triangles", description: "Properties, congruence, and types of triangles", readTime: "25 min" },
  { id: 7, title: "Percentage", description: "Profit, loss, discount, and simple interest", readTime: "20 min" },
  { id: 8, title: "Data Handling", description: "Mean, median, mode, and probability", readTime: "16 min" },
  { id: 9, title: "Area and Perimeter", description: "Area of circles, composite shapes, and volume", readTime: "22 min" },
];

const englishChapters7: Chapter[] = [
  { id: 1, title: "The Brave Boy", description: "A tale of courage and determination", readTime: "18 min" },
  { id: 2, title: "Active and Passive Voice", description: "Transforming sentences between voices", readTime: "20 min" },
  { id: 3, title: "Direct and Indirect Speech", description: "Reported speech rules and conversions", readTime: "22 min" },
  { id: 4, title: "Prepositions and Conjunctions", description: "Connecting words and phrases correctly", readTime: "15 min" },
  { id: 5, title: "Paragraph Writing", description: "Structuring effective paragraphs", readTime: "18 min" },
  { id: 6, title: "Story Writing", description: "Elements of a good story and creative writing", readTime: "20 min" },
  { id: 7, title: "Comprehension Skills", description: "Advanced reading comprehension techniques", readTime: "22 min" },
  { id: 8, title: "Grammar Review", description: "Complete grammar revision and practice", readTime: "25 min" },
];

const scienceChapters7: Chapter[] = [
  { id: 1, title: "Cell Structure", description: "Plant and animal cells, organelles, and functions", readTime: "22 min" },
  { id: 2, title: "Human Body Systems", description: "Digestive, respiratory, and circulatory systems", readTime: "25 min" },
  { id: 3, title: "Acids and Bases", description: "Properties, indicators, and neutralization", readTime: "18 min" },
  { id: 4, title: "Heat and Temperature", description: "Conduction, convection, radiation, and thermometers", readTime: "20 min" },
  { id: 5, title: "Electricity", description: "Electric circuits, conductors, and insulators", readTime: "22 min" },
  { id: 6, title: "Reproduction in Plants", description: "Pollination, seed dispersal, and germination", readTime: "18 min" },
  { id: 7, title: "Soil and Rocks", description: "Types of soil, rock cycle, and weathering", readTime: "16 min" },
  { id: 8, title: "Weather and Climate", description: "Weather patterns, seasons, and climate zones", readTime: "20 min" },
];

const urduChapters7: Chapter[] = [
  { id: 1, title: "حمد باری تعالیٰ", description: "اللہ تعالیٰ کی حمد و ثنا پر مبنی نظم", readTime: "14 min" },
  { id: 2, title: "سبق - علم کی روشنی", description: "علم کی اہمیت پر مبنی سبق", readTime: "20 min" },
  { id: 3, title: "صرف و نحو", description: "اردو گرامر کے بنیادی اصول", readTime: "22 min" },
  { id: 4, title: "مکالمہ نگاری", description: "مکالمے لکھنے کے طریقے", readTime: "16 min" },
  { id: 5, title: "خلاصہ نویسی", description: "سبق کا خلاصہ لکھنا", readTime: "18 min" },
  { id: 6, title: "درخواست نویسی", description: "درخواست لکھنے کے اصول", readTime: "15 min" },
];

const mathChapters8: Chapter[] = [
  { id: 1, title: "Square and Square Roots", description: "Perfect squares, square roots, and estimation", readTime: "20 min" },
  { id: 2, title: "Cube and Cube Roots", description: "Perfect cubes and cube root calculation", readTime: "18 min" },
  { id: 3, title: "Algebraic Identities", description: "Standard identities and their applications", readTime: "22 min" },
  { id: 4, title: "Factorization", description: "Methods of factorization of polynomials", readTime: "20 min" },
  { id: 5, title: "Quadrilaterals", description: "Properties and types of quadrilaterals", readTime: "18 min" },
  { id: 6, title: "Surface Area and Volume", description: "Formulas for 3D shapes", readTime: "25 min" },
  { id: 7, title: "Statistics", description: "Grouped data, histograms, and pie charts", readTime: "20 min" },
  { id: 8, title: "Sets and Functions", description: "Introduction to sets, Venn diagrams, and functions", readTime: "22 min" },
];

const englishChapters8: Chapter[] = [
  { id: 1, title: "The Last Leaf", description: "O. Henry's classic story about hope and sacrifice", readTime: "22 min" },
  { id: 2, title: "Clauses and Phrases", description: "Independent and dependent clauses", readTime: "18 min" },
  { id: 3, title: "Conditional Sentences", description: "If-clauses and their types", readTime: "20 min" },
  { id: 4, title: "Formal Writing", description: "Reports, applications, and formal letters", readTime: "22 min" },
  { id: 5, title: "Poetry Analysis", description: "Figures of speech and literary devices", readTime: "20 min" },
  { id: 6, title: "Debate and Discussion", description: "Argumentative writing and speech skills", readTime: "18 min" },
  { id: 7, title: "Vocabulary Building", description: "Synonyms, antonyms, and word formation", readTime: "16 min" },
];

const scienceChapters8: Chapter[] = [
  { id: 1, title: "Synthetic Materials", description: "Plastics, fibres, and their properties", readTime: "18 min" },
  { id: 2, title: "Metals and Non-metals", description: "Physical and chemical properties", readTime: "22 min" },
  { id: 3, title: "Combustion and Flame", description: "Types of combustion and fire safety", readTime: "16 min" },
  { id: 4, title: "Conservation of Plants", description: "Biodiversity, deforestation, and conservation", readTime: "20 min" },
  { id: 5, title: "Reproduction in Animals", description: "Types of reproduction and life cycles", readTime: "22 min" },
  { id: 6, title: "Sound", description: "Production, propagation, and characteristics", readTime: "18 min" },
  { id: 7, title: "Chemical Effects of Current", description: "Electroplating and electrochemistry", readTime: "20 min" },
  { id: 8, title: "Stars and Solar System", description: "Planets, constellations, and space exploration", readTime: "25 min" },
];

const urduChapters8: Chapter[] = [
  { id: 1, title: "نعت رسول مقبول ﷺ", description: "نبی کریم ﷺ کی شان میں نعت", readTime: "15 min" },
  { id: 2, title: "سبق - محنت کی عظمت", description: "محنت اور لگن کی اہمیت", readTime: "20 min" },
  { id: 3, title: "محاورے اور ضرب الامثال", description: "اردو محاورے اور ان کا استعمال", readTime: "18 min" },
  { id: 4, title: "تلخیص نویسی", description: "عبارت کا خلاصہ لکھنے کا فن", readTime: "22 min" },
  { id: 5, title: "نظم - اقبال کا پیغام", description: "علامہ اقبال کی شاعری سے منتخب نظم", readTime: "16 min" },
  { id: 6, title: "خط و کتابت", description: "رسمی خطوط اور درخواستیں", readTime: "18 min" },
];

const physicsChapters9: Chapter[] = [
  { id: 1, title: "Physical Quantities", description: "Measurement, units, and scientific notation", readTime: "20 min" },
  { id: 2, title: "Kinematics", description: "Speed, velocity, acceleration, and equations of motion", readTime: "25 min" },
  { id: 3, title: "Dynamics", description: "Newton's laws, momentum, and friction", readTime: "28 min" },
  { id: 4, title: "Turning Effect of Forces", description: "Torque, equilibrium, and center of gravity", readTime: "22 min" },
  { id: 5, title: "Gravitation", description: "Law of gravitation, mass vs weight, and satellites", readTime: "20 min" },
  { id: 6, title: "Work and Energy", description: "Work, kinetic and potential energy, and power", readTime: "22 min" },
  { id: 7, title: "Properties of Matter", description: "Density, pressure, and Archimedes' principle", readTime: "20 min" },
  { id: 8, title: "Thermal Properties", description: "Temperature, heat transfer, and expansion", readTime: "24 min" },
];

const chemistryChapters9: Chapter[] = [
  { id: 1, title: "Fundamentals of Chemistry", description: "Branches, importance, and scientific method", readTime: "18 min" },
  { id: 2, title: "Structure of Atoms", description: "Atomic models, isotopes, and electron configuration", readTime: "25 min" },
  { id: 3, title: "Periodic Table", description: "Groups, periods, and periodic trends", readTime: "22 min" },
  { id: 4, title: "Chemical Bonding", description: "Ionic, covalent, and metallic bonds", readTime: "24 min" },
  { id: 5, title: "Physical States of Matter", description: "Gases, liquids, solids, and plasma", readTime: "20 min" },
  { id: 6, title: "Solutions", description: "Types, concentration, and solubility", readTime: "18 min" },
  { id: 7, title: "Electrochemistry", description: "Oxidation, reduction, and electrochemical cells", readTime: "22 min" },
  { id: 8, title: "Chemical Reactivity", description: "Types of reactions and balancing equations", readTime: "20 min" },
];

const biologyChapters9: Chapter[] = [
  { id: 1, title: "Introduction to Biology", description: "Branches, careers, and biological method", readTime: "16 min" },
  { id: 2, title: "Biodiversity", description: "Classification, kingdoms, and binomial nomenclature", readTime: "22 min" },
  { id: 3, title: "Cell Biology", description: "Cell structure, microscopy, and cell division", readTime: "25 min" },
  { id: 4, title: "Tissues and Organs", description: "Types of tissues and organ systems", readTime: "20 min" },
  { id: 5, title: "Enzymes", description: "Enzyme action, factors, and importance", readTime: "18 min" },
  { id: 6, title: "Bioenergetics", description: "Photosynthesis and cellular respiration", readTime: "24 min" },
  { id: 7, title: "Nutrition", description: "Autotrophic and heterotrophic nutrition", readTime: "20 min" },
  { id: 8, title: "Transport", description: "Blood, heart, and transport in plants", readTime: "22 min" },
];

const mathChapters9: Chapter[] = [
  { id: 1, title: "Matrices and Determinants", description: "Types, operations, and solving equations", readTime: "25 min" },
  { id: 2, title: "Real Numbers", description: "Properties, surds, and rationalization", readTime: "20 min" },
  { id: 3, title: "Logarithms", description: "Laws of logarithms and applications", readTime: "22 min" },
  { id: 4, title: "Algebraic Expressions", description: "Factorization and algebraic manipulation", readTime: "24 min" },
  { id: 5, title: "Linear Equations", description: "Systems of equations and graphical solutions", readTime: "20 min" },
  { id: 6, title: "Linear Inequalities", description: "Solving and graphing inequalities", readTime: "18 min" },
  { id: 7, title: "Coordinate Geometry", description: "Distance, midpoint, and slope formulas", readTime: "22 min" },
  { id: 8, title: "Congruent Triangles", description: "Congruence criteria and proofs", readTime: "20 min" },
];

const englishChapters9: Chapter[] = [
  { id: 1, title: "The Saviour of Mankind", description: "Life and teachings of the Holy Prophet ﷺ", readTime: "25 min" },
  { id: 2, title: "Patriotism", description: "Love for country and its expression", readTime: "20 min" },
  { id: 3, title: "Media and Its Impact", description: "Role of media in modern society", readTime: "18 min" },
  { id: 4, title: "Tenses Review", description: "All 12 tenses with practice exercises", readTime: "28 min" },
  { id: 5, title: "Essay Writing", description: "Advanced essay structures and argumentation", readTime: "22 min" },
  { id: 6, title: "Dialogue Writing", description: "Writing natural and meaningful dialogues", readTime: "16 min" },
  { id: 7, title: "Translation Skills", description: "Urdu to English translation practice", readTime: "20 min" },
  { id: 8, title: "Comprehension and Summary", description: "Advanced reading and summarizing skills", readTime: "24 min" },
];

const urduChapters9: Chapter[] = [
  { id: 1, title: "حمد", description: "اللہ تعالیٰ کی حمد و ثنا", readTime: "14 min" },
  { id: 2, title: "نعت", description: "نبی اکرم ﷺ کی مدح", readTime: "14 min" },
  { id: 3, title: "غزل - میر تقی میر", description: "میر کی غزل کا مطالعہ", readTime: "20 min" },
  { id: 4, title: "سبق - قائد اعظم", description: "قائد اعظم کی زندگی اور اصول", readTime: "22 min" },
  { id: 5, title: "اردو قواعد", description: "جامع اردو گرامر کی مشق", readTime: "25 min" },
  { id: 6, title: "مضمون نویسی", description: "مضمون کے موضوعات اور فن", readTime: "20 min" },
];

const pakStudiesChapters9: Chapter[] = [
  { id: 1, title: "Ideology of Pakistan", description: "Two-Nation Theory and foundations of Pakistan", readTime: "22 min" },
  { id: 2, title: "Making of Pakistan", description: "Pakistan Movement and key events", readTime: "25 min" },
  { id: 3, title: "Land and Climate", description: "Geography, rivers, and climate of Pakistan", readTime: "20 min" },
  { id: 4, title: "Population and Society", description: "Demographics, culture, and social issues", readTime: "18 min" },
  { id: 5, title: "Government System", description: "Constitution and political structure", readTime: "22 min" },
  { id: 6, title: "Economy of Pakistan", description: "Agriculture, industry, and trade", readTime: "20 min" },
];

const islamiyatChapters9: Chapter[] = [
  { id: 1, title: "Articles of Faith", description: "Belief in Allah, Angels, Books, Prophets, and Hereafter", readTime: "22 min" },
  { id: 2, title: "Pillars of Islam", description: "Shahada, Salat, Zakat, Fasting, and Hajj", readTime: "25 min" },
  { id: 3, title: "The Holy Quran", description: "Revelation, compilation, and teachings", readTime: "20 min" },
  { id: 4, title: "Life of the Prophet ﷺ", description: "Seerah - from birth to prophethood", readTime: "28 min" },
  { id: 5, title: "Battles of Islam", description: "Badr, Uhud, and other significant battles", readTime: "22 min" },
  { id: 6, title: "Islamic Ethics", description: "Honesty, justice, kindness, and social values", readTime: "18 min" },
];

// Class 10 reuses similar structure with advanced content
const physicsChapters10: Chapter[] = [
  { id: 1, title: "Simple Harmonic Motion", description: "Oscillation, pendulum, and wave motion", readTime: "24 min" },
  { id: 2, title: "Waves", description: "Types, properties, and sound waves", readTime: "22 min" },
  { id: 3, title: "Light", description: "Reflection, refraction, and optical instruments", readTime: "28 min" },
  { id: 4, title: "Electrostatics", description: "Coulomb's law, electric field, and potential", readTime: "25 min" },
  { id: 5, title: "Current Electricity", description: "Ohm's law, circuits, and electrical energy", readTime: "26 min" },
  { id: 6, title: "Electromagnetism", description: "Magnetic fields, electromagnetic induction", readTime: "24 min" },
  { id: 7, title: "Electronics", description: "Semiconductors, diodes, and logic gates", readTime: "22 min" },
  { id: 8, title: "Atomic and Nuclear Physics", description: "Radioactivity, fission, and fusion", readTime: "25 min" },
];

const chemistryChapters10: Chapter[] = [
  { id: 1, title: "Chemical Equilibrium", description: "Reversible reactions and Le Chatelier's principle", readTime: "24 min" },
  { id: 2, title: "Acids, Bases and Salts", description: "pH scale, indicators, and neutralization", readTime: "22 min" },
  { id: 3, title: "Organic Chemistry", description: "Hydrocarbons, functional groups, and polymers", readTime: "28 min" },
  { id: 4, title: "Atmosphere", description: "Composition, layers, and environmental chemistry", readTime: "20 min" },
  { id: 5, title: "Water", description: "Properties, water treatment, and hard water", readTime: "18 min" },
  { id: 6, title: "Chemical Industries", description: "Manufacturing processes and industrial chemistry", readTime: "22 min" },
  { id: 7, title: "Biochemistry", description: "Carbohydrates, proteins, lipids, and nucleic acids", readTime: "25 min" },
];

const biologyChapters10: Chapter[] = [
  { id: 1, title: "Gaseous Exchange", description: "Breathing mechanisms and respiratory disorders", readTime: "22 min" },
  { id: 2, title: "Homeostasis", description: "Osmoregulation, thermoregulation, and excretion", readTime: "25 min" },
  { id: 3, title: "Coordination and Control", description: "Nervous system, endocrine system, and senses", readTime: "28 min" },
  { id: 4, title: "Support and Movement", description: "Skeleton, muscles, and locomotion", readTime: "22 min" },
  { id: 5, title: "Reproduction", description: "Asexual and sexual reproduction in organisms", readTime: "24 min" },
  { id: 6, title: "Inheritance", description: "Genetics, DNA, and hereditary diseases", readTime: "26 min" },
  { id: 7, title: "Man and His Environment", description: "Ecology, food chains, and conservation", readTime: "20 min" },
  { id: 8, title: "Biotechnology", description: "Genetic engineering and its applications", readTime: "22 min" },
];

const mathChapters10: Chapter[] = [
  { id: 1, title: "Quadratic Equations", description: "Solving by factoring, completing square, and formula", readTime: "25 min" },
  { id: 2, title: "Theory of Quadratic Equations", description: "Nature of roots and sum/product of roots", readTime: "22 min" },
  { id: 3, title: "Variations", description: "Direct, inverse, joint, and partial variation", readTime: "18 min" },
  { id: 4, title: "Partial Fractions", description: "Decomposition of algebraic fractions", readTime: "24 min" },
  { id: 5, title: "Sets and Functions", description: "Advanced set operations and function types", readTime: "22 min" },
  { id: 6, title: "Trigonometry", description: "Trigonometric ratios, identities, and applications", readTime: "28 min" },
  { id: 7, title: "Geometry", description: "Circles, tangents, and geometric proofs", readTime: "25 min" },
  { id: 8, title: "Mensuration", description: "Surface area and volume of complex shapes", readTime: "22 min" },
];

const englishChapters10: Chapter[] = [
  { id: 1, title: "Hazrat Muhammad ﷺ - An Mercy", description: "Mercy and compassion of the Holy Prophet ﷺ", readTime: "25 min" },
  { id: 2, title: "Chinese New Year", description: "Cultural traditions and celebrations", readTime: "18 min" },
  { id: 3, title: "Try Again", description: "Poem about perseverance and determination", readTime: "14 min" },
  { id: 4, title: "First Aid", description: "Emergency medical procedures and safety", readTime: "20 min" },
  { id: 5, title: "Advanced Grammar", description: "Complex sentences and advanced structures", readTime: "25 min" },
  { id: 6, title: "Formal Letters", description: "Business and official correspondence", readTime: "18 min" },
  { id: 7, title: "Pair Work", description: "Dialogues and conversation practice", readTime: "16 min" },
  { id: 8, title: "Board Exam Preparation", description: "Past papers analysis and exam tips", readTime: "30 min" },
];

const urduChapters10: Chapter[] = [
  { id: 1, title: "حمد و نعت", description: "منتخب حمد اور نعت کا مطالعہ", readTime: "16 min" },
  { id: 2, title: "غزل - غالب", description: "مرزا غالب کی غزلوں کا مطالعہ", readTime: "22 min" },
  { id: 3, title: "سبق - علامہ اقبال", description: "اقبال کی فکر اور فلسفہ", readTime: "24 min" },
  { id: 4, title: "اردو ادب", description: "اردو نثر اور شاعری کا جائزہ", readTime: "20 min" },
  { id: 5, title: "قواعد - جامع مشق", description: "بورڈ امتحان کے لیے قواعد کی تیاری", readTime: "25 min" },
  { id: 6, title: "تحریری مہارت", description: "مضمون، خط، اور درخواست نویسی", readTime: "22 min" },
];

const pakStudiesChapters10: Chapter[] = [
  { id: 1, title: "History of Pakistan (1947-71)", description: "Early challenges and East Pakistan crisis", readTime: "25 min" },
  { id: 2, title: "History of Pakistan (1971-Present)", description: "Modern political history and democratic eras", readTime: "25 min" },
  { id: 3, title: "Culture and Heritage", description: "Pakistani art, literature, and cultural diversity", readTime: "20 min" },
  { id: 4, title: "Foreign Relations", description: "Pakistan's role in international affairs", readTime: "22 min" },
  { id: 5, title: "Economic Development", description: "Five-year plans and economic challenges", readTime: "20 min" },
  { id: 6, title: "Social Issues", description: "Education, health, and population challenges", readTime: "18 min" },
];

const islamiyatChapters10: Chapter[] = [
  { id: 1, title: "Selected Surahs", description: "Detailed study of selected Quranic chapters", readTime: "28 min" },
  { id: 2, title: "Ahadith Study", description: "Selected Ahadith and their explanations", readTime: "25 min" },
  { id: 3, title: "Life After Hijrah", description: "Madinah period and establishment of Islamic state", readTime: "24 min" },
  { id: 4, title: "Khulafa-e-Rashideen", description: "The four rightly guided caliphs", readTime: "28 min" },
  { id: 5, title: "Islamic Jurisprudence", description: "Fiqh, Ijtihad, and sources of Islamic law", readTime: "22 min" },
  { id: 6, title: "Islam and Modern World", description: "Islamic perspective on contemporary issues", readTime: "20 min" },
];

export const classesData: ClassData[] = [
  {
    classNumber: 6,
    emoji: "🎒",
    color: "#0EA5E9",
    subjects: [
      { slug: "mathematics", name: "Mathematics", emoji: "📐", color: "#FF6B35", chapters: mathChapters6 },
      { slug: "english", name: "English", emoji: "📖", color: "#2563EB", chapters: englishChapters6 },
      { slug: "science", name: "Science", emoji: "🔬", color: "#059669", chapters: scienceChapters6 },
      { slug: "urdu", name: "Urdu", emoji: "✍️", color: "#DC2626", chapters: urduChapters6 },
    ],
  },
  {
    classNumber: 7,
    emoji: "📗",
    color: "#16A34A",
    subjects: [
      { slug: "mathematics", name: "Mathematics", emoji: "📐", color: "#FF6B35", chapters: mathChapters7 },
      { slug: "english", name: "English", emoji: "📖", color: "#2563EB", chapters: englishChapters7 },
      { slug: "science", name: "Science", emoji: "🔬", color: "#059669", chapters: scienceChapters7 },
      { slug: "urdu", name: "Urdu", emoji: "✍️", color: "#DC2626", chapters: urduChapters7 },
    ],
  },
  {
    classNumber: 8,
    emoji: "📙",
    color: "#EA580C",
    subjects: [
      { slug: "mathematics", name: "Mathematics", emoji: "📐", color: "#FF6B35", chapters: mathChapters8 },
      { slug: "english", name: "English", emoji: "📖", color: "#2563EB", chapters: englishChapters8 },
      { slug: "science", name: "Science", emoji: "🔬", color: "#059669", chapters: scienceChapters8 },
      { slug: "urdu", name: "Urdu", emoji: "✍️", color: "#DC2626", chapters: urduChapters8 },
    ],
  },
  {
    classNumber: 9,
    emoji: "📘",
    color: "#7C3AED",
    subjects: [
      { slug: "mathematics", name: "Mathematics", emoji: "📐", color: "#FF6B35", chapters: mathChapters9 },
      { slug: "english", name: "English", emoji: "📖", color: "#2563EB", chapters: englishChapters9 },
      { slug: "physics", name: "Physics", emoji: "⚡", color: "#7C3AED", chapters: physicsChapters9 },
      { slug: "chemistry", name: "Chemistry", emoji: "🧪", color: "#059669", chapters: chemistryChapters9 },
      { slug: "biology", name: "Biology", emoji: "🌿", color: "#0D9488", chapters: biologyChapters9 },
      { slug: "urdu", name: "Urdu", emoji: "✍️", color: "#DC2626", chapters: urduChapters9 },
      { slug: "pakistan-studies", name: "Pakistan Studies", emoji: "🗺️", color: "#D97706", chapters: pakStudiesChapters9 },
      { slug: "islamiyat", name: "Islamiyat", emoji: "☪️", color: "#065F46", chapters: islamiyatChapters9 },
    ],
  },
  {
    classNumber: 10,
    emoji: "🏆",
    color: "#DC2626",
    subjects: [
      { slug: "mathematics", name: "Mathematics", emoji: "📐", color: "#FF6B35", chapters: mathChapters10 },
      { slug: "english", name: "English", emoji: "📖", color: "#2563EB", chapters: englishChapters10 },
      { slug: "physics", name: "Physics", emoji: "⚡", color: "#7C3AED", chapters: physicsChapters10 },
      { slug: "chemistry", name: "Chemistry", emoji: "🧪", color: "#059669", chapters: chemistryChapters10 },
      { slug: "biology", name: "Biology", emoji: "🌿", color: "#0D9488", chapters: biologyChapters10 },
      { slug: "urdu", name: "Urdu", emoji: "✍️", color: "#DC2626", chapters: urduChapters10 },
      { slug: "pakistan-studies", name: "Pakistan Studies", emoji: "🗺️", color: "#D97706", chapters: pakStudiesChapters10 },
      { slug: "islamiyat", name: "Islamiyat", emoji: "☪️", color: "#065F46", chapters: islamiyatChapters10 },
    ],
  },
];

export function getClassData(classNumber: number): ClassData | undefined {
  return classesData.find((c) => c.classNumber === classNumber);
}

export function getSubjectData(classNumber: number, subjectSlug: string): Subject | undefined {
  const cls = getClassData(classNumber);
  return cls?.subjects.find((s) => s.slug === subjectSlug);
}
