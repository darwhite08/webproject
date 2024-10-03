function load_searched_content(data) {
    const abyResultContainer = document.getElementById('aby-result-container');
    const abyResultContainerCards = document.querySelectorAll('#aby-result-container .aby-result-container-cards');
    const animeDataLength = data.animeData.length;

    // Remove excess cards from the DOM
    for (let i = animeDataLength; i < abyResultContainerCards.length; i++) {
        abyResultContainerCards[i].remove();
    }

    for (let i = 0; i < animeDataLength; i++) {
        let card;
        if (abyResultContainerCards[i]) {
            card = abyResultContainerCards[i];
        } else {
            card = abyResultContainerCards[0].cloneNode(true); // Clone the first existing card
            abyResultContainer.appendChild(card);
        }
        cardDetailHandler(card, i, data.animeData); // Pass the data to update the card details
    }
    name_and_plot_lenght_shotner('.anime_by_year_plot','.anime_by_year_name');
}

function cardDetailHandler(card, index, animeData) {
    const animeName = card.querySelector('.anime_by_year_name');
    const animePlot = card.querySelector('.anime_by_year_plot');
    
    animeName.innerHTML = animeData[index]['anime_name'];
    animePlot.innerHTML = animeData[index]['anime_plot']; // Assuming you have a plot field to fill
}



