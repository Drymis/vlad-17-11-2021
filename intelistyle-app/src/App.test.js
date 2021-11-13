import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import App from './App';

export const VISIT_SHOP_KEY = 'Visit Shop';
const NEXT_PAGE_KEY = 'Next Page';
const PREVIOUS_PAGE_KEY = 'Previous Page';

test('Searchbar cases', async () => {
  const { container } = render(<App />);
  const searchProductEl = screen.getByPlaceholderText('Search product...');

  // Results displayed without search
  await waitFor(() => {
    const visitShopElements = screen.getAllByText(VISIT_SHOP_KEY);
    expect(visitShopElements).not.toHaveLength(0)
  });

  // Full word search (single)
  validateSearchResults('green');

  // Full word search (multiple)
  validateSearchResults('green cap');

  // Full word search (inverted words order)
  validateSearchResults('cap green');

  // Case insensitive search
  validateSearchResults('GrEEn CaP');

  async function validateSearchResults(searchTerm) {
    await waitFor(() => {
      fireEvent.change(searchProductEl, {target: {value: searchTerm}});
      const secondVisitShopElements = screen.getAllByText(VISIT_SHOP_KEY);

      for (var i = 0; i < secondVisitShopElements.length; i++) {
        var visitShopElement = secondVisitShopElements[i];
        var cardTitle = visitShopElement.parentElement.children[1].textContent;
        searchTerm.split(' ').forEach((searchWord) => {
          expect(cardTitle.toLowerCase()).toContain(searchWord.toLowerCase());
        })
      }
    });
  }

});

test('Page skip cases', async () => {
  const { container } = render(<App />);

  // Validates that results and page counter update accordingly 
  // when pressing next/previous page
  await waitFor(() => {
    const firstPageCardTitles = getCardTitles();

    // validates that results update when clicking next page
    const nextPageButton = screen.getByText(NEXT_PAGE_KEY);
    fireEvent.click(nextPageButton);
    const secondPageCardTitles = getCardTitles();
    expect(firstPageCardTitles).not.toEqual(secondPageCardTitles);

    // validates that results stay the same when clicking previous page
    const previousPageButton = screen.getByText(PREVIOUS_PAGE_KEY);
    fireEvent.click(previousPageButton);
    const newFirstPageCardTitles = getCardTitles();
    expect(firstPageCardTitles).toEqual(newFirstPageCardTitles);
  });

  function getCardTitles() {
    const visitShopElements = screen.getAllByText(VISIT_SHOP_KEY);
    let cardTitles = [];
    for (var i = 0; i < visitShopElements.length; i++) {
      var visitShopElement = visitShopElements[i];
      var cardTitle = visitShopElement.parentElement.children[1].textContent;
      cardTitles.push(cardTitle);
    }
    cardTitles = cardTitles.sort();
    return cardTitles;
  }

});
