import kiwi from './kiwi.jpg';
import altText from './altText.txt';
import './kiwi-image.scss'

class KiwiImage {
    render() {
        const img = document.createElement('img');
        img.src = kiwi;
        img.alt = altText;
        img.width = 300;
        img.classList.add('kiwi-image');
        const body = document.querySelector('body');
        body.appendChild(img);
    }
}

export default KiwiImage;
