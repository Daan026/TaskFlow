require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Import models to register associations
require('./models/User');
require('./models/Project');
require('./models/Task');

const authRoutes     = require('./routes/auth');
const projectRoutes  = require('./routes/projects');
const taskRoutes     = require('./routes/tasks');

const app = express();

app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks',    taskRoutes);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database gesynchroniseerd');
  app.listen(PORT, () => console.log(`🚀 Server draait op poort ${PORT}`));
}).catch((err) => {
  console.error('❌ Database verbinding mislukt:', err);
  process.exit(1);
});
