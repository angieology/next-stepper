import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import Wizard from "../../components/prodigyWizard/Wizard";
import steps from "../../components/prodigyWizard/steps";

export default function Membership() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <p>
        This example uses both BrowserRouter's history and NextJS's router
        objects merged together
      </p>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>

      <Wizard basename={'/purchase-flow/'} steps={steps}></Wizard>
      
    </Layout>
  );
}