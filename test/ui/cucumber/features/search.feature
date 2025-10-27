@ui @search
Feature: Product Search

  Scenario: Search returns no results for non-existent keyword
    Given the user is on the homepage
    When the user enters "tijeras" in the search bar
    And the user submits the search
    Then a message "There are no products found." should be displayed
