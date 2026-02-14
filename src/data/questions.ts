import { Question, Subject } from '@/types';

export const questions: Question[] = [
  // PHYSICS
  {
    id: 'phy-1',
    subject: 'physics',
    topic: 'Electromagnetism',
    classLevel: 11,
    examType: ['JEE', 'NEET', 'KCET'],
    question: "What is Fleming's Left Hand Rule used for?",
    options: [
      'Finding the direction of force on a current-carrying conductor in a magnetic field',
      'Finding the direction of induced current',
      'Finding the direction of magnetic field lines',
      'Finding the resistance of a conductor',
    ],
    correctAnswer: 0,
    hint: 'Think about a conductor carrying current placed in a magnetic field. Which fingers represent force, field, and current?',
    solution:
      "Fleming's Left Hand Rule states: stretch the thumb, forefinger, and middle finger of your left hand perpendicular to each other. The forefinger points in the direction of the magnetic field (B), the middle finger in the direction of current (I), and the thumb gives the direction of force (F) on the conductor.",
    reference: {
      theory: "Fleming's Left Hand Rule is used to determine the direction of force experienced by a current-carrying conductor placed in a magnetic field. It relates the directions of magnetic field, current, and force using three mutually perpendicular fingers.",
      inventor: 'John Ambrose Fleming',
      relatedTopics: ['Lorentz Force', 'Electric Motors', 'Magnetic Fields'],
      applicationExample: 'Electric motors use this principle — the force on the current-carrying coil in a magnetic field causes it to rotate.',
      youtubeUrl: 'https://www.youtube.com/embed/RrZhwJaiiME',
    },
  },
  {
    id: 'phy-2',
    subject: 'physics',
    topic: 'Mechanics',
    classLevel: 11,
    examType: ['JEE', 'KCET'],
    question: "Newton's second law of motion relates:",
    options: [
      'Force and acceleration',
      'Action and reaction',
      'Inertia and mass',
      'Energy and work',
    ],
    correctAnswer: 0,
    hint: 'F = m × a — which quantities are directly related?',
    solution: "Newton's Second Law states that the net force acting on an object equals the product of its mass and acceleration (F = ma). Force is directly proportional to acceleration when mass is constant.",
    reference: {
      theory: "Newton's Second Law quantifies the effect of force on motion. It establishes that acceleration is directly proportional to force and inversely proportional to mass.",
      inventor: 'Sir Isaac Newton',
      relatedTopics: ['Momentum', 'Impulse', 'Free Body Diagrams'],
      applicationExample: 'Rocket propulsion — as fuel burns and mass decreases, the same thrust produces greater acceleration.',
      youtubeUrl: 'https://www.youtube.com/embed/kKKM8Y-u7ds',
    },
  },
  {
    id: 'phy-3',
    subject: 'physics',
    topic: 'Optics',
    classLevel: 10,
    examType: ['KCET', 'other'],
    question: 'The phenomenon of splitting white light into its component colors is called:',
    options: ['Dispersion', 'Diffraction', 'Reflection', 'Polarization'],
    correctAnswer: 0,
    hint: 'Think about what happens when light passes through a glass prism.',
    solution: 'Dispersion is the splitting of white light into its constituent colors (VIBGYOR) when it passes through a prism. Different wavelengths refract at slightly different angles.',
    reference: {
      theory: 'White light is composed of seven colors. When it enters a prism, each color refracts differently due to its unique wavelength, causing the light to spread into a spectrum.',
      inventor: 'Sir Isaac Newton',
      relatedTopics: ['Refraction', 'Spectrum', 'Rainbow Formation'],
      applicationExample: 'Rainbows are a natural example of dispersion — sunlight disperses through water droplets.',
    },
  },
  // CHEMISTRY
  {
    id: 'chem-1',
    subject: 'chemistry',
    topic: 'Atomic Structure',
    classLevel: 11,
    examType: ['JEE', 'NEET'],
    question: 'Which quantum number determines the shape of an orbital?',
    options: ['Azimuthal (l)', 'Principal (n)', 'Magnetic (ml)', 'Spin (ms)'],
    correctAnswer: 0,
    hint: 'There are s, p, d, f shapes. Which quantum number differentiates them?',
    solution: 'The azimuthal quantum number (l) determines the shape of an orbital. l=0 is spherical (s), l=1 is dumbbell (p), l=2 is double dumbbell (d), l=3 is complex (f).',
    reference: {
      theory: 'Quantum numbers describe the properties of atomic orbitals. The azimuthal quantum number (l) ranges from 0 to n-1 and defines orbital shape.',
      relatedTopics: ['Quantum Mechanics', 'Electron Configuration', 'Orbitals'],
      applicationExample: 'Understanding orbital shapes helps predict molecular geometry and chemical bonding.',
      youtubeUrl: 'https://www.youtube.com/embed/Aoi4j8es4gQ',
    },
  },
  {
    id: 'chem-2',
    subject: 'chemistry',
    topic: 'Chemical Bonding',
    classLevel: 11,
    examType: ['JEE', 'NEET', 'KCET'],
    question: 'Which type of bond is formed by sharing of electrons?',
    options: ['Covalent bond', 'Ionic bond', 'Metallic bond', 'Hydrogen bond'],
    correctAnswer: 0,
    hint: 'Two atoms can share their electrons to achieve stability.',
    solution: 'A covalent bond forms when two atoms share one or more pairs of electrons. This typically occurs between non-metals with similar electronegativities.',
    reference: {
      theory: 'Covalent bonding involves the mutual sharing of electron pairs between atoms. Single, double, and triple bonds involve sharing of 1, 2, and 3 electron pairs respectively.',
      relatedTopics: ['Electronegativity', 'Molecular Geometry', 'VSEPR Theory'],
      applicationExample: 'Water (H₂O) has covalent bonds between oxygen and hydrogen atoms.',
    },
  },
  {
    id: 'chem-3',
    subject: 'chemistry',
    topic: 'Periodic Table',
    classLevel: 10,
    examType: ['KCET', 'other'],
    question: 'Elements in the same group have the same number of:',
    options: ['Valence electrons', 'Neutrons', 'Total electrons', 'Protons'],
    correctAnswer: 0,
    hint: 'Groups are vertical columns. What property do they share?',
    solution: 'Elements in the same group (vertical column) have the same number of valence electrons, which gives them similar chemical properties.',
    reference: {
      theory: 'The periodic table arranges elements by atomic number. Elements in the same group share similar electron configurations in their outermost shell.',
      inventor: 'Dmitri Mendeleev',
      relatedTopics: ['Electron Configuration', 'Chemical Properties', 'Periodicity'],
      applicationExample: 'Alkali metals (Group 1) all have 1 valence electron and react vigorously with water.',
    },
  },
  // MATH
  {
    id: 'math-1',
    subject: 'math',
    topic: 'Calculus',
    classLevel: 12,
    examType: ['JEE', 'KCET'],
    question: 'The derivative of sin(x) with respect to x is:',
    options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
    correctAnswer: 0,
    hint: 'Use the limit definition of derivative or recall the standard differentiation formulas.',
    solution: 'Using the first principle: d/dx[sin(x)] = lim(h→0) [sin(x+h) - sin(x)]/h = cos(x). This is one of the fundamental differentiation results.',
    reference: {
      theory: 'Differentiation of trigonometric functions is a key topic in calculus. The derivative measures the instantaneous rate of change of a function.',
      relatedTopics: ['Integration', 'Chain Rule', 'Trigonometric Identities'],
      applicationExample: 'In physics, if displacement is s = sin(ωt), then velocity v = ω·cos(ωt).',
      youtubeUrl: 'https://www.youtube.com/embed/HfACrKJ_Y2w',
    },
  },
  {
    id: 'math-2',
    subject: 'math',
    topic: 'Algebra',
    classLevel: 11,
    examType: ['JEE', 'KCET'],
    question: 'If log₂(x) = 5, then x equals:',
    options: ['32', '25', '10', '64'],
    correctAnswer: 0,
    hint: 'Remember: if logₐ(x) = n, then x = aⁿ',
    solution: 'log₂(x) = 5 means 2⁵ = x. Therefore x = 32.',
    reference: {
      theory: 'Logarithms are the inverse of exponentiation. logₐ(x) = n means aⁿ = x.',
      inventor: 'John Napier',
      relatedTopics: ['Exponential Functions', 'Natural Logarithms', 'Change of Base'],
      applicationExample: 'The Richter scale for earthquakes uses logarithms — each whole number increase represents a 10x increase in amplitude.',
    },
  },
  {
    id: 'math-3',
    subject: 'math',
    topic: 'Coordinate Geometry',
    classLevel: 10,
    examType: ['KCET', 'other'],
    question: 'The distance between points (3, 4) and (0, 0) is:',
    options: ['5', '7', '6', '4'],
    correctAnswer: 0,
    hint: 'Use the distance formula: √((x₂-x₁)² + (y₂-y₁)²)',
    solution: 'Distance = √((3-0)² + (4-0)²) = √(9 + 16) = √25 = 5. This is also a 3-4-5 Pythagorean triplet.',
    reference: {
      theory: 'The distance formula is derived from the Pythagorean theorem and gives the straight-line distance between two points in a coordinate plane.',
      relatedTopics: ['Pythagorean Theorem', 'Section Formula', 'Midpoint Formula'],
      applicationExample: 'GPS systems use distance formulas (adapted for 3D) to calculate distances between locations.',
    },
  },
  // BIOLOGY
  {
    id: 'bio-1',
    subject: 'biology',
    topic: 'Cell Biology',
    classLevel: 11,
    examType: ['NEET'],
    question: 'The powerhouse of the cell is:',
    options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Golgi apparatus'],
    correctAnswer: 0,
    hint: 'Which organelle is responsible for producing ATP (energy currency)?',
    solution: 'Mitochondria are called the powerhouse of the cell because they produce ATP (adenosine triphosphate) through cellular respiration, which is the energy currency of the cell.',
    reference: {
      theory: 'Mitochondria are double-membrane organelles that perform oxidative phosphorylation and the Krebs cycle to generate ATP from glucose.',
      relatedTopics: ['Cellular Respiration', 'ATP', 'Krebs Cycle'],
      applicationExample: 'Muscle cells have more mitochondria because they require more energy for contraction.',
      youtubeUrl: 'https://www.youtube.com/embed/39HTpUG1MwQ',
    },
  },
  {
    id: 'bio-2',
    subject: 'biology',
    topic: 'Genetics',
    classLevel: 12,
    examType: ['NEET', 'KCET'],
    question: 'DNA replication is:',
    options: ['Semi-conservative', 'Conservative', 'Dispersive', 'Random'],
    correctAnswer: 0,
    hint: 'Meselson and Stahl proved the mechanism using N¹⁵ isotope labeling.',
    solution: 'DNA replication is semi-conservative — each new DNA molecule consists of one original (parent) strand and one newly synthesized strand. This was proven by the Meselson-Stahl experiment.',
    reference: {
      theory: 'In semi-conservative replication, the double helix unwinds and each strand serves as a template for a new complementary strand.',
      inventor: 'Meselson & Stahl (experimental proof)',
      relatedTopics: ['DNA Polymerase', 'Okazaki Fragments', 'Replication Fork'],
      applicationExample: 'PCR (Polymerase Chain Reaction) mimics semi-conservative replication to amplify DNA in labs.',
    },
  },
  {
    id: 'bio-3',
    subject: 'biology',
    topic: 'Plant Biology',
    classLevel: 10,
    examType: ['NEET', 'other'],
    question: 'Photosynthesis primarily takes place in:',
    options: ['Chloroplast', 'Mitochondria', 'Nucleus', 'Cell membrane'],
    correctAnswer: 0,
    hint: 'Which organelle contains chlorophyll, the green pigment?',
    solution: 'Photosynthesis occurs in chloroplasts, which contain chlorophyll pigment that captures light energy. The process converts CO₂ and H₂O into glucose and O₂.',
    reference: {
      theory: 'Chloroplasts have thylakoid membranes where light reactions occur and stroma where the Calvin cycle (dark reactions) takes place.',
      relatedTopics: ['Calvin Cycle', 'Light Reactions', 'Chlorophyll'],
      applicationExample: 'Solar panels are inspired by the photosynthetic process of capturing light energy.',
    },
  },
  // CLASS 9 - Physics
  {
    id: 'p-9-1', subject: 'physics', topic: 'Motion', classLevel: 9,
    examType: ['other'], question: 'What is the SI unit of force?',
    options: ['Newton', 'Joule', 'Watt', 'Pascal'], correctAnswer: 0,
    hint: 'Think about F = ma and the units of mass and acceleration.',
    solution: 'Force = mass × acceleration. SI unit = kg·m/s² = Newton (N).',
    reference: { theory: 'Force is a push or pull that changes the state of motion.', relatedTopics: ['Newton\'s Laws', 'Acceleration', 'Mass'], applicationExample: 'Kicking a football applies force that changes its motion.' },
  },
  // CLASS 9 - Chemistry
  {
    id: 'c-9-1', subject: 'chemistry', topic: 'Matter', classLevel: 9,
    examType: ['other'], question: 'Which of the following is a chemical change?',
    options: ['Rusting of iron', 'Melting of ice', 'Dissolving sugar', 'Breaking glass'], correctAnswer: 0,
    hint: 'A chemical change produces a new substance that cannot be easily reversed.',
    solution: 'Rusting involves iron reacting with oxygen and moisture to form iron oxide — a new substance.',
    reference: { theory: 'Chemical changes involve formation of new substances with different properties.', relatedTopics: ['Physical vs Chemical Changes', 'Oxidation'], applicationExample: 'Cooking an egg is a chemical change — it cannot be reversed.' },
  },
  // CLASS 9 - Math
  {
    id: 'm-9-1', subject: 'math', topic: 'Number Systems', classLevel: 9,
    examType: ['other'], question: 'Which of the following is an irrational number?',
    options: ['√2', '3/4', '0.5', '7'], correctAnswer: 0,
    hint: 'An irrational number cannot be expressed as a simple fraction.',
    solution: '√2 = 1.41421356... — it is non-terminating and non-repeating, hence irrational.',
    reference: { theory: 'Irrational numbers cannot be expressed as p/q where p, q are integers.', relatedTopics: ['Real Numbers', 'Rational Numbers'], applicationExample: 'The diagonal of a unit square is √2, an irrational number.' },
  },
  // CLASS 9 - Biology
  {
    id: 'b-9-1', subject: 'biology', topic: 'Cell Biology', classLevel: 9,
    examType: ['NEET', 'other'], question: 'The basic structural and functional unit of life is:',
    options: ['Cell', 'Tissue', 'Organ', 'Atom'], correctAnswer: 0,
    hint: 'Robert Hooke first observed it in cork slices.',
    solution: 'The cell is the basic unit of life. All living organisms are composed of one or more cells.',
    reference: { theory: 'Cell theory states all living things are made of cells.', relatedTopics: ['Cell Theory', 'Prokaryotic vs Eukaryotic'], applicationExample: 'Red blood cells carry oxygen throughout the body.' },
  },
];

export const getQuestionsBySubject = (subject: Subject): Question[] =>
  questions.filter((q) => q.subject === subject);

export const getQuestionsByClass = (classLevel: number): Question[] =>
  questions.filter((q) => q.classLevel <= classLevel);

export const getQuestionsByExam = (examType: string): Question[] =>
  questions.filter((q) => q.examType.includes(examType as any));

export const getRandomQuestions = (
  subjects: Subject[],
  classLevel: number,
  count: number = 5
): Question[] => {
  const eligible = questions.filter(
    (q) => subjects.includes(q.subject) && q.classLevel <= classLevel
  );
  const shuffled = [...eligible].sort(() => Math.random() - 0.5);
  
  // Try to get balanced distribution across subjects
  const result: Question[] = [];
  const perSubject = Math.ceil(count / subjects.length);
  
  for (const subject of subjects) {
    const subjectQs = shuffled.filter((q) => q.subject === subject);
    result.push(...subjectQs.slice(0, perSubject));
  }
  
  return result.slice(0, count);
};
