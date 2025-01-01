// netlify/functions/fetch-activities.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { username, start_date, end_date, page } = event.queryStringParameters;
  const accessToken = process.env.ANNICT_TOKEN;  // Netlifyの環境変数から取得

  const url = `https://api.annict.com/v1/activities?access_token=${accessToken}&filter_username=${username}&sort_id=desc&fields=action,created_at,work.title,status.kind&per_page=50&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch data' }),
      };
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error' }),
    };
  }
};
