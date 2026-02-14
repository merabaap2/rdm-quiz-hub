

# Explore Page: Hierarchical Topic & Subtopic Browser

## Overview
Transform the Explore page from a simple filter-and-go interface into a **drill-down topic browser**. When a student clicks a subject (e.g., Physics), they see topics organized by class, with expandable subtopics -- matching the comprehensive syllabus taxonomy provided.

## Current Problem
Right now, clicking Physics just highlights the card. Students then click "Find Questions" and get a random mix. There's no way to browse by topic or subtopic.

## New User Flow

```text
Step 1: Select Subject
  [Physics]  [Chemistry]  [Math]  [Biology]

Step 2: See Topics by Class (accordion/expandable sections)
  Class 9
    > Motion (8 questions)
        - Distance & Displacement
        - Uniform & Non-Uniform Motion
        - Equations of Motion
        - Uniform Circular Motion
    > Force and Laws of Motion (5 questions)
        - Newton's Three Laws
        - Inertia and Mass
        - Conservation of Momentum
    > Gravitation ...
    > Work and Energy ...
    > Sound ...

  Class 10
    > Light: Reflection and Refraction ...
    > Electricity ...
    ...

  Class 11
    > Units and Measurements ...
    > Kinematics ...
    ...

  Class 12
    > Electrostatics ...
    > Current Electricity ...
    ...

Step 3: Click a topic -> filtered questions for that topic start
```

## What Gets Built

### 1. Topic Taxonomy Data File (`src/data/topicTaxonomy.ts`)
A new data file containing the full hierarchical syllabus for all 4 subjects. Each entry has:
- Subject, Class, Topic name, Subtopics array, and exam relevance tags

**Physics** (Classes 9-12): Motion, Force & Laws, Gravitation, Work & Energy, Sound, Light, Electricity, Magnetic Effects, Sources of Energy, Units & Measurements, Kinematics, Laws of Motion, Work-Energy-Power, Rotational Motion, Gravitation (advanced), Properties of Bulk Matter, Thermodynamics, Kinetic Theory, Oscillations & Waves, Electrostatics, Current Electricity, Magnetism, EMI & AC, EM Waves, Optics, Dual Nature, Atoms & Nuclei, Semiconductors

**Chemistry** (Classes 9-12): Matter, Atoms & Molecules, Structure of Atom, Chemical Reactions, Acids-Bases-Salts, Metals & Non-metals, Carbon Compounds, Periodic Table, Atomic Structure, Chemical Bonding, States of Matter, Thermodynamics, Equilibrium, Organic Chemistry, Solutions, Electrochemistry, Chemical Kinetics, Surface Chemistry, p-Block Elements, Coordination Compounds

**Math** (Classes 9-12): Number Systems, Polynomials, Coordinate Geometry, Linear Equations, Triangles, Statistics, Real Numbers, Quadratic Equations, Arithmetic Progressions, Trigonometry, Sets, Relations & Functions, Trigonometric Functions, Complex Numbers, Sequences & Series, Straight Lines, Probability, Inverse Trig, Matrices, Determinants, Continuity & Differentiability, Integrals, Vectors

**Biology** (Classes 9-12): Cell Biology, Tissues, Diversity in Living Organisms, Disease & Health, Life Processes, Control & Coordination, Reproduction, Heredity & Evolution, Structural Organization, Biomolecules, Plant Physiology, Human Physiology, Genetics & Molecular Biology, Evolution, Biotechnology, Ecology

### 2. Redesigned Explore Page (`src/pages/Explore.tsx`)
The page will have 3 views:

**View 1 -- Subject Selection** (current, polished)
- 4 subject cards with emoji, gradient, and question count
- Exam type filter chips (JEE, NEET, KCET, Other)

**View 2 -- Topic Browser** (NEW)
- Shown after selecting a subject
- Back button to return to subjects
- Topics grouped under Class headers (Class 9, 10, 11, 12)
- Each class section is collapsible (using Accordion component)
- Each topic shows: name, question count badge, subtopics as small chips
- Clicking a topic filters questions and starts the question flow
- Class sections filtered based on user's class level

**View 3 -- Question Flow** (existing, unchanged)
- Shows filtered questions one by one with QuestionCard

### 3. No Changes to Question Files
The existing questions already have `topic` fields that match the taxonomy. The taxonomy data serves as the browsing structure -- questions are filtered by matching `q.topic` and `q.subject`.

## Technical Details

### New File
- `src/data/topicTaxonomy.ts` -- Contains the `TopicNode` interface and full taxonomy array

### Modified File
- `src/pages/Explore.tsx` -- Add topic browser view between subject selection and question flow

### Data Structure
```text
interface SubTopic {
  name: string;
}

interface TopicNode {
  subject: Subject;
  classLevel: ClassLevel;
  topic: string;           // matches Question.topic field
  subtopics: SubTopic[];
  examRelevance: ExamType[];  // which exams focus on this topic
}
```

### Filtering Logic
- When user clicks a topic, filter: `questions.filter(q => q.subject === subject && q.topic === topic)`
- Question count badges are computed dynamically from the actual question database
- Topics with 0 questions still show (grayed out with "Coming soon" badge) so students see the full syllabus

### Components Used
- `Accordion` (already installed via radix) for collapsible class sections
- `motion` from framer-motion for animations
- Existing `QuestionCard` for the question flow

