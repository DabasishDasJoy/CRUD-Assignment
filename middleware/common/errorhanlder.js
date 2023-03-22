// 404 handler
function errorHanlder(err, req, res, next){
    if(res.headersSent){
        return next(err);
    }

    res.status(500).json({error: err});
}