module.exports = function(req, res, next) {
    const { Username, Email, Password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      console.log(!Email.length);
      if (![Username, Email, Password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(Email)) {
        return res.status(401).json("Invalid Email");
      }
    } else if (req.path === "/login") {

      if (![Username, Password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } 
    //   else if (!validEmail(email)) {
    //     return res.status(401).json("Invalid Email");
    //   }
    }
  
    next();
  };