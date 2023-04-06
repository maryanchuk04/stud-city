Feature: AuthenticateTests

@mytag
Scenario: Tests for authenticate page of StudCity Application
    Given I navigate to application
    And I fill following text fields
        | Email | Password |
        | lion20914king@gmail.com | Maks-010104 |
    And I Click submit button
    Then I will be redirecting to profile page (With /profile in route)