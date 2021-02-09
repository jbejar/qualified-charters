const express = require("express");
// eslint-disable-next-line new-cap
const apiFavorites = express.Router();
const admin = require("firebase-admin");

admin.initializeApp();
const collection = "favorites";
module.exports = function(checkJwt) {
  apiFavorites.get("/", checkJwt, async (req, res) => {
    const user = req.user.sub;
    const doc = await admin.firestore().collection(collection).doc(user).get();
    // Send back a message that we've successfully written the message
    res.json(doc.data());
  });
  apiFavorites.post("/:schoolID", checkJwt, async (req, res) => {
    const user = req.user.sub;
    // Push the new message into Firestore using the Firebase Admin SDK.
    await admin
        .firestore()
        .collection(collection)
        .doc(user)
        .set({[req.params.schoolID]: true},
            {merge: true});
    // Send back a message that we've successfully written the message
    res.json({result: "Favorite Updated"});
  });
  apiFavorites.delete("/:schoolID", checkJwt, async (req, res) => {
    const user = req.user.sub;
    // Push the new message into Firestore using the Firebase Admin SDK.
    await admin
        .firestore()
        .collection(collection)
        .doc(user)
        .set({[req.params.schoolID]: null},
            {merge: true});
    // Send back a message that we've successfully written the message
    res.json({result: "Delete success"});
  });
  return apiFavorites;
};
