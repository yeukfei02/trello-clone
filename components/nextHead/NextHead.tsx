import React from 'react';
import Head from 'next/head';

function NextHead(): JSX.Element {
  return (
    <Head>
      <title>Trello Clone</title>
      <link rel="shortcut icon" href="/favicon.png" />
    </Head>
  );
}

export default NextHead;
