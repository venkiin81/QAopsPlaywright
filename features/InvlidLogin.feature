
Feature: Invalid validtion check

@InvalidCreds
Scenario Outline: Login to Eventhub with Invalid Creds
    Given login to Eventhub with "<UserName>" and "<Password>"
    Then Check if validation is shown on login page 

    Examples:
        | UserName      | Password      |
        | test@gm.co    | Pass1234      |
        | Venkat        | Pass3         |

