const express = require('express');
const protect = require('../middleware/auth');
const Project = require('../models/Project');
const Task = require('../models/Task');
const router = express.Router();

// GET /api/projects
router.get('/', protect, async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(projects);
  } catch {
    res.status(500).json({ message: 'Serverfout.' });
  }
});

// GET /api/projects/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!project) return res.status(404).json({ message: 'Project niet gevonden.' });
    res.json(project);
  } catch {
    res.status(500).json({ message: 'Serverfout.' });
  }
});

// POST /api/projects
router.post('/', protect, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Naam is verplicht.' });
    const project = await Project.create({ name, description, userId: req.user.id });
    res.status(201).json(project);
  } catch {
    res.status(500).json({ message: 'Serverfout.' });
  }
});

// PUT /api/projects/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!project) return res.status(404).json({ message: 'Project niet gevonden.' });
    await project.update(req.body);
    res.json(project);
  } catch {
    res.status(500).json({ message: 'Serverfout.' });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!project) return res.status(404).json({ message: 'Project niet gevonden.' });
    await project.destroy();
    res.json({ message: 'Verwijderd.' });
  } catch {
    res.status(500).json({ message: 'Serverfout.' });
  }
});

// GET /api/projects/:id/tasks
router.get('/:id/tasks', protect, async (req, res) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!project) return res.status(404).json({ message: 'Project niet gevonden.' });
    const tasks = await Task.findAll({
      where: { projectId: req.params.id },
      order: [['createdAt', 'ASC']],
    });
    res.json(tasks);
  } catch {
    res.status(500).json({ message: 'Serverfout.' });
  }
});

// POST /api/projects/:id/tasks
router.post('/:id/tasks', protect, async (req, res) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!project) return res.status(404).json({ message: 'Project niet gevonden.' });
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ message: 'Titel is verplicht.' });
    const task = await Task.create({ title, description, status: status || 'todo', projectId: project.id });
    res.status(201).json(task);
  } catch {
    res.status(500).json({ message: 'Serverfout.' });
  }
});

module.exports = router;
