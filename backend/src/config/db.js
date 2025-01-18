const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

// Vérification de la présence de la variable MONGO_URI
if (!uri) {
  console.error('Erreur : MONGO_URI n\'est pas défini. Assurez-vous que le fichier .env existe ou que la variable d\'environnement est configurée.');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB est connecté !');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));


