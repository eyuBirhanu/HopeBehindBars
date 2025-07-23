const Publication = require('../models/Publication');

exports.getPublications = async (req, res) => {
  try {
    const publications = await Publication.find({}).sort({ publicationDate: -1 });
    res.json(publications);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};
exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: 'Publication not found' });
    res.json(publication);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};
exports.createPublication = async (req, res) => {
  try {
    const { title, description, link, publicationDate } = req.body;
    if (!title || !description || !link || !publicationDate || !req.file) {
      return res.status(400).json({ message: 'All fields, including an image, are required.' });
    }
    const newPublication = new Publication({
      title,
      description,
      link,
      publicationDate: new Date(publicationDate), // <-- Already correct, but good to confirm
      imageUrl: req.file.path
    });
    await newPublication.save();
    res.status(201).json(newPublication);
  } catch (error) {
    console.error("Error creating publication:", error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};
exports.updatePublication = async (req, res) => {
    try {
        const { title, description, link, publicationDate } = req.body;
        const publication = await Publication.findById(req.params.id);
        if (!publication) return res.status(404).json({ message: 'Publication not found' });
        
        if(title) publication.title = title;
        if(description) publication.description = description;
        if(link) publication.link = link;
        if(publicationDate) publication.publicationDate = new Date(publicationDate); // <-- FIX
        if (req.file) publication.imageUrl = req.file.path;

        await publication.save();
        res.json(publication);
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};
exports.deletePublication = async (req, res) => {
    try {
        await Publication.findByIdAndDelete(req.params.id);
        res.json({ message: 'Publication removed' });
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};