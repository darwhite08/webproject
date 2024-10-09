async function aby_search_by_text() {
    const searchText = document.getElementById('aby-search-input').value.trim(); // Get the search input text
    if (!searchText) {
        alert("Please enter a search term.");
        return;
    }
    else{
        database_fetch_handle_text(searchText);
    }
}

function database_fetch_handle_text(data) {
    const jsonData = {
        searchType: 'text', 
        text: data,  
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