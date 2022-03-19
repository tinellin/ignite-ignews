import { render, screen, fireEvent } from '@testing-library/react';
import { fn, mocked } from 'jest-mock';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubscribeButton } from '.';

jest.mock('next-auth/react');
jest.mock('next/router');

describe('SubscribeButton Component', () => {
  it('renders correcty', () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);

    //Usuário não autenticado
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'loading',
    });

    //Fazer o mock do push
    useRouterMocked.mockReturnValueOnce({
      push: fn(),
    } as any);

    render(<SubscribeButton />);

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects user to sign in if when not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn);
    const useRouterMocked = mocked(useRouter);

    //Usuário não autenticado
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'loading',
    });

    //Fazer o mock do push
    useRouterMocked.mockReturnValueOnce({
      push: fn(),
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to post when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = fn(); //quando é uma função vazia (sem retorno)

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@gmail.com',
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake expires',
      },
      status: 'authenticated',
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalled();
  });
});
