export type MissionType =
  | 'concept'
  | 'multiple-choice'
  | 'multi-select'
  | 'true-false-fix'
  | 'predict-output'
  | 'run-compare'
  | 'value-trace'
  | 'sequence-builder'
  | 'category-sort'
  | 'code-blocks'
  | 'fill-gap'
  | 'bug-hunter'
  | 'code-repair'
  | 'match-pairs'
  | 'input-simulator'
  | 'boundary-test'
  | 'mini-project'
  | 'reflection'
  | 'guided-practice'
  | 'mixed-challenge';

export interface Hint {
  text: string;
}

export interface FeedbackItem {
  correct: boolean;
  what: string;
  why: string;
  nextStep: string;
}

export interface Choice {
  id: string;
  text: string;
  explanation: string;
  correct?: boolean;
}

export interface CategoryItem {
  id: string;
  text: string;
  category: string;
}

export interface CodeBlock {
  id: string;
  text: string;
  order?: number;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface TestCase {
  id: string;
  inputs?: string[];
  expectedOutput: string;
  description?: string;
}

export interface Mission {
  id: string;
  order: number;
  title: string;
  type: MissionType;
  goal: string;
  explanation?: string;
  example?: {
    code?: string;
    output?: string;
    note?: string;
  };
  // Activity-specific data
  question?: string;
  choices?: Choice[];
  correctChoiceIds?: string[];
  categories?: string[];
  categoryItems?: CategoryItem[];
  sequenceItems?: string[];
  correctSequence?: string[];
  codeBlocks?: CodeBlock[];
  correctBlockOrder?: string[];
  pairs?: MatchPair[];
  fillTemplate?: string;
  correctFills?: Record<string, string>;
  acceptableFills?: Record<string, string[]>;
  buggyCode?: string;
  repairedCode?: string;
  expectedOutput?: string;
  predictCode?: string;
  traceVariables?: { name: string; steps: string[]; final: string }[];
  boundaryCases?: { label: string; code: string; expected: string }[];
  reflectionPrompt?: string;
  inputSimulations?: { code: string; inputs: string[]; expected: string }[];
  codeInput?: string;
  // Hints & feedback
  hints: Hint[];
  feedback: Record<string, FeedbackItem>;
  // PRIMM tags
  primmTag?: 'Predict' | 'Run' | 'Investigate' | 'Modify' | 'Make';
}

export interface BossRound {
  id: string;
  title: string;
  type: MissionType;
  question: string;
  explanation?: string;
  choices?: Choice[];
  correctChoiceIds?: string[];
  codeBlocks?: CodeBlock[];
  correctBlockOrder?: string[];
  buggyCode?: string;
  repairedCode?: string;
  expectedOutput?: string;
  predictCode?: string;
  fillTemplate?: string;
  correctFills?: Record<string, string>;
  acceptableFills?: Record<string, string[]>;
  hints: Hint[];
  feedback: Record<string, FeedbackItem>;
}

export interface Project {
  title: string;
  description: string;
  requirement: string;
  inputProcessOutput: {
    input: string;
    process: string;
    output: string;
  };
  starterCode: string;
  testCases: TestCase[];
  successCriteria: string[];
  hints: Hint[];
}

export interface Session {
  id: string;
  number: number;
  titleAr: string;
  titleEn: string;
  badgeName: string;
  badgeColor: string;
  badgeIcon: string;
  description: string;
  learningGoals: string[];
  missions: Mission[];
  project: Project;
  bossRounds: BossRound[];
}

export interface SessionProgress {
  sessionId: string;
  nickname: string;
  completedMissions: string[];
  projectCompleted: boolean;
  bossCompleted: boolean;
  reportViewed: boolean;
  xp: number;
  gems: number;
  hearts: number;
  attempts: number;
  hintsUsed: number;
  mistakes: string[];
  lastMissionId?: string;
  projectCode?: string;
  startedAt: string;
  completedAt?: string;
}

export interface AppSettings {
  darkMode: boolean;
  language: 'ar';
}

export interface AppState {
  settings: AppSettings;
  progress: Record<string, SessionProgress>;
  lastSessionId?: string;
}

export type ActivityState = {
  selectedChoices: string[];
  sortedItems: string[];
  placedBlocks: string[];
  matches: Record<string, string>;
  fills: Record<string, string>;
  codeInput: string;
  prediction: string;
  reflection: string;
  categoryAssignments: Record<string, string>;
  traceAnswers: Record<string, string>;
  runComparison: { predicted: string; actual: string } | null;
};
