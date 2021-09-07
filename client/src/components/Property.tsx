import styled from 'styled-components';
import { Property } from '../types';
import { Column, Row } from './Layout';

const StyledProperty = styled.div`
  border: 1px solid black;
  border-radius: 4px;
`;

const convertToRentPricePerSqft = (baseRent: string, sqft: number) => {
  const rent = parseFloat(baseRent.replace('$', '').replace(',', ''));
  return rent / sqft;
};

const PropertyComponent = ({
  property,
  onPropertySelected,
}: {
  property: Property;
  onPropertySelected: (property: Property) => void;
}) => {
  const rentPerSqft = convertToRentPricePerSqft(
    property.baseRent,
    property.sqft
  );
  return (
    <StyledProperty onClick={() => onPropertySelected(property)}>
      <Column>
        <Row style={{ borderBottom: '1px solid black' }}>
          <strong>{property.name}</strong>
        </Row>
        <Row>
          <div>{`Address: ${property.address1}, ${property.address2}`}</div>
        </Row>
        <Row>
          <div>{`Base rent: ${property.baseRent}`} </div>
        </Row>
        <Row>
          <div>{`${property.sqft} sqft.`} </div>
          <div>{`$${rentPerSqft.toFixed(2)} sqft/month`} </div>
          <div>{`$${(rentPerSqft * 12).toFixed(2)} sqft/year`} </div>
        </Row>
      </Column>
    </StyledProperty>
  );
};

export default PropertyComponent;
