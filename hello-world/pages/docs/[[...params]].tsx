import { useRouter } from 'next/router';

const Docs = () => {
  const router = useRouter();

  const params = (router.query.params as string[]) || [];

  return <h1>Docs {params.join('/')} Page </h1>;
};

export default Docs;
