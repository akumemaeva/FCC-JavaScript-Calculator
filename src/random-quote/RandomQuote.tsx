import { useState, useEffect } from "react";

function RandomQuote() {
  type Quote = {
    text: string;
    author: string | null;
  }

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();

            // Defensive: make sure it's an array
            if (Array.isArray(data) && data.length > 0) {
                setQuotes(data);
                const random = Math.floor(Math.random() * data.length);
                setRandomQuote(data[random]);
            }
        } catch (err) {
            console.error("Failed to fetch quotes", err);
        }
    }

    fetchData();
}, []);

const getNewQuote = () => {
    if (quotes.length === 0) return;

    const index = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[index]);

    const hex = "0123456789ABCDEF";
    let newColor = "#";
    for (let i = 0; i < 6; i++) {
        newColor += hex[Math.floor(Math.random() * 16)];
    }
    setBgColor(newColor);
};

  return (
    <div
      style={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.5s ease",
      }}
    >
      <div
        id="quote-box"
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          maxWidth: "600px",
          width: "90%",
          color: "#333",
          transition: "color 0.5s ease",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <p id="text" style={{ fontSize: "1.5rem" }}>
          "{randomQuote?.text || "Loading..."}"
        </p>
        <p id="author" style={{ textAlign: "right", marginTop: "1rem" }}>
          — {randomQuote?.author || "Unknown"}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
              `"${randomQuote.text}" — ${randomQuote.author || "Unknown"}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: bgColor }}
          >
            <i className="fa fa-twitter" />
          </a>

          <button
            id="new-quote"
            onClick={getNewQuote}
            style={{
              backgroundColor: bgColor,
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
            }}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default RandomQuote;