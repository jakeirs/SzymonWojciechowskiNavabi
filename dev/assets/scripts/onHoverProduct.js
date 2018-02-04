import { getProductColorDetails , getProductColors } from './apiConnector'; 

class onHoverProduct {
  constructor(productCard) {
    this.modal = productCard.querySelector('.product-modal');
    this.colors = this.modal.querySelector('.product-modal__colors');
    this.image = this.modal.querySelector('.product-modal__img');
    this.id = productCard.dataset.id;
    this.colorsData = [];
      
    // fetching data
    getProductColors(this.id).then((colors) => {
      this.colorsData = colors;
      this.insertFetchedColors(colors);
    });  

    // eventListeners
    this.colors.addEventListener('click', (event) => this.onColorButtonClick(event));      

    // binding
    this.insertFetchedColors.bind(this);
    this.onColorButtonClick.bind(this);
  } /* close constructor */

  onColorButtonClick(event) {
    event.stopImmediatePropagation() 
    const target = event.target;    

    if (target.classList.contains('product-modal__color__inner')) { 
      const clickedColor = target.dataset.color;
      getProductColorDetails(this.id, clickedColor)
        .then((data) => this.insertFetchedProductColorDetails(data));
      // change photo
      this.insertColorImage(clickedColor);
    }
  }

  insertFetchedColors(colorsObjects) {
    const colors = Object.keys(colorsObjects);

    if (this.colors.children.length <  colors.length) {
      // remove all placeholders
      while (this.colors.firstChild) {
        this.colors.removeChild(this.colors.firstChild);
      }
      // add all colors from fetch array
      colors.map(color => {
        const colorHTMLElement = `<div class="product-modal__color">
          <div class="product-modal__color__inner" data-color="${color}" style="background-color: ${color}">
          </div>
        </div>`
        this.colors.insertAdjacentHTML('beforeend', colorHTMLElement);
      })
    }
  }

  insertColorImage(color) {
    const imageUrlEncoded =  this.colorsData[color]["image"];
    const imageUrl = decodeURIComponent(imageUrlEncoded);
    this.image.setAttribute('src', imageUrl)
  }

  insertFetchedProductColorDetails(details) {
    console.log(details)
  }

}

export default onHoverProduct;
