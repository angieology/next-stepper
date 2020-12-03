import React from "react";
import { Wizard, Steps, Step } from "react-albus";
import styled from "styled-components";

const ButtonGroup = styled.div`
  button:not(:last-child) {
    margin-right: 20px;
  }
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

const Example = ({ history, basename }) => {
  return (
    <Wizard history={history} basename={basename}>
      <Steps>
        <Step
          id="nested/hobbit"
          render={({ next }) => (
            <div>
              <Title>Step 1, Nested: Hobbit</Title>
              <ButtonGroup>
                <Button onClick={next}>Next</Button>
              </ButtonGroup>
            </div>
          )}
        />
        <Step
          id="nested/dobby"
          render={({ next, previous }) => (
            <div>
              <Title>Step 1, Nested: Dobby</Title>
              <ButtonGroup>
                <Button onClick={previous}>Previous</Button>
                <Button onClick={next}>Next</Button>
              </ButtonGroup>
            </div>
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
  );
};

export default Example;
