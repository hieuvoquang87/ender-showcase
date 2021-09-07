import React from 'react';
import { Page } from '../components/Layout';
import LeaseListContainer from './LeaseList';
import PropertyListContainer from './PropertyList';
const Main = () => {
  return (
    <Page>
      <h3>Properties Info</h3>
      <PropertyListContainer />
      <LeaseListContainer />
    </Page>
  );
};

export default Main;
