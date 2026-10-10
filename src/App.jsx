import { useEffect, useState } from "react";
import Papa from "papaparse";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    const googleSheetCSVUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTuQ2JemforYpSlr3mExGQz-dtUOd_KRaRWECP_j5LJmfBt-y-K7Eu7qIji-bm_3cK4cz8OgsB613uB/pub?output=csv&time=${new Date().getTime()}`;

    Papa.parse(googleSheetCSVUrl, {
      download: true,
      header: true,
      complete: (results) => {
        const dataArray = results.data;
        const structuredData = {
          texts: {},
          hero_imgs: [],
          hero_vids: [],
          about_imgs: [],
          about_vids: [],
        };

        dataArray.forEach((row) => {
          const key = row.Key ? row.Key.trim() : "";
          const val = row.Value ? row.Value.trim() : "";
          if (!key || !val) return;

          if (key.startsWith("hero_img")) structuredData.hero_imgs.push(val);
          else if (key.startsWith("hero_vid"))
            structuredData.hero_vids.push(val);
          else if (key.startsWith("about_img"))
            structuredData.about_imgs.push(val);
          else if (key.startsWith("about_vid"))
            structuredData.about_vids.push(val);
          else structuredData.texts[key] = val;
        });

        setSiteData(structuredData);
      },
      error: (error) => console.error("Error fetching data:", error),
    });
  }, []);

  if (!siteData) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "20vh" }}>
        Loading Portfolio Data...
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <Navbar />
      <Hero
        texts={siteData.texts}
        images={siteData.hero_imgs}
        videos={siteData.hero_vids}
      />
      <About
        texts={siteData.texts}
        images={siteData.about_imgs}
        videos={siteData.about_vids}
      />
      <Projects texts={siteData.texts} />
      <Services texts={siteData.texts} />
      <Contact texts={siteData.texts} />
    </div>
  );
}

export default App;
