const typeSelector = document.getElementById('aby-search-types');
typeSelector.addEventListener('change', search_by_type_handle);

function search_by_type_handle(event) {
    // Get the selected type value
    const selectedType = event.target.value;

    // Object to map selected value to type
    const typeRanges = {
        'TV': 'TV',
        'MOV': 'Movie',
        'OVA': 'OVA',
        'ONA': 'ONA',
        'SP': 'Specials',
        'TS': 'Theatrical Shorts',
        'RE': 'Recap Episodes',
        'AN': 'Anthology',
        'WE': 'Web Anime',
        'MV': 'Music Videos',
        'DA': 'Doujin Anime',
        'CR': 'Crossover Anime',
        'PI': 'Pilots'
    };

    // Get the corresponding type data
    const typeData = typeRanges[selectedType];

    if (typeData) {
        // Call the database fetch function based on the selected type
        database_fetch_handle_by_type(typeData);
    }
}

function database_fetch_handle_by_type(typeValue) {
    const jsonData = {
        searchType: 'Type',
        type: typeValue
    };

    // Show loader while fetching
    const loader = document.getElementById('aby-loader');
    loader.style.display = 'flex';

    // Fetch data from the backend
    fetch('/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (!data.animeData.length == 0) {
                different_search_handle(data); 
                } else {
                data_not_found_handle();
                } // Function that displays the data on the page
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            setTimeout(() => {
                loader.style.display = 'none'; // Hide the loader after delay
            }, 1000); // Keep loader for 1 second before disappearing
        });
}
