const express = require('express');
const protect = require('../middleware/auth');
const Task = require('../models/Task');
const Project = require('../models/Project');
const router = express.Router();

// PUT /api/tasks/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: Project });
    if (!task) return res.status(404).json({ message: 'Taak niet gevonden.' });
    if (task.Project.userId !== req.user.id)
      return res.status(403).json({ message: 'Geen toegang.' });
    await task.update(req.body);
    res.json(task);
  } catch {
    res.status(500).json({ message: 'Serverfout.' });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: Project });
    if (!task) return res.status(404).json({ message: 'Taak niet gevonden.' });
    if (task.Project.userId !== req.user.id)
      return res.status(403).json({ message: 'Geen toegang.' });
    await task.destroy();
    res.json({ message: 'Verwijderd.' });
  } catch {
    res.status(500).json({ message: 'Serverfout.' });
  }
});

module.exports = router;
