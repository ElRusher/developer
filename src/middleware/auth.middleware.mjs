const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization header:', authHeader); // Log para depuração
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  const token = authHeader.replace('Bearer ', '');
  console.log('Token extracted:', token); // Log para depuração
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Log para depuração
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err); // Log para depuração
    res.status(401).json({ message: 'Token is not valid' });
  }
};