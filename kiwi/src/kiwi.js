import Heading from './components/heading/heading.js';
import KiwiImage from './components/kiwi-image/kiwi-image.js';
// import _ from 'lodash';  // npm install lodash --save
// import React from 'react';  // npm install react --save

const heading = new Heading();
// heading.render(_.upperFirst('kiwi'));
heading.render('kiwi');

const kiwiImage = new KiwiImage();
kiwiImage.render();

// import('HelloWorldApp/HelloWorldButton')  // load at runtime
//     .then(HelloWorldButtonModule => {
//         const HelloWorldButton = HelloWorldButtonModule.default;
//         const helloWorldButton = new HelloWorldButton();
//         helloWorldButton.render();
//     })
