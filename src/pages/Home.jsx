import React from 'react';
import { StatusBar } from 'native-base';
import { Header } from '../components/Header/Header';
import { InputList } from '../components/TasksList/InputList';

export const Home = () => {
  return (
    <>
      <StatusBar />
      <Header />
      <InputList />
    </>
  );
};
