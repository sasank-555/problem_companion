import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode, useState, useEffect } from "react";
import Cpage from "./content/Cpage";

// Function to extract text and constraints

const App = () => {
  const [inputFormat, setInputFormat] = useState(null);
  const [outputFormat, setOutputFormat] = useState(null);
  const [Description, setDescription] = useState("");
  const [constr, setConstr] = useState("");
  const [usercode, setUsercode] = useState("");
  useEffect(() => {
    const inputFormatElem = document.querySelector(
      ".coding_input_format__pv9fS.problem_paragraph"
    );
    const outputFormatElem = document.querySelector(
      ".coding_input_format__pv9fS.problem_paragraph"
    );
    // const descriptionText = extractTextFromElement();
    // const constraints = extractConstraints();
    // const constraintsText = generateConstraintPrompt(constraints);
    // const usercodetext = extractCode();
    // setUsercode(usercodetext);
    // setInputFormat(dottt(elements[0]));
    // setOutputFormat(dottt(elements[1]));
    // setDescription(descriptionText);
    // setConstr(constraintsText);
  }, []);

  return (
    <div>
      <Cpage
      // inputFormat={inputFormat}
      // outputFormat={outputFormat}
      // Description={Description}
      // constraints={constr}
      // usercode={usercode}
      />
    </div>
  );
};

const root = document.createElement("span");
root.id = "_AZ_HELPER__";

const container = document.getElementsByClassName(
  "py-4 px-3 coding_desc_container__gdB9M"
)[0];
container.insertAdjacentElement("afterend", root);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
