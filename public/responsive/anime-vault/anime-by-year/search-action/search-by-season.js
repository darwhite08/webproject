const seasonSelector = document.getElementById('aby-search-season');
seasonSelector.addEventListener("change", search_by_season_handle);

function search_by_season_handle(event) {
    const selectedSeason = event.target.value;

    const seasonRanges = {
        'season': { season: 'all' },
        'winter': { season: 'winter' },
        'spring': { season: 'spring' },
        'summer': { season: 'summer' },
        'fall': { season: 'fall' },
    };

    const seasonData = seasonRanges[selectedSeason];

    if (seasonData) {
        database_fetch_handle_season(seasonData); // Fetch based on season
    }
}

function database_fetch_handle_season(data) {
    const jsonData = {
        searchType: 'season', 
        season: data.season,  
    };

    const loader = document.getElementById('aby-loader');
    loader.style.display = 'flex'; 

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
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            setTimeout(() => {
                loader.style.display = 'none'; 
            }, 1000);
        });
}
