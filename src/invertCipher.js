const invert = obj => {
    const newObj = {};
    Object.keys(obj).forEach(key => newObj[obj[key]] = key);
    return newObj;
}

module.exports = invert;
