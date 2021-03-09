import HelloWorldButton from '../hello-world-button/hello-world-button.js';
import Heading from '../heading/heading.js';
// import _ from 'lodash';  // npm install lodash --save
// import React from 'react';  // npm install react --save

class HelloWorldPage {
    render() {
        const heading = new Heading();
        // heading.render(_.upperFirst('hello world'));
        heading.render('hello world');
        
        const helloWorldButton = new HelloWorldButton();
        helloWorldButton.render();
    }
}

export default HelloWorldPage;

// if (process.env.NODE_ENV === 'production') {
//     console.log('production mode');
// } else if (process.env.NODE_ENV === 'development') {
//     console.log('development mode');
// }
