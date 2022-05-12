# Summary

This app demonstrates an issue with the Stencil rendering process.
Further objects are not visible after a ```foreignObject``` is added to the svg.

Functions:
 - Add Image: Adds an image to a random place in the svg
 - Add Text: Adds a ```foreignObject``` to the svg with a text inside
 - Render: JSX/TEXT: Switches rendering method. In case of text, 
components are compiled to a single text which is set to the 
```innerHTML``` property this serves as a workaround. In cas of JSX, the Functional components are used 
to render each item.

## Getting Started

To start the app, clone this repo then

install dependencies:

```bash
npm install
```

and run:

```bash
npm start
```

