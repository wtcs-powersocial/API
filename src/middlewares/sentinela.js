const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header)
        return res.status(401).send({ mensage: 'Token não provido' });

    const partial = header.split(' ');

    if (partial === 2)
        return res.status(401).send({ mensage: 'Token não reconhecido' });

    const [scheme, token] = partial;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ mensage: 'Token mal formatado.' });

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err)
            res.status(401).send({ mensage: 'Token inválido.' })

        req.userId = decoded._id;
        return next();
    });
}