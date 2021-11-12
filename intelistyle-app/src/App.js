import './App.css';
import React from 'react';
import Garment from './Garment/Garment';

var debounce = require('lodash.debounce');

class App extends React.Component {

  inputDebounceTimeMS = 300;

  constructor(props) {
    super(props);
    this.itemsPerPage = 10;
    this.state = {
      garmentsToDisplay: [],
      pageIndex: 0
    };
    this.search = debounce((text) => {
      this.fetchAndUpdateGarments(text);
    }, this.inputDebounceTimeMS);
  }

  componentDidMount() {
    this.fetchAndUpdateGarments();
  }

  render() {
    const garments = [];
    this.pagesNumber = Math.floor(this.state.garmentsToDisplay.length / this.itemsPerPage);
    const garmentsListStart = this.state.pageIndex * this.itemsPerPage;
    let garmentsListEnd = garmentsListStart + this.itemsPerPage;
    if (garmentsListEnd > this.state.garmentsToDisplay.length) {
      garmentsListEnd = this.state.garmentsToDisplay.length;
    }
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
          // images={garment.images}
          url={garment.url}
        />
      );
    });
    return (
      <div className="page-container">

        <input type="text" className="search-input" placeholder="Search product..." onChange={event => this.search(event.target.value)} />
        <div className="items-per-page">Displaying {this.itemsPerPage} items per page - Showing {this.state.pageIndex + 1} of {this.pagesNumber}</div>

        <div className="navigation-buttons">
          <div className="navigation-button" onClick={event => this.changePage(false)}>Previous Page</div>
          <div className="navigation-button" onClick={event => this.changePage(true)}>Next Page</div>
        </div>

        <div className="app">{garments}</div>
      </div>
    );
  }

  fetchGarments(search = undefined) {
    let queryParams = '';
    if (search && search !== '') {
      queryParams += `?search=${search}`;
    }
    return fetch(
      `http://localhost:3001/garment${queryParams}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json"
        })
      }
    )
      .then(res => res.json())
      .catch(error => console.log(error));
  }

  updateGarments(result) {
    this.setState({
      garmentsToDisplay: result,
      pageIndex: 0
    });
  }

  fetchAndUpdateGarments(search = undefined) {
    this.fetchGarments(search).then((response) => {
      this.updateGarments(response); 
    });
  }

  changePage(next) {
    if (next) {
      if (this.state.pageIndex < this.pagesNumber - 1) {
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
