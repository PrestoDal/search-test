// Function to search and display results
async function searchJSON(query) {
    const results = document.getElementById("results");
    results.innerHTML = ""; // Clear previous results

    // If query is empty, do nothing
    if (query.trim() === "") return;

    try {
        // Fetch the JSON data from a file
        const response = await fetch('data.json'); // Replace 'data.json' with the path to your JSON file
        const data = await response.json(); // Parse the JSON data

        // Filter JSON data based on the search query
        const filteredData = data.filter(item => {
            const searchTerm = query.toLowerCase();
            return (
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.location.toLowerCase().includes(searchTerm) ||
                item.related_terms.some(term => term.toLowerCase().includes(searchTerm)) ||
                String(item.year).includes(searchTerm)
            );
        });

        // Display the filtered results
        if (filteredData.length > 0) {
            filteredData.forEach(item => {
                // Create a list item for each result
                const listItem = document.createElement('p');

                // Format result display based on item type
                const displayText = `${item.type.toUpperCase()}: ${item.name} - ${item.description} (Year: ${item.year}, Location: ${item.location})`;

                // Add related terms
                const relatedTerms = `Related terms: ${item.related_terms.join(", ")}`;

                // Set list item content and append to results
                listItem.textContent = `${displayText}\n${relatedTerms}`;
                results.appendChild(listItem);
            });
        } else {
            results.innerHTML = "<p>No results found</p>";
        }
    } catch (error) {
        console.error("Error fetching JSON data:", error);
        results.innerHTML = ("<p>Error loading data." + error + "</p>");
    }
}
