function checkValidateName(name) {
    const reg = new RegExp('^[A-Z][a-z]* [A-Z][a-z]*$', 'gmi');
    if (reg.test(name)) {
        return 'success';
    } return 'error';
}

