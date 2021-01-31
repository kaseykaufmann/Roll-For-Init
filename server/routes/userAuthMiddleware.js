// Express middleware to verify a user's credentials and pass them on to the calling route for usage.
const authenticateUser = (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const userCookie = req.cookies.auth; //Reminder: cookie MUST be set with the auth header

  if(!userCookie) 
    return res.status(401).send("No authorization token found. Please login to continue.");

  jwt.verify(userCookie, process.env.JWT_SECRET, (error, decoded) => {
    if (error) 
      return res.status(403).send("Authorization token could not be verified. Please clear your cookies and sign in again.");

    req.auth = decoded; //Automatically adds the JWT payload to the request for further use.
    next(); //Proceeds beyond the middleware to the actual route.
  });
}

export default authenticateUser;

/*
JWT+cookie initialization upon successful login:
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({username: username, //any other data//}, process.env.JWT_SECRET, (error, token) => {
    if (error)
      return res.status(500).send("Error in creating authentication token. Please try again.");
    
      res.cookie('auth', token, 
        {maxAge: 360000, httpOnly: true})
        .send("Authentication cookie set."); //MAY REQUIRE cors package with use with fetch()...CHECK!
  });

Cookie deletion on successful logout:
  res.clearCookie('auth').send("Cookie cleared.");

Password hashing upon successful signup:
  const bcrypt = require('bcrypt');
  let hashedPassword;
  bcrypt.hash(password, 10, (error, hash) => {
    if (error) 
      return res.status(500).send("Some error who knows.");
    hashedPassword = hash;
  })

Password hashing for verification on login:
  const bcrypt = require('bcrypt');
  bcrypt.compare(password, hash, (error, result) => {
    if (error) 
      return res.status(500).send("Database comparison error.");
    if (!result)
      return res.status(404).send("Incorrect login.");
  })
*/

/* 
How to restrict a route to authenticated users only:
    app.get('/whatever', authenticateUser, (req, res) => {
      //stuff
    });
*/
