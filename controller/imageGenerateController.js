const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const imageGenerate = async (req, res) => {
  const statement = req.body.statement || '';

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  if (statement.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid animal',
      },
    });
    return;
  }
  try {
    const response = await openai.createImage({
      prompt: statement,
      n: 1,
      size: '1024x1024',
    });
    const newurl = response.data.data[0].url;
    console.log('newurl: ', newurl);
    res.redirect(`/statement/renderHome?image=${newurl}`);
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'There is an error in generating the image',
      },
    });
  }
};

const renderHome = async (req, res) => {
  const image = req.query.image || '';
  console.log('req.query: ', req.query);
  delete req.query.image;
  let url = '';
  for (const key in req.query) {
    url += '&' + key + '=' + req.query[key];
  }

  const newUrl = image + url;

  res.render('home', { data: newUrl });
};
module.exports = {
  imageGenerate,
  renderHome,
};
