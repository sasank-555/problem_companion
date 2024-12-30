import axios from "axios";

const API_KEY = `AIzaSyA49icPTDml0jG2FgUFex93Vzs9P0bcMS0`;

export const sendMessageToGemini = async (message) => {
  console.log("Sending message...");
  try {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        contents: [
          {
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      },
    });

    // Log the full response to check its structure
    console.log("Full Response Object:", response.data);

    // Safely access the text content from the response
    const geminiMessage =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    console.log("Gemini Response:", geminiMessage);
    return geminiMessage;
  } catch (error) {
    // Improved error handling
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};
