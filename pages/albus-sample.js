import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import Example from "../components/example";
import { BrowserRouter } from "react-router-dom";

export default function StepWizard() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      {/* Provider makes history state available to all children */}
      <BrowserRouter>
        <Example basename={"/albus-sample"} />
      </BrowserRouter>
    </Layout>
  );
}
