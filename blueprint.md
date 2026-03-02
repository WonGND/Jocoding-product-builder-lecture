# Lotto Number Generator

## Overview

This project is a web-based lottery number generator. It provides users with a visually appealing and interactive way to generate random lottery numbers. The application will be built using modern web standards, including HTML, CSS, and JavaScript, with a focus on Web Components for modularity and modern CSS for styling.

## Features

*   **Random Number Generation:** Generates a set of unique random numbers for the lottery.
*   **Interactive UI:** A user-friendly interface with a button to trigger the number generation.
*   **Visual Appeal:** Modern and aesthetically pleasing design with animations and effects.
*   **Web Components:** Uses custom elements to display the lottery numbers for better encapsulation and reusability.
*   **Responsive Design:** The layout will adapt to different screen sizes.

## Current Plan

### Phase 1: Initial Setup & UI

1.  **Modify `index.html`:**
    *   Update the page title and header.
    *   Create the basic structure for the lottery number display and the generator button.
2.  **Modify `style.css`:**
    *   Apply a modern design with a color palette, custom fonts, and a textured background.
    *   Style the main container, the number display area, and the button.
    *   Use CSS variables for colors and add drop shadows for depth.
3.  **Modify `main.js`:**
    *   Create a `<lotto-ball>` web component to display individual numbers.
    *   Implement the JavaScript logic to generate 6 unique random numbers between 1 and 45.
    *   Add an event listener to the "Generate" button to trigger the number generation and display the results using the new web component.
