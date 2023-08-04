const cron = require('node-cron');
const { Story } = require('../blog/models/Story');

// Define the cron schedule (e.g., every hour)
cron.schedule('0 * * * *', async () => {
  try {
    // Find all stories that have already expired
    const expiredStories = await Story.findAll({
      where: {
        expiresAt: { $lte: new Date() },
      },
    });

    // Delete the expired stories and associated media files
    for (const story of expiredStories) {
      await story.destroy();
    }

    console.log('Expired stories deleted successfully.');
  } catch (error) {
    console.error('Error deleting expired stories:', error);
  }
});