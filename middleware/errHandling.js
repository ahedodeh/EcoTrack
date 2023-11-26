exports.handleError = (err, req, res, next) => {
    console.error(err);
    console.error(err.stack);  // Print the stack trace

    if (err.status && err.message) {
        res.status(err.status).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal server error' });
    }
};
