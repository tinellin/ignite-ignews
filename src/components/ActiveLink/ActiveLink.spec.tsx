import { render, screen } from '@testing-library/react';
import { ActiveLink } from '.';

//Usado p/ "imitar" o comportamento de um módulo externo ao app.
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

describe('ActiveLink component', () => {
  it('renders correcty', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    //Usado para esperar o retorno válido.
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('adds active class if the link is currently active', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText('Home')).toHaveClass('active');
  });
});
