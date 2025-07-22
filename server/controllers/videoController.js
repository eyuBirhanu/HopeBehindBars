const Video = require('../models/Video');

const getYouTubeId = (url) => {
    if (!url) return null;
    const urlParams = new URLSearchParams(new URL(url).search);
    if (urlParams.has('v')) {
        return urlParams.get('v');
    }
    const match = url.match(/youtu\.be\/([^&?]+)/);
    if (match && match[1]) {
        return match[1];
    }
    return null; 
};


// --- GET ALL videos with filtering ---
exports.getVideos = async (req, res) => {
    try {
        let query = {};
        if (req.query.category && req.query.category !== 'All') {
            query.category = req.query.category;
        }
        const limit = parseInt(req.query.limit, 10);
        
        let queryBuilder = Video.find(query).sort({ createdAt: -1 });

        if(limit) {
            queryBuilder = queryBuilder.limit(limit);
        }

        const videos = await queryBuilder;

        res.status(200).json({ videos });
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ message: "Error fetching videos." });
    }
};

// --- GET SINGLE video by ID (This was missing) ---
exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        console.error("Error fetching video by ID:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// --- CREATE a new video ---
exports.createVideo = async (req, res) => {
    const { title, description, youtubeUrl, category } = req.body;
    try {
        const youtubeId = getYouTubeId(youtubeUrl);
        if (!youtubeId) return res.status(400).json({ message: 'Invalid YouTube URL provided.' });

        const newVideo = new Video({ title, description, youtubeId, category });
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        console.error("Error creating video:", error);
        res.status(500).json({ message: 'Error creating video.' });
    }
};

// --- UPDATE a video (This was missing) ---
exports.updateVideo = async (req, res) => {
    const { title, description, youtubeUrl, category } = req.body;
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const youtubeId = getYouTubeId(youtubeUrl);
        if (!youtubeId) return res.status(400).json({ message: 'Invalid YouTube URL provided.' });

        video.title = title;
        video.description = description;
        video.youtubeId = youtubeId;
        video.category = category;

        const updatedVideo = await video.save();
        res.status(200).json(updatedVideo);
    } catch (error) {
        console.error("Error updating video:", error);
        res.status(500).json({ message: 'Error updating video.' });
    }
};

// --- DELETE a video (This was missing) ---
exports.deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error("Error deleting video:", error);
        res.status(500).json({ message: 'Server error' });
    }
};