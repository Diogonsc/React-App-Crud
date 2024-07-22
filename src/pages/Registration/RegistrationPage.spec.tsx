import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { getAllClients } from '../../services/getAllClients';
import RegistrationPage from '.';

jest.mock('../../services/getAllClients', () => ({
  getAllClients: jest.fn(),
}));

describe('RegistrationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza TableComponent com dados do cliente', async () => {
    const mockClients = [
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

    (getAllClients as jest.Mock).mockResolvedValue(mockClients);

    render(<RegistrationPage />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
