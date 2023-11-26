exports.handleError = (err, req, res, next) => {
    console.error(err);

    if (err.status && err.message) {
        res.status(err.status).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal server error' });
    }
};
