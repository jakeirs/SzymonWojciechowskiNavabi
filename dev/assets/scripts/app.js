import onHoverPorduct from './onHoverProduct';

class Products {
  constructor() {
    this.productContainer = document.querySelector('.product-container');
    
    this.productContainer.addEventListener('mouseover', this.onProductCardHover);     

    // binding
    this.onProductCardHover = this.onProductCardHover.bind(this);
  }

  onProductCardHover(event) {
    const target = event.target;
    const curTarget = event.currentTarget;

    if (target.parentElement.classList.contains('product-card')) { 
      const onHoverPorductInit = new onHoverPorduct(target.parentElement);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const initProductsFeatures = new Products();  
})


