import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  _selectorApplicationUser,
  _selectorApplicationCardPin,
} from 'src/store/Application/helpers';
import {View} from 'react-native';
import Lock from 'src/screens/lock';
import CardLock from 'src/screens/cardLock';
import Dashboard from 'src/screens/dashboard';

const Home = () => {
  const user = useSelector(_selectorApplicationUser);
  const cardPin = useSelector(_selectorApplicationCardPin);

  useEffect(() => {
    console.log(user, cardPin);
  });

  if (!user) {
    return <Lock />;
  }

  if (!cardPin) {
    return <CardLock />;
  }

  return <Dashboard />;
};

export default Home;
