function search() {
  const query = document.getElementById("searchBox").value;
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "Please enter a search term.";
    return;
  }

  resultsDiv.innerHTML = "Loading...";

  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("No results found");
      }
      return response.json();
    })
    .then(data => {
      resultsDiv.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.extract}</p>
        <a href="${data.content_urls.desktop.page}" target="_blank">
          Read more on Wikipedia
        </a>
      `;
    })
    .catch(error => {
      resultsDiv.innerHTML = "Could not find anything for that search.";
    });
}
