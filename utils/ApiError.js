// API ke custom error throw karne ka standar procedure banana 


class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        // passing an array of custom errors 
        error = [],
        stack =""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = flse;
        this.errors = errors

        if(stack){
            this.stack = stack
        }else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}