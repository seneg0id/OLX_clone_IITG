const cookieParser = require("cookie-parser");
const express = require("express");
const expressSession = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bunyan = require("bunyan");
const morgan = require("morgan");
const mongodb = require("mongodb");
const keys = require("./keys");
const User = require("./models/user");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const ProdRoute = require("./routes/product");
const catRoute = require("./routes/category");
const passport = require("passport");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");
const axios = require('axios')
const UserRoute = require('./routes/User')
const DealRoute = require('./routes/deal')
const OIDCStrategy = require("passport-azure-ad").OIDCStrategy;



const log = bunyan.createLogger({
  name: "Microsoft OIDC Example Web Application",
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new OIDCStrategy(
    {
      identityMetadata: keys.OIDC.identityMetadata,
      clientID: keys.OIDC.clientID,
      responseType: keys.OIDC.responseType,
      responseMode: keys.OIDC.responseMode,
      redirectUrl: keys.OIDC.redirectUrl,
      allowHttpForRedirectUrl: keys.OIDC.allowHttpForRedirectUrl,
      clientSecret: keys.OIDC.clientSecret,
      validateIssuer: keys.OIDC.validateIssuer,
      isB2C: keys.OIDC.isB2C,
      issuer: keys.OIDC.issuer,
      passReqToCallback: keys.OIDC.passReqToCallback,
      scope: keys.OIDC.scope,
      loggingLevel: keys.OIDC.loggingLevel,
      nonceLifetime: keys.OIDC.nonceLifetime,
      nonceMaxAmount: keys.OIDC.nonceMaxAmount,
      useCookieInsteadOfSession: keys.OIDC.useCookieInsteadOfSession,
      cookieEncryptionKeys: keys.OIDC.cookieEncryptionKeys,
      clockSkew: keys.OIDC.clockSkew,
    },
    (iss, sub, profile, accessToken, refreshToken, done) => {
      User.findOne({ OID: profile.oid }).then((currentUser) => {
        if (currentUser) {
          console.log("user exist " + currentUser);
          done(null, currentUser);
        } else {
          new User({
            Username: profile.displayName,
            OID: profile.oid,
            email: profile._json.preferred_username,
          })
            .save()
            .then((newUser) => {
              console.log("new user created" + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

const app = express();
app.use(morgan("dev"));
app.use(methodOverride());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);

if (keys.useMongoDBSessionStore.useMongoDBSessionStore) {
  mongoose.connect(keys.DbURI.dburi);
  app.use(
    expressSession({
      secret: "secret",
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
      store: MongoStore.create({
        mongoUrl: keys.DbURI.dburi,
        clear_interval: 24 * 60 * 60,
      }),
    })
  );
} else {
  app.use(
    expressSession({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: false,
    })
  );
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
});



app.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

app.get(
  "/auth/outlook",
  (req, res, next) => {
    passport.authenticate("azuread-openidconnect", {
      response: res,
      failureRedirect: "http://localhost:3000/auth/login",
    })(req, res, next);
  },
  (req, res) => {
    log.info("Login was called in the Sample");
    res.redirect("http://localhost:3000/home");
  }
);

app.get(
  "/auth/outlook/callback",
  (req, res, next) => {
    passport.authenticate("azuread-openidconnect", {
      response: res,
      failureRedirect: "http://localhost:3000/auth/login",
    })(req, res, next);
  },
  (req, res) => {
    log.info("We received a return from AzureAD.");
    res.redirect("http://localhost:3000/home");
  }
);

app.post(
  "/auth/outlook/callback",
  (req, res, next) => {
    passport.authenticate("azuread-openidconnect", {
      response: res,
      failureRedirect: "http://localhost:3000/auth/login",
    })(req, res, next);
  },
  (req, res) =>  {
    log.info("We received a return from AzureAD.");
    res.send(req.user)
    const accToken = jwt.sign({
      id: req.user._id,
      isAdmin:req.user.isAdmin,
    }, keys.JWT.secretKey, { expiresIn: '3d' })
    console.log(accToken);
    User.findByIdAndUpdate(req.user._id, { accessToken: accToken }, (err, docs) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log(docs)
      }
    })
    res.redirect("http://localhost:3000/home");
  }
);

app.get("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    req.logout();
    res.redirect(keys.destroySessionUrl.destroySessionUrl);
  });
});

app.use("/api/products", ProdRoute);
app.use("/api/categories", catRoute);
app.use('/api/users/',UserRoute)
app.use('/api/deals/',DealRoute)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("running on port " + PORT);
});
