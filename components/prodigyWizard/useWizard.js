import React from "react";
import urlJoin from "url-join";
import { useRouter } from "next/router";

const useWizard = ({ steps, basename}) => {
  const router = useRouter();
  const stepUrl = router.query.step;

  let stepNumber = steps.findIndex((step) => stepUrl === step.id);
  if (stepNumber === -1) {
    stepNumber = 0;
  }

  const currentStep = steps[stepNumber];
  const nextStep = stepNumber + 1;
  const nextHref = steps[nextStep] ? urlJoin(basename, steps[nextStep].id) : null;

  const previousStep = stepNumber - 1;
  const previousHref = steps[previousStep] ? urlJoin(basename, steps[previousStep].id) : null;

    React.useEffect(() => {
      if (stepUrl !== currentStep.id) {
        router.replace(urlJoin(basename, currentStep.id));
      }
    }, [currentStep]);

  return {
    Component: currentStep.Component,
    nextHref,
    previousHref,
  };
};

export default useWizard;
