# **Project Overview**
A modern, framework-less web application that provides a Lotto Number Generator and a partnership inquiry form. The app features a dark/light mode toggle, responsive design, and uses Web Components for modularity.

## **Features**
1. **Lotto Number Generator:**
   - Generates 6 random numbers (1-45).
   - Animated lotto balls using a custom `lotto-ball` Web Component.
   - Color-coded balls based on number ranges.
2. **Dark/Light Mode:**
   - Persistent theme selection using `localStorage`.
   - Smooth transitions and themed UI elements.
3. **Partnership Inquiry Form:**
   - Integration with Formspree for handling submissions.
   - Modern, responsive form design with interactive elements.
   - Custom `partner-form` Web Component for encapsulation.
4. **Comments Section:**
   - Integration with Disqus for user engagement and feedback.
   - Styled to fit the application's modern aesthetic.

## **Design & Aesthetics**
- **Colors:** Deep grays and vibrant accents (Pink/Blue) for dark mode; clean whites and blues for light mode.
- **Typography:** Modern sans-serif (Helvetica Neue).
- **Interactivity:** Hover effects, glow animations, and smooth transitions.
- **Visual Effects:** Subtle background patterns, layered drop shadows for depth.

## **Current Task: Partnership Inquiry Form**
- **Objective:** Add a simple, elegant partnership inquiry form connected to Formspree.
- **Endpoint:** `https://formspree.io/f/mykngpaj`
- **Steps:**
  1. Define `PartnerForm` Web Component in `main.js`.
  2. Add form styles to `style.css` (inputs, buttons, layout).
  3. Integrate the form into `index.html`.
  4. Implement success/error handling for the form submission.
