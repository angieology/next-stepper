import React from "react";
import { Wizard, Steps, Step } from "react-albus";
import styled from "styled-components";
// import { useHistory } from "react-router-dom";
// import { createMemoryHistory } from "history";
import { useRouter } from "next/router";
import listen from "../utils/listen-polyfill";

const ButtonGroup = styled.div`
  button:not(:last-child) {
    margin-right: 20px;
  }
`;

const StepperLayout = styled.section`
  background-color: ${(props) => props.theme.colors.page};
  border: 2px solid ${(props) => props.theme.main};
  border-radius: 3px;
`;

const Title = styled.h2`
  padding: 0.25em 1em;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${(props) => props.theme.main};
  border: 2px solid ${(props) => props.theme.main};
`;

const Example = ({ basename }) => {
  const router = useRouter();
  // Wizard.propTypes = {
  //   basename: PropTypes.string,
  //   history: PropTypes.shape({
  //     entries: PropTypes.array,
  //     go: PropTypes.func,
  //     goBack: PropTypes.func,
  //     listen: PropTypes.func,
  //     location: PropTypes.object,
  //     push: PropTypes.func,
  //     replace: PropTypes.func,
  //   }),
  //   onNext: PropTypes.func,
  //   exactMatch: PropTypes.bool,
  // };
  router.listen = listen;
  router.location = { pathname: router.pathname };
  
  // const history = global.window ? useHistory() : createMemoryHistory();

  return (
    <StepperLayout>
      <Wizard history={router} basename={basename}>
        <Steps>
          <Step
            id="manage"
            render={({ next }) => (
              // nest another wizard to get two-level structure
              <Wizard history={router} basename={basename + "/manage"}>
                <Steps>
                  <Step
                    id="add"
                    render={({ next: nextInner }) => (
                      <div>
                        {console.log("here")}
                        <Title>Step 1, Manage: Add child</Title>
                        <ButtonGroup>
                          <Button onClick={nextInner}>Next</Button>
                        </ButtonGroup>
                      </div>
                    )}
                  />
                  <Step
                    id="assign"
                    render={({ previous: previousInner }) => (
                      <div>
                        <Title>Step 1, Manage: Assign child</Title>
                        <ButtonGroup>
                          <Button onClick={previousInner}>Previous</Button>
                          <Button onClick={next}>Next</Button>
                        </ButtonGroup>
                      </div>
                    )}
                  />
                </Steps>
              </Wizard>
            )}
          />
          <Step
            id="merlin"
            render={({ next, previous }) => (
              <div>
                <Title>Step 2: Merlin</Title>
                <div>
                  <Button onClick={previous}>Previous</Button>
                  <Button onClick={next}>Next</Button>
                </div>
              </div>
            )}
          />
          <Step
            id="gandalf"
            render={({ next, previous }) => (
              <div>
                <Title>Step 3: Gandalf</Title>
                <div>
                  <Button onClick={previous}>Previous</Button>
                  <Button onClick={next}>Next</Button>
                </div>
              </div>
            )}
          />
          <Step
            id="dumbledore"
            render={({ previous }) => (
              <div>
                <Title>Step 4: Dumbledore</Title>
                <div>
                  <Button onClick={previous}>Previous</Button>
                </div>
              </div>
            )}
          />
        </Steps>
      </Wizard>
    </StepperLayout>
  );
};

export default Example;
