import { useEffect } from 'react';
import styled from 'styled-components';
import { Column, Row } from '../components/Layout';
import { useAppState, useAppStateUpdater } from '../contexts/AppState';
import { getLeasesByProperty } from '../services/propertyService';
import { Contact } from '../types';

const StyledLeaseList = styled(Column)`
  margin: 24px 0;
`;

const TableRow = styled(Row)`
  min-width: 600px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  :last-of-type {
    border-bottom: 1px solid black;
  }
  > div {
    padding: 8px;
    width: 120px;
  }
`;
const HeaderRow = () => {
  return (
    <TableRow>
      <div>Tenant</div>
      <div>Start Date</div>
      <div>End Date</div>
      <div>Lease Status</div>
      <div>Primary Contact</div>
    </TableRow>
  );
};

const getPrimaryContact = (
  contacts: Record<string, Contact>
): { name: string; contact: Contact } | null => {
  for (let name in contacts) {
    const tags = contacts[name].tags;
    if (tags.includes('PRIMARY')) {
      return {
        name,
        contact: contacts[name],
      };
    }
  }
  return null;
};

const LeaseListContainer = () => {
  const { selectedProperty, leases } = useAppState();
  const { setLeases } = useAppStateUpdater();
  useEffect(() => {
    if (selectedProperty) {
      getLeasesByProperty(selectedProperty.id).then((res) => {
        if (res.error) {
          console.log(`Failed to fetch `);
        }
        setLeases(res.data || []);
      });
    }
  }, [selectedProperty, setLeases]);
  if (!selectedProperty) {
    return null;
  }
  return (
    <StyledLeaseList>
      <HeaderRow />
      {leases.map((lease) => {
        const primaryContact = getPrimaryContact(lease.contacts);
        return (
          <TableRow>
            <div>{lease.companyName}</div>
            <div>{lease.startDate}</div>
            <div>{lease.inclusiveEndDate}</div>
            <div>{lease.status}</div>
            <div>{primaryContact?.name || ''}</div>
          </TableRow>
        );
      })}
    </StyledLeaseList>
  );
};

export default LeaseListContainer;
