const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY,  // we can write simply ' YOUR API KEY' And done now
});

const generateImage = async (req, res) => {
  const { prompt,size }=req.body;

  const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
  try {
    const response = await openai.images.generate({
      n:1,
      size: imageSize,
      prompt,
    });

    const imageUrl = response.data[ 0 ].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: 'An error occurred while generating the image',
    });
  }
};

module.exports = { generateImage };
