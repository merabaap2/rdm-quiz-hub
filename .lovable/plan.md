

# Expand Question Database - All Topics, All Subjects, All Classes

## Current State
The database has only **16 questions total** -- about 3-4 per subject with minimal topic coverage. Students quickly exhaust the question pool.

## What Will Be Added

A comprehensive expansion to **~120+ questions** covering all major syllabus topics for Classes 9-12, with a mix of easy, medium, and exam-level (mock) questions.

### Physics Topics & Question Count
| Class | Topics | Questions |
|-------|--------|-----------|
| 9 | Motion, Force & Laws of Motion, Gravitation, Work & Energy, Sound | 8 |
| 10 | Light (Reflection & Refraction), Electricity, Magnetic Effects, Sources of Energy | 8 |
| 11 | Units & Measurements, Kinematics, Laws of Motion, Work-Energy-Power, Gravitation, Thermodynamics, Waves | 10 |
| 12 | Electrostatics, Current Electricity, Magnetism, Electromagnetic Induction, Optics, Modern Physics | 10 |

### Chemistry Topics & Question Count
| Class | Topics | Questions |
|-------|--------|-----------|
| 9 | Matter, Atoms & Molecules, Structure of Atom | 6 |
| 10 | Chemical Reactions, Acids-Bases-Salts, Metals & Non-metals, Carbon Compounds, Periodic Table | 8 |
| 11 | Atomic Structure, Chemical Bonding, States of Matter, Thermodynamics, Equilibrium, Organic Chemistry Basics | 10 |
| 12 | Solutions, Electrochemistry, Chemical Kinetics, Surface Chemistry, p-Block Elements, Coordination Compounds | 10 |

### Math Topics & Question Count
| Class | Topics | Questions |
|-------|--------|-----------|
| 9 | Number Systems, Polynomials, Coordinate Geometry, Linear Equations, Triangles, Statistics | 8 |
| 10 | Real Numbers, Polynomials, Quadratic Equations, Arithmetic Progressions, Trigonometry, Coordinate Geometry | 8 |
| 11 | Sets, Relations & Functions, Trigonometric Functions, Complex Numbers, Sequences & Series, Straight Lines, Probability | 10 |
| 12 | Relations & Functions, Inverse Trig, Matrices, Determinants, Continuity & Differentiability, Integrals, Vectors, Probability | 10 |

### Biology Topics & Question Count (for PCMB students)
| Class | Topics | Questions |
|-------|--------|-----------|
| 9 | Cell Biology, Tissues, Diversity in Living Organisms, Disease & Health | 6 |
| 10 | Life Processes, Control & Coordination, Reproduction, Heredity & Evolution, Environment | 8 |
| 11 | Cell Biology, Plant Physiology, Human Physiology, Biomolecules, Cell Division | 8 |
| 12 | Genetics, Molecular Biology, Evolution, Human Health, Biotechnology, Ecology | 10 |

## Question Difficulty Mix
Each topic will include a spread of difficulty:
- **Easy** -- straightforward recall/definition questions (good for Class 9-10 and warm-up)
- **Medium** -- application-based questions requiring understanding
- **Mock/Exam-level** -- JEE/NEET/KCET style questions with tricky options

The difficulty is indicated by exam tags: `['other']` for easy, `['KCET']` for medium, `['JEE', 'NEET']` for harder.

## Technical Details

### File Changed
- `src/data/questions.ts` -- Replace the current 16 questions with ~120+ questions organized by subject and class level

### Question Format (unchanged)
Each question follows the existing `Question` interface with `id`, `subject`, `topic`, `classLevel`, `examType`, `question`, `options`, `correctAnswer`, `hint`, `solution`, and `reference` (with `theory`, `relatedTopics`, `applicationExample`, and optional `inventor`/`youtubeUrl`).

### ID Convention
Questions will use a consistent naming: `{subject-prefix}-{class}-{number}`
- Physics: `phy-9-1`, `phy-10-1`, `phy-11-1`, `phy-12-1`
- Chemistry: `chem-9-1`, `chem-10-1`, etc.
- Math: `math-9-1`, `math-10-1`, etc.
- Biology: `bio-9-1`, `bio-10-1`, etc.

### No other files need changes
The existing filter functions (`getQuestionsBySubject`, `getRandomQuestions`, etc.) already work with any number of questions -- they just need more data to pull from.

