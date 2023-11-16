// method banaega and usko export kr dega 

// const asyncHandler =()=>{}

export {asyncHandler}

// using the concept of higher orderd function

/*const asyncHandler = ()=>{}
const asyncHandler = (func) =>()=>{}
const asyncHandler=(func) =>async()=>{}*/


//  Handling the response using try catch {ek wrapper create krke}

/*const asyncHandler = (fn) => async(req,res,next) =>{
    try {
        await fn(req,res,next)
        
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
        
    }
}
*/



 // Handling the Response using "Promises"


 const asyncHandler = (requestHandler)=>{
    (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err));
    }
 }



 export{asyncHandler}


