const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const generateDescription = async (req, res) => {
  try {

    const {
      productName,
      ingredients,
      weight,
      features,
      tone
    } = req.body;

    if (
      !productName ||
      !ingredients ||
      !weight ||
      !features ||
      !tone
    ) {
      return res.status(400).json({
        message: "Please fill all fields."
      });
    }

    const prompt = `
You are an expert e-commerce copywriter.

Write an SEO-friendly product description.

Product Name: ${productName}

Ingredients: ${ingredients}

Weight: ${weight}

Features: ${features}

Tone: ${tone}

Requirements:
- Around 120 words.
- Highlight key benefits.
- Use persuasive language.
- End with a call to action.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt
    });

    res.status(200).json({
      description: response.text
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "AI generation failed.",
      error: error.message
    });

  }
};

module.exports = {
  generateDescription
};