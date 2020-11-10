import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Header, Icon, List } from 'semantic-ui-react';
import styles from '../styles/Home.module.css';

type Value = {
  id: number;
  name: string;
};

export default function Home({
  values,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Social Network</title>
      </Head>

      <Header>
        <Icon name="users" />
        <Header.Content>Social Network</Header.Content>
      </Header>

      <List bulleted>
        {values.map((v) => (
          <List.Item key={v.id}>
            <Link href={`/value/${v.id}`}>{`${v.id} - ${v.name}`}</Link>
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:5000/api/values');
  const values: Value[] = await res.json();

  return {
    props: {
      values,
    },
  };
};
