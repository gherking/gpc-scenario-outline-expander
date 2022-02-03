# gpc-scenario-outline-expander
	
![Downloads](https://img.shields.io/npm/dw/gpc-scenario-outline-expander?style=flat-square) ![Version@npm](https://img.shields.io/npm/v/gpc-scenario-outline-expander?label=version%40npm&style=flat-square) ![Version@git](https://img.shields.io/github/package-json/v/gherking/gpc-scenario-outline-expander/master?label=version%40git&style=flat-square) ![CI](https://img.shields.io/github/workflow/status/gherking/gpc-scenario-outline-expander/CI/master?label=ci&style=flat-square) ![Docs](https://img.shields.io/github/workflow/status/gherking/gpc-scenario-outline-expander/Docs/master?label=docs&style=flat-square)
This precompiler is responsible for converting Scenario Outlines to single Scenarios as Cucumber would do and adds the first column as a tag.

## Example:

```gherkin
  @tag1
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
```
It will be modified to:

```gherkin
  @tag1 @tag2 @language(EN)
  Scenario: Test language (EN)
    Given I am on Home page EN user
    When EN language is choosen
    Then I should be on Home page
    And the title should be "Welcome"

  @tag1 @tag2 @language(FR)
  Scenario: Test language (FR)
    Given I am on Home page FR user
    When FR language is choosen
    Then I should be on Home page
    And the title should be "Bienvenue"
```

## Configuration

The precompiler accepts the following configuration:

| Option | type | Description |Default|
|:------:|:----:|:------------|:-----:|
|`ignoreTag`|`String`| Tag used to mark scenarios to be ignored during expanding Scenario Outlines |`@notExpand`|

## Other
This package uses [debug](https://www.npmjs.com/package/debug) for logging, use `gpc:scenario-outline-expander` :
```shell
DEBUG=gpc:scenario-outline-expander* gherking ...
```
For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-scenario-outline-expander/).
