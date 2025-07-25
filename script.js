async function performSearch() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  try {
    const res = await fetch("data/searchData.json");
    const data = await res.json();

    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(input) ||
      item.snippet.toLowerCase().includes(input)
    );

    if (filtered.length === 0) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
    } else {
      filtered.forEach(item => {
        resultsDiv.innerHTML += `
          <div class="result">
            <a href="${item.url}" target="_blank">${item.title}</a>
            <p>${item.snippet}</p>
          </div>
        `;
      });
    }
  } catch (error) {
    resultsDiv.innerHTML = "<p style='color:red;'>Error loading data. Make sure you're using Live Server.</p>";
    console.error(error);
  }
}

