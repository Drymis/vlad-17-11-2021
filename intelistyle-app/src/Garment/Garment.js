import './Garment.css';
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Garment(props) {
  const productImages = [];
  const noImageSrc = '/assets/no-image.png'
  if (!props.images?.length) {
    productImages.push(
      <div className="card-image" key="no-image">
        <img src={noImageSrc} alt="not-available" />
      </div>
    );
  } else {
    props.images.forEach((image, imageIndex) => {
      const altKey = `product-${imageIndex}`;
      productImages.push(
        <div className="card-image" key={altKey}>
          <img src={image.url} alt={altKey} onError={event => event.target.src = noImageSrc} />
        </div>
      );
    });
  }

  return (
    <div className="card">
      <Carousel 
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        className="carousel"
      >
        {productImages}
      </Carousel>
      <div className="card-title">{props.title || 'Title'}</div>
      <div className="card-double-item">
        <div className="card-brand">{props.brand || 'Brand'}</div>
        <div className="card-gender">{props.gender || 'Gender'}</div>
      </div>
      <div className="card-description">{props.description || 'Description'}</div>
      <div className="card-double-item">
        <div className="card-stock">{props.stock || 'Stock'} in stock</div>
        <div className="card-price">{props.currency || 'Currency'} {props.price?.toFixed(2) || 'Price'}</div>
      </div>
      <div className="card-cta" onClick={event => window.open(props.url, '_blank')}>Visit Shop</div>
    </div>
  );
}

export default Garment;
