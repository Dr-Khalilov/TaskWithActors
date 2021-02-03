'use strict';
/* new URL('https://www.facebook.com/DwayneJohnson'); // {hostname}
new Map().set('www.facebook.com', 'src to fb icon'); // key-hostname */

const cardContainer = document.getElementById('root');

const cards = responseData.map((place) => createPlaceCardElements(place));

cardContainer.append(...cards);

function createPlaceCardElements(place) {
    const { firstName, lastName, description, specialty } = place;
    return createElement('li', { classNames: ['cardWrapper'] }, [
        createElement('article', { classNames: ['cardContainer'] }, [
            createCardImage(place), createElement('h2', { classNames: ['cardName'] }, [
                document.createTextNode(`${firstName} ${lastName}` || '')]),
            createElement('h3', { classNames: ['cardSpecialty'] }, [
                document.createTextNode(specialty || '')]),
            createElement('p', { classNames: ['cardDescription'] }, [
                document.createTextNode(description || '')]),
            createElement('div', {
                classNames: ['cardLink'][createLinkIcons(['twitter.com',
                    'www.facebook.com',
                    'www.instagram.com'])]
            })
        ])
    ]);
}


const socNetworks = new Map(
    ['www.facebook.com', './assets/icons/facebook.svg']
    ['twitter.com', './assets/icons/twitter.svg']
    ['www.instagram.com', './assets/icons/instagram.svg']
);

const createLinkIcons = (contacts) => {
    const arrayWithIcons = contacts.map((contact) => {
        const { hostname } = new URL(contact);
        if (socNetworks.has(hostname)) {
            const classList = socNetworks.get(hostname);
            const img = document.createElement('img');
            img.setAttribute('src', scr);

            const a = document.createElement('a');
            a.setAttribute('href', contact);
            a.append(img);
            return a;
        }
        return;
    });
    return arrayWithIcons;
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

