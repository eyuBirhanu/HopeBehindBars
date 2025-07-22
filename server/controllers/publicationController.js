const Publication = require('../models/Publication');

/**
 * @desc    Get all publications, sorted newest first
 * @route   GET /api/publications
 * @access  Public
 */
exports.getPublications = async (req, res) => {
  try {
    const publications = await Publication.find({}).sort({ createdAt: -1 });
    res.status(200).json(publications);
  } catch (error) {
    console.error("Error fetching publications:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get a single publication by its ID
 * @route   GET /api/publications/:id
 * @access  Public
 */
exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.status(200).json(publication);
  } catch (error) {
    console.error(`Error fetching publication with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Create a new publication
 * @route   POST /api/publications
 * @access  Private/Admin
 */
exports.createPublication = async (req, res) => {
  try {
    const { title, description, link } = req.body;

    // Validation
    if (!title || !description || !link) {
      return res.status(400).json({ message: 'Title, description, and link are required.' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'A photo is required for the publication.' });
    }

    // Create a new document in the database
    const newPublication = new Publication({
      title,
      description,
      link,
      imageUrl: req.file.path // Get the secure URL from Cloudinary via multer
    });

    await newPublication.save();
    res.status(201).json(newPublication);
  } catch (error) {
    console.error("Error creating publication:", error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

/**
 * @desc    Update an existing publication
 * @route   PUT /api/publications/:id
 * @access  Private/Admin
 */
exports.updatePublication = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    // Update fields from the form
    publication.title = title || publication.title;
    publication.description = description || publication.description;
    publication.link = link || publication.link;
    
    // If a new photo was uploaded, update its URL
    if (req.file) {
      // Note: This doesn't delete the old image from Cloudinary, which is a more advanced step.
      publication.imageUrl = req.file.path;
    }

    const updatedPublication = await publication.save();
    res.status(200).json(updatedPublication);
  } catch (error) {
    console.error(`Error updating publication with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

/**
 * @desc    Delete a publication
 * @route   DELETE /api/publications/:id
 * @access  Private/Admin
 */
exports.deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    // Note: This also doesn't delete the image from Cloudinary.
    res.status(200).json({ message: 'Publication removed successfully' });
  } catch (error) {
    console.error(`Error deleting publication with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server Error' });
  }
};