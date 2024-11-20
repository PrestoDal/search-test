// Function to get the query parameter from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the search query from the URL
const query = getQueryParam('query');

// Run the search function with the query if it exists
if (query) {
    searchJSON(query);
}
