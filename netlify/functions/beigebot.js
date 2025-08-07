const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    if (!userMessage) {
      return {
        statusCode: 400,
        body: JSON.stringify({ reply: "No message received." }),
      };
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are BeigeBot, a sarcastic but hilarious assistant who helps users explore satirical T-shirts from Intentional Error. Your responses should be witty, short, and absurdist." },
        { role: "user", content: userMessage }
      ],
      temperature: 0.85,
      max_tokens: 150,
    });

    const reply = chatResponse.data.choices[0].message.content.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };

  } catch (error) {
    console.error("Error from BeigeBot:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "BeigeBot malfunctioned. Blame capitalism." }),
    };
  }
};