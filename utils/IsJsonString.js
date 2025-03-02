module.exports = (object) => {
    try {
        JSON.parse(object);
    } catch (e) {
        return false;
    }
    return true;
}