@ui @login
Feature: Login Page

#  Background:
#    Given the user has registered successfully

#  Scenario: Successful login with valid credentials
#    Given the user is on the login page
#    When the user enters a valid username and password
#    Then the user should be redirected to my account page
#    And the user should see the title "My account"

  Scenario: Unsuccessful login with invalid credentials
    Given the user is on the login page
    When the user logs in with invalid credentials
    Then the user should see an error message "Invalid email or password"

    
  Scenario: Search returns no results for non-existent keyword
    Given the user is on the homepage
    When the user searches for "tijeras"
    Then a message "There are no products found." should be displayed
