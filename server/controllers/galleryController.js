const Gallery = require('../models/Gallery'); // Ensure this path is correct

// --- CREATE a new gallery item (REVISED AND ROBUST) ---
exports.createGalleryItem = async (req, res) => {
  console.log('Received body:', req.body);
  console.log('Received files:', req.files);

  try {
    const { title, description, category, eventDate } = req.body;

    if (!title || !description || !category || !eventDate) {
      return res.status(400).json({ message: 'Missing required fields: title, description, category, and eventDate are all required.' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image file must be uploaded.' });
    }

    const imageUrls = req.files.map(file => file.path);

    const newItem = new Gallery({
      title,
      description,
      category,
      eventDate,
      imageUrls
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating gallery item:", error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// --- GET ALL GALLERY ITEMS (Unchanged, but included for completeness) ---
exports.getGalleryItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 9;
        const category = req.query.category;
        const search = req.query.search;
        
        const startIndex = (page - 1) * limit;
        let query = {};
        if (category && category.toLowerCase() !== 'all') {
            query.category = category;
        }
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const items = await Gallery.find(query).sort({ eventDate: -1 }).limit(limit).skip(startIndex);
        const totalItems = await Gallery.countDocuments(query);

        res.status(200).json({
            images: items,
            hasMore: (startIndex + items.length) < totalItems,
            total: totalItems,
        });
    } catch (error) {
        console.error("Error fetching gallery items:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- GET A SINGLE ITEM by ID (Unchanged) ---
exports.getGalleryItemById = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- UPDATE an item (Revised for robustness) ---
exports.updateGalleryItem = async (req, res) => {
    try {
        const { title, description, category, eventDate } = req.body;
        const item = await Gallery.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (title) item.title = title;
        if (description) item.description = description;
        if (category) item.category = category;
        if (eventDate) item.eventDate = eventDate;

        if (req.files && req.files.length > 0) {
            item.imageUrls = req.files.map(file => file.path);
        }

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        console.error("Error updating gallery item:", error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// --- DELETE an item (Unchanged) ---
exports.deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        await item.deleteOne();
        res.json({ message: 'Gallery item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};