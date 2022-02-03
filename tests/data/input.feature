Feature: ScenariosOutlineExpander
  As a TAE
  I want to expand ScenarioOutlines to Scenarios
  So that I can see final result/run them separately

  @tagR1 @expand
  Rule: Rule1
    Given I follow the rules
    
    Background: Background
    Given I start a browser
    When the browser finished loading
    Then I can begin testing

    Scenario Outline: Test without tag(<language>)
    Given I am on Home page (<language>) user
    Then I should be on Home page

    Examples:
      | language | title   |
      | EN       | Welcome |

    @tag1 @expand
    Scenario Outline: Test language (<language>)
      Given I am on Home page <language> user
      When <language> language is choosen
      Then I should be on Home page
      And the title should be "<title>"
    
    @tag2
    Examples:
      | language | title     |
      | EN       | Welcome   |
      | FR       | Bienvenue |

  @tagR2
  Rule: Rule2

    @tag1 @notExpand
    Scenario Outline: Test cat (<language>)
      Given I am on Home page <language> user
      When <language> language is choosen
      Then I should be on Home page
      And the title should be "<title>"
    
    @tag2
    Examples:
      | language | title     |
      | EN       | Welcome   |
      | FR       | Bienvenue |