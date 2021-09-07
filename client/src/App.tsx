import React from 'react';
import Main from './containers/Main';
import { AppStateProvider } from './contexts/AppState';

function App() {
  return (
    <AppStateProvider>
      <Main />
    </AppStateProvider>
  );
}

export default App;
