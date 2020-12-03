

# Demo of Step Wizard in NextJS

## Getting Started

`yarn install`

`npm run build`

`npm run dev`

and go to [localhost:3000](http://localhost:3000) to view site

## Purpose

This project is a POC to test the feasibility of using the [React-albus step wizard](https://github.com/americanexpress/react-albus) inside of [NextJS framework](https://nextjs.org/). This investigation is necessary because a step wizard will assume some router history will be available to it, but the NextJS has its own implementation of the `react-router-com` that is __not 100% compatible.__

This demo also experiments with `styled-components`



## Initial Investigation
* [Router](https://nextjs.org/docs/api-reference/next/router#router-object) is available from NextJS as its own routing solution that resembles `react-router-dom`'s history object. 
* Comparing the two, NextJS is not sufficient for the Wizard which has [this interface](https://github.com/americanexpress/react-albus/blob/b6696380f9a356ecc78ca701cf1f04d80e4d3a5d/src/components/Wizard.js#L123). Specifically it seems to be missing `listen` method.
* Two possible solutions were investigated, one to instantiate a React Router to use its `history` and merge with NextJS's `router`, and another to polyfill the missing methods and copy only the parts of `history` source code that is relevant

## Solution 1: Merge `history` and `router`

### Steps
* a `BrowserRouter` must be instantiated and component must have access to `history` prop. 
* create a `history` object using `useHistory` from react-router-dom
* create a `router` object using `useRouter` from NextJS
* merge two objects so that it is 'complete' and pass to Wizard's history prop.
* pass a `basename` prop to override default baseURL
* in `next.config.js` set up redirects for any path in step wizard, or NextJS will display 404. How to implement [Redirect](https://nextjs.org/docs/api-reference/next.config.js/redirects) in NextJS

### Results

![alt text](/public/demo.gif)

* Generally working in good condition, navigates back and forth between steps and updates the URL
* Deeplink into the wizard will always send user back to first step, also serverside is not rendering, but that is same as site.

<p>

![ssr](/public/images/ssr.png)

</p>

### Solution 1 Conclusion
* This is generally working, but the approach is hacky, basically.


## Solution 2: Polyfill `listen`
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

### Steps
* `listen` method copied from [history](https://github.com/ReactTraining/history/blob/28c89f4091ae9e1b0001341ea60c629674e83627/packages/history/index.ts#L298) module used by `react-router-dom`.
This method takes in a callback to be called whenever location changes.
Wizard component makes use of it [here](https://github.com/americanexpress/react-albus/blob/b6696380f9a356ecc78ca701cf1f04d80e4d3a5d/src/components/Wizard.js#L45)
* Methods copied into a utils and imported to the `Wizard` example component
* `router` created and filled with listen and location methods

### Results
* alternative to intializing Router context - polyfill `history.listen()` is currently not working - displays 404 for all step paths

### Solution 2 Conclusion
* With more time issues can be resolved, however it is very complex and likely to break and require maintenance.

## Solution 3: Customize `<Step/>` 
This last unimplemented solution would require customizing route management, possibly overriding the wizard library's logic to render components and handle route changes.

### Sample solution

```

const CustomStep = ({ children, ...props }) => {
    const router = useRouter();

    useEffect(() => {
        // Check route and change route based on step
    }, [...]);

    return (
        <Step
            {...props}
            render={({ step, ...rest }) => React.cloneElement(children, { ...props}) />}
        />
    );
}

<Wizard>
  <Steps>
    <CustomStep id="manage-student">
        <AddStudent />
    </CustomStep>
  </Steps>
</Wizard>
```

### Solution 3 Conclusion
Instead of overriding logic in a component for a library that is already very small, it would make more sense to write our own custom component.

## Conclusion
* two solutions mentioned are not robust enough. Changes we would have to make to customize this component would be simplified by writing our own component.
* the library (`<Wizard/>` and `<Step/>` components, utils) are not too large to replicate. __(< 200 lines of code)__

Refer to react-albus implementation: 

- [utils/renderCallback](https://github.com/americanexpress/react-albus/blob/master/src/utils/renderCallback.js)
- [components/wizard](https://github.com/americanexpress/react-albus/blob/master/src/components/Wizard.js)
- [components/Steps](https://github.com/americanexpress/react-albus/blob/master/src/components/Steps.js)

### Final notes on using NextJS
* Setting up the project was very easy
* Styled-components are used the same way as our app
* Routing may be changed
* Setting up config may be changed, must be compatible with NextJS's own.
* A good idea for next demo project will be to use SSR with Next, and testing webpack configurations.