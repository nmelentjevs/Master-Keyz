## MasterKeyz

Prototype of an e-commerce website for selling music sheets. ReactJS, NodeJS, Express, MongoDB.

## Code style

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Tech/framework used

<b>Built with</b>

- [React](https://reactjs.org/)
- [NodeJS](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [PassportJS](http://www.passportjs.org/)


## Install

    $ git clone https://github.com/nmelentjevs/MasterKeyz.git
    $ cd printfultest
    $ npm install

## Start & watch

    $ npm start

## Simple build for production

    $ npm run build

Provide step by step series of examples and explanations about how to get a development env running.

## Examples

We have several examples [on the website](https://reactjs.org/). Here is the first one to get you started:

```jsx
import React from 'react';

import Card from 'react-bootstrap/Card';

function Answer(props) {
  return (
    <Card onClick={() => props.submit()}>
      <Card.Body style={{ alignContent: 'cemter', cursor: 'pointer' }}>
        {props.answer}
      </Card.Body>
    </Card>
  );
}

export default Answer;
```

This example will render Answer Component into a container on the page.

## License

MIT © [nmelentjevs]()
