This is a ready-to-go monorepo template for an react app. It features a login and homePage.

## Notes
* This App features the next libs:
    * Yup and React-hook-form for form validations
    * Antd for some UI components like popover
    * react-table-v7 Headless lib for tables in react
    * Styled Components
    * date-fns
## Structure

```bash
apps/ # Where your differents apps goes (in this case only web app, but you can put here the backend an mobile app)
  client/ # web app (React)
.eslintrc.js
.gitignore
.prettierrc.json
package.json # Monorepo package
README.md # This file!
tsconfig.json # Shared tsconfig
yarn.lock
```

## Start Up

Simply run:

```bash
$ yarn install
$ yarn setup
$ yarn start:app
```

*   There used to be an issue using workspaces with yarn 1.2.* if you have any trouble use try with the version 1.19.1 or use yarn2, otherwise you can do:

```bash
$ cd/apps/client
$ yarn start
```