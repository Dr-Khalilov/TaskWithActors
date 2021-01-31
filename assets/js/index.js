'use strict';
new URL('https://www.facebook.com/DwayneJohnson'); // {hostname}
new Map().set('www.facebook.com', 'src to fb icon'); // key - hostname

/**
 * @param {string} type
 * @param {object} options
 * @param {string[]} options.classNames
 * @param {function} options.onClick
 * @param {HTMLElement[]} children
 */
function createElement(type, {classNames, onClick}, children) {
    const elem = document.createElement(type);
    elem.classList.add(...classNames);
    elem.onclick = onClick;
    elem.append(...children);
    return elem;
}

const cardContainer = document.getElementById('root');

const HTMLLIElem = responseData.map((place) =>
    createPlaceCardElements(place));

cardContainer.append(...HTMLLIElem);

function createPlaceCardElements(place) {
    const wrapper = document.createElement('li');
    wrapper.classList.add('cardWrapper');
    const article = document.createElement('article');
    article.classList.add('cardContainer');
    wrapper.append(article);

    const div = document.createElement('div');
    div.classList.add('imageWrapper');
    div.style.backgroundColor = stringToColour(`${place.firstName}`);
    const divElem = document.createElement('div');
    divElem.classList.add('imagePlaceholder', 'imagePlacement');
    const divElementContent = place.firstName[0];
    divElem.append(document.createTextNode(divElementContent));


    const imgPlace = document.createElement('img');
    imgPlace.classList.add('cardImage', 'imagePlacement');
    imgPlace.setAttribute('src', place.profilePicture);
    imgPlace.setAttribute('alt', place.lastName)
    imgPlace.addEventListener('error', imageErrorHandler);

    div.append(divElem, imgPlace);

    const heading3 = document.createElement('h3');
    heading3.classList.add('cardName');
    heading3.append(document.createTextNode(place.firstName));
    // const heading4 = document.createElement('h4');
    // heading4.classList.add('cardSpecialty');
    // const par = document.createElement('p');
    // par.classList.add('cardDescription');

    article.append(div, heading3);

    return wrapper;
}

// EVENT LISTENERS

function imageErrorHandler({target}) {
    target.remove();
}

function stringToColour(str) {
    let i;
    let hash = 0;
    for (i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}
