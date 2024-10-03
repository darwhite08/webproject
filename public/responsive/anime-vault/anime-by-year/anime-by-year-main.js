function name_and_plot_lenght_shotner (plotFieldName,nameFieldName) {
    const animeplot = document.querySelectorAll(`${plotFieldName}`);

animeplot.forEach(element => {
    const text = element.textContent.trim();

    if (text.length > 60) { 
        const truncatedText = text.slice(0,60); // Extract the first 100 characters
        element.textContent = truncatedText + '...'; // Add ellipsis
    }
});
const anime_by_year_name = document.querySelectorAll(`${nameFieldName}`);

anime_by_year_name.forEach(element => {
    const text = element.textContent.trim();

    if (text.length > 25) { // Set character limit to 30
        const truncatedText = text.slice(0, 25); // Extract the first 30 characters
        element.textContent = truncatedText + '...'; // Add ellipsis
    }
});
}
name_and_plot_lenght_shotner('.anime_by_year_plot','.anime_by_year_name');