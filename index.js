const { TgamHistories } = require('./dist/services/special_histories_tgam');

const app = async () => {
    const filePath = '/Users/manginav/Downloads/story-api-tgam-sandbox.sandbox.tgam_histories.json';
    const tgamHistoriesInstance = new TgamHistories(filePath);
    try {
        // const token = ''
        const host = 'https://api.sandbox.tgam.arcpublishing.com'
        const numberOfDocsWithLatestRevisionsOnFeed = await tgamHistoriesInstance.writeDiffOfRevisionsFeedToDefault(token, host)
        // You can process the entries further here (e.g., filter, map, etc.)
    } catch (error) {
        console.error('Error reading JSON file:', error.message);
    }
};

app();
