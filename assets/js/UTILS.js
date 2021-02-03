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

