const categorySelector = document.getElementById('aby-search-category');
categorySelector.addEventListener('change', search_by_category_handle);

function search_by_category_handle(event) {
    const selectedCategory = event.target.value;
    const categoryMap = {
            'AC': 'Action',
            'AD': 'Adventure',
            'CO': 'Comedy',
            'DR': 'Drama',
            'FA': 'Fantasy',
            'HR': 'Harem',
            'HO': 'Horror',
            'IS': 'Isekai',
            'ME': 'Mecha',
            'MY': 'Mystery',
            'RO': 'Romance',
            'SF': 'Sci-Fi',
            'SL': 'Slice of Life',
            'SP': 'Sports',
            'SU': 'Supernatural',
            'PY': 'Psychological',
            'HI': 'Historical',
            'SH': 'Superhero',
            'ID': 'Idol',
            'KO': 'Kodomomuke',
            'DE': 'Seinen',
            'JO': 'Josei',
            'EC': 'Ecchi',
            'HT': 'Hentai',
            'PA': 'Post-Apocalyptic',
            'MF': 'Metafictional',
            'MU': 'Music',
            'DF': 'Dark Fantasy',
            'MA': 'Martial Arts',
            'DEMO': 'Demons',
            'PHO': 'Psychological Horror',
            'SU': 'Survival',
            'FA': 'Family',
            'SFH': 'Sci-Fi Horror',
            'FAH': 'Fantasy Horror',
            'BIS': 'Bishojo',
            'BIA': 'Bishonen',
            'GA': 'Gag',
            'SHOAI': 'Shoujo Ai',
            'SHOAN': 'Shounen Ai',
            'PYT': 'Psychological Thriller'        
    };

    const selectedCategoryName = categoryMap[selectedCategory];

    if (selectedCategoryName) {
        database_fetch_handle_category(selectedCategoryName);
    }
}

function database_fetch_handle_category(category) {
    const jsonData = {
        searchType: 'category',
        category: category
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
