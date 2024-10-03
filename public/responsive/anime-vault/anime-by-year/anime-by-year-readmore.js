function readmore_open(anime_data) {
    const overlayContainer = document.getElementById('anime-by-year-container');
    overlayContainer.style.display = 'flex';

    const heading = document.querySelector('#anime-by-year-container .heading');
    const animePlot = document.querySelector('#anime-by-year-container .anime-plot');
    const detailTag1 = document.querySelector('#anime-by-year-container .detail-tag1');
    const detailTag2 = document.querySelector('#anime-by-year-container .detail-tag2');
    const detailTag3 = document.querySelector('#anime-by-year-container .detail-tag3');
    const detailTag4 = document.querySelector('#anime-by-year-container .detail-tag4');
    const detailTag5 = document.querySelector('#anime-by-year-container .detail-tag5');
    const detailTag6 = document.querySelector('#anime-by-year-container .detail-tag6');
    const detailTag7 = document.querySelector('#anime-by-year-container .detail-tag7');
    const detailTag8 = document.querySelector('#anime-by-year-container .detail-tag8');
    const releaseYear = document.querySelector('#anime-by-year-container .release-year');
    const releaseSeason = document.querySelector('#anime-by-year-container .release-season');

    heading.innerHTML = anime_data.anime_name;
    animePlot.innerHTML = anime_data.anime_plot;
    detailTag1.innerHTML = anime_data.anime_id;
    detailTag2.innerHTML = anime_data.anime_category;
    detailTag3.innerHTML = anime_data.anime_type;
    detailTag4.innerHTML = anime_data.anime_genere;
    detailTag5.innerHTML = `Rating: ${anime_data.anime_rating}`;
    detailTag6.innerHTML = anime_data.total_seasons;
    detailTag7.innerHTML = `Episodes: ${anime_data.total_episodes}`;
    detailTag8.innerHTML = `Status: ${anime_data.status}`;
    releaseYear.innerHTML = `Release-Year: ${anime_data.release_year}`;
    releaseSeason.innerHTML = `Release-Season: ${anime_data.release_season}`;    
}

function readmore_close () {
    const overlayContainer = document.getElementById('anime-by-year-container');
    overlayContainer.style.display = 'none';
}