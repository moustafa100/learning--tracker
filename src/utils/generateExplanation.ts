import { Checkpoint } from '../types';

export interface ExplanationContent {
  simplifiedExplanation: string[];
  keyConcepts: Array<{ term: string; definition: string }>;
  analogiesAndExamples: Array<{
    type: 'analogy' | 'example';
    content: string;
    explanation?: string;
  }>;
}

export const generateExplanation = (checkpoint: Checkpoint, originalNotes: string): ExplanationContent => {
  // This would integrate with an AI service to generate personalized content
  // For now, we'll return template-based content
  
  return {
    simplifiedExplanation: generateSimplifiedExplanation(checkpoint, originalNotes),
    keyConcepts: generateKeyConcepts(checkpoint, originalNotes),
    analogiesAndExamples: generateAnalogiesAndExamples(checkpoint, originalNotes)
  };
};

function generateSimplifiedExplanation(checkpoint: Checkpoint, notes: string): string[] {
  // Extract key terms from the checkpoint title
  const keyTerm = checkpoint.title.replace('Understanding ', '');

  // Use the notes parameter in the explanation
  return [
    `Let's break down ${keyTerm} in the simplest way possible.`,
    `At its core, ${keyTerm} is about ${notes.length > 0 ? notes.slice(0, 60) + (notes.length > 60 ? "..." : "") : "[fundamental principle extracted from notes]"}.`,
    `Think of it as a system where [component 1] interacts with [component 2] to produce [result].`,
    `The key insight is that ${notes.length > 0 ? notes.split(' ').slice(0, 10).join(' ') + "..." : "[important insight from the notes]"}.`,
    `When you understand this, you'll see how it connects to ${notes.length > 0 ? notes.split(' ').slice(-5).join(' ') : "[related concept from notes]"}.`
  ];
}

function generateKeyConcepts(checkpoint: Checkpoint, notes: string): Array<{ term: string; definition: string }> {
  // Extract concepts from the original notes
  const concepts = extractConceptsFromNotes(notes);
  
  return concepts.slice(0, 4).map(concept => ({
    term: concept.term,
    definition: `In the context of ${checkpoint.title}, ${concept.term} refers to ${generateDefinition(concept)}`
  }));
}

function generateAnalogiesAndExamples(checkpoint: Checkpoint, notes: string): Array<{
  type: 'analogy' | 'example';
  content: string;
  explanation?: string;
}> {
  const keyTerm = checkpoint.title.replace('Understanding ', '');

  // Use the notes parameter in the analogy/example content
  const notesSnippet = notes.length > 0 ? notes.slice(0, 40) + (notes.length > 40 ? "..." : "") : "[details from notes]";

  return [
    {
      type: 'analogy',
      content: `${keyTerm} is like a [everyday object] in that [comparison of how they work]. For example, consider: ${notesSnippet}`,
      explanation: "This analogy helps because most people understand how [everyday object] functions."
    },
    {
      type: 'example',
      content: `A real-world example of ${keyTerm} is [concrete example from everyday life]. Here's a detail from your notes: ${notesSnippet}`,
      explanation: "This shows how the abstract concept applies in a familiar context."
    },
    {
      type: 'analogy',
      content: `If you think of [related concept] as a [metaphor], then ${keyTerm} would be the [complementary metaphor]. Your notes mention: ${notesSnippet}`,
      explanation: "This relationship helps build on knowledge you already have."
    }
  ];
}

// Helper functions would be implemented to extract and process information from notes
function extractConceptsFromNotes(notes: string): Array<{ term: string; context: string }> {
  // Implementation would analyze the notes to extract key concepts
  if (notes.length > 0) {
    return [{
      term: notes.split(' ')[0] || 'Concept',
      context: 'Extracted from notes'
    }];
  }
  return [];
}

function generateDefinition(concept: { term: string; context: string }): string {
  // Implementation would generate a clear definition based on context
  return `The term "${concept.term}" means [definition based on context: ${concept.context}]`;
}