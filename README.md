# MyReads
MyReads is a react project that is required by Udacity React Nanodegree Program.
At this stage we learnt
 - How to set up environment and initialize a new project.
 - How component, state, props,functions works.
 - How to include some important & useful library such as [React Router](https://reacttraining.com/react-router/)

## Install
- Downliad all files to a folder.
- Open the folder in command-line-interface,  run ```npm install```
- When installation completed, run ```npm start```
- If everything goes well then a browser launched with this MyReads web project.

## Feedback I got
- Only update the state when absolutely necessary,
```if (this.state.results != books) {
    this.setState({
        books
    })
}
```

- It's recommended to split up similar functions into individual components, and then utilize them in multiple locations. This improves your overall code scale-ability.

- Writing skill regarding to ```README.md``` style is necessary.

## License

MyReads is a public domain work, dedicated using CC0 1.0.
