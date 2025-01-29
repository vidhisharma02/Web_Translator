import React, { useEffect, useState } from "react";

const GoogleTranslate = () => {
  const [translatedText, setTranslatedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [targetLang, setTargetLang] = useState("hi");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onload = () => {
      // Initialize Google Translate when the script is loaded
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "hi,en,pa,mr,ta",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };
    };
    document.body.appendChild(script);
  }, []);
  
  
  const handleTranslate = () => {
    if (!inputText.trim()) {
      alert("Please enter text to translate.");
      return;
    }

    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURI(inputText)}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data[0] && data[0][0] && data[0][0][0]) {
          setTranslatedText(data[0][0][0]);
        } else {
          throw new Error("Invalid translation response");
        }
      })
      .catch((error) => console.error("Translation Error:", error));
  };

  return (
    <div>
      <h2>Language Translator</h2>
      <div id="google_translate_element"></div>

      <textarea
        placeholder="Enter text to translate..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        <option value="hi">Hindi</option>
        <option value="en">English</option>
        <option value="pa">Punjabi</option>
        <option value="mr">Marathi</option>
        <option value="ta">Tamil</option>
      </select>

      <button onClick={handleTranslate}>Translate</button>

      <p>{translatedText}</p>
    </div>
  );
};

export default GoogleTranslate;
