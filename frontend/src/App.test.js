import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

// Activer fetch-mock pour tous les tests
beforeAll(() => {
  fetchMock.enableMocks();
});

// Réinitialiser les mocks avant chaque test
beforeEach(() => {
  fetchMock.resetMocks();
});

describe('App Component', () => {
  test('renders header and form', () => {
    render(<App />);
    expect(screen.getByText('To-Do-List')).toBeInTheDocument();
    expect(screen.getByLabelText('Tâche')).toBeInTheDocument();
    expect(screen.getByLabelText('Contenu de la tâche')).toBeInTheDocument();
  });

  test('allows user to add a new task', async () => {
    // Mock the API response for this test
    fetchMock.mockResponseOnce(
      JSON.stringify([
        { 
          _id: '1',
          title: 'New Task',
          description: 'Task Description',
          completed: false,
          createdAt: '2024-12-12T12:00:00Z'
        }
      ])
    );

    render(<App />);

    const taskInput = screen.getByPlaceholderText('Tâches à faire');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const submitButton = screen.getByText('Créer une tâche');

    await userEvent.type(taskInput, 'New Task');
    await userEvent.type(descriptionInput, 'Task Description');
    await userEvent.click(submitButton);

    // Wait for the new task to appear
    expect(await screen.findByText('New Task')).toBeInTheDocument();
    expect(await screen.findByText('Task Description')).toBeInTheDocument();
  });
});
