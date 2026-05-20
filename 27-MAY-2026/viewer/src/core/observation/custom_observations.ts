import type { ObservationBase, ObservationConfig } from './ObservationBase';
import type { PolicyRunner } from '../policy/PolicyRunner';

type ObservationConstructor = new (runner: PolicyRunner, config: ObservationConfig) => ObservationBase;

export const CustomObservations: Record<string, ObservationConstructor> = {};
