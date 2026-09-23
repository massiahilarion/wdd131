const products = [
  { id: "fc-1888", name: "flux capacitor" },
  { id: "fc-2050", name: "power laces" },
  { id: "fs-1987", name: "time circuits" },
  { id: "ac-2000", name: "low voltage reactor" },
  { id: "jj-1969", name: "warp equalizer" }
];

const featureLabels = {
  durability: "Durability",
  "ease-of-use": "Ease of Use",
  performance: "Performance",
  design: "Design"
};

function productNameFor(id) {
  const match = products.find((p) => p.id === id);
  return match ? match.name : id;
}

function renderSummary(params) {
  const list = document.getElementById("summary-list");
  if (!list) return;

  const productId = params.get("product");
  const rating = params.get("overall-rating");
  const date = params.get("installation-date");
  const features = params.getAll("features");
  const review = params.get("review");
  const username = params.get("username");

  const rows = [
    ["Product", productId ? productNameFor(productId) : "—"],
    ["Rating", rating ? `${"★".repeat(Number(rating))}${"☆".repeat(5 - Number(rating))} (${rating}/5)` : "—"],
    ["Installed", date || "—"],
    ["Useful Features", features.length ? features.map((f) => featureLabels[f] || f).join(", ") : "None selected"],
    ["Written Review", review && review.trim() ? review : "—"],
    ["Submitted By", username && username.trim() ? username : "Anonymous"]
  ];

  list.innerHTML = "";
  rows.forEach(([key, value]) => {
    const li = document.createElement("li");
    const dt = document.createElement("span");
    dt.className = "k";
    dt.textContent = key;
    const dd = document.createElement("span");
    dd.textContent = value;
    li.append(dt, dd);
    list.appendChild(li);
  });
}

function updateReviewCounter(hasSubmission) {
  const key = "reviewsCompleted";
  let count = Number(localStorage.getItem(key)) || 0;

  if (hasSubmission) {
    count += 1;
    localStorage.setItem(key, String(count));
  }

  const counterEl = document.getElementById("review-count");
  if (counterEl) counterEl.textContent = count;
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const hasSubmission = params.toString().length > 0;

  const heading = document.getElementById("confirmation-heading");
  const summarySection = document.getElementById("summary-section");

  if (hasSubmission) {
    renderSummary(params);
  } else if (heading && summarySection) {
    heading.textContent = "No Review Submitted Yet";
    summarySection.hidden = true;
  }

  updateReviewCounter(hasSubmission);
});