# Repository Guidelines

## Project Structure & Module Organization
This repository is a minimal static web starter.

- `index.html`: main page markup and script/style includes.
- `main.js`: client-side JavaScript entry file.
- `style.css`: global styles for the page.
- `README.md`: short project description.

Keep new source files near the root unless a clear module split is needed. If complexity grows, move code into `src/` and static assets into `assets/`.

## Build, Test, and Development Commands
No package manager scripts are configured yet. Use these local commands:

- `python3 -m http.server 8000`: serve the site locally at `http://localhost:8000`.
- `node --check main.js`: validate JavaScript syntax.
- `ls -la`: quick check that required files are present.

If you add tooling (for example, npm scripts), document it in `README.md` and this file.

## Coding Style & Naming Conventions
- Use 2-space indentation in HTML, CSS, and JavaScript.
- Prefer small, readable functions in `main.js`; avoid inline logic in HTML beyond simple demos.
- Use lowercase, hyphenated names for new files (example: `contact-form.js`).
- Keep CSS selectors simple and component-oriented (example: `.hero-title`, `.nav-link`).

No formatter or linter is currently enforced. If you introduce one, include config files and usage commands.

## Testing Guidelines
There is no formal test framework yet. Minimum checks before opening a PR:

- Run `node --check main.js`.
- Load the page locally and verify console is clean.
- Manually test any interactive UI changes in a browser.

When adding tests, place them in `tests/` and use `*.test.js` naming.

## Commit & Pull Request Guidelines
Current history uses concise, imperative commit messages (example: `Initialized workspace with Firebase Studio`). Follow that style:

- Start with a verb (`Add`, `Update`, `Fix`, `Refactor`).
- Keep the subject line short and specific.

For pull requests, include:

- A brief summary of changes.
- Why the change was made.
- Manual test steps and results.
- Screenshots for visible UI changes.
