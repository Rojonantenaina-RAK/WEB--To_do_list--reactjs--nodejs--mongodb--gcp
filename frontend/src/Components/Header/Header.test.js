import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Pour les matchers comme toBeInTheDocument
import Header from './Header';

describe('Header Component', () => {
  test('renders the header with correct text', () => {
    render(<Header />);
    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('To-Do-List');
  });

  test('has the correct styles', () => {
    render(<Header />);
    const headerElement = screen.getByRole('heading');
    expect(headerElement).toHaveClass('title');
    expect(headerElement).toHaveClass('is-3');
    expect(headerElement).toHaveStyle({ lineHeight: '3rem' });
  });
});

