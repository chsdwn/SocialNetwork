import { GetStaticPaths, GetStaticProps } from 'next';
import styles from './[id].module.css';

type Value = {
  id: number;
  name: string;
};

export default function Value({ value }: { value: Value }) {
  return (
    <div className={styles.container}>
      <p className={styles.number}>{value.id}&nbsp;-&nbsp;</p>
      <h1 className={styles.title}>{value.name}</h1>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:5000/api/values');
  const values: Value[] = await res.json();
  
  const paths = values.map((v) => {
    return {
      params: {
        id: v.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:5000/api/values/${params.id}`);
  const value: Value = await res.json();

  return {
    props: {
      value,
    },
  };
};
