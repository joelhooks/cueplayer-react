# cueplayer-react

Cueplayer.React is forked from [video-react](https://github.com/video-react/video-react).

## Installation

Install `cueplayer-react` and **peer dependencies** via NPM

```sh
npm install --save cueplayer-react react react-dom
```

import css in your app or add cueplayer-react styles in your page

```jsx
import '~cueplayer-react/dist/cueplayer-react.css'; // import css
```

or

```scss
@import '~cueplayer-react/styles/scss/cueplayer-react'; // or import scss
```

or

```html
<link
  rel="stylesheet"
  href="https://cueplayer-react.github.io/assets/cueplayer-react.css"
/>
```

Import the components you need, example:

```js
import React from 'react';
import { Player } from 'cueplayer-react';

export default props => {
  return (
    <Player>
      <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
    </Player>
  );
};
```

## Browser support

| Browser | Windows  |  Mac  | Linux | Android  |    iOS     |
| :-----: | :------: | :---: | :---: | :------: | :--------: |
| Chrome  |  **Y**   | **Y** | **Y** |  **Y**   | **Native** |
| Firefox |  **Y**   | **Y** | **Y** | untested | **Native** |
|  Edge   |  **Y**   |   -   |   -   |    -     |     -      |
|  IE 11  | untested |   -   |   -   |    -     |     -      |
| Safari  |    -     | **Y** |   -   |    -     |   **Y**    |

Please note that only the latest stable version is tested and supported. Cueplayer-react may be usable in older releases, and we will accept pull requests for them, but they will not be frequently tested or actively supported.

For the items marked as "untested", we do welcome volunteer testers.

## Development

Run tests:

```sh
npm test
```

### Run from local

```bash
$ npm install
$ npm start
```

## Contribution

Interested in making contribution to this project? Want to report a bug? Please read the [contribution guide](CONTRIBUTION.md).

## Inspiration & Credits

- This project is a fork of [video-react](https://github.com/video-react/video-react)
- This project is heavily inspired by [video.js](http://www.videojs.com), and most of our css styles came from [video.js's styles](https://github.com/videojs/video.js/tree/master/src/css).
- The document site is built with [reactstrap](https://github.com/reactstrap/reactstrap).
- All the icons came from [Google Material Icons](https://material.io/icons/)
- Fonts were built by [iconmon](https://icomoon.io/).
