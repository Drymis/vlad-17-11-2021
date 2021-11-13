import { render, screen, waitFor } from '@testing-library/react';
import Garment from './Garment';
import { VISIT_SHOP_KEY } from './../App.test';

test('Garment content', async () => {
  const { container } = render(<Garment />);
  
  await waitFor(() => {
    const visitShopButton = screen.getByText(VISIT_SHOP_KEY);
    const cardElement = visitShopButton.parentElement;

    const title = cardElement.children[1].textContent;
    expect(title).not.toHaveLength(0);

    const brand = cardElement.children[2].children[0].textContent;
    expect(brand).not.toHaveLength(0);

    const gender = cardElement.children[2].children[1].textContent;
    expect(gender).not.toHaveLength(0);

    const description = cardElement.children[3].textContent;
    expect(description).not.toHaveLength(0);
    
    const stock = cardElement.children[4].children[0].textContent;
    expect(stock).not.toHaveLength(0);

    const price = cardElement.children[4].children[1].textContent;
    expect(price).not.toHaveLength(0);

    const image = cardElement.querySelector('img');
    expect(image.src).not.toHaveLength(0);
  });

});