import express from 'express';

const app = express();

const PORT = process.env.PORT || 3700;

app.get('/', (req, res) => res.json({ msg: 'Welcome to Contact Keeper API' }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => {
  console.log(`Serve is running on port ${PORT}`);
});
