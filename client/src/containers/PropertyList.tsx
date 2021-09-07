import { useEffect } from 'react';
import styled from 'styled-components';
import PropertyComponent from '../components/Property';
import { useAppState, useAppStateUpdater } from '../contexts/AppState';
import { getProperties } from '../services/propertyService';

const StyledPropertyList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 600px;
  margin: 24px 0;
  > div {
    width: 450px;
    margin: 8px;
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;

const PropertyListContainer = () => {
  const { properties } = useAppState();
  const { setProperties, setSelectedProperty } = useAppStateUpdater();
  useEffect(() => {
    getProperties().then((res) => {
      if (res.error) {
        console.log('');
      }
      setProperties(res.data || []);
    });
  }, [setProperties]);

  return (
    <StyledPropertyList>
      {properties.map((property) => {
        return (
          <PropertyComponent
            property={property}
            onPropertySelected={setSelectedProperty}
          />
        );
      })}
    </StyledPropertyList>
  );
};

export default PropertyListContainer;
