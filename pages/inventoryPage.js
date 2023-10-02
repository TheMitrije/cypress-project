class inventoryPage {
  elements = {
    sortMenu: () => cy.get(".product_sort_container"),
    sidebarMenu: () => cy.get(".bm-burger-button > button"),
    allItems: () => cy.get(".inventory_item"),
    allItemsPrices: () => cy.get(".inventory_item_price"),
    itemName: (productName) =>
      cy.get(".inventory_item_name").contains(productName),
  };

  // M E T H O D S

  addToCart(productName) {
    cy.contains(".inventory_item", productName).contains("ADD TO CART").click();
    cy.contains(".inventory_item", productName).contains("REMOVE");
  }

  openCart() {
    cy.get(".fa-layers-counter.shopping_cart_badge").click();
  }

  openProductDetails(productName) {
    cy.contains(".inventory_item_name", productName).click();
  }

  sortLowToHigh() {
    this.elements.sortMenu().select("Price (low to high)");
  }

  sortHighToLow() {
    this.elements.sortMenu().select("Price (high to low)");
  }

  validateLowToHigh() {
    this.elements.allItemsPrices().then(($price) => {
      const text = Cypress._.map($price, (p) => p.innerText);
      const justDigits = (str) => str.replace(/[^0-9.]/g, "");
      const almostNumbers = text.map(justDigits);
      const numbers = almostNumbers.map(parseFloat);
      const sorted = Cypress._.sortBy(numbers);
      expect(sorted).to.deep.equal(numbers);
    });
  }

  validateHighToLow() {
    this.elements.allItemsPrices().then(($price) => {
      const text = Cypress._.map($price, (p) => p.innerText);
      const justDigits = (str) => str.replace(/[^0-9.]/g, "");
      const almostNumbers = text.map(justDigits);
      const numbers = almostNumbers.map(parseFloat);
      const sorted = Cypress._.sortBy(numbers).reverse();
      expect(sorted).to.deep.equal(numbers);
    });
  }

  cartItems(amount) {
    cy.get(".fa-layers-counter.shopping_cart_badge").should(
      "have.text",
      amount
    );
  }
}

export default new inventoryPage();
