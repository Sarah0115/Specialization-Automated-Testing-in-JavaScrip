@ui @product
Feature: Product Detail Page

  Scenario: Display correct product information for the second product
    Given the user is on the homepage
    When the user opens the second product
    Then the product name should match the name on the product card
    And the product name should be visible
    And all product images should be visible
    And the out-of-stock alert should not be displayed
