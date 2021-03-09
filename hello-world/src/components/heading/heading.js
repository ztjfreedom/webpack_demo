import './heading.scss';

class Heading {
    render(pangName) {
        const h1 = document.createElement('h1');
        const body = document.querySelector('body');
        h1.innerHTML = 'This is head component. This is "' + pangName + '" page';
        body.appendChild(h1);
    }
}

export default Heading;
