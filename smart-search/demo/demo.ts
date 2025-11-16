import "../src/smart-search.ts";
import data from "./demo-data.json" assert { type: "json" };

const search = document.querySelector("#search");
console.log("search element:", search);
if (search) {
  search.addEventListener("search-input", (e) => {
    console.log("search-input event received:", e);
    const term = (e as CustomEvent).detail.term;
    console.log("Search term:", term);
    if (typeof term === "string") {
      (search as any).results = data.filter((item: any) =>
        item.title.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      (search as any).results = [];
    }
  });

  search.addEventListener("result-selected", (e) => {
    const detail = (e as CustomEvent).detail;
    if (detail && detail.title) {
      alert("Selected: " + detail.title);
    }
  });
}
