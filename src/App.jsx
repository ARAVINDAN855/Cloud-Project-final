/*
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("ta");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE =
    "https://9d1yi8itd1.execute-api.ap-south-1.amazonaws.com/prodx";

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setTranslatedText("");

    try {
      const response = await fetch(`${API_BASE}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "123",
          sourceLanguage,
          targetLanguage,
          text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setTranslatedText(data.translatedText);
    } catch (error) {
      alert("Error: " + error.message);
    }

    setLoading(false);
  };

  const handleSwap = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setText(translatedText);
    setTranslatedText(text);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🌍 AI Translator</h1>

        <div style={styles.languageRow}>
          <select
            style={styles.select}
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ta">Tamil</option>
            <option value="es">Spanish</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="zh">Chinese</option>
            <option value="ar">Arabic</option>
            <option value="bn">Bengali</option>
            <option value="ur">Urdu</option>
            <option value="tr">Turkish</option>
            <option value="nl">Dutch</option>
            <option value="sv">Swedish</option>
            <option value="pl">Polish</option>
            <option value="th">Thai</option>
            <option value="vi">Vietnamese</option>
            <option value="id">Indonesian</option>
            <option value="fa">Persian</option>
            <option value="he">Hebrew</option>
            <option value="el">Greek</option>
            <option value="uk">Ukrainian</option>
            <option value="ro">Romanian</option>
            <option value="cs">Czech</option>
            <option value="da">D Danish</option>
            <option value="fi">Finnish</option>
            <option value="no">Norwegian</option>
            <option value="hu">Hungarian</option>
            <option value="ms">Malay</option>
            <option value="te">Telugu</option>
            <option value="ml">Malayalam</option>
            <option value="kn">Kannada</option>
            <option value="mr">Marathi</option>
            <option value="gu">Gujarati</option>
            <option value="pa">Punjabi</option>
            <option value="si">Sinhala</option>
            <option value="sw">Swahili</option>
            <option value="am">Amharic</option>
            <option value="fil">Filipino</option>
          </select>

          <button style={styles.swapButton} onClick={handleSwap}>
            ⇄
          </button>

          <select
            style={styles.select}
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="en">English</option>
<option value="ta">Tamil</option>
<option value="es">Spanish</option>
<option value="hi">Hindi</option>
<option value="fr">French</option>
<option value="de">German</option>
<option value="it">Italian</option>
<option value="pt">Portuguese</option>
<option value="ru">Russian</option>
<option value="ja">Japanese</option>
<option value="ko">Korean</option>
<option value="zh">Chinese</option>
<option value="ar">Arabic</option>
<option value="bn">Bengali</option>
<option value="ur">Urdu</option>
<option value="tr">Turkish</option>
<option value="nl">Dutch</option>
<option value="sv">Swedish</option>
<option value="pl">Polish</option>
<option value="th">Thai</option>
<option value="vi">Vietnamese</option>
<option value="id">Indonesian</option>
<option value="fa">Persian</option>
<option value="he">Hebrew</option>
<option value="el">Greek</option>
<option value="uk">Ukrainian</option>
<option value="ro">Romanian</option>
<option value="cs">Czech</option>
<option value="da">D Danish</option>
<option value="fi">Finnish</option>
<option value="no">Norwegian</option>
<option value="hu">Hungarian</option>
<option value="ms">Malay</option>
<option value="te">Telugu</option>
<option value="ml">Malayalam</option>
<option value="kn">Kannada</option>
<option value="mr">Marathi</option>
<option value="gu">Gujarati</option>
<option value="pa">Punjabi</option>
<option value="si">Sinhala</option>
<option value="sw">Swahili</option>
<option value="am">Amharic</option>
<option value="fil">Filipino</option>
          </select>
        </div>

        <div style={styles.splitArea}>
          <textarea
            style={styles.textarea}
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div style={styles.outputArea}>
            {loading
              ? "Translating..."
              : translatedText || "Translation will appear here..."}
          </div>
        </div>

        <button
          style={styles.translateButton}
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? "Translating..." : "Translate 🚀"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
  },

  container: {
    width: "95%",
    height: "90%",
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    boxShadow: "0 30px 80px rgba(0,0,0,0.2)",
  },

  title: {
    textAlign: "center",
    marginBottom: "50px",
    fontSize: "32px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    color: "#222",
  },

  languageRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    marginBottom: "40px",
  },

  select: {
    padding: "12px 20px",
    borderRadius: "14px",
    border: "1px solid #e0e0e0",
    fontSize: "15px",
    background: "#f9f9ff",
    cursor: "pointer",
    outline: "none",
  },

  swapButton: {
    padding: "12px 16px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transition: "0.3s",
  },

  splitArea: {
    flex: 1,
    display: "flex",
    gap: "40px",
    marginBottom: "35px",
  },

  textarea: {
    flex: 1,
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid #e6e6e6",
    fontSize: "16px",
    resize: "none",
    outline: "none",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    background: "#ffffff",
  },

  outputArea: {
    flex: 1,
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid #e6e6e6",
    backgroundColor: "#f4f6ff",
    fontSize: "16px",
    overflowY: "auto",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },

  translateButton: {
    padding: "18px",
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
};

export default App;*//*

import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("ta");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://9d1yi8itd1.execute-api.ap-south-1.amazonaws.com/prodx";

  const API_KEY = "JAd7QAr9Fq7j402D2iu1u9tZtv02KraeKCnFroQ7"; // 🔐 Put your API key here

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setTranslatedText("");

    try {
      const response = await fetch(`${API_BASE}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          userId: "123",
          sourceLanguage,
          targetLanguage,
          text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Something went wrong");
      }

      setTranslatedText(data.translatedText);
    } catch (error) {
      alert("Error: " + error.message);
    }

    setLoading(false);
  };

  const handleSwap = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setText(translatedText);
    setTranslatedText(text);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Translator</h1>

        <div style={styles.languageRow}>
          <select
            style={styles.select}
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            {languageOptions}
          </select>

          <button style={styles.swapButton} onClick={handleSwap}>
            ⇄
          </button>

          <select
            style={styles.select}
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {languageOptions}
          </select>
        </div>

        <div style={styles.splitArea}>
          <textarea
            style={styles.textarea}
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div style={styles.outputArea}>
            {loading
              ? "Translating..."
              : translatedText || "Translation will appear here..."}
          </div>
        </div>

        <button
          style={styles.translateButton}
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? "Translating..." : "Translate 🚀"}
        </button>
      </div>
    </div>
  );
}

const languageOptions = (
  <>
    <option value="en">English</option>
    <option value="ta">Tamil</option>
    <option value="es">Spanish</option>
    <option value="hi">Hindi</option>
    <option value="fr">French</option>
    <option value="de">German</option>
    <option value="it">Italian</option>
    <option value="pt">Portuguese</option>
    <option value="ru">Russian</option>
    <option value="ja">Japanese</option>
    <option value="ko">Korean</option>
    <option value="zh">Chinese</option>
    <option value="ar">Arabic</option>
    <option value="bn">Bengali</option>
    <option value="ur">Urdu</option>
    <option value="tr">Turkish</option>
    <option value="nl">Dutch</option>
    <option value="sv">Swedish</option>
    <option value="pl">Polish</option>
    <option value="th">Thai</option>
    <option value="vi">Vietnamese</option>
    <option value="id">Indonesian</option>
    <option value="fa">Persian</option>
    <option value="he">Hebrew</option>
    <option value="el">Greek</option>
    <option value="uk">Ukrainian</option>
    <option value="ro">Romanian</option>
    <option value="cs">Czech</option>
    <option value="da">Danish</option>
    <option value="fi">Finnish</option>
    <option value="no">Norwegian</option>
    <option value="hu">Hungarian</option>
    <option value="ms">Malay</option>
    <option value="te">Telugu</option>
    <option value="ml">Malayalam</option>
    <option value="kn">Kannada</option>
    <option value="mr">Marathi</option>
    <option value="gu">Gujarati</option>
    <option value="pa">Punjabi</option>
    <option value="si">Sinhala</option>
    <option value="sw">Swahili</option>
    <option value="am">Amharic</option>
    <option value="fil">Filipino</option>
  </>
);

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
  },

  container: {
    width: "95%",
    height: "90%",
    background: "rgba(255,255,255,0.95)",
    borderRadius: "24px",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    boxShadow: "0 30px 80px rgba(0,0,0,0.2)",
  },

  title: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "32px",
    fontWeight: "700",
    color: "#222",
  },

  languageRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    marginBottom: "40px",
  },

  select: {
    padding: "12px 20px",
    borderRadius: "14px",
    border: "1px solid #e0e0e0",
    fontSize: "15px",
    background: "#f9f9ff",
    cursor: "pointer",
  },

  swapButton: {
    padding: "12px 16px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },

  splitArea: {
    flex: 1,
    display: "flex",
    gap: "40px",
    marginBottom: "35px",
  },

  textarea: {
    flex: 1,
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid #e6e6e6",
    fontSize: "16px",
    resize: "none",
  },

  outputArea: {
    flex: 1,
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid #e6e6e6",
    backgroundColor: "#f4f6ff",
    fontSize: "16px",
    overflowY: "auto",
  },

  translateButton: {
    padding: "18px",
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default App;*/

/*
//lastFinal
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("ta");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const API_BASE =
    "https://9d1yi8itd1.execute-api.ap-south-1.amazonaws.com/prodx";

  const API_KEY = "JAd7QAr9Fq7j402D2iu1u9tZtv02KraeKCnFroQ7";

  // 🔹 Translate
  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setTranslatedText("");

    try {
      const response = await fetch(`${API_BASE}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          userId: "123",
          sourceLanguage,
          targetLanguage,
          text,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error);

      setTranslatedText(data.translatedText);
    } catch (error) {
      alert("Error: " + error.message);
    }

    setLoading(false);
  };

  // 🔹 Fetch History
  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE}/history`, {
        method: "GET",
        headers: {
          "x-api-key": API_KEY,
        },
      });

      const data = await response.json();
      setHistory(data.reverse());
      setShowHistory(true);
    } catch (error) {
      alert("Failed to load history");
    }
  };

  // 🔹 Delete Translation
  // 🔹 Delete Translation
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this translation?");
  if (!confirmDelete) return;

  console.log("Deleting ID:", id);
  console.log("DELETE URL:", `${API_BASE}/history/${id}`);

  try {
    const response = await fetch(`${API_BASE}/history/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
      },
    });

    console.log("Delete response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Delete error response:", errorText);
      throw new Error("Delete failed");
    }

    console.log("Delete successful");

    // Remove from UI instantly
    setHistory((prev) =>
      prev.filter((item) => item.translationId !== id)
    );

  } catch (error) {
    console.log("Delete catch error:", error);
    alert("Error deleting translation");
  }
};

  const handleSwap = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setText(translatedText);
    setTranslatedText(text);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Translator</h1>

        <div style={styles.languageRow}>
          <select
            style={styles.select}
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            {languageOptions}
          </select>

          <button style={styles.swapButton} onClick={handleSwap}>
            ⇄
          </button>

          <select
            style={styles.select}
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {languageOptions}
          </select>
        </div>

        <div style={styles.splitArea}>
          <textarea
            style={styles.textarea}
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div style={styles.outputArea}>
            {loading
              ? "Translating..."
              : translatedText || "Translation will appear here..."}
          </div>
        </div>

        <button
          style={styles.translateButton}
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? "Translating..." : "Translate 🚀"}
        </button>

        <button style={styles.historyButton} onClick={fetchHistory}>
          View History 📜
        </button>

        {showHistory && (
          <div style={styles.historyContainer}>
            <div style={styles.historyHeader}>
              <h2>Translation History</h2>
              <button
                style={styles.closeButton}
                onClick={() => setShowHistory(false)}
              >
                ✖
              </button>
            </div>

            {history.length === 0 ? (
              <p>No translations yet.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Original</th>
                    <th style={styles.th}>Translated</th>
                    <th style={styles.th}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.translationId}>
                      <td style={styles.td}>
                        <strong>{item.sourceLanguage?.toUpperCase()}</strong>
                        {" → "}
                        {item.text}
                      </td>

                      <td style={styles.td}>
                        <strong>{item.targetLanguage?.toUpperCase()}</strong>
                        {" → "}
                        {item.translatedText}
                      </td>

                      <td style={styles.td}>
                        <button
                          style={styles.deleteButton}
                          onClick={() =>
                            handleDelete(item.translationId)
                          }
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const languageOptions = (
  <>
    <option value="en">English</option>
    <option value="ta">Tamil</option>
    <option value="es">Spanish</option>
    <option value="hi">Hindi</option>
    <option value="fr">French</option>
    <option value="de">German</option>
  </>
);

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "40px",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    minHeight: "100%",
    background: "white",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    boxSizing: "border-box",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
  },

  languageRow: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
  },

  swapButton: {
    padding: "10px",
    borderRadius: "50%",
    border: "none",
    background: "#667eea",
    color: "white",
    cursor: "pointer",
  },

  splitArea: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },

  textarea: {
    flex: 1,
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  outputArea: {
    flex: 1,
    padding: "15px",
    borderRadius: "10px",
    background: "#f3f4ff",
  },

  translateButton: {
    width: "100%",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#667eea",
    color: "white",
    cursor: "pointer",
  },

  historyButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#444",
    color: "white",
    cursor: "pointer",
  },

  historyContainer: {
    marginTop: "40px",
    width: "100%",
    overflowX: "auto",
  },

  historyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  closeButton: {
    border: "none",
    background: "red",
    color: "white",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    borderBottom: "2px solid #ddd",
    padding: "15px",
    textAlign: "left",
    background: "#f3f4ff",
  },

  td: {
    padding: "15px",
    borderBottom: "1px solid #eee",
  },

  deleteButton: {
    border: "none",
    background: "#ff4d4d",
    color: "white",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default App;*/
/*
import "regenerator-runtime/runtime";
import { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { PDFDocument, StandardFonts } from "pdf-lib";
import tamilFont from "./assets/NotoSansTamil-Regular.ttf";
import normalFont from "./assets/NotoSans-Regular.ttf";import fontkit from "@pdf-lib/fontkit";
function App() {
  const [text, setText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("ta");
  const [translatedText, setTranslatedText] = useState("");
  const [translatedDocText, setTranslatedDocText] = useState(""); // 🔥 NEW
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");

  const API_BASE =
    "https://9d1yi8itd1.execute-api.ap-south-1.amazonaws.com/prodx";

  const API_KEY = "JAd7QAr9Fq7j402D2iu1u9tZtv02KraeKCnFroQ7";

  // 🔹 TEXT TRANSLATE
  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setTranslatedText("");

    try {
      const response = await fetch(`${API_BASE}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          userId: "123",
          sourceLanguage,
          targetLanguage,
          text,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error);

      setTranslatedText(data.translatedText);
    } catch (error) {
      alert("Error: " + error.message);
    }

    setLoading(false);
  };
  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE}/history`, {
        method: "GET",
        headers: {
          "x-api-key": API_KEY,
        },
      });

      const data = await response.json();
      setHistory(data.reverse());
      setShowHistory(true);
    } catch (error) {
      alert("Failed to load history");
    }
  };

  // 🔹 Delete Translation
  // 🔹 Delete Translation
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this translation?");
  if (!confirmDelete) return;

  console.log("Deleting ID:", id);
  console.log("DELETE URL:", `${API_BASE}/history/${id}`);

  try {
    const response = await fetch(`${API_BASE}/history/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
      },
    });

    console.log("Delete response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Delete error response:", errorText);
      throw new Error("Delete failed");
    }

    console.log("Delete successful");

    // Remove from UI instantly
    setHistory((prev) =>
      prev.filter((item) => item.translationId !== id)
    );

  } catch (error) {
    console.log("Delete catch error:", error);
    alert("Error deleting translation");
  }
};
const handleCopy = () => {
  if (!translatedText) return;

  navigator.clipboard.writeText(translatedText);
  alert("Copied to clipboard ✅");
};
  const getFont = async (pdfDoc, text) => {
  const tamilRegex = /[\u0B80-\u0BFF]/;
  const isTamil = tamilRegex.test(text);

  const fontUrl = isTamil ? tamilFont : normalFont;

  const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());

  return pdfDoc.embedFont(fontBytes, { subset: false });
};
  // 🔹 FILE UPLOAD
  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        const response = await fetch(`${API_BASE}/upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({
            fileContent: base64,
            fileName: file.name,
            sourceLanguage,
            targetLanguage,
          }),
        });

        const data = await response.json();
        console.log("Upload response:", data);

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        // 🔥 IMPORTANT
        setTranslatedDocText(data.translatedText); // store text
        setDownloadLink(data.downloadUrl); // optional S3 link

      } catch (error) {
        console.log(error);
        alert("Upload failed");
      }
    };

    reader.readAsDataURL(file);
  };

  // 🔽 DOWNLOAD TXT
  const downloadTXT = () => {
    const blob = new Blob([translatedDocText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "translated.txt";
    a.click();
  };

  // 🔽 DOWNLOAD PDF
  const downloadPDF = async () => {
  const pdfDoc = await PDFDocument.create();

  pdfDoc.registerFontkit(fontkit);

  //const fontBytes = await fetch(fontFile).then(res => res.arrayBuffer());

  // 🔥 FIX HERE
 //const font = await pdfDoc.embedFont(fontBytes, { subset: false });
const font = await getFont(pdfDoc, translatedDocText);
  const page = pdfDoc.addPage();

  page.drawText(translatedDocText, {
    x: 50,
    y: 700,
    size: 14,
    font,
    maxWidth: 500,
    lineHeight: 20,
  });

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "translated.pdf";
  a.click();
};

  // 🔽 DOWNLOAD DOCX
  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun(translatedDocText)],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "translated.docx";
    a.click();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Translator</h1>

        <div style={styles.languageRow}>
          <select
            style={styles.select}
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            {languageOptions}
          </select>

          <select
            style={styles.select}
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {languageOptions}
          </select>
        </div>

        <div style={styles.splitArea}>
  
  <textarea
    style={styles.textarea}
    placeholder="Enter text..."
    value={text}
    onChange={(e) => setText(e.target.value)}
  />


  <textarea
    style={styles.textarea}
    placeholder="Translated text..."
    value={translatedText}
    readOnly
  />
  <button style={styles.copyButton} onClick={handleCopy}>
  📋 Copy
</button>
</div>

<button style={styles.translateButton} onClick={handleTranslate}>
  {loading ? "Translating..." : "Translate 🚀"}
</button>

        

      
        <div style={{ marginTop: "20px" }}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <button style={styles.translateButton} onClick={handleFileUpload}>
            Upload & Translate 📄
          </button>

         
          {translatedDocText && (
            <div style={{ marginTop: "15px" }}>
              <button onClick={downloadTXT}>Download TXT</button>
              <button onClick={downloadPDF}>Download PDF</button>
              <button onClick={downloadDOCX}>Download DOCX</button>
            </div>
          )}
        </div>
        <button style={styles.historyButton} onClick={fetchHistory}>
          View History 📜
        </button>

        {showHistory && (
          <div style={styles.historyContainer}>
            <div style={styles.historyHeader}>
              <h2>Translation History</h2>
              <button
                style={styles.closeButton}
                onClick={() => setShowHistory(false)}
              >
                ✖
              </button>
            </div>

            {history.length === 0 ? (
              <p>No translations yet.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Original</th>
                    <th style={styles.th}>Translated</th>
                    <th style={styles.th}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.translationId}>
                      <td style={styles.td}>
                        <strong>{item.sourceLanguage?.toUpperCase()}</strong>
                        {" → "}
                        {item.text}
                      </td>

                      <td style={styles.td}>
                        <strong>{item.targetLanguage?.toUpperCase()}</strong>
                        {" → "}
                        {item.translatedText}
                      </td>

                      <td style={styles.td}>
                        <button
                          style={styles.deleteButton}
                          onClick={() =>
                            handleDelete(item.translationId)
                          }
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      
      </div>
    </div>
  );
}
 
const languageOptions = (
  <>
    <option value="en">English</option>
    <option value="ta">Tamil</option>
    <option value="hi">Hindi</option>
    <option value="es">Spanish</option>
    <option value="fr">French</option>
    <option value="de">German</option>
  </>
);

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "#eee",
  },
  container: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
  },
  textarea: {
    width: "100%",
    height: "120px",
    marginBottom: "10px",
  },
  translateButton: {
    padding: "10px",
    background: "#667eea",
    color: "white",
    border: "none",
    marginTop: "10px",
  },
  splitArea: {
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
},
};

export default App;*/

import "regenerator-runtime/runtime";
import { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { PDFDocument } from "pdf-lib";
import tamilFont from "./assets/NotoSansTamil-Regular.ttf";
import normalFont from "./assets/NotoSans-Regular.ttf";
import fontkit from "@pdf-lib/fontkit";

function App() {
  const [page, setPage] = useState("home");
const [toast, setToast] = useState("");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
const [showSummary, setShowSummary] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("ta");
  const [translatedText, setTranslatedText] = useState("");
  const [translatedDocText, setTranslatedDocText] = useState("");
const [loadingTranslate, setLoadingTranslate] = useState(false);
const [outputFileKey, setOutputFileKey] = useState("");
const [loadingUpload, setLoadingUpload] = useState(false);
const [loadingSummary, setLoadingSummary] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [file, setFile] = useState(null);

  const API_BASE =
    "https://9d1yi8itd1.execute-api.ap-south-1.amazonaws.com/prodx";

  const API_KEY = "JAd7QAr9Fq7j402D2iu1u9tZtv02KraeKCnFroQ7";
  //const API_BASE = import.meta.env.VITE_API_BASE;
  //const API_KEY = import.meta.env.VITE_API_KEY;

  // 🔹 TEXT TRANSLATE
  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoadingTranslate(true);
    setTranslatedText("");

    try {
      const response = await fetch(`${API_BASE}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          userId: "123",
          sourceLanguage:"auto",
          targetLanguage,
          text,
        }),
      });

      const data = await response.json();
      setTranslatedText(data.translatedText);
      setToast("Translation successful ✅");
setTimeout(() => setToast(""), 2000);
    } catch (error) {
      setToast("Error: " + error.message);
setTimeout(() => setToast(""), 3000);
    }

      setLoadingTranslate(false);
  };


const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this translation?");
  if (!confirmDelete) return;

  console.log("Deleting ID:", id);
  console.log("DELETE URL:", `${API_BASE}/history/${id}`);

  try {
    const response = await fetch(`${API_BASE}/history/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
      },
    });

    console.log("Delete response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Delete error response:", errorText);
      throw new Error("Delete failed");
    }

    console.log("Delete successful");

    // Remove from UI instantly
    setHistory((prev) =>
      prev.filter((item) => item.translationId !== id)
    );

  } catch (error) {
    console.log("Delete catch error:", error);
    alert("Error deleting translation");
  }
};
  // 🔹 COPY
  const copyText = (text) => {
  if (!text) return;

  navigator.clipboard.writeText(text);
  setToast("Copied ✅");
  setTimeout(() => setToast(""), 2000);
};
const handleSummarize = async () => {
  if (!outputFileKey) {
    setToast("No file to summarize ⚠️");
    return;
  }

  try {
    setLoadingSummary(true);

    const res = await fetch(`${API_BASE}/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        fileKey: outputFileKey, // ✅ now works
      }),
    });

    const data = await res.json();

    setSummary(
      data.summary ||
      data.result ||
      data.output ||
      "No summary generated"
    );

    setShowSummary(true);

  } catch (err) {
    console.log(err);
    setToast("Summarization failed ❌");
  }

  setLoadingSummary(false);
};
  // 🔹 HISTORY
  const fetchHistory = async () => {
  try {
    const res = await fetch(`${API_BASE}/history`, {
      headers: { "x-api-key": API_KEY },
    });

    const data = await res.json();

    console.log("History API response:", data); // 🔥 debug

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch");
    }

    // ✅ SAFE FIX
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format (not array)");
    }

    setHistory(data.reverse());
    setShowHistory(true);

  } catch (error) {
    console.log("History error:", error);
    setToast("History failed ❌");
    setTimeout(() => setToast(""), 2000);
  }
};
const speakText = (text, lang) => {
  if (!text) return;

  window.speechSynthesis.cancel(); // stop previous

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang =
    lang === "ta" ? "ta-IN" :
    lang === "hi" ? "hi-IN" :
    lang === "es" ? "es-ES" :
    "en-US";

  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
};

  // 🔹 FILE UPLOAD
  const handleFileUpload = async () => {
  if (!file) {
    setToast("Please select a file ⚠️");
    setTimeout(() => setToast(""), 2000);
    return;
  }

  const reader = new FileReader();

  setLoadingUpload(true); // ✅ start loading

  reader.onload = async () => {
    try {
      const base64 = reader.result.split(",")[1];

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          fileContent: base64,
          fileName: file.name,
          sourceLanguage: "auto",
          targetLanguage,
          
        }),
      });

      const data = await res.json();

      setTranslatedDocText(data.translatedText);
      setOutputFileKey(data.outputFile); // ✅ THIS WAS MISSING
      
      setToast("File translated successfully ✅");
      setTimeout(() => setToast(""), 2000);

    } catch (error) {
      console.log(error);
      setToast("Upload failed ❌");
      setTimeout(() => setToast(""), 2000);
    }

    setLoadingUpload(false); // ✅ STOP loading HERE
  };

  reader.readAsDataURL(file);
};
  

  // 🔹 FONT
  const getFont = async (pdfDoc, text) => {
    const isTamil = /[\u0B80-\u0BFF]/.test(text);
    const fontUrl = isTamil ? tamilFont : normalFont;
    const fontBytes = await fetch(fontUrl).then((r) => r.arrayBuffer());
    return pdfDoc.embedFont(fontBytes, { subset: false });
  };

  // 🔹 DOWNLOADS
  const downloadTXT = () => {
    const blob = new Blob([translatedDocText]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "translated.txt";
    a.click();
  };

  const downloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const font = await getFont(pdfDoc, translatedDocText);

    const page = pdfDoc.addPage();
    page.drawText(translatedDocText, {
      x: 50,
      y: 700,
      size: 14,
      font,
      maxWidth: 500,
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "translated.pdf";
    a.click();
  };

  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          children: [new Paragraph(translatedDocText)],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "translated.docx";
    a.click();
  };

  // 🏠 HOME
  if (page === "home") {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h1>AI Translator</h1>
          <p>Translate text and files easily</p>

          <button style={styles.button} onClick={() => setPage("text")}>
            Translate Words / Sentence
          </button>

          <button style={styles.button}onClick={() => setPage("file")}>
            Translate File
          </button>
        </div>
      </div>
    );
  }
{toast && <div style={styles.toast}>{toast}</div>}
  // 📝 TEXT PAGE
  if (page === "text") {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <button style={styles.buttonSecondary} onClick={() => setPage("home")}>⬅ Back</button>
<div style={styles.selectRow}>
          {/*<select style={styles.select} value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
            {languageOptions}
          </select>*/}

          <select style={styles.select} value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
            {languageOptions}
          </select>
</div>
          <div style={styles.splitArea}>
  
  {/* ORIGINAL TEXT */}
  <div style={styles.box}>
    <textarea
      style={styles.textarea}
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter text..."
    />

    <div style={styles.actionRow}>
      <button onClick={() => speakText(text, sourceLanguage)}>🔊</button>
      <button onClick={() => copyText(text)}>📋</button>
    </div>
  </div>

  {/* TRANSLATED TEXT */}
  <div style={styles.box}>
    <textarea
      style={styles.textarea}
      value={translatedText}
      readOnly
      placeholder="Translated text..."
    />

    <div style={styles.actionRow}>
      <button onClick={() => speakText(translatedText, targetLanguage)}>🔊</button>
      <button onClick={() => copyText(translatedText)}>📋</button>
    </div>
  </div>

</div>

<button style={styles.button} onClick={handleTranslate}>
  {loadingTranslate ? "Translating..." : "Translate 🚀"}
</button>         
          <button style={styles.buttonSecondary} onClick={fetchHistory}>History</button>

          {showHistory && (
          <div style={styles.historyContainer}>
            <div style={styles.historyHeader}>
              <h2>Translation History</h2>
              <button
                style={styles.closeButton}
                onClick={() => setShowHistory(false)}
              >
                ✖
              </button>
            </div>

            {history.length === 0 ? (
              <p>No translations yet.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Original</th>
                    <th style={styles.th}>Translated</th>
                    <th style={styles.th}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.translationId}>
                      <td style={styles.td}>
                        <strong>{item.sourceLanguage?.toUpperCase()}</strong>
                        {" → "}
                        {item.text}
                      </td>

                      <td style={styles.td}>
                        <strong>{item.targetLanguage?.toUpperCase()}</strong>
                        {" → "}
                        {item.translatedText}
                      </td>

                      <td style={styles.td}>
                        <button
                          style={styles.deleteButton}
                          onClick={() =>
                            handleDelete(item.translationId)
                          }
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        </div>
      </div>
    );
  }
{toast && <div style={styles.toast}>{toast}</div>}
  // 📄 FILE PAGE
  
  if (page === "file") {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <button style={styles.buttonSecondary} onClick={() => setPage("home")}>⬅ Back</button>
          <div style={styles.selectRow}>

          {/*<select style={styles.select} value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
            {languageOptions}
          </select>*/}

          <select style={styles.select} value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
            {languageOptions}
          </select>
          </div>
<div style={styles.fileBox}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
</div>
          <button style={styles.button} onClick={handleFileUpload}>
             {loadingUpload ? "Uploading & Translating..." : "Upload & Translate 🚀"}</button>
<button onClick={() => speakText(translatedDocText, targetLanguage)}>
  🔊 Play Voice
</button>
          {translatedDocText && (
            <>
              <div style={styles.downloadRow}>
 <button style={styles.smallButton} onClick={downloadTXT}>TXT</button>
<button style={styles.smallButton} onClick={downloadPDF}>PDF</button>
<button style={styles.smallButton} onClick={downloadDOCX}>DOCX</button>
</div>
            </>
          )}
          <button style={styles.button} onClick={handleSummarize}>
  {loadingSummary ? "Summarizing..." : "✨ Summarize"}
</button>
          {showSummary && (
  <div style={styles.summaryOverlay}>
    
    <div style={styles.summaryBox}>
      
      <button
        style={styles.closeButton}
        onClick={() => setShowSummary(false)}
      >
        ✖
      </button>

      <h3>Summary</h3>

      <textarea
        style={styles.summaryText}
        value={summary}
        readOnly
      />

    </div>

  </div>
)}
        </div>
      </div>
    );
  }
}

const languageOptions = (
  <>
    <option value="en">English</option>
    <option value="ta">Tamil</option>
    <option value="hi">Hindi</option>
    <option value="es">Spanish</option>
  </>
);

const styles = {
  page: {
  height: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  padding: "0",
  margin: "0",
},

  container: {
  width: "100%",
  height: "100%",
  background: "white",
  borderRadius: "0px",   // remove card look (optional)
  padding: "40px",
  boxSizing: "border-box",
},
box: {
  flex: 1,
  display: "flex",
  flexDirection: "column",
},

actionRow: {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "5px",
},


  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#667eea",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
summaryOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
},

summaryBox: {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  width: "60%",
  maxHeight: "70%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
},

summaryText: {
  marginTop: "10px",
  width: "100%",
  height: "300px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
},

closeButton: {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  cursor: "pointer",
},
  buttonSecondary: {
    width: "10%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#444",
    color: "white",
    cursor: "pointer",
  },

  smallButton: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#28a745",
    color: "white",
    cursor: "pointer",
  },

  splitArea: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },

  textarea: {
    flex: 1,
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    minHeight: "150px",
    resize: "none",
  },

  selectRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },

  select: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
  },

  fileBox: {
    marginTop: "20px",
    padding: "15px",
    border: "2px dashed #ccc",
    borderRadius: "10px",
    textAlign: "center",
  },

  downloadRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  toast: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#333",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
};

export default App;