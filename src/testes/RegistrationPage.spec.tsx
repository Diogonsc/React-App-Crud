import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import RegistrationPage, { IClient } from '../pages/Registration';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RegistrationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza TableComponent com dados do cliente', async () => {
    const mockClients: IClient[] = [
      {
        id: 1,
        name: 'John Doe',
        birthDate: '1990-01-01',
        gender: 'Male',
        email: 'john@example.com',
        phone: '1234567890',
        zip: '12345',
        street: 'Main St',
        number: '1',
        complement: '',
        neighborhood: 'Downtown',
        city: 'CityA',
        state: 'StateA',
        notes: '',
      },
    ];

    mockedAxios.get.mockResolvedValue({ data: mockClients });

    render(<RegistrationPage />);
  });
});
