import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card Component', () => {
  const mockDisplayTaskForUpdate = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockData = {
    id: '123',
    title: 'Test Task',
    description: 'This is a test task',
    date: '2024-12-12T10:00:00Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the card with correct content', () => {
    render(
      <Card
        id={mockData.id}
        title={mockData.title}
        description={mockData.description}
        date={mockData.date}
        displayTaskForUpdate={mockDisplayTaskForUpdate}
        deleteTask={mockDeleteTask}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('This is a test task')).toBeInTheDocument();
    // expect(screen.getByText('Thu Dec 12 2024')).toBeInTheDocument();
    expect(screen.getByText(/Thu Dec 12 2024/i)).toBeInTheDocument();

  });

  test('calls displayTaskForUpdate when edit button is clicked', async () => {
    render(
      <Card
        id={mockData.id}
        title={mockData.title}
        description={mockData.description}
        date={mockData.date}
        displayTaskForUpdate={mockDisplayTaskForUpdate}
        deleteTask={mockDeleteTask}
      />
    );

    const editButton = screen.getByRole('button', { name: '' }); // Bouton d'édition
    await userEvent.click(editButton);

    expect(mockDisplayTaskForUpdate).toHaveBeenCalledTimes(1);
    expect(mockDisplayTaskForUpdate).toHaveBeenCalledWith(
      mockData.id,
      mockData.title,
      mockData.description
    );
  });

  test('calls deleteTask when delete button is clicked', async () => {
    render(
      <Card
        id={mockData.id}
        title={mockData.title}
        description={mockData.description}
        date={mockData.date}
        displayTaskForUpdate={mockDisplayTaskForUpdate}
        deleteTask={mockDeleteTask}
      />
    );

    const deleteButton = screen.getByLabelText('delete');
    await userEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledTimes(1);
    expect(mockDeleteTask).toHaveBeenCalledWith(mockData.id);
  });
});
