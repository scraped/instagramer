const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const crypto = require('crypto');
const {salt} = require('./../../../app.config');
const db = require('./../db');


passport.use(new LocalStrategy(
    {usernameField: 'id', passwordField: 'password'},
    async function (id, password, callback) {
        // Assume there is a DB module pproviding a global UserModel
        const user = await db.models.User.findOne({where: {id, password}});
        if (user) {
            return callback(null, user.toJSON(), {message: 'Logged In Successfully'});
        }
        return callback(null, false, {message: 'Incorrect email or password.'});
    },
));


passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: crypto.createHmac('sha256', salt).digest('hex'),
    },
    async function (jwtPayload, callback) {
        // find the user in db if needed
        const user = await db.models.User.findById(jwtPayload.id);
        if (user) {
            return callback(null, user);
        }
        return callback(new Error('User not found'));
    },
));


async function auth(app) {
    /* POST login. */
    app.post('/login', function (req, res) {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: info ? info.message : 'Login failed',
                    user: user,
                });
            }

            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign(user, crypto.createHmac('sha256', salt).digest('hex'));
                return res.json({user, token});
            });
        })(req, res);
    });


    app.get('/api/user', passport.authenticate('jwt', {session: false}), function (req, res) {
        let user = req.user;
        return res.json({user});
    });

    app.use('/api/admin/*', passport.authenticate('jwt', {session: false}), function (req, res, next) {
        return next();
    });

    app.get('/check', passport.authenticate('jwt', {session: false}), function (req, res, next) {
        return res.json({});
    });

    app.get('/logout', function (req, res) {
        req.logout();
        req.session.destroy(function (err) {
            if (err) {
                return res.status(400).send(err);
            }

            return res.send({status: 'logged out'});
        });
    });
}


module.exports = {auth};
