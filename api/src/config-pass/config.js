const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");
const GitHubStrategy = require("passport-github").Strategy;
const { User, Order } = require("../db.js");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      // opciones para entrar al API de google
      callbackURL: "/auth/google/callback",
      clientID: "xxxxxxxxxxx.apps.googleusercontent.com",
      clientSecret: "xxxxxxxxxxxxxxx",
    },
    (accsessToken, refreshToken, profile, done) => {
      // función callback de passport

      User.findOne({
        where: {
          googleId: profile.id,
        },
      })
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            const password = profile.id;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            Promise.all([
              User.create({
                googleId: profile.id,
                name: profile.given_name,
                lastName: profile.family_name,
                password: hash,
                mail: profile.email,
              }),
              Order.create(),
            ]).then((results) => {
              if (results[0].id === 1) {
                Promise.all([
                  User.update(
                    {
                      isAdmin: true,
                    },
                    {
                      where: {
                        id: 1,
                      },
                    }
                  ),
                  Order.destroy({
                    where: {
                      id: 1,
                    },
                  }),
                ]);
              } else {
                results[0].addOrder(results[1]);
              }

              // Para ejecutar las funciones respectivas de
              // Serializar y Deserializar el User
              done(null, results[0]);
            });
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      // opciones para entrar al API de git
      callbackURL: "/auth/github/callback",
      clientID: "xxxxxxxxxxx",
      clientSecret: "xxxxxxxxxxxxxxxxxxxxxxxx",
    },
    (accsessToken, refreshToken, profile, done) => {
      //funcion callback

      User.findOne({
        where: {
          githubId: profile.id,
        },
      })
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            const password = profile.id;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            Promise.all([
              User.create({
                githubId: profile.id,
                name: profile.username,
                lastName: "-",
                password: hash,
                mail: "-",
              }),
              Order.create(),
            ]).then((results) => {
              if (results[0].id === 1) {
                Promise.all([
                  User.update(
                    {
                      isAdmin: true,
                    },
                    {
                      where: {
                        id: 1,
                      },
                    }
                  ),
                  Order.destroy({
                    where: {
                      id: 1,
                    },
                  }),
                ]);
              } else {
                results[0].addOrder(results[1]);
              }

              // Para ejecutar las funciones respectivas de
              // Serializar y Deserializar el User
              done(null, results[0]);
            });
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
