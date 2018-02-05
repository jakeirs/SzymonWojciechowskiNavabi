import { getProductColorDetails , getProductColors } from './apiConnector'; 

class onHoverProduct {
  constructor(productCard) {
    this.modal = productCard.querySelector('.product-modal');
    this.colors = this.modal.querySelector('.product-modal__colors');
    this.image = this.modal.querySelector('.product-modal__img');
    this.sizesContainer = this.modal.querySelector('.product-modal__sizes');
    this.id = productCard.dataset.id;
    this.colorsData = [];
    this.productColorDetails = {};
      
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
        .then((data) => {
          this.productColorDetails = data;    
          this.insertFetchedProductColorDetails(data);
        });
      // change photo
      this.insertColorImage(clickedColor);

      // remove class is-active
      Array.from(this.colors.children).map( colorButton => {
        colorButton.classList.remove('product-modal__color--is-active');
      });

      // add class is-active      
      target.parentElement.classList.add('product-modal__color--is-active');
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

    // remove all children first
    while (this.sizesContainer.firstChild) {
      this.sizesContainer.removeChild(this.sizesContainer.firstChild);
    }

    if (Object.keys(this.productColorDetails).length) {
      const sizes = Object.values(this.productColorDetails.sizes);
      sizes.map(size => {
        let sizeHTMLElement;
        if (size.available) {
          sizeHTMLElement = `<div class="product-modal__size product-modal__size--available">${size.size}</div>`;              
        } else {
          sizeHTMLElement = `<div class="product-modal__size">${size.size}</div>`;          
        }
        
        this.sizesContainer.insertAdjacentHTML('beforeend', sizeHTMLElement);
        
      });
    }
  }

}

export default onHoverProduct;
