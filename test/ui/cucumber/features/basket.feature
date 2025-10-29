@ui @basket
Feature: Basket Functionality

  Scenario: Add a product to the basket successfully
    Given the user is on the homepage
    When the user opens the first product
    And the user sets the quantity to 3
    And the user clicks the "Add to Cart" button
    Then the success banner should be displayed
    And the success message should be "Product added to shopping cart."
    And the basket should show a quantity of 3
