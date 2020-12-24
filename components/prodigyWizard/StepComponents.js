import React, { useEffect } from "react";
// import { Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
import {WizardNextLink} from "./WizardNextLink";
import {WizardPreviousLink} from "./WizardPreviousLink";

// const Step1A = () => {
//   return (
//     <main>
//       <h2>Step 1A</h2>
//       <Link to="/step-1/b">Go to 1B</Link>
//     </main>
//   );
// };

// const Step1B = () => {
//   return (
//     <main>
//       <h2>Step 1B</h2>
//       <Link to="/step-1/a">Go to 1A</Link>
//     </main>
//   );
// };

// const step1Paths = ["/step-1/a", "/step-1/b"];

// export const Step1 = () => {
//   const location = useLocation();
//   const history = useHistory();

//   useEffect(() => {
//     // go to step-1a by default
//     if (!step1Paths.find((path) => location.pathname.includes(path))) {
//       history.replace(step1Paths[0]);
//     }
//   }, [location, history]);

//   return (
//     <>
//       <Switch>
//         <Route path="/step-1/a" component={Step1A} />
//         <Route path="/step-1/b" component={Step1B} />
//       </Switch>
//       <WizardNextLink>Go to Step 2</WizardNextLink>
//     </>
//   );
// };

export const Step1 = () => {
    return (
      <main>
        <h2>Step 1</h2>
        <WizardNextLink>Go to Step 2</WizardNextLink>
      </main>
    );
  };

export const Step2 = () => {
  return (
    <main>
      <h2>Step 2</h2>
      <WizardPreviousLink>Go to Step 1</WizardPreviousLink>
      <br></br>
      <WizardNextLink>Go to Step 3</WizardNextLink>
    </main>
  );
};

export const Step3 = () => {
  return (
    <main>
      <h2>Step 3</h2>
      <WizardPreviousLink>Go to Step 2</WizardPreviousLink>
    </main>
  );
};
