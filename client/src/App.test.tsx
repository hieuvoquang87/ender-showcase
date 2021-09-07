import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

test('renders app', async () => {
  (axios.post as jest.Mock).mockResolvedValueOnce({
    data: [
      {
        id: 1,
        name: 'Star Tower',
        address1: '110 S. Solar Blvd.',
        address2: 'Austin, TX 78746',
        sqft: 12500,
        isOccupied: true,
        baseRent: '$23,000.00',
      },
      {
        id: 2,
        name: 'The Brand New Corner Gables',
        address1: '123 Road Runner Ave.',
        address2: 'Austin, TX 78704',
        sqft: 9000,
        isOccupied: false,
        baseRent: '$17,050.00',
      },
      {
        id: 3,
        name: 'Mazer Mall 3',
        address1: '9848 Bluebonnet St.',
        address2: 'Austin, TX 78709',
        sqft: 7500,
        isOccupied: true,
        baseRent: '$14,020.00',
      },
    ],
  });

  (axios.post as jest.Mock).mockResolvedValueOnce({
    data: [
      {
        id: '6f24746f',
        status: 'EXPIRED',
        companyName: 'Make It So',
        startDate: '2018-10-01',
        inclusiveEndDate: '2021-03-31',
        contacts: {
          'Elwin Johannes': {
            id: '9d1e5f47',
            phone: '555-604-2394',
            email: 'eljo@makeitso.com',
            tags: ['PRIMARY', 'TENANT'],
          },
        },
      },
    ],
  });
  const app = render(<App />);

  const component = await app.findByText('Star Tower');
  expect(component).toBeInTheDocument();
  const propertyComponent = await app.findByTestId('property-1');
  fireEvent.click(propertyComponent);
  const leaseComponent = await app.findByText('Make It So');
  expect(leaseComponent).toBeInTheDocument();
});
