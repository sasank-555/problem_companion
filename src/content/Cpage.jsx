import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoCopy } from "react-icons/io5";
const Cpage = () => {
  const extractTextFromElement = () => {
    const elements = document.querySelectorAll(
      ".coding_desc__pltWY.problem_paragraph p"
    );
    let textContent = "";
    elements.forEach((element) => {
      const plainText = element.innerHTML.replace(
        /<span[^>]*class="katex[^>]*">.*?<\/span>/g,
        ""
      );
      const textWithSpaces = plainText.replace(/&nbsp;/g, " ");
      const cleanText = textWithSpaces.replace(/<[^>]+>/g, "").trim();
      textContent += cleanText + "\n";
    });
    return textContent.trim();
  };
  const elements = document.querySelectorAll(
    ".coding_input_format__pv9fS.problem_paragraph"
  );
  const dottt = (element) => {
    let textContent = "";

    const plainText = element.innerHTML.replace(
      /<span[^>]*class="katex[^>]*">.*?<\/span>/g,
      ""
    );
    const textWithSpaces = plainText.replace(/&nbsp;/g, " ");
    const cleanText = textWithSpaces.replace(/<[^>]+>/g, "").trim();
    textContent += cleanText + "\n";

    return textContent.trim();
  };

  const extractConstraints = () => {
    const constraintsElement = elements[2];
    let constraints = [];
    const plainText = constraintsElement.innerHTML.replace(
      /<span[^>]*class="katex[^>]*">.*?<\/span>/g,
      ""
    );
    const cleanText = plainText.replace(/<[^>]+>/g, "").trim();

    const regex =
      /(-?\d+)\s*≤\s*([A-Za-z0-9\[\]\(\),]+)\s*≤\s*(-?\d+(\^\d+)?)/g;
    let match;
    while ((match = regex.exec(cleanText)) !== null) {
      let minValue = parseInt(match[1], 10);
      let maxValue = parseInt(match[3], 10);
      if (minValue >= maxValue) {
        minValue = -Math.abs(minValue);
      }
      constraints.push({
        minValue: minValue,
        variable: match[2],
        maxValue: maxValue,
      });
    }
    return constraints;
  };

  const generateConstraintPrompt = (constraints) => {
    if (!constraints || constraints.length === 0) {
      return "No constraints found.";
    }

    let prompt = "The constraints are: ";
    constraints.forEach((constraint, index) => {
      const { variable, minValue, maxValue } = constraint;
      prompt += `${variable} should be between ${minValue} and ${maxValue}`;
      if (index < constraints.length - 1) {
        prompt += ", ";
      } else {
        prompt += ".";
      }
    });
    return prompt;
  };

  function extractProblemIdFromURL() {
    const url = window.location.href;
    const match = url.match(/-(\d+)$/);

    if (match) {
      return match[1];
    } else {
      console.log("No problem ID found in the URL");
      return null;
    }
  }

  function extractCode() {
    const problemId = extractProblemIdFromURL();
    if (problemId) {
      const storageKey = `course_20123_${problemId}_Python3`;
      const code = localStorage.getItem(storageKey);

      if (code) {
        let formattedCode = code.replace(/\r/g, ""); // Removes \r

        formattedCode = formattedCode.replace(/\\n/g, "\n");

        return formattedCode;
      } else {
        console.log("No code found in localStorage for the given key");
        return "";
      }
    } else {
      return "";
    }
  }

  const [inputFormat, setInputFormat] = useState(null);
  const [outputFormat, setOutputFormat] = useState(null);
  const [Description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [usercode, setUsercode] = useState("");

  const pID = extractProblemIdFromURL();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [API_KEY, setApiKey] = useState("");

  useEffect(() => {
    chrome.storage.local.get("apiKey", (result) => {
      if (result.apiKey) {
        setApiKey(result.apiKey);
      }
    });
    const descriptionText = extractTextFromElement();
    const constraints = extractConstraints();
    const constraintsText = generateConstraintPrompt(constraints);
    const usercodetext = extractCode();
    setUsercode(usercodetext);
    setInputFormat(dottt(elements[0]));
    setOutputFormat(dottt(elements[1]));
    setDescription(descriptionText);
    setConstraints(constraintsText);
    // console.log(usercode, inputFormat);
  });

  useEffect(() => {
    const defaultPrompt = `
  You are an AI assistant specializing in solving algorithm problems. Your mission is to provide helpful guidance, feedback, and insights while empowering the user to learn and solve the problem on their own. Follow these guidelines:

  Understand the Problem:
  - Carefully review the Problem Description, Input Format, Output Format, Constraints, and the User Code.
  - Focus on the problem's specific details and constraints to guide your solution.

  User Details:
  - Problem Description: ${Description || "Not specified"}
  - Input Format: ${inputFormat || "Not specified"}
  - Output Format: ${outputFormat || "Not specified"}
  - Constraints: ${constraints || "Not specified"}
  - User Code: ${usercode || "Not provided"}

  Your Tasks:
  - Ignore Template Code: The user’s code may include input/output templates; focus only on the logic and problem-solving.
  - Analyze the Code: Look for errors, inefficiencies, or areas of improvement.
  - Step-by-step Explanation: Explain how to solve the problem, keeping in mind the constraints and edge cases. 🧠✨
  - Provide Helpful Feedback: Share constructive hints, suggestions, or partial code examples, but avoid giving a complete solution. 💡
  - Encourage Learning: Make your responses clear, concise, and educational. Help the user feel confident and ready to solve the problem on their own. 🚀
  Important Guidelines:
  - Don’t give the complete code: Guide the user with hints and small examples, but let them build the solution.
  - Stay Focused: Keep your responses strictly related to solving the algorithm problem at hand. 🚫📚
  - Clarify Doubts: If needed, ask the user for more details about their approach or logic to provide better assistance. 🤔
  - Be Supportive: Keep the tone friendly, engaging, and positive. Use emojis like 🌟, 🙌, or ✅ to keep the conversation light and fun! Let the user know they’re doing great! 🎉
  `;

    console.log(defaultPrompt);

    let timer;
    if (isOpen && API_KEY) {
      timer = setTimeout(() => {
        // console.log("Timeout reached. Stopping further actions.");
      }, 4000);

      chrome.storage.local.get(pID, (result) => {
        if (result[pID]) {
          setMessages(result[pID]);
        } else {
          const initialMessage = {
            role: "system",
            content: defaultPrompt,
          };
          setMessages([initialMessage]);
        }
      });
    }

    return () => {
      clearTimeout(timer);
    };
  }, [
    isOpen,
    API_KEY,
    pID,
    Description,
    inputFormat,
    outputFormat,
    constraints,
    usercode,
  ]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: updatedMessages,
          max_tokens: 600,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };
      const FinalMes = [...updatedMessages, botMessage];
      setMessages(FinalMes);

      if (pID) {
        chrome.storage.local.set({ [pID]: FinalMes }, () => {
          console.log(`Messages saved for problem ID ${pID}`);
        });
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      alert("Failed to get response. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-y-2 w-full c">
      <button
        className="ant-btn css-19gw05y ant-btn-default Button_gradient_dark_button__r0EJI py-2 px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Chat" : "Ask AI"}
      </button>

      {isOpen && API_KEY === "" && (
        <div>
          <h3 className="text-2xl font-bold mb-4">Please Enter Your Api Key</h3>
        </div>
      )}

      {isOpen && API_KEY !== "" && (
        <div className="w-full bg-[#e5e7e] shadow-lg rounded-lg p-4 coding_leftside_scroll__CMpky">
          <h1 className="text-2xl font-bold mb-4">AI Friend</h1>

          <div className="h-80 overflow-y-auto ">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-lg shadow-md ${msg.role === "user" ? "bg-blue-200 self-end" : "bg-gray-200"}`}
              >
                <strong className="font-semibold">
                  {index === 0 ? "AI" : msg.role === "user" ? "You" : "AI"}:
                </strong>{" "}
                {index === 0
                  ? "Hello! 😊 I'm here to help you with your algorithm problems. Just share your code or question, and we can start solving it together!"
                  : formatMessageContent(msg.content)}
              </div>
            ))}

            {loading && (
              <div className="text-center mt-2">AI is typing... 🧑‍💻</div>
            )}
          </div>

          <div className="flex mt-2">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your algorithm problem or share code..."
            />
            <button
              className="ant-btn css-19gw05y ant-btn-default Button_gradient_light_button__ZDAR_  px-3 px-sm-4 py-2"
              onClick={handleSendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cpage;

function extractProblemIdFromURL() {
  const url = window.location.href;
  const match = url.match(/-(\d+)$/);

  if (match) {
    return match[1];
  } else {
    console.log("No problem ID found in the URL");
    return null;
  }
}
const formatMessageContent = (content) => {
  return content.split("```").map((part, index) => {
    if (index % 2 === 0) {
      return <span key={index}>{part}</span>;
    } else {
      return (
        <div key={index} className="code-block">
          <pre className="bg-black text-white p-2 rounded-md my-2 overflow-x-auto">
            {part}
          </pre>
          <button
            onClick={() => copyToClipboard(part.trim())}
            className=" mt-2 text-white  px-3 py-1 rounded"
          >
            <div className="flex flex-row items-center  gap-2 justify-center">
              Copy
              <IoCopy />
            </div>
          </button>
        </div>
      );
    }
  });
};

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Code copied to clipboard!");
    })
    .catch((err) => {
      console.error("Error copying code: ", err);
    });
};
