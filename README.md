# Crypto Insight

[https://remimeullemeestre-crypto-insight.netlify.app/](https://remimeullemeestre-crypto-insight.netlify.app/)


## Description

For quite a while I wanted to create a crypto application that would use industry standard tools around React.

The app features a Dashboard page that shows global statistics, the top 12 current cryptocurrencies and the 8 latest news. The ryptocurrencies page displays the top 100 coins with a filtering input. Exchanges also feature the top 100 plateformes witl related informations in a form of an accordion. The News page displays up to 100 news related to a specific cryptocurrency. Events, as a similar filtering option, which display a list of events related to a cryptocurrency and a calendar associated. Finally, each coin has a dedicated page offering a broad insight of statistics and links, alongside a history graph with filtering options.


<!-- [![Project thumbnail](./public/images/blog.png)](https://remimeullemeestre-crypto-insight.netlify.app/) -->

## Stack

- [React.js](https://react.dev/) - The library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript. React is designed to let you seamlessly combine components written by independent people, teams, and organizations.
- [Vite](https://vitejs.dev/) - A fast and flexible frontend tooling that supports TypeScript, JSX, CSS and more. It offers instant server start, hot module replacement, rich features, optimized build, universal plugins and fully typed APIs.
- [Redux](https://redux.js.org/) - A library that helps you write applications that are consistent, run in different environments, and are easy to test. It centralizes your application's state and logic, and lets you debug and trace your changes with the Redux DevTools.
- [Redux Toolkit](https://redux-toolkit.js.org) - A batteries-included toolset that simplifies common use cases like store setup, reducer creation, and immutable update logic. It also offers powerful features like mutable slices of state and the most commonly used Redux addons built-in.
- [Material UI](https://mui.com) - A library of customizable and themable React components that implement Google's Material Design. It offers a suite of 40+ building block components, a custom theme system, and a collection of design kits for different use cases.
- [FullCalendar](https://fullcalendar.io) - FullCalendar provides a highly performant React component that accepts JSX for rendering nested content.
- [Chart.js](https://www.chartjs.org) - A Simple yet flexible JavaScript charting library for the modern web. of Chart.js brand colors is available as a built-in time-saving zero-configuration plugin. JavaScript bundle size can be reduced by dozens of kilobytes by registering only. Layout boxes can be stacked and weighted in groups.


## Project structure

```
$PROJECT_ROOT
│   # Static files
├── public
│   # Source folder
└──src
    │   # Redux store
    ├── app
    │   # Assets (image)
    ├── assets
    │   # React component files
    ├── components
    │   # Custom hook files
    ├── hooks
    │   # Page files
    ├── pages
    │   # Redux API management
    └── services
       # Reusable functions across the proj
```

## Potential improvements

- **Pagination** - Adding a smart pagination or a button to display a certain number of elements instead of 100 items (cryptocurrencies and news).
- **React Router Dom** - A more advanced implementation of it, including errorElement and ErrorBoundary for instance.