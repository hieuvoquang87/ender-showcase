import axios from 'axios';
import { Lease, Property, ServiceResponse } from '../types';

const BASE_URL = 'https://talent.ender.com/fe-challenge';
const TOKEN = 'dde70fd6-b600-43cd-b1d9-33250337b31a';

export const getProperties = async (): Promise<ServiceResponse<Property>> => {
  try {
    const res = await axios.post(`${BASE_URL}/properties`, {
      token: TOKEN,
    });
    return {
      data: res.data || [],
    };
  } catch (error) {
    return {
      error: new Error('Unable to fetch properties'),
      data: null,
    };
  }
};

export const getLeaseByProperty = async (
  propertyId: string
): Promise<ServiceResponse<Lease>> => {
  try {
    const res = await axios.post(
      `${BASE_URL}/properties/${propertyId}/leases`,
      {
        token: TOKEN,
      }
    );
    return {
      data: res.data || [],
    };
  } catch (error) {
    return {
      error: new Error(`Unable to fetch leases for property ${propertyId}`),
      data: null,
    };
  }
};
