import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripe';

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return {
        data: null,
        status: 'loading',
      };
    },
  };
});
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        push: jest.fn(),
      };
    },
  };
});
jest.mock('../../services/stripe');

describe('Home page', () => {
  it('renders correcty', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: '$10.00' }} />);

    expect(screen.getByText('$10.00 month')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);

    const res = await getStaticProps({});

    expect(res).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00',
          },
        },
      })
    );
  });
});
