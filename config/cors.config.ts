export const corsOption = {
  origin: [
    'http://localhost:3000',
    'http://3.36.186.11:5000',
    'https://hoodiev.com',
    'https://server.hoodiev.com',
  ],
  methods: 'GET, POST, PUT, PATCH, DELETE',
  credentials: true,
};

export const HeaderOption = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://hoodiev.com');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
};
