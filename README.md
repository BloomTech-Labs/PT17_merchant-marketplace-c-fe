# merchant-marketplace

[![Code Quality](https://www.code-inspector.com/project/21036/status/svg)](https://frontend.code-inspector.com/public/project/21036/PT17_merchant-marketplace-c-fe/dashboard)

🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your first Pull-Request is merged. This is intended to be a guideline. Feel free to add your own flare to it.

# Project

You can find the deployed project at [🚫URL NAME GOES HERE](🚫copy and paste URL here).

## Contributors

🚫Add link to seperate contributor page

<br/>

## Getting Started

### Environment variables

- `REACT_APP_CLIENT_ID` Okta client id
- `REACT_APP_OKTA_ISSUER_URI` Okta api authorization server issuer uri (eg. `https://name-438r8hr.okta.com/oauth2/default`)
- `REACT_APP_API_URI` The URL (localhost or live) for the Backend that you're building

### Setup Steps

- Fork and clone the repo to install it as your own remote.
  - **note** please [be sure to set your remote](https://help.github.jp/enterprise/2.11/user/articles/changing-a-remote-s-url/) for this repo to point to your Labs Team Front End Repository.
- run: `npm install` to download all dependencies.
- run: `npm start` to start your local development server.

> When using Okta for authentication, the app will need to run locally on port 3000.

## Errors on Deploy

- Are you seeing an error on `npm start` that looks something like this?
  ![npm start fail](https://tk-assets.lambdaschool.com/e1b1f8c9-612d-4744-b413-36ebf29f0337_image4.png)

- Head over to the `package.json` file and please modify your scripts in order to allocate more memory for the 'craco' package. More information on 'craco' and why we use it [can be found here](https://github.com/gsoft-inc/craco).

```js
"start": "craco --max_old_space_size=4096 start",
"build": "craco --max_old_space_size=4096 build",
```

## Deploying Your App

- Your front end is to be deployed using [AWS amplify](https://aws.amazon.com/amplify/). You can find a step-by-step deployment guide [here](./DEPLOYMENT_GUIDE.md).
- Your engineering manager will ensure that you have the credentials you need to get your app deployed.

## Components

- We feel that you shouldn't have to spend time as a developer worrying about where your files should go and your architectural decisions that you'd have to make if you started from scratch.
- Following the patterns we've laid out for your and the definitions of 'components' will help you focus on getting work done, rather than spending time deliberating on 'how' your work will get done.
- Please see [the following documentation](./src/components/README.md) on how to work with and structure your components in this app.

## Styling Your App

- In order to provide an experience for you to dive right into a code base and have everything you need to successfully style and craft your UI Components we'd like for you to gain some practice using the [`ANT Design Library`](https://ant.design/).

- Instructions on how to use components can be found in the `notes` portion in the [project storybook](https://lambda-school-labs.github.io/labs-spa-starter/?path=/info/form--example-form).

- It is recommended that you use the [AntD components](https://ant.design/components/overview/) as your common components.

### Theme-ing your app

- Even though you're using Ant Design and the global stylesheet that comes with it, you can control the theme of your application by changing things like font-family, sizes, border-radius', primary/accent colors etc.

- To do this, simply go to the `theme-overrides.js` file and use the[ following properties to override the styles](https://ant.design/docs/react/customize-theme)

- **You will need to restart your app completely restart your dev server when making changes to this JS file**

## Testing your App.

- In accordance with our [Labs Engineering Standards](https://labs.lambdaschool.com/) this app uses common practices for Unit/Integration Testing using:
  [React Testing Library](https://github.com/testing-library/react-testing-library)
  [Jest](https://jestjs.io/)
- For examples on how to test your application and more information please see [the following documentation](./src/__tests__/README.md).

## Contributing

- As this repository is a Work In Progress (WIP) we'd love to hear more about what is working for you and what could be improved. [Please use the `Issues` tab in Github](https://github.com/Lambda-School-Labs/labs-spa-starter/issues) to submit and file any issues that come up during your development cycle. Issues should be related to things like, documentation, bugs that come up with the existing flow, architectural discussion, suggestions for improvements, and anything that you find cumbersome about getting started and working through a product cycle using these tools.
- **Please use `Labels` when filing issues** try and include screenshots of bugs and steps to reproduce.
