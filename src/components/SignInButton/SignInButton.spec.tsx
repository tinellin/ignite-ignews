import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/react';
import { SignInButton } from '.';

jest.mock('next-auth/react');

describe('SignInButton Component', () => {
  const useSessionMocked = mocked(useSession);

  useSessionMocked.mockReturnValueOnce({
    data: null,
    status: 'unauthenticated',
  });

  it('renders correcty when user is not authenticated', () => {
    render(<SignInButton />);

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('renders correcty when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@gmail.com',
        },
        expires: 'fake expires',
      },
      status: 'authenticated',
    });

    render(<SignInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
