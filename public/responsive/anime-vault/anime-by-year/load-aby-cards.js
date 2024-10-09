function load_searched_content(data) {
    const abyResultContainer = document.getElementById('aby-result-container');
    const abyResultContainerCards = document.querySelectorAll('#aby-result-container .aby-result-container-cards');
    const animeDataLength = data.length;
    // remove not found before new cards is created
    const notFoundSection = abyResultContainer.querySelector('.no-results');
    if (notFoundSection) {
        abyResultContainer.innerHTML = ' ' 
    }

    // Remove excess cards from the DOM
    for (let i = animeDataLength; i < abyResultContainerCards.length; i++) {
        abyResultContainerCards[i].remove();
    }

    // Loop through the data and create or update cards
    for (let i = 0; i < animeDataLength; i++) {
        let card;

        // Check if the card already exists
        if (abyResultContainerCards[i]) {
            card = abyResultContainerCards[i]; // Use the existing card
        } else {
            // Create new card if it doesn't exist
            card = document.createElement('div');
            card.classList.add('aby-result-container-cards', 'max-w-sm', 'bg-white', 'shadow-lg', 'border-4', 'rounded-lg', 'shadow');

            // Create the inner HTML for the card
            card.innerHTML = `
                <a href="#">
                    <img class="rounded-t-lg" src="../../public/media/bestAnimeList/img/animeListBackground.jpg" alt="" />
                </a>
                <div class="p-5 flex flex-col justify-between">
                    <div>
                        <h5 class="anime_by_year_name mb-2 text-lg font-bold tracking-tight text-blue-700"></h5>
                        <p class="anime_by_year_plot mb-3 font-normal text-gray-700 text-sm"></p>
                    </div>
                    <div class="pb-2">
                        <p class="aby-release-year text-xs font-medium text-red-600"></p>
                    </div>
                    <div>
                        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-4 py-2.5 me-1 mb-2">
                            <i class="fa-brands fa-youtube"></i> Watch Trailer
                        </button>
                        <button onclick='readmore_open(${JSON.stringify(data[i])})' class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-4 py-2.5 me-1 mb-2">
                            <i class="fa-solid fa-circle-info"></i> Read More
                        </button>
                        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-4 py-2.5 me-1 mb-2">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            abyResultContainer.appendChild(card);
            
        }
                    
            card_detail_handler(card, i, data);  
    }

    name_and_plot_lenght_shotner('.anime_by_year_plot', '.anime_by_year_name');
}

function card_detail_handler(card, index, animeData) {
    
    const animeName = card.querySelector('.anime_by_year_name'); // Fix selector with dot
    const animePlot = card.querySelector('.anime_by_year_plot');
    const releaseYear = card.querySelector('.aby-release-year'); // Fix selector with dot

    animeName.innerHTML = animeData[index]['anime_name'];
    animePlot.innerHTML = animeData[index]['anime_plot'];
    releaseYear.innerHTML = `Release Year: ${animeData[index]['release_year']}`;
}

