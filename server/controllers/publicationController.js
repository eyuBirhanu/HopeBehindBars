const Publication = require('../models/Publication');

// GET all publications (Public)
exports.getPublications = async (req, res) => {
  try {
    const publications = await Publication.find({}).sort({ createdAt: -1 });
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET a single publication by ID (for editing)
exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: 'Publication not found' });
    res.json(publication);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// CREATE a new publication (Protected)
exports.createPublication = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    if (!title || !description || !link) {
      return res.status(400).json({ message: 'Title, description, and link are required.' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'An image screenshot is required.' });
    }
    const newPublication = new Publication({ title, description, link, imageUrl: req.file.path });
    await newPublication.save();
    res.status(201).json(newPublication);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// UPDATE a publication (Protected)
exports.updatePublication = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: 'Publication not found' });

    publication.title = title || publication.title;
    publication.description = description || publication.description;
    publication.link = link || publication.link;
    if (req.file) {
      publication.imageUrl = req.file.path;
    }
    await publication.save();
    res.json(publication);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// DELETE a publication (Protected)
exports.deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) return res.status(404).json({ message: 'Publication not found' });
    res.json({ message: 'Publication removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};