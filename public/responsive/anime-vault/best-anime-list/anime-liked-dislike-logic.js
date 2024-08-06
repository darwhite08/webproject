let buttonsWithListener = new WeakSet();

function loginHandle(button) {
  button.innerHTML = "working";
  const modalMaineContainer = document.getElementById('best-anime-list-login-modal');
  modalMaineContainer.classList.remove("hidden");

  const modalCloseButton = modalMaineContainer.querySelector("button[data-modal-close='close-modal']");
  const modalGoogleLogin = modalMaineContainer.querySelector("button[data-modal-google='google-login']");
  const modalAppleLogin = modalMaineContainer.querySelector("button[data-modal-apple='apple-login']");
  const modalFacebookLogin = modalMaineContainer.querySelector("button[data-modal-facebook='facebook-login']");
  
  // remove event listner
  modalCloseButton.removeEventListener("click",handleModalEvent)
  modalGoogleLogin.removeEventListener("click",handleGoogleLogin);
  modalAppleLogin.removeEventListener("click",handleAppleLogin);
  modalFacebookLogin.removeEventListener("click",handleFacebookLogin);
  //add event listener 
  modalCloseButton.addEventListener("click",handleModalEvent);
  modalGoogleLogin.addEventListener("click",handleGoogleLogin);
  modalAppleLogin.addEventListener("click",handleAppleLogin);
  modalFacebookLogin.addEventListener("click",handleFacebookLogin);

  function handleModalEvent(event) {
    modalMaineContainer.classList.add("hidden");
  }
  function handleGoogleLogin(event) {
    window.location.href = '/auth/google';
  }
  function handleAppleLogin(event) {
    
  }
  function handleFacebookLogin(event) {
    
  }

}



function animeLikeEvent() {
  const likeButtons = document.querySelectorAll('.animeLike');

  for (let index = 0; index < likeButtons.length; index++) {
    likeButtons[index].removeEventListener('click', handleLike);
    if (!buttonsWithListener.has(likeButtons[index])) {
      buttonsWithListener.add(likeButtons[index]);
      likeButtons[index].addEventListener('click', handleLike);
    }
  }
  function handleLike(event) {
    const clickedButtonID = event.currentTarget.getAttribute('data-anime-id');
    const currentButton = document.querySelector(`button[data-anime-id="${clickedButtonID}"]`);

    let animelikeJson = {
      animeID: clickedButtonID,
      like: true,
      dislike: false
    }
    const oldButtonColour = 'bg-black';
    const newButtonColour = 'bg-blue-600';

    fetch('api/like/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animelikeJson),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isAuthenticated == true) {
          if (data.likeResponse == true) {
            currentButton.classList.replace(oldButtonColour, newButtonColour);
          }
          else if (data.likeResponse == false) {
            currentButton.classList.replace(newButtonColour, oldButtonColour);
          }
        } else if (data.isAuthenticated == false) {
          loginHandle(currentButton);
        }
      })
      .catch((error) => console.error('Error:', error));
  }
}

function animeDislikeEvent(anime_id) {
  var dislikeButton = document.querySelectorAll(".animeDislike");
  dislikeButton.addEventListener('click', () => {
    fetch('api/dislike/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ anime_id: anime_id }),
    })
      .then(response => response.json())
      .then(data => {

      })
      .catch(error => console.error('error', error))
  });
}