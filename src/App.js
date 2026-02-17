import React, { useRef, useState, useEffect } from "react";
import "./App.css"; // External CSS for styling

const App = () => {
  const canvasRef = useRef(null);
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [lang, setLang] = useState("ar");
  const [fontLoaded, setFontLoaded] = useState(false);
  const blankImage = "/images/ramadhan2026.jpeg"; // Path to blank image

  useEffect(() => {
    const font = new FontFace("Amiri", "url(/fonts/HELVETICANEUELTARABIC-BOLD.TTF)");
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      setFontLoaded(true);
    });
  }, []);

  const generateImage = () => {
    if (!fontLoaded) {
      alert("Font is still loading. Please wait...");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = blankImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      ctx.font = "bold 60px 'Amiri', serif";
      ctx.fillStyle = "white";
      ctx.direction = lang === "ar" ? "rtl" : "ltr";
      ctx.textAlign = "center";

      const textX = canvas.width / 2.8;
      const textY = 540;
      ctx.fillText(name, textX, textY);

      setImageURL(canvas.toDataURL("image/png"));
    };
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "output.png";
    link.click();
  };

  return (
    <div className="container">
      <h2>{lang === "ar" ? "أدخل الاسم" : "Enter Name"}</h2>

      {/* Display the blank image above the input field */}
      <img src={blankImage} alt="Blank" className="blank-image" />

      <input
        type="text"
        placeholder={lang === "ar" ? "أدخل الاسم" : "Enter Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={generateImage}>{lang === "ar" ? "إنشاء الصورة" : "Generate Image"}</button>

      <select onChange={(e) => setLang(e.target.value)} value={lang}>
        <option value="ar">Arabic</option>
        <option value="en">English</option>
      </select>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {imageURL && (
        <>
          <h3>{lang === "ar" ? "المعاينة" : "Preview"}</h3>
          <img src={imageURL} alt="Generated" className="responsive-img" />
          <br />
          <button onClick={downloadImage}>{lang === "ar" ? "تحميل" : "Download"}</button>
        </>
      )}
    </div>
  );
};

export default App;
