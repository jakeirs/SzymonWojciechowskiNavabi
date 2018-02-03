import {getProductColorDetails , getProductColors} from './apiConnector'; 

class onHover {
  constructor(productCard) {
    this.modal = productCard.querySelector('.product-modal');
    this.colors = this.modal.querySelector('.product-modal__colors');
    
    // fetching data
    getProductColors(1).then(this.insertFetchedColors);

    console.log('productCard' , this.colors);

    // eventListeners
    // this.productContainer.addEventListener('click', this.onColorButtonClick);    

    // binding
    this.insertFetchedColors.bind(this);
    this.onColorButtonClick.bind(this);
  }

  insertFetchedColors(colors) {
    console.log(colors);
  }

  onColorButtonClick() {

  }

}

export default onHover;
