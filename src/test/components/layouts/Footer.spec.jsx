import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../components/layouts/Footer';

describe('Footer', () => {
  it('debe mostrar la marca y el desarrollador', () => {
    render(<Footer />);
    expect(screen.getByText(/CiberShield/i)).toBeTruthy();
    expect(screen.getByText(/Brandon Bravo/i)).toBeTruthy();
  });
});