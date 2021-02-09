const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const app = express();

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://qualified.us.auth0.com/.well-known/jwks.json",
  }),

  // Validate the audience and the issuer.
  audience: "https://www.qualifiedcharters.com",
  issuer: "https://qualified.us.auth0.com/",
  algorithms: ["RS256"],
});

// Automatically allow cross-origin requests
app.use(cors({origin: true}));
const functions = require("firebase-functions");
app.use("/favorites", require("./controllers/favorites")(checkJwt));


// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
