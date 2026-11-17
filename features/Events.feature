Feature: Login to Eventhub

  Scenario: Login with valid credentials 
    Given login to Eventhub with "Venkatesh@gm.co" and "Pass@123"
    When land on the home screen
    Then check is the logged in user is of "Venkatesh@gm.co"