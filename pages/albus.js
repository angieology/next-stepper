import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import Example from "../components/example";
import { BrowserRouter, StaticRouter, useHistory } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { useRouter } from 'next/router';
import { merge } from 'lodash';
import styled from "styled-components";



const StepperLayout = styled.section`
  background-color: ${(props) => props.theme.colors.page};
  border: 2px solid ${(props) => props.theme.main};
  border-radius: 3px;
`;

const StepperRouted = () => {
  const history = global.window ? useHistory() : createMemoryHistory();
  const router = useRouter();
  console.log({router});

  console.log({history})
  // merge(router, history);

  return  <StepperLayout>
    <Example history={router} basename={"/albus"} />
    </StepperLayout>
}

export default function StepWizard() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <p>This example uses both BrowserRouter's history and NextJS's router objects merged together</p>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      {/* Provider makes history state available to all children */}
      {global.window ? <BrowserRouter>
        <StepperRouted/>
      </BrowserRouter> : <StaticRouter> <StepperRouted/> </StaticRouter> }
    </Layout>
  );
}
