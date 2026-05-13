
import "regenerator-runtime/runtime";
import { useState } from "react";
import { Document, Packer, Paragraph } from "docx";
import { PDFDocument } from "pdf-lib";
import tamilFont from "./assets/NotoSansTamil-Regular.ttf";
import hindiFont from "./assets/NotoSansDevanagari-Regular.ttf"; 
import arabicFont from "./assets/NotoSansArabic-Regular.ttf";
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

  
  const API_BASE = "https://backend-api-2026-dwe2dccgbgapdse2.centralindia-01.azurewebsites.net/api";
  //const API_KEY = "fqCg260ZdO96R3jukDshL4cNt3X5OCRNkLwyaJX6";
  const API_KEY = "";

  // 🔹 TEXT TRANSLATE
  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoadingTranslate(true);
    setTranslatedText("");

    try {
      const response = await fetch(`${API_BASE}/translateText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          userId: "123",
          sourceLanguage: "auto",
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
    console.log("DELETE URL:", `${API_BASE}/deleteTranslation/${id}`);

    try {
      const response = await fetch(`${API_BASE}/deleteTranslation/${id}`, {
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

      setHistory((prev) => prev.filter((item) => 
        String(item.translationId) !== String(id) && 
        String(item.id) !== String(id) && 
        String(item.rowKey) !== String(id)
      ));
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

      console.log("Sending fileKey to backend:", outputFileKey);

      const res = await fetch(`${API_BASE}/summarizeTextLambda`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          fileKey: outputFileKey,
        }),
      });

      console.log("Response status:", res.status);

      const data = await res.json();
      console.log("Summarize response:", data);

      let parsed = data;

      if (data.body) {
        parsed = JSON.parse(data.body);
        console.log("Parsed inner body:", parsed);
      }

      if (parsed.error) {
        console.error("Summary backend error:", parsed.error);
        setToast(parsed.error);
        setLoadingSummary(false);
        return;
      }

      const finalSummary =
        parsed.summary ||
        parsed.result ||
        parsed.output ||
        "No summary generated";

      console.log("FINAL SUMMARY:", finalSummary);
      console.log(
        "SUMMARY PREVIEW (first 200 chars):",
        finalSummary.substring(0, 200)
      );

      setSummary(finalSummary);
      setShowSummary(true);
    } catch (err) {
      console.error("Summarization error:", err);
      setToast("Summarization failed ❌");
    }

    setLoadingSummary(false);
  };

  // 🔹 HISTORY
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/GetTranslationHistory`, {
        headers: { "x-api-key": API_KEY },
      });

      const data = await res.json();

      console.log("History API response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch");
      }

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

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang =
      lang === "ta" ? "ta-IN" :
      lang === "hi" ? "hi-IN" :
      lang === "es" ? "es-ES" :
      lang === "fr" ? "fr-FR" :
      lang === "de" ? "de-DE" :
      lang === "it" ? "it-IT" :
      lang === "pt" ? "pt-PT" :
      lang === "ja" ? "ja-JP" :
      lang === "ko" ? "ko-KR" :
      lang === "zh" ? "zh-CN" :
      lang === "ar" ? "ar-SA" :
      lang === "ru" ? "ru-RU" :
      lang === "ml" ? "ml-IN" :
      lang === "te" ? "te-IN" :
      lang === "kn" ? "kn-IN" :
      lang === "bn" ? "bn-IN" :
      lang === "gu" ? "gu-IN" :
      lang === "mr" ? "mr-IN" :
      lang === "pa" ? "pa-IN" :
      "en-US";

    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setToast("Please select a file ⚠️");
      setTimeout(() => setToast(""), 2000);
      return;
    }

    const reader = new FileReader();

    setLoadingUpload(true);

    reader.onload = async () => {
      try {
        const base64 = reader.result.split(",")[1];

        console.log("UPLOADING FILE:", file.name);
        console.log("TARGET LANGUAGE:", targetLanguage);

        const res = await fetch(`${API_BASE}/uploadTranslateLambda`, {
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

        console.log("UPLOAD RESPONSE STATUS:", res.status);

        const data = await res.json();

        console.log("UPLOAD RESPONSE:", data);
        console.log(
          "TRANSLATED TEXT FROM UPLOAD:",
          data.translatedText?.substring(0, 300)
        );
        console.log("OUTPUT FILE KEY STORED:", data.outputFile);

        setTranslatedDocText(data.translatedText);
        setOutputFileKey(data.outputFile);

        setToast("File translated successfully ✅");
        setTimeout(() => setToast(""), 2000);
      } catch (error) {
        console.log("UPLOAD ERROR:", error);
        setToast("Upload failed ❌");
        setTimeout(() => setToast(""), 2000);
      }

      setLoadingUpload(false);
    };

    reader.readAsDataURL(file);
  };

  // 🔹 FONT
  const getFont = async (pdfDoc, text) => {
    const isTamil = /[\u0B80-\u0BFF]/.test(text);
    const isHindi = /[\u0900-\u097F]/.test(text); 
    const isArabic = /[\u0600-\u06FF]/.test(text);

    let fontUrl = normalFont; // Default for English/Spanish

    if (isTamil) {
      fontUrl = tamilFont;
    } else if (isHindi) {
      fontUrl = hindiFont; 
    } else if (isArabic) {
      fontUrl = arabicFont; 
    }

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
    // This splits the giant text block into separate paragraphs!
    const paragraphs = translatedDocText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => new Paragraph({ text: line, spacing: { after: 200 } })); 

    const doc = new Document({
      sections: [
        {
          children: paragraphs, 
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
        <div style={styles.backgroundGlowOne}></div>
        <div style={styles.backgroundGlowTwo}></div>

        <div style={styles.homeWrapper}>
          <div style={styles.heroCard}>
            <div style={styles.heroBadge}>AI Powered</div>
            <h1 style={styles.heroTitle}>AI Translator</h1>
            <p style={styles.heroSubtitle}>
              Translate text and documents in a clean, fast, and professional workspace.
            </p>

            <div style={styles.homeButtonGroup}>
              <button style={styles.primaryButtonLarge} onClick={() => setPage("text")}>
                Translate Words / Sentence
              </button>

              <button style={styles.secondaryButtonLarge} onClick={() => setPage("file")}>
                Translate File
              </button>
            </div>
          </div>
        </div>

        {toast && <div style={styles.toast}>{toast}</div>}
      </div>
    );
  }

  // 📝 TEXT PAGE
  if (page === "text") {
    return (
      <div style={styles.pageAlt}>
        <div style={styles.appShell}>
          <div style={styles.topBar}>
            <button style={styles.backButton} onClick={() => setPage("home")}>
              ← Back
            </button>
            <div style={styles.topBarTitleWrap}>
              <h2 style={styles.pageTitle}>Text Translation</h2>
              <p style={styles.pageSubtitle}>
                Enter text and instantly translate it into your selected language.
              </p>
            </div>
          </div>

          <div style={styles.mainCard}>
            <div style={styles.controlHeader}>
              <div>
                <p style={styles.label}>Target Language</p>
                <select
                  style={styles.select}
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                >
                  {languageOptions}
                </select>
              </div>

              <div style={styles.actionButtonsInline}>
                <button style={styles.primaryButton} onClick={handleTranslate}>
                  {loadingTranslate ? "Translating..." : "Translate 🚀"}
                </button>
                <button style={styles.outlineButton} onClick={fetchHistory}>
                  History
                </button>
              </div>
            </div>

            <div style={styles.splitAreaProfessional}>
              <div style={styles.panel}>
                <div style={styles.panelHeader}>
                  <span style={styles.panelTitle}>Original Text</span>
                  <span style={styles.langChip}>AUTO</span>
                </div>

                <textarea
                  style={styles.textareaProfessional}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text here..."
                />

                <div style={styles.actionRowProfessional}>
                  <button
                    style={styles.iconButton}
                    onClick={() => speakText(text, sourceLanguage)}
                    title="Listen"
                  >
                    🔊
                  </button>
                  <button
                    style={styles.iconButton}
                    onClick={() => copyText(text)}
                    title="Copy"
                  >
                    📋
                  </button>
                </div>
              </div>

              <div style={styles.panel}>
                <div style={styles.panelHeader}>
                  <span style={styles.panelTitle}>Translated Text</span>
                  <span style={styles.langChip}>{targetLanguage.toUpperCase()}</span>
                </div>

                <textarea
                  style={styles.textareaProfessional}
                  value={translatedText}
                  readOnly
                  placeholder="Translated text will appear here..."
                />

                <div style={styles.actionRowProfessional}>
                  <button
                    style={styles.iconButton}
                    onClick={() => speakText(translatedText, targetLanguage)}
                    title="Listen"
                  >
                    🔊
                  </button>
                  <button
                    style={styles.iconButton}
                    onClick={() => copyText(translatedText)}
                    title="Copy"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>

            {showHistory && (
              <div style={styles.historyCard}>
                <div style={styles.historyHeader}>
                  <div>
                    <h3 style={styles.sectionTitle}>Translation History</h3>
                    <p style={styles.sectionSubtext}>
                      Previously translated entries
                    </p>
                  </div>

                  <button
                    style={styles.closeSoftButton}
                    onClick={() => setShowHistory(false)}
                  >
                    ✕
                  </button>
                </div>

                {history.length === 0 ? (
                  <p style={styles.emptyText}>No translations yet.</p>
                ) : (
                  <div style={styles.tableWrapper}>
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
                          <tr key={item.id}>
                            <td style={styles.td}>
                              <div style={styles.tableTextBlock}>
                                <span style={styles.tableLang}>
                                  {item.sourceLanguage?.toUpperCase()}
                                </span>
                                <span>{item.text}</span>
                              </div>
                            </td>

                            <td style={styles.td}>
                              <div style={styles.tableTextBlock}>
                                <span style={styles.tableLang}>
                                  {item.targetLanguage?.toUpperCase()}
                                </span>
                                <span>{item.translatedText}</span>
                              </div>
                            </td>

                            <td style={styles.tdCenter}>
                              <button
                                style={styles.deleteButton}
                                onClick={() => handleDelete(item.id)}
                              >
                                🗑
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {toast && <div style={styles.toast}>{toast}</div>}
      </div>
    );
  }

  // 📄 FILE PAGE
  if (page === "file") {
    return (
      <div style={styles.pageAlt}>
        <div style={styles.appShell}>
          <div style={styles.topBar}>
            <button style={styles.backButton} onClick={() => setPage("home")}>
              ← Back
            </button>
            <div style={styles.topBarTitleWrap}>
              <h2 style={styles.pageTitle}>File Translation</h2>
              <p style={styles.pageSubtitle}>
                Upload a file, translate it, download it, and generate a summary.
              </p>
            </div>
          </div>

          <div style={styles.mainCard}>
            <div style={styles.controlHeaderFile}>
              <div style={styles.selectBlock}>
                <p style={styles.label}>Target Language</p>
                <select
                  style={styles.select}
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                >
                  {languageOptions}
                </select>
              </div>
            </div>

            <div style={styles.uploadCard}>
              <div style={styles.uploadIcon}>📄</div>
              <h3 style={styles.uploadTitle}>Choose a file to translate</h3>
              <p style={styles.uploadSubtitle}>
                Supported by your existing backend flow. No backend logic changed.
              </p>

              <div style={styles.fileInputWrap}>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={styles.fileInput}
                />
              </div>

              <button style={styles.primaryButtonWide} onClick={handleFileUpload}>
                {loadingUpload ? "Uploading & Translating..." : "Upload & Translate 🚀"}
              </button>
            </div>

            <div style={styles.fileActionsRow}>
              <button
                style={styles.voiceButton}
                onClick={() => speakText(translatedDocText, targetLanguage)}
              >
                🔊 Play Voice
              </button>

              <button style={styles.summaryButton} onClick={handleSummarize}>
                {loadingSummary ? "Summarizing..." : "✨ Summarize"}
              </button>
            </div>

            {/* 🔹 LIVE TRANSLATION PREVIEW BOX 🔹 */}
            {translatedDocText && (
              <>
                <div style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "20px",
                  marginTop: "20px",
                  marginBottom: "20px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.02)"
                }}>
                  <h3 style={styles.sectionTitle}>👁️ Live Translation Preview</h3>
                  <textarea
                    readOnly
                    value={translatedDocText}
                    rows={8}
                    style={{
                      width: "100%",
                      padding: "15px",
                      borderRadius: "12px",
                      border: "1px solid #cbd5e1",
                      backgroundColor: "#f8fafc",
                      marginTop: "10px",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      resize: "vertical",
                      outline: "none",
                      color: "#334155"
                    }}
                  />
                </div>

                {/* 🔹 DOWNLOAD OPTIONS (Only shows after translation) 🔹 */}
                <div style={styles.downloadCard}>
                  <div>
                    <h3 style={styles.sectionTitle}>Download Translated File</h3>
                    <p style={styles.sectionSubtext}>
                      Export in your preferred format
                    </p>
                  </div>

                  <div style={styles.downloadRow}>
                    <button style={styles.downloadButton} onClick={downloadTXT}>
                      TXT
                    </button>
                    <button style={styles.downloadButton} onClick={downloadPDF}>
                      PDF
                    </button>
                    <button style={styles.downloadButton} onClick={downloadDOCX}>
                      DOCX
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {showSummary && (
            <div style={styles.summaryOverlay}>
              <div style={styles.summaryBox}>
                <div style={styles.summaryHeader}>
                  <div>
                    <h3 style={styles.sectionTitle}>Summary</h3>
                    <p style={styles.sectionSubtext}>
                      Generated from the translated file
                    </p>
                  </div>

                  <button
                    style={styles.closeSoftButton}
                    onClick={() => setShowSummary(false)}
                  >
                    ✕
                  </button>
                </div>

                <div style={styles.summaryActionRow}>
                  <button
                    style={styles.downloadButton}
                    onClick={() => speakText(summary, targetLanguage)}
                  >
                    🔊 Play Summary
                  </button>

                  <button
                    style={styles.outlineButtonDark}
                    onClick={() => copyText(summary)}
                  >
                    📋 Copy Summary
                  </button>
                </div>

                <textarea style={styles.summaryText} value={summary} readOnly />
              </div>
            </div>
          )}
        </div>

        {toast && <div style={styles.toast}>{toast}</div>}
      </div>
    );
  }

  return null;
}

const languageOptions = (
  <>
    <option value="ar">Arabic</option>
    <option value="bn">Bengali</option>
    <option value="zh">Chinese (Simplified)</option>
    <option value="en">English</option>
    <option value="fr">French</option>
    <option value="de">German</option>
    <option value="gu">Gujarati</option>
    <option value="hi">Hindi</option>
    <option value="it">Italian</option>
    <option value="ja">Japanese</option>
    <option value="kn">Kannada</option>
    <option value="ko">Korean</option>
    <option value="ml">Malayalam</option>
    <option value="mr">Marathi</option>
    <option value="pa">Punjabi</option>
    <option value="pt">Portuguese</option>
    <option value="ru">Russian</option>
    <option value="es">Spanish</option>
    <option value="ta">Tamil</option>
    <option value="te">Telugu</option>
  </>
);

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #2563eb 100%)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
  },

  pageAlt: {
    minHeight: "100vh",
    width: "100%",
    background: "#f4f7fb",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    padding: "32px 20px",
    boxSizing: "border-box",
  },

  backgroundGlowOne: {
    position: "absolute",
    top: "-120px",
    left: "-80px",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.10)",
    filter: "blur(20px)",
  },

  backgroundGlowTwo: {
    position: "absolute",
    bottom: "-120px",
    right: "-80px",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    filter: "blur(18px)",
  },

  homeWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    position: "relative",
    zIndex: 2,
    boxSizing: "border-box",
  },

  heroCard: {
    width: "100%",
    maxWidth: "760px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "28px",
    padding: "48px 36px",
    textAlign: "center",
    boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
    color: "#ffffff",
  },

  heroBadge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.16)",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.4px",
    marginBottom: "18px",
  },

  heroTitle: {
    fontSize: "48px",
    margin: "0 0 14px 0",
    fontWeight: "800",
    lineHeight: "1.1",
  },

  heroSubtitle: {
    fontSize: "17px",
    lineHeight: "1.7",
    color: "rgba(255,255,255,0.88)",
    margin: "0 auto 32px auto",
    maxWidth: "600px",
  },

  homeButtonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "center",
  },

  primaryButtonLarge: {
    padding: "16px 24px",
    minWidth: "240px",
    borderRadius: "14px",
    border: "none",
    background: "#ffffff",
    color: "#12306b",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
  },

  secondaryButtonLarge: {
    padding: "16px 24px",
    minWidth: "240px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.35)",
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
  },

  appShell: {
    maxWidth: "1250px",
    margin: "0 auto",
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },

  topBarTitleWrap: {
    flex: 1,
  },

  backButton: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid #d7deea",
    background: "#ffffff",
    color: "#172033",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
  },

  pageTitle: {
    margin: "0",
    fontSize: "30px",
    color: "#0f172a",
    fontWeight: "800",
  },

  pageSubtitle: {
    margin: "6px 0 0 0",
    color: "#64748b",
    fontSize: "15px",
  },

  mainCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 18px 50px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e9eef5",
  },

  controlHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },

  controlHeaderFile: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "end",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },

  selectBlock: {
    minWidth: "260px",
  },

  label: {
    margin: "0 0 8px 0",
    fontSize: "13px",
    fontWeight: "700",
    color: "#475569",
  },

  select: {
    minWidth: "240px",
    padding: "13px 14px",
    borderRadius: "12px",
    border: "1px solid #d6deea",
    fontSize: "15px",
    background: "#f8fafc",
    outline: "none",
    color: "#0f172a",
  },

  actionButtonsInline: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  primaryButton: {
    padding: "13px 20px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(37, 99, 235, 0.25)",
  },

  primaryButtonWide: {
    width: "100%",
    maxWidth: "320px",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(37, 99, 235, 0.25)",
  },

  outlineButton: {
    padding: "13px 18px",
    borderRadius: "12px",
    border: "1px solid #d6deea",
    background: "#ffffff",
    color: "#0f172a",
    fontWeight: "700",
    cursor: "pointer",
  },

  outlineButtonDark: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid #d6deea",
    background: "#ffffff",
    color: "#0f172a",
    fontWeight: "700",
    cursor: "pointer",
  },

  splitAreaProfessional: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },

  panel: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    minHeight: "420px",
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },

  panelTitle: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#0f172a",
  },

  langChip: {
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#1d4ed8",
    fontWeight: "700",
    fontSize: "12px",
  },

  textareaProfessional: {
    flex: 1,
    width: "100%",
    resize: "none",
    border: "1px solid #d7dfeb",
    borderRadius: "16px",
    padding: "16px",
    fontSize: "15px",
    lineHeight: "1.6",
    background: "#ffffff",
    outline: "none",
    color: "#111827",
    boxSizing: "border-box",
    minHeight: "300px",
  },

  actionRowProfessional: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "14px",
  },

  iconButton: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    border: "1px solid #d6deea",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "18px",
  },

  historyCard: {
    marginTop: "26px",
    background: "#f8fafc",
    borderRadius: "20px",
    padding: "20px",
    border: "1px solid #e2e8f0",
  },

  historyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    gap: "12px",
  },

  sectionTitle: {
    margin: "0",
    fontSize: "22px",
    color: "#0f172a",
    fontWeight: "800",
  },

  sectionSubtext: {
    margin: "4px 0 0 0",
    color: "#64748b",
    fontSize: "14px",
  },

  closeSoftButton: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    color: "#ef4444",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "16px",
  },

  emptyText: {
    margin: "12px 0 0 0",
    color: "#64748b",
  },

  tableWrapper: {
    overflowX: "auto",
    borderRadius: "16px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
  },

  th: {
    textAlign: "left",
    padding: "16px",
    background: "#eff6ff",
    color: "#1e3a8a",
    fontSize: "14px",
    fontWeight: "800",
    borderBottom: "1px solid #dbeafe",
  },

  td: {
    padding: "16px",
    borderBottom: "1px solid #edf2f7",
    verticalAlign: "top",
    fontSize: "14px",
    color: "#0f172a",
  },

  tdCenter: {
    padding: "16px",
    borderBottom: "1px solid #edf2f7",
    verticalAlign: "middle",
    textAlign: "center",
  },

  tableTextBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    lineHeight: "1.5",
  },

  tableLang: {
    display: "inline-block",
    width: "fit-content",
    padding: "4px 8px",
    borderRadius: "999px",
    background: "#eef2ff",
    color: "#4338ca",
    fontWeight: "700",
    fontSize: "12px",
  },

  deleteButton: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    border: "1px solid #fee2e2",
    background: "#fff5f5",
    cursor: "pointer",
    fontSize: "16px",
  },

  uploadCard: {
    border: "1px dashed #cbd5e1",
    borderRadius: "22px",
    padding: "34px 24px",
    background: "linear-gradient(180deg, #f8fbff 0%, #f1f5f9 100%)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },

  uploadIcon: {
    fontSize: "40px",
    marginBottom: "4px",
  },

  uploadTitle: {
    margin: "0",
    fontSize: "22px",
    fontWeight: "800",
    color: "#0f172a",
  },

  uploadSubtitle: {
    margin: "0 0 10px 0",
    color: "#64748b",
    fontSize: "14px",
  },

  fileInputWrap: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    border: "1px solid #d7dfeb",
    borderRadius: "14px",
    padding: "14px",
    boxSizing: "border-box",
  },

  fileInput: {
    width: "100%",
  },

  fileActionsRow: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "22px",
  },

  voiceButton: {
    padding: "13px 18px",
    borderRadius: "12px",
    border: "1px solid #d6deea",
    background: "#ffffff",
    color: "#0f172a",
    fontWeight: "700",
    cursor: "pointer",
  },

  summaryButton: {
    padding: "13px 18px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(124, 58, 237, 0.22)",
  },

  downloadCard: {
    marginTop: "24px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },

  downloadRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  downloadButton: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    background: "#10b981",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(16, 185, 129, 0.20)",
  },

  summaryOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
    boxSizing: "border-box",
  },

  summaryBox: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "900px",
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.24)",
  },

  summaryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
  },

  summaryActionRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "14px",
    flexWrap: "wrap",
  },

  summaryText: {
    marginTop: "6px",
    width: "100%",
    minHeight: "340px",
    borderRadius: "16px",
    border: "1px solid #d7dfeb",
    padding: "16px",
    fontSize: "15px",
    lineHeight: "1.7",
    resize: "none",
    boxSizing: "border-box",
    outline: "none",
    background: "#f8fafc",
  },

  toast: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    background: "#0f172a",
    color: "#ffffff",
    padding: "14px 18px",
    borderRadius: "14px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    zIndex: 2000,
    fontWeight: "600",
    fontSize: "14px",
  },
};

export default App;