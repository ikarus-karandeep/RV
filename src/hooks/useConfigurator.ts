import { useState } from 'react';
import type { ConfiguratorState } from '../types';
import { STEPS } from '../utils/constants';

export const useConfigurator = () => {
  const [state, setState] = useState<ConfiguratorState>({
    currentStepId: STEPS[0].id,
    selectedTrailerTypeId: null,
    selectedSizeId: null,
  });

  const setStep = (stepId: string) => {
    setState((prev) => ({ ...prev, currentStepId: stepId }));
  };

  const selectTrailerType = (id: string) => {
    setState((prev) => ({ ...prev, selectedTrailerTypeId: id }));
  };

  const selectSize = (id: string) => {
    setState((prev) => ({ ...prev, selectedSizeId: id }));
  };

  const nextStep = () => {
    const currentIndex = STEPS.findIndex((s) => s.id === state.currentStepId);
    if (currentIndex < STEPS.length - 1) {
      setStep(STEPS[currentIndex + 1].id);
    }
  };

  return {
    state,
    setStep,
    selectTrailerType,
    selectSize,
    nextStep,
  };
};
