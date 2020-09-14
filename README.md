co2-calculator
==============

A simple co2 calculator

<!-- toc -->
- [co2-calculator](#co2-calculator)
- [Usage](#usage)
- [Testing](#testing)
- [Development](#development)
<!-- tocstop -->
# Usage
<!-- usage -->
Open Route Service API Key is required as an environmental variable or also can be provided via command options.
```sh-session
$ export ORS_TOKEN = your-ors-token
```
For local debugging, command can be executed like this:
```sh-session
$ ./bin/run --start Hamburg --end Berlin --transportation-method medium-diesel-car
Your trip caused 49.2kg of CO2-equivalent.
```
or 
```sh-session
$ npm link //in Linux it can require sudo
$ co2-calculator --start Hamburg --end Berlin --transportation-method medium-diesel-car
Your trip caused 49.2kg of CO2-equivalent.
```
<!-- usagestop -->
# Testing
For testing, we use mocha and chai libraries. Therefore mocha should be installed on your machine. To install it globally execute:
```sh-session
$ npm install --global mocha
```
In order to execute all tests run mocha in the project root folder. Make sure to set `ORS_TOKEN` environmental variable before executing the tests.
```sh-session
$ mocha
  CO2Calculator
    locate
      ✓ should have coordinate values (125ms)
    measure
      ✓ should have the distance 24.53km between Essen and Duisburg (132ms)
    calculate
      ✓ should have 5.1kg co2 emmision (231ms)

  co2-calculator Command
    ✓ runs co2-calculator -s Hamburg -e Berlin -m large-electric-car (321ms)
```
# Development
For development purposes we use Visual Studio Code. Debug and launch configuration files including test debugging, can be found under `.vscode` folder. When you open the project folder directly under VSCode, this configuration will be used automatically.

Make sure to set environmental variables before running any execution.
