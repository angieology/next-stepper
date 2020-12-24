import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{"What's Next?"}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      
        <p>Welcome to the Step Wizard demo feat. NextJS</p>
        <p>
         This demo uses <a href="https://nextjs.org/learn">NextJS</a>, 
         <a href="https://github.com/americanexpress/react-albus"> React-Albus Step Wizard</a>, and 
         <a href="https://styled-components.com/"> Styled-Components</a>.
          </p>
        <ul>
          <li>
            <Link href="/albus">Nested Stepper with router and history merged</Link>
          </li>
          <li>
            <Link href="/albus-polyfill">Nested Stepper with Polyfill</Link>
          </li>
          <li>
            <Link href="/purchase-flow/step-1">Membership</Link>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
