import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import React from 'react';
import LangProvider from '../contexts/langProvider';

export function Routes() {

  return (
    <NavigationContainer>
      <LangProvider>
        {<AppRoutes/>}
      </LangProvider>
    </NavigationContainer>
  )
}