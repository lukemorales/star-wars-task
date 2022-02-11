# Star Wars Task

## Introduction

At the start you have a simple application which displays planets from Star Wars in grid. Your task is to upgrade it respecting the principles from Tech Stack, Must-have (Good to have and paying attention also)

## The Task
1. Replace dummy data with dynamic data from [https://swapi.dev/api/planets/](https://swapi.dev/api/planets/)
1. Planets grid have two buttons - follow the instructions in console.logs
1. Create another action which will redirect to Planet details page
1. Create another action which will open modal with form`*` with fields:
   1. name - text
   1. rotation_period - number
   1. orbital_period - number
   1. diameter - number
   1. climate - text
   1. gravity  - text
   1. terrain - dropdown
   1. surface_water - number
1. UpdateGrid component so that the display of actions is conditional
1. Make displaying **‘Go to Films’** and **‘Go to Residents’** whether or not they exist
1. Update Grid component so header data will contain type of value and if it’s number align value to right in cell
1. Add two custom columns to Planets - **Residents** and **Films** which will contain number of them. Try to do that by modify Planets component in App component and only prepare Planets component to be more customizable, in case we would like to use origin Planet component in other places

`* all fields should be required and on form submit, close modal and show random success/error message (there is no endpoint)`

## Mockups
No mockups but would be great if you make that app pretty :)

## Tech stack
* react (CRA starter)
* react-router
* redux

## Must-have
* React & Redux
* PropTypes
* Reactstrap
* Usage of react-router for multiple pages

## Good to have
* using function components (with hooks) instead of class components

## Paying attention to
* How you split code for components
* Reusability of the components
* Code repetitions and reusability
* Working in accordance with good practices in general
