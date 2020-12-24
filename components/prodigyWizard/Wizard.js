import React from "react";
import useWizard from "./useWizard";

export const WizardContext = React.createContext();

const Wizard = (props) => {
  const wizard = useWizard({ steps: props.steps, basename: props.basename });
  return (
    <WizardContext.Provider {...props} value={wizard}>
      <wizard.Component />
    </WizardContext.Provider>
  );
};

export default Wizard;
