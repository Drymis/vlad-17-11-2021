import { render, screen } from '@testing-library/react';
import Garment from './Garment';

test('renders learn react link', () => {
  render(<Garment />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
