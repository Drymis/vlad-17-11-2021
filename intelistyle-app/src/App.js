import './App.css';
import React from 'react';
import Garment from './Garment/Garment';

var debounce = require('lodash.debounce');

class App extends React.Component {

  inputDebounceTimeMS = 300;
  _isMounted = false;

  constructor(props) {
    super(props);
    this.itemsPerPage = 10;
    this.state = {
      garmentsToDisplay: null,
      pageIndex: 0
    };
    this.search = debounce((text) => {
      this.fetchAndUpdateGarments(text);
    }, this.inputDebounceTimeMS);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAndUpdateGarments();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let garments;
    if (this.state.garmentsToDisplay) {
      garments = [];
      this.pagesNumber = Math.floor(this.state.garmentsToDisplay.length / this.itemsPerPage);
      if (!(this.state.garmentsToDisplay.length % this.itemsPerPage) && this.pagesNumber) {
        this.pagesNumber--;
      }
      const garmentsListStart = this.state.pageIndex * this.itemsPerPage;
      let garmentsListEnd = garmentsListStart + this.itemsPerPage;
      if (garmentsListEnd > this.state.garmentsToDisplay.length) {
        garmentsListEnd = this.state.garmentsToDisplay.length;
      }

      if (this.state.garmentsToDisplay.length) {
        const garmentsList = this.state.garmentsToDisplay.slice(garmentsListStart, garmentsListEnd);
        garmentsList.forEach((garment, garmentIndex) => {
          garments.push(
            <Garment
              key={garmentIndex}
              title={garment.product_title}
              description={garment.product_description}
              gender={garment.gender}
              stock={garment.stock}
              brand={garment.brand}
              price={garment.price}
              currency={garment.currency_code}
              categories={garment.product_categories}
              images={garment.images}
              url={garment.url}
            />
          );
        });
      }
    }

    let appContent;
    if (this.state.error) {
      appContent = 
        <div className="app app-error">
          <div>There has been an issue</div>
          <div className="navigation-button" onClick={event => this.trySearchAgain()}>try again</div>
        </div>;
    } else {
      if (!garments) {
        appContent = <div className="app app-loading">Loading results...</div>;
      } else if (!garments?.length) {
        appContent = <div className="app app-message">No results</div>;
      } else {
        appContent = <div className="app">{garments}</div>;
      }
    }

    return (
      <div className="page-container">

        <input type="text" className="search-input" placeholder="Search product..." onChange={event => this.search(event.target.value)} />
        <div className="items-per-page">Displaying {this.itemsPerPage} items per page - Showing {this.state.pageIndex + 1} of {this.pagesNumber + 1}</div>

        <div className="navigation-buttons">
          <div className="navigation-button" onClick={event => this.changePage(false)}>Previous Page</div>
          <div className="navigation-button" onClick={event => this.changePage(true)}>Next Page</div>
        </div>

        {appContent}
      </div>
    );
  }

  fetchGarments(search = undefined) {
    let queryParams = '';
    if (search && search !== '') {
      queryParams += `?search=${encodeURIComponent(search)}`;
    }
    return fetch(
      `${process.env.REACT_APP_API_HOST}/garment${queryParams}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json"
        })
      }
    )
      .then(res => res.json())
      .catch(error => {this.setState({error}); console.log(error);});
  }

  trySearchAgain() {
    this.setState({error: null, garmentsToDisplay: null})
    this.search();
  }

  updateGarments(result) {
    this.setState({
      garmentsToDisplay: result,
      pageIndex: 0
    });
  }

  fetchAndUpdateGarments(search = undefined) {
    if (this._isMounted) {
      this.setState({
        garmentsToDisplay: null,
        pageIndex: 0
      });
      this.fetchGarments(search).then((response) => {
        this.updateGarments(response);
      });
    }
  }

  changePage(next) {
    if (next) {
      if (this.state.pageIndex < this.pagesNumber) {
        this.setState({ pageIndex: this.state.pageIndex + 1 });
      }
    } else {
      if (this.state.pageIndex > 0) {
        this.setState({ pageIndex: this.state.pageIndex - 1 });
      }
    }
  }
}

export default App;
