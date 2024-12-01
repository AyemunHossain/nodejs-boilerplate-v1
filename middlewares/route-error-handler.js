const next = (error, req, res, next) => {
    const status = error.statusCode;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        statusCode: status,
        errorData: data
    });
};

const route = (req, res, next) => {
    const err = new Error('Think twice about route!');
    err.statusCode = 404;
    next(err);
};

export default {
    next,
    route
}