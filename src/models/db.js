const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected.');
  })
  .catch((error) => {
    console.log('MongoDB connection error!', error.message);
  });
