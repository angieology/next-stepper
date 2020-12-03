import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import Example from "../components/example";
import { useRouter } from 'next/router';
import styled from "styled-components";
import listen from '../utils/listen-polyfill';


const StepperLayout = styled.section`
  background-color: ${(props) => props.theme.colors.page};
  border: 2px solid ${(props) => props.theme.main};
  border-radius: 3px;
`;

const StepperRouted = () => {
  const router = useRouter();
  router.listen = listen;
  router.location = { pathname: router.pathname };

  return  <StepperLayout>
    <Example history={router} basename={"/albus-polyfill"} />
    </StepperLayout>
}

export default function StepWizard() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <p>This example has a polyfill for the listen() method required by Wizard that is missing in NextJS's router</p>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
        <StepperRouted/>
    </Layout>
  );
}
