'use strict';
new URL('https://www.facebook.com/DwayneJohnson'); // {hostname}
new Map().set('www.facebook.com', 'src to fb icon'); // key - hostname


const cardContainer = document.getElementById('root');

const cards = responseData.map((place) => createPlaceCardElements(place));

cardContainer.append(...cards);



function createPlaceCardElements(place) {
    const { firstName } = place;
    const wrapper = createElement('li', { classNames: ['cardWrapper'] }, [
        createCardImage(place), createElement('article', { classNames: ['cardContainer'] }, [
            createCardImage(place), createElement('h2', { classNames: ['cardName'] }, [
                document.createTextNode(firstName)])])]);
    return wrapper;
};

/**
 * @param {string} type
 * @param {object} options
 * @param {string[]} options.classNames
 * @param {function} options.onClick
 * @param {HTMLElement[]} children
 */
function createElement(type, { classNames, onClick }, children) {
    const elem = document.createElement(type);
    elem.classList.add(...classNames);
    elem.onclick = onClick;
    elem.append(...children);
    return elem;
};

function createCardImage(place) {
    const { firstName, id } = place;
    const imageWrapper = document.createElement('div');
    imageWrapper.setAttribute('id', `wrapper${id}`);
    imageWrapper.classList.add('imageWrapper');
    imageWrapper.style.backgroundColor = stringToColour(firstName);
    const initials = document.createElement('div');
    initials.classList.add('imagePlaceholder', 'imagePlacement');
    initials.append(document.createTextNode(firstName[0] || ''));
    imageWrapper.append(initials, createImage(place));
    return imageWrapper;
};

function createImage({ profilePicture, lastName, id}) {
    const image = document.createElement('img');
    image.classList.add('cardImage', 'imagePlacement');
    image.setAttribute('src', profilePicture);
    image.setAttribute('alt', lastName);
    image.dataset.id = id;
    image.addEventListener('error', imageErrorHandler);
    // image.addEventListener('load', imageLoadHandler);
    return image;
};

// EVENT LISTENERS
function imageErrorHandler({ target }) {
    target.remove();
};

function imageLoadHandler({ target: { dataset: { id }}, target }) {
    document.getElementById(`wrapper${id}`).append(target);
};

// UTILS
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
};
