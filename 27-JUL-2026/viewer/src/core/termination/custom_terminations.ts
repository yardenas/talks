import type { TerminationBase, TerminationConfig } from './TerminationBase';

type TerminationConstructor = new (config: TerminationConfig) => TerminationBase;

export const CustomTerminations: Record<string, TerminationConstructor> = {};
