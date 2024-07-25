const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/snake-ladder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
