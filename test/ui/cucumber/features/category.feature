@ui @category
Feature: Category Navigation

  Scenario: User filters products by category and views the correct product details
    Given the user is on the homepage
    When the categories menu is displayed
    And the user selects the "Hammer" category
    Then only products from the "Hammer" category should be shown
    When the user clicks on the first product in the filtered list
    Then the product detail should display the "Hammer" category