// Select all elements with the class 'animeLike' and 'animeDislike'
function likeDislikeApperanceHandle() {
    alert("working")
    var likeButtons = document.querySelectorAll(".animeLike");
    var dislikeButtons = document.querySelectorAll(".animeDislike");

    var likeButtonAttributeArray = new Set();  // Use a Set to automatically handle duplicates
    var dislikeButtonAttributeArray = new Set();

    likeButtons.forEach(button => {
        button.innerHTML = "dfa ho";
        var attributeValue = button.getAttribute("data-anime-id");
        likeButtonAttributeArray.add(attributeValue);  // Add to the Set
    });

    dislikeButtons.forEach(button => {
        var attributeValue = button.getAttribute("data-anime-id");
        dislikeButtonAttributeArray.add(attributeValue);  // Add to the Set
    });

    // Convert Sets to Arrays for JSON serialization
    var jsonData = {
        likeButtonArray: Array.from(likeButtonAttributeArray),
        dislikeButtonArray: Array.from(dislikeButtonAttributeArray)
    };

    fetch('/api/like-dislike-count-fetch', {  // Correct the fetch URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Data successfully sent");
        })
        .catch((error) => console.error('Error:', error));

}

