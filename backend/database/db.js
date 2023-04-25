const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://Soumya:root@cluster0.dzjb3tw.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    })
    
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

module.exports = mongoose;