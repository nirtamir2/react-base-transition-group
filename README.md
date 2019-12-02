# React Base Transition Group

Open source library for managing component states (including mounting and unmounting) over time for css transitions and animations. Inspired by [react-transition-group](https://github.com/reactjs/react-transition-group). The main difference is that you **Must** add transition / animation in order to unmount a child component because it listen to the `onTransitionEnd` and `onAnimationEnd` events. Also you don't have to specify `timeout` as in react-transition-group.

## Usage

You can see the examples in the example folder