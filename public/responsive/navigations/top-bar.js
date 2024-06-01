function drop_down_show() {
    
    const top_bar_container = document.getElementById('topBarContainer');
    top_bar_container.addEventListener('mouseover', handleClick);
    function handleClick(event) {
        let count = 0
        const buttonID = event.target.id;
        const top_bar_container = document.getElementById('topBarContainer');
        if (buttonID === 'animeDropDownContainerButton' ) {
            top_bar_container.querySelector('#animeDropDownContainer').style.display = 'block';
            top_bar_container.removeEventListener('mouseover', handleClick);
        } else if (buttonID === 'upcommingDropdownButton') {
            top_bar_container.querySelector('#UpcommingDropdown').style.display = 'flex';
            top_bar_container.removeEventListener('mouseover', handleClick);
        } else if (buttonID === 'otherDropdownButton') {
            top_bar_container.querySelector('#otherDropdown').style.display = 'flex';
            top_bar_container.removeEventListener('mouseover', handleClick);
        }
        else if(buttonID === 'bestAnimeListButton'){
            top_bar_container.querySelector('#bestAnimeList').style.display = 'flex';
            top_bar_container.removeEventListener('mouseover', handleClick);
        }
        else if(buttonID === 'bestAnimeOtherButton'){
            top_bar_container.querySelector('#bestAnimeOther').style.display = 'flex';
            top_bar_container.removeEventListener('mouseover', handleClick);
        }
    }
}
function drop_down_hide() {
    
    const top_bar_container = document.getElementById('topBarContainer');
    top_bar_container.addEventListener('click', handleClick);
    function handleClick(event) {
        let count = 0
        const buttonID = event.target.id;
        const top_bar_container = document.getElementById('topBarContainer');
        if (buttonID === 'animeDropDownContainerButton' ) {
            top_bar_container.querySelector('#animeDropDownContainer').style.display = 'none';
            top_bar_container.removeEventListener('click', handleClick);
        } else if (buttonID === 'upcommingDropdownButton') {
            top_bar_container.querySelector('#UpcommingDropdown').style.display = 'none';
            top_bar_container.removeEventListener('click', handleClick);
        } else if (buttonID === 'otherDropdownButton') {
            top_bar_container.querySelector('#otherDropdown').style.display = 'none';
            top_bar_container.removeEventListener('click', handleClick);
        }
        else if(buttonID === 'bestAnimeListButton'){
            top_bar_container.querySelector('#bestAnimeList').style.display = 'none';
            top_bar_container.removeEventListener('click', handleClick);
        }
        else if(buttonID === 'bestAnimeOtherButton'){
            top_bar_container.querySelector('#bestAnimeOther').style.display = 'none';
            top_bar_container.removeEventListener('click', handleClick);
        }
    }
}


