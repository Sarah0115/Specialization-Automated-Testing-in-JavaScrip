@ui @language
Feature: Language Change

  Scenario: User changes the website language to Spanish successfully
    Given the user is on the homepage
    When the user clicks on the language button on the main menu
    And selects the "ES" language option
    Then the search and login buttons should display labels in Spanish
