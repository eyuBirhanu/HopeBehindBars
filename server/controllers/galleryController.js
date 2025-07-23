const Gallery = require('../models/Gallery');


exports.createGalleryItem = async (req, res) => {
  try {
    const { title, description, category, eventDate } = req.body;
    if (!title || !description || !category || !eventDate || !req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'All fields and at least one image are required.' });
    }
    const imageUrls = req.files.map(file => file.path);
    const newItem = new Gallery({ title, description, category, eventDate: new Date(eventDate), imageUrls });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating gallery item:", error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};



exports.getGalleryItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 9;
        const category = req.query.category;
        const search = req.query.search;
        
        const startIndex = (page - 1) * limit;
        
        let query = {};
        if (category) {
            query.category = category;
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const totalItems = await Gallery.countDocuments(query);
        const items = await Gallery.find(query).sort({ eventDate: -1 }).limit(limit).skip(startIndex);

        res.status(200).json({
            images: items,
            hasMore: (startIndex + items.length) < totalItems,
        });
    } catch (error) {
        console.error("Error fetching gallery items:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getGalleryItemById = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};


exports.updateGalleryItem = async (req, res) => {
    try {
        const { title, description, category, eventDate } = req.body;
        const item = await Gallery.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (title) item.title = title;
        if (description) item.description = description;
        if (category) item.category = category;
        if (eventDate) item.eventDate = new Date(eventDate); // <-- FIX: Also convert on update

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
exports.deleteGalleryItem = async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Gallery item deleted' });
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};