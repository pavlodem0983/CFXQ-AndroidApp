import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import ApplicationNavigator from './navigators/Application';
import './translations';
import { LogBox } from 'react-native';
import { useAppSelector } from '@hooks';
import i18next from './translations';

const App = () => {
  const { langChange } = useAppSelector(state => state.settings);
  useEffect(() => {
    i18next.changeLanguage(langChange);
  }, [langChange, i18next]);

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <>
      <ApplicationNavigator />
    </>
  );
};

export default App;
