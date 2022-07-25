import { NextPage } from 'next';
import Head from 'next/head';
import Footer from '@/layout/Footer';

const About = () => (
  <>
    <Head>
      <title>Test</title>
    </Head>
    <h1 className='content'>About</h1>
  </>
);

export default About;

About.getLayout = (page: NextPage) => (
  <>
    {page}
    <Footer />
  </>
);
