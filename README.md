# Web Application Boilerplate
 This project contains Hotovo boilerplates for web application projects.  
 
 **master branch** - is simplest framework agnostic boilerplate.  
 **simple-page**  branch - adds React and should be used for simple web pages.  
 **web-app**  branch - adds React and Redux and should be used for web applications requiring proper state management.

All branches contain ESlint, Stylelint, Flow for quality control. Code quality is checked automatically on git push through git hooks. Webpack and Babel are used for bundling and transpiling.

## Setup instructions

### Requirements
- Node 6.* or higher
- NPM
- sh-compatible shell (Bash, Git Bash on Windows)
- coding environment supporting ESLint, Stylelint, Flow

### Installation
 1. To setup up new project using a boilerplate use [Web Application Generator](https://bitbucket.org/hotovo/webapplication-generator/)
 2. Run npm install in project directory
 3. Create `.env.dev` file from `.env.dev.dist`
 4. Run `npm start` to start development server with Hot Module Replacement support
 5. Head to `http://localhost:3000`

### Usage

#### Configuration
All configurations files are placed in the root.
For application specific configuration please duplicate .env.dev.dist and .env.prod.dist files and rename them to .env.dev and .env.prod.

#### Translations
If your project requires translations we recommend using i18next / react-i18next libraries.

#### Calling API
For calling an API please use common/api class.

#### Running mock API server
 Each boilerplate contains [JSON Server](https://github.com/typicode/json-server) which allows to mock API.
 Use `npm run test:mock-server` to start mock server

#### Running unit tests
Run `npm run test`

#### Running end-to-end tests
 1. Download [Selenium Standalone](http://www.seleniumhq.org/download/) server and start it.
 2. Run `npm run test:e2e`

#### Building for development
 To build development version, which can be used for testing production build within development  run `npm run build-dev`.

#### Building for production
 1. Copy `.env.production.dist` to `.env.production`
 2. Run `npm run build`
 3. Content is placed in `/dist` directory
