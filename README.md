# How to start

You could follow the steps described below or do stuff like you've used to before.

1. Do "git clone" inside directory you want to have this project.

```
git clone https://github.com/DavidCodeRussia/react-pizza.git
```

2. Do "npm i" to be sure that you've got all the packages you needed.

```
 npm i
```

3. Do "npm start" to start the project. In most cases work ends here.

```
 npm start
```

### A few words about the project:

This is the pizza shop build on following technologies:

- react(v18 and using hooks), react-redux, typescript, redux, redux toolkit, react-router-dom, axios, react-paginate, lodash.debounce, qs, react-loadable, clsx, react-content-loader, sass
- DB has posted on mockAPI

Features of project:

- Filtraion by search field, categories. Sort by popularity, price, alphabet in asc and desc mode.
- Pagination
- Bundle of Pizzas will be saved to localStorage
- Lazy load different pages for better UX
- Query params saved to url and it will parse from there. Which means that you can directly change the parameters in the url and they will take effect immediately.
