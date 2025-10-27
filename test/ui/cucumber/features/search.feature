# FILE: test/ui/cucumber/features/search.feature

@ui @search
Feature: Product Search

  Scenario: Search returns no results for non-existent keyword
    Given the user is on the homepage
    When the user searches for "tijeras"
    Then a message "There are no products found." should be displayed
