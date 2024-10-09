function different_search_handle(data) {
    var animeDataRefined ;
    
if (data.searchType == 'category') {
    animeDataRefined = data.animeData;
    data_refined_handle(animeDataRefined);
}
else if (data.searchType == 'year') {
    animeDataRefined = data.animeData;
    data_refined_handle(animeDataRefined);
}
else if (data.searchType == 'season') {
    animeDataRefined = data.animeData;
    data_refined_handle(animeDataRefined);
}
else if (data.searchType == 'type') {
    animeDataRefined = data.animeData;
    data_refined_handle(animeDataRefined);
}
else if (data.searchType == 'text') {
    animeDataRefined = data.animeData;
    data_refined_handle(animeDataRefined);
}

}

function data_refined_handle(data) {
    load_searched_content(data);
}