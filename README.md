[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19941384&assignment_repo_type=AssignmentRepo)
# Testing and Debugging MERN Applications

This project demonstrates comprehensive testing strategies for a MERN stack application, including unit, integration, and end-to-end tests, as well as debugging techniques.

## Project Structure

```
week-6-test-debug-assignment-odingaval/
├── client/                 # React front-end
│   ├── src/                # React source code
│   │   ├── components/     # React components (Button, ErrorBoundary, PostsList)
│   │   ├── tests/          # Client-side tests
│   │   │   ├── unit/       # Unit tests (App, Button, ErrorBoundary, HookTest)
│   │   │   └── integration/ # Integration tests (PostsList)
│   │   └── App.jsx         # Main application component (includes counter)
│   ├── cypress/            # End-to-end tests
│   ├── public/             # Static files
│   └── ...                 # Config, coverage, etc.
├── server/                 # Express.js back-end
│   ├── src/                # Server source code
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── tests/              # Server-side tests
│       ├── unit/           # Unit tests
│       └── integration/    # Integration tests
├── jest.config.js          # Jest configuration (root)
└── Week6-Assignment.md     # Assignment instructions
```

## Key Features

- **Counter in App.jsx:**
  - The main `App` component includes a counter using React's `useState` hook. Clicking the "Increment" button increases the count.
- **Posts List:**
  - The `PostsList` component fetches and displays posts, with loading, error, and empty states.
- **Error Boundary:**
  - The `ErrorBoundary` component catches errors in the React component tree.

## How to Run and Test

### 1. Install dependencies
```bash
cd client
npm install
```

### 2. Run the development server
```bash
npm start
```

### 3. Run tests and view coverage
```bash
npm test -- --coverage
```
- Coverage reports are generated in `client/coverage/lcov-report/index.html`.

### 4. Run end-to-end tests (if implemented)
```bash
npm run cypress:open
```

## Troubleshooting

### Invalid Hook Call Error
If you see an error like:
```
Invalid hook call. Hooks can only be called inside of the body of a function component.
```
- Ensure only one version of React is installed in `client/node_modules`.
- Make sure you are running tests from the `client` directory.
- Delete and reinstall `node_modules` if needed:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- If the error persists, check for duplicate React installations in the entire repo.

## How to Push Changes to GitHub

1. Stage your changes:
   ```bash
   git add .
   ```
2. Commit your changes:
   ```bash
   git commit -m "Describe your changes"
   ```
3. Push to GitHub:
   ```bash
   git push
   ```

## Assignment Requirements Checklist
- [x] Counter implemented in `App.jsx`
- [x] Unit and integration tests for client components
- [x] Test coverage command and report
- [x] Error boundary in place
- [x] Troubleshooting section in README

## Resources
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Cypress Documentation](https://docs.cypress.io/)
- [MongoDB Testing Best Practices](https://www.mongodb.com/blog/post/mongodb-testing-best-practices) 