'use strict';

/* new URL('https://www.facebook.com/DwayneJohnson'); // {hostname}
new Map().set('www.facebook.com', 'src to fb icon'); // key-hostname */

const cardContainer = document.getElementById('root');

const cards = responseData.map((place) => createPlaceCardElements(place));

cardContainer.append(...cards);

function createPlaceCardElements(place) {
    const { firstName, lastName, description, specialty } = place;
    return createElement('li', { classNames: ['cardWrapper'] }, [
        createCardImage(place),
        createElement('article', { classNames: ['cardContainer'] }, [
            createCardImage(place), createElement('h2', { classNames: ['cardName'] }, [
                document.createTextNode(`${firstName} ${lastName}` || '')]),
            createElement('h3', { classNames: ['cardSpecialty'] }, [
                document.createTextNode(specialty || '')]),
            createElement('p', { classNames: ['cardDescription'] }, [
                document.createTextNode(description)])])]);
}

function createContacts(contacts = []) {
    return contacts.map((contactLink) => {
        const { hostname } = new URL(contactLink);
        const src = mapLink.get(hostname);
        return createElement('img', {
            classNames: ['cardIcon'],
            attributes: { 'src': src, 'alt': 'contact' },
        });
    })
}

/**
 * @param {string} type
 * @param {object} options
 * @param {string[]} options.classNames
 * @param {object} options.attributes
 * @param {function} options.onClick
 * @param {HTMLElement[]} children
 */
function createElement(type, { classNames, onClick, attributes }, children) {
    const elem = document.createElement(type);
    elem.classList.add(...classNames);
    elem.onclick = onClick;
    // for (const [attrName, attrValue] of Object.entries(attributes)) {
    //     elem.setAttribute(attrName, attrValue);
    // }
    elem.append(...children);
    return elem;
}

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
}

function createImage({ profilePicture, lastName, id }) {
    const image = document.createElement('img');
    image.classList.add('cardImage', 'imagePlacement');
    image.setAttribute('src', profilePicture);
    image.setAttribute('alt', lastName);
    image.dataset.id = id;
    image.addEventListener('error', imageErrorHandler);
    image.addEventListener('load', imageLoadHandler);
    return image;
}

// EVENT LISTENERS
function imageErrorHandler({ target }) {
    target.remove();
}

function imageLoadHandler({target: {dataset: {id}},target}) {
    debugger
    const test =   document.getElementById(`wrapper${id}`)
    console.log(test)
    test.append(target);
}

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
}