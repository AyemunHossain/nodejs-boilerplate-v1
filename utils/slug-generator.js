const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, '-');
};

export default generateSlug;
