

---

# AI Assistant Extension  

Video Link<https://youtu.be/rrBq7jrAU2Q>

---

## Features  
- **Interactive AI Chat:** Get assistance with algorithm problems or debugging code.  
- **Local Storage Support:** Messages are saved locally for each problem for reference.  
- **Clean and Modern UI:** Styled using Tailwind CSS for a sleek look.  
- **Customizable Prompts:** Default AI instructions ensure focused and consistent responses.  

---

## Project Structure  

```plaintext
src/
├── assets/          # Contains static assets
├── content/         # Contains main functional components (e.g., Cpage.jsx)
├── App.css          # Global styles
├── App.jsx          # Main application entry point
├── index.css        # Tailwind CSS styles
├── main.jsx         # Application bootstrapping
public/  
├── index.html       # HTML template
manifest.json        # Chrome extension manifest
```

---

## Prerequisites  

1. **Node.js** (v16 or higher)  
2. **npm** (Node Package Manager)  
3. **Google Chrome**  

---

## Installation  

1. **Clone the Repository:**  
   ```bash
   git clone <https://github.com/sasank-555/sasank_nasika_submission>
   ```

2. **Install Dependencies:**  
   ```bash
   npm install
   ```  

3. **Set Up Tailwind CSS (Optional):**  
   Tailwind is already configured in `index.css`. You can customize it further if needed.  

---

## Building the Extension  

1. **Build the Project:**  
   Run the following command to generate the `build/` folder:  
   ```bash
   npm run build
   ```  

2. **Load the Extension in Chrome:**  
   - Open Google Chrome and navigate to `chrome://extensions/`.  
   - Enable **Developer Mode** in the top-right corner.  
   - Click **Load unpacked** and select the `build/` folder generated in the previous step.  
   - The extension will appear in the extensions list, ready for use.  

---

## Usage  

1. Open any webpage and click the extension icon.  
2. Click the **"Ask AI"** button to open the chat interface.  
3. Input your algorithm problem or debugging question, and the AI will provide suggestions.  
4. Messages are stored locally for reference, so you can revisit them anytime.  

---

## Key Components  

- **Cpage.jsx:**  
   The main component handling chat functionality, including message rendering, user inputs, and interactions with the OpenAI API.  

- **manifest.json:**  
   Defines metadata and permissions for the Chrome extension.  

---

## Technologies Used  

- **React.js**: Frontend framework.  
- **Tailwind CSS**: For styling the application.  
- **Axios**: To make API calls to OpenAI's GPT models.  
- **Crux:** Used initially for scaffolding the Chrome extension.  

---

## Troubleshooting  

1. **Extension Not Loading in Chrome:**  
   Ensure you select the correct `build/` folder when loading the unpacked extension.  

2. **Chat Not Responding:**  
   - Verify that you have entered your OpenAI API key.  
   - Ensure you have a stable internet connection.  

3. **Styling Issues:**  
   - Verify Tailwind CSS is correctly included in `index.css`.  
   - Ensure `npm run build` completes without errors.  

---

## License  

This project is licensed under the MIT License. Feel free to modify and distribute.  

---

## Acknowledgments  

- Thanks to **React** and **Tailwind CSS** for making this project easy to develop and style.  
- Powered by OpenAI's GPT model.  

--- 

