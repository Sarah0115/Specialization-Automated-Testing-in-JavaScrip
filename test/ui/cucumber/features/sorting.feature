@ui @sorting
Feature: Product Sorting

  Scenario: Sort items by price in ascending order
    Given the user is on the homepage
    When the user selects "Sort"
    When clicks "Price: Low to High"
    Then the items should be displayed in ascending order of price
