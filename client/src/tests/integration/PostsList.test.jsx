import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PostsList from '../../components/PostsList';

describe('PostsList (integration)', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch');
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('shows loading, then renders posts on success', async () => {
    const mockPosts = [
      { _id: '1', title: 'First Post' },
      { _id: '2', title: 'Second Post' }
    ];
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    render(<PostsList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('First Post')).toBeInTheDocument());
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });

  it('shows error on fetch failure', async () => {
    window.fetch.mockResolvedValueOnce({ ok: false });

    render(<PostsList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
  });

  it('shows no posts message if empty', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<PostsList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/no posts found/i)).toBeInTheDocument());
  });
}); 