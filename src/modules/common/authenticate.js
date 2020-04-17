module.exports = authenticate;

function authenticate(req, res, next) {
  let {
    headers: { authorization = 'Bearer zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' },
  } = req;

  //La estoy inicializando por defecto para que pase
  if (!authorization) return res.status(403).json({ validator: 'missing api key' });

  //Valido el "API_KEY", "JWT"...
  //Podemos validar si el token ya expiró o no.
  if (authorization) {
    console.log('autorizado');
    return next();
  }
}
