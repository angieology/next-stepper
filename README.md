## Demo of Step Wizard in NextJS

This project is a POC to test the feasibility of using a step wizard inside of NextJS framework. This investigation is necessary because a step wizard will assume some router history will be available to it, but the NextJS has its own implementation of the `react-router-com` that is not 100% compatible.

This demo also experiments with `styled-components`

### Getting Started

`yarn install`

`npm run build`

`npm run dev`

and go to [localhost:3000](http://localhost:3000) to view site

### Investigation results
* `router` from NextJS is not sufficient for the Wizard, a `BrowserRouter` must be instantiated and component must have access to `history` prop. __The router object from NextJS has many of the same methods as `history`, but it is missing `listen` and a few others.__
* pass a `basename` prop to override default
* Currently stepper is unable to navigate backwards after the 'nested' section

### TODO
* Fix loading issue when landing directly into stepper: implement [Redirect](https://nextjs.org/docs/api-reference/next.config.js/redirects) and/or SSR
* Try alternative to intializing Router context - polyfill `history.listen()`


### Screenshot
![alt text](/public/demo.gif)
