
const yearSelector = document.getElementById('aby-search-year');
yearSelector.addEventListener("change", search_by_year_handle);


function search_by_year_handle(event) {
    const selectedYear = event.target.value;
    const currentYear = new Date().getFullYear();

    const yearRanges = {
        'year': { startYear: 1900, endYear: currentYear },
        '1900-10': { startYear: 1900, endYear: 1910 },
        '1910-20': { startYear: 1910, endYear: 1920 },
        '1920-30': { startYear: 1920, endYear: 1930 },
        '1930-40': { startYear: 1930, endYear: 1940 },
        '1940-50': { startYear: 1940, endYear: 1950 },
        '1950-60': { startYear: 1950, endYear: 1960 },
        '1960-70': { startYear: 1960, endYear: 1970 },
        '1970-80': { startYear: 1970, endYear: 1980 },
        '1980-90': { startYear: 1980, endYear: 1990 },
        '1990-2000': { startYear: 1990, endYear: 2000 },
        '2000-10': { startYear: 2000, endYear: 2010 },
        '2010-20': { startYear: 2010, endYear: 2020 },
        '2020-current': { startYear: 2020, endYear: currentYear },
    };

    const yearData = yearRanges[selectedYear];

    if (yearData) {
        database_fetch_handle(yearData);
    }
}
function database_fetch_handle(data) {
    const jsonData = {
        searchType: 'year',
        startYear: data.startYear,
        endYear: data.endYear
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
            load_searched_content(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(()=>{
            setTimeout(() => {
                loader.style.display = 'none'; // Hide the loader
            }, 5000);
        });
}


