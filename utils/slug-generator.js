const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, '-');
};

module.exports = generateSlug;