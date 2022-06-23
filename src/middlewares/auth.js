// import package here
const jwt = require("jsonwebtoken")

exports.auth = (req, res, next) => {
  // code here
  const authHeader = req.header("Authorization")
  console.log("authHeader", authHeader);

  const token = authHeader && authHeader.split(" ")[1]
  console.log("tokenSplit", token);


  if(!token) {
    return res.status(401).send({message: "Access Denied"})
  }

  try {

    const verified = jwt.verify(token, process.env.SECRET_KEY)
    req.user = verified
    next()
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: "failed",
      message: "Invalid Token"
    })
  }

};
 