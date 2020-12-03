# Demo of Step Wizard in NextJS

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
* must include redirects for any path in step wizard, or NextJS will display 404.
* Deeplink into the wizard will always send user back to first step, also serverside is not rendering, but that is same as site.
<span>![ssr](/public/images/ssr.png)</span>

### Issues
* ~~Fix loading issue when landing directly into stepper: implement [Redirect](https://nextjs.org/docs/api-reference/next.config.js/redirects) and/or SSR.~~ Fixed but SSR does not work.

* alternative to intializing Router context - polyfill `history.listen()` is currently not working - displays 404 for all step paths


### Screenshot
![alt text](/public/demo.gif)


### Notes on polyfill
polyfilling `listen` and `location` to `router` provided by NextJS

Requirements of `Wizard`:
```
  Wizard.propTypes = {
    basename: PropTypes.string,
    history: PropTypes.shape({
      entries: PropTypes.array,
      go: PropTypes.func,
      goBack: PropTypes.func,
      listen: PropTypes.func, // not on router
      location: PropTypes.object, // not on router
      push: PropTypes.func,
      replace: PropTypes.func,
    }),
    onNext: PropTypes.func,
    exactMatch: PropTypes.bool,
  };
```

`listen` method copied from [history](https://github.com/ReactTraining/history/blob/28c89f4091ae9e1b0001341ea60c629674e83627/packages/history/index.ts#L298) module used by `react-router-dom`.
This method takes in a callback to be called whenever location changes.
Wizard component makes use of it [here](https://github.com/americanexpress/react-albus/blob/b6696380f9a356ecc78ca701cf1f04d80e4d3a5d/src/components/Wizard.js#L45)


## Conclusion
* two solutions mentioned are not robust enough. Changes we would have to make to customize this component would be simplified by writing our own component.
* the library (`<Wizard/>` and `<Step/>` components, utils) are not too large to replicate.

Refer to react-albus implementation: 
- [utils/renderCallback](https://github.com/americanexpress/react-albus/blob/master/src/utils/renderCallback.js)
- [components/wizard](https://github.com/americanexpress/react-albus/blob/master/src/components/Wizard.js)
- [components/Steps](https://github.com/americanexpress/react-albus/blob/master/src/components/Steps.js)