# Citadel

The app uses Open Library API to fetch data about books - https://openlibrary.org/dev/docs/api/search<br>
The Angular version is v19 and using Jest for unit testing and NgRx for state management.<br>
Using spartan-ng for headless UI components and Tailwind CSS for styling.<br>
Using Nx for the tooling and also to share dependencies across app, backend and e2e projects in a monorepo setting.<br>

## Instructions to run
- install node v20.12.1<br>
- run npm install<br>
- run npx nx serve library<br>

## Future steps
- Split into smaller components<br>
- Implement it as a full-fledged client for Open Library API<br>
- Add E2E tests<br>
