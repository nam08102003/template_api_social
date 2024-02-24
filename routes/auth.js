var express = require("express");
const { ServerResponse } = require("http");
const passport = require("passport");
var router = express.Router();

router.get("/google", (req, res) => {
  const emptyResponse = new ServerResponse(req);

  passport.authenticate(
    "google",
    {
      scope: ["email", "profile"],
    },
    (err, user, info) => {
      console.log(err, user, info);
    }
  )(req, emptyResponse);

  const url = emptyResponse.getHeader("location");

  return res.status(200).json({
    status: 200,
    success: false,
    message: "Thành công",
    result: {
      urlRedirect: url,
    },
  });
});
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    const data = req.user;

    return res.json(data);
  }
);

router.get("/github", (req, res) => {
  const emptyResponse = new ServerResponse(req);

  passport.authenticate(
    "github",
    { scope: ["user:email"] },
    (err, user, info) => {
      console.log(err, user, info);
    }
  )(req, emptyResponse);

  const url = emptyResponse.getHeader("location");

  return res.status(200).json({
    status: 200,
    success: false,
    message: "Thành công",
    result: {
      urlRedirect: url,
    },
  });
});
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
  }),
  (req, res) => {
    const data = req.user;

    return res.json(data);
  }
);

module.exports = router;
