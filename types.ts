export interface QCMResponse {
  questions: string[];
}

export interface FunctionInfo {
  nom: string;
  description: string;
  parameters: string[];
  example: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizResponse {
    questions: QuizQuestion[];
}

export interface ParsedFormulaNode {
  name: string;
  args: (ParsedFormulaNode | string)[];
}

export interface EvaluationResult {
  value: string | number | boolean | null;
  error?: string;
}

export interface VisualizerNode {
  name: string;
  args: (VisualizerNode | string)[];
  result: EvaluationResult;
}