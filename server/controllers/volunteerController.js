const VolunteerApplication = require('../models/VolunteerApplication');

/**
 * @desc    Submit a new volunteer application
 * @route   POST /api/volunteer
 * @access  Public
 */
exports.submitApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    
    const application = new VolunteerApplication(applicationData);
    
    await application.save();
    
    res.status(201).json({ message: 'Application submitted successfully!' });

  } catch (error) {
    console.error("Error submitting volunteer application:", error);
    
    res.status(500).json({ message: 'Server error: Could not submit application.' });
  }
};


/**
 * @desc    Get all volunteer applications
 * @route   GET /api/volunteer
 * @access  Private/Admin
 */
exports.getApplications = async (req, res) => {
  try {
    const applications = await VolunteerApplication.find({}).sort({ createdAt: -1 });
    res.status(200).json(applications);

  } catch (error) {
    console.error("Error fetching volunteer applications:", error);
    res.status(500).json({ message: 'Server Error: Could not fetch applications.' });
  }
};


/**
 * @desc    Update status for one or more applications
 * @route   PUT /api/volunteer/status
 * @access  Private/Admin
 */
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { ids, status } = req.body; 
    
    await VolunteerApplication.updateMany(
      { _id: { $in: ids } },
      { $set: { status: status } }
    );
    
    res.json({ message: `${ids.length} application(s) updated to ${status}` });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};


/**
 * @desc    Delete one or more applications
 * @route   DELETE /api/volunteer
 * @access  Private/Admin
 */
exports.deleteApplications = async (req, res) => {
  try {
    const { ids } = req.body;
    await VolunteerApplication.deleteMany({ _id: { $in: ids } });
    res.json({ message: `${ids.length} application(s) deleted successfully` });
  } catch (error) {
    console.error("Error deleting applications:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};