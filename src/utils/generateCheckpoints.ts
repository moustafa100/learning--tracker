import { Checkpoint } from '../types';

export const generateCheckpoints = (notes: string): Checkpoint[] => {
  // Simulate AI processing by generating relevant checkpoints
  const sentences = notes.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const concepts = extractKeyConcepts(notes);
  
  const checkpoints: Checkpoint[] = [];
  let id = 1;
  
  // Generate checkpoints based on key concepts
  concepts.forEach((concept, index) => {
    if (index < 5) { // Limit to 5 checkpoints for better UX
      checkpoints.push({
        id: id++,
        title: `Understanding ${concept.term}`,
        description: generateDescription(concept, notes),
        completed: false
      });
    }
  });
  
  // If we have fewer than 3 checkpoints, add some generic ones
  if (checkpoints.length < 3) {
    const additionalCheckpoints = [
      {
        id: id++,
        title: 'Grasp the Main Concept',
        description: 'Can you explain the central idea in your own words without looking at your notes?',
        completed: false
      },
      {
        id: id++,
        title: 'Identify Key Relationships',
        description: 'How do the different parts of this topic connect to each other?',
        completed: false
      },
      {
        id: id++,
        title: 'Apply the Knowledge',
        description: 'Can you think of a real-world example or application of this concept?',
        completed: false
      }
    ];
    
    checkpoints.push(...additionalCheckpoints.slice(0, 3 - checkpoints.length));
  }
  
  return checkpoints;
};

interface KeyConcept {
  term: string;
  context: string;
}

const extractKeyConcepts = (text: string): KeyConcept[] => {
  const words = text.toLowerCase().split(/\W+/);
  const concepts: KeyConcept[] = [];
  
  // Look for potential key terms (longer words, technical terms, etc.)
  const significantWords = words.filter(word => 
    word.length > 4 && 
    !commonWords.includes(word) &&
    !word.match(/^\d+$/)
  );
  
  // Take the most significant words as concepts
  const uniqueWords = [...new Set(significantWords)];
  
  uniqueWords.slice(0, 5).forEach(word => {
    concepts.push({
      term: capitalizeFirst(word),
      context: text
    });
  });
  
  return concepts;
};

const generateDescription = (concept: KeyConcept, notes: string): string => {
  const descriptions = [
    `Can you explain what ${concept.term} means without referring to your notes?`,
    `How would you describe ${concept.term} to someone who has never heard of it?`,
    `What are the key characteristics or features of ${concept.term}?`,
    `Can you provide an example that illustrates ${concept.term}?`,
    `How does ${concept.term} relate to the other concepts in your notes?`,
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const commonWords = [
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 
  'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 
  'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 
  'did', 'does', 'let', 'put', 'say', 'she', 'too', 'use', 'that', 'with',
  'have', 'this', 'will', 'your', 'from', 'they', 'know', 'want', 'been',
  'good', 'much', 'some', 'time', 'very', 'when', 'come', 'here', 'just',
  'like', 'long', 'make', 'many', 'over', 'such', 'take', 'than', 'them',
  'well', 'were', 'what'
];