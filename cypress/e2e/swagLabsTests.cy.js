import checkoutPage from "../pages/checkoutPage";
import inventoryPage from "../pages/inventoryPage";
import productDetailsPage from "../pages/productDetailsPage";
import pageLinks from "../pages/pageLinks";

let data;

describe("SwagLabs app automation", () => {
  beforeEach(() => {
    cy.login()
    pageLinks.elements.inventoryPageUrl();
    cy.fixture("swagLabs").then((datas) => {
      data = datas;
    });
  });

  it("Sort by price(low to high)", () => {
    // Sort items by lowest price
    inventoryPage.sortLowToHigh();
    inventoryPage.elements.allItems().should("have.length.gt", 1);

    // Assert products are sorted by lowest price first
    inventoryPage.validateLowToHigh();
  });

  it("Sort by price(high to low)", () => {
    // Sort items by highest price
    inventoryPage.sortHighToLow();
    inventoryPage.elements.allItems().should("have.length.gt", 1);

    // Assert products are sorted by highest price first
    inventoryPage.validateHighToLow();
  });

  it("Add two products then remove onee", () => {
    // Add desired items to cart
    inventoryPage.addToCart(data.products.backpackName);
    inventoryPage.addToCart(data.products.onesieName);

    // Open product details
    inventoryPage.openProductDetails(data.products.backpackName);

    // Assert that the user is on correct product page
    productDetailsPage.itemName(data.products.backpackName);
    productDetailsPage.itemDesc(data.products.backpackDesc);

    // Remove product from cart
    productDetailsPage.removeButton();

    // Assert that only 1 product is displayed in cart badge
    inventoryPage.cartItems(1);
  });

  it("Buy two products", () => {
    // Add two products to the cart
    inventoryPage.addToCart(data.products.backpackName);
    inventoryPage.addToCart(data.products.blackTshirtName);

    // Assert that 2 products are displayed in cart badge
    inventoryPage.cartItems(2);

    // Open cart and check products quantity
    inventoryPage.openCart();
    checkoutPage.elements.cartQuantity().each((index) => {
      expect(index).to.have.length(1);
    });

    // Proceed to checkout
    checkoutPage.checkoutOrder();
    pageLinks.elements.checkoutPageUrl();
    checkoutPage.elements
      .checkoutSubheader()
      .should("have.text", "Checkout: Your Information");

    // Add buyer information to the checkout form
    checkoutPage.elements.checkoutFirstName().type(data.userInfo.name);
    checkoutPage.elements.checkoutLastName().type(data.userInfo.lastname);
    checkoutPage.elements.checkoutZipCode().type(data.userInfo.city);

    // Continue to the next checkout page
    checkoutPage.continueOrder();
    pageLinks.elements.checkoutPageUrlTwo();
    checkoutPage.elements.checkoutSubheader();

    // Assert products and quantity
    checkoutPage.elements.summaryQuantity().each((index) => {
      expect(index).to.have.length(1);
    });
    inventoryPage.elements.itemName(data.products.backpackName);
    inventoryPage.elements.itemName(data.products.blackTshirtName);

    // Count the Sub-total price of products, without taxes
    checkoutPage.subTotalPriceSum();

    // Finalize the order
    checkoutPage.finishOrder();

    // Assert that order is completed successfully
    pageLinks.elements.checkoutCompletePage();
    checkoutPage.elements.checkoutSubheader().should("have.text", "Finish");
    checkoutPage.elements.checkoutCompleteHeader();
    checkoutPage.elements.checkoutImage();
  });
});
