import React from 'react';
import NextHead from '../components/nextHead/NextHead';
import MainView from '../components/mainView/MainView';

function IndexPage(): JSX.Element {
  return (
    <div>
      <NextHead />
      <MainView />
    </div>
  );
}

export default IndexPage;
