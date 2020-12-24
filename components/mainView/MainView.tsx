import React, { useState, useEffect } from 'react';
import DummyView from '../dummyView/DummyView';
import UserLoggedInView from '../userLoggedInView/UserLoggedInView';

function MainView(): JSX.Element {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) setUserId(userId);
  }, []);

  const renderView = () => {
    let resultView = <DummyView />;

    if (userId) {
      resultView = <UserLoggedInView />;
    }

    return resultView;
  };

  return <div>{renderView()}</div>;
}

export default MainView;
