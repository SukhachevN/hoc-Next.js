import Link from 'next/link';

const Products = () => (
  <>
    <Link href='/'>
      <a>Home</a>
    </Link>
    <h2>
      <Link href='/product/1'>
        <a>Product 1</a>
      </Link>
    </h2>
    <h2>
      <Link href='/product/2'>
        <a>Product 2</a>
      </Link>
    </h2>
    <h2>
      <Link href='/product/3' replace>
        <a>Product 3</a>
      </Link>
    </h2>
  </>
);

export default Products;
