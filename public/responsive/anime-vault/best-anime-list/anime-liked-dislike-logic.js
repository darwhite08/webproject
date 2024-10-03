let buttonsWithListener = new WeakSet();

function loginHandle(button) {
  const modalMaineContainer = document.getElementById('best-anime-list-login-modal');
  modalMaineContainer.classList.remove("hidden");

  const modalCloseButton = modalMaineContainer.querySelector("button[data-modal-close='close-modal']");
  const modalGoogleLogin = modalMaineContainer.querySelector("button[data-modal-google='google-login']");
  const modalAppleLogin = modalMaineContainer.querySelector("button[data-modal-apple='apple-login']");
  const modalFacebookLogin = modalMaineContainer.querySelector("button[data-modal-facebook='facebook-login']");

  // remove event listner
  modalCloseButton.removeEventListener("click", handleModalEvent)
  modalGoogleLogin.removeEventListener("click", handleGoogleLogin);
  modalAppleLogin.removeEventListener("click", handleAppleLogin);
  modalFacebookLogin.removeEventListener("click", handleFacebookLogin);
  //add event listener 
  modalCloseButton.addEventListener("click", handleModalEvent);
  modalGoogleLogin.addEventListener("click", handleGoogleLogin);
  modalAppleLogin.addEventListener("click", handleAppleLogin);
  modalFacebookLogin.addEventListener("click", handleFacebookLogin);

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
    const currentLikeButton = document.querySelector(`button[data-anime-id="${clickedButtonID}"].animeLike`);
    const currentDislikeButton = document.querySelector(`button[data-anime-id="${clickedButtonID}"].animeDislike`);

    let animelikeJson = {
      animeID: clickedButtonID,
      like: true,
      dislike: false
    }
    const oldButtonColour = 'bg-black';
    const newButtonColour = 'bg-blue-600';

    fetch('/api/like/post', {
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
            currentLikeButton.classList.replace(oldButtonColour, newButtonColour);
            currentLikeButton.querySelector('span.like').innerHTML = data.totalLikes;
            if (data.dislikeResponse == false) {
              currentDislikeButton.classList.replace("bg-red-600", "bg-black");
              // currentDislikeButton.querySelector('span.dislike').innerHTML = likeUnlikFetchHandle().animeTotalDislikes[clickedButtonID];
            }
          }
          else if (data.likeResponse == false) {
            currentLikeButton.classList.replace(newButtonColour, oldButtonColour);
            currentLikeButton.querySelector('span.like').innerHTML = data.totalLikes;
          }
        } else if (data.isAuthenticated == false) {
          loginHandle(currentLikeButton);
        }
      })
      .catch((error) => console.error('Error:', error));
  }
}

function animeDislikeEvent() {
  const dislikeButtons = document.querySelectorAll('.animeDislike');

  for (let index = 0; index < dislikeButtons.length; index++) {
    dislikeButtons[index].removeEventListener('click', handleDislike);
    if (!buttonsWithListener.has(dislikeButtons[index])) {
      buttonsWithListener.add(dislikeButtons[index]);
      dislikeButtons[index].addEventListener('click', handleDislike);
    }
  }
  function handleDislike(event) {
    const clickedButtonID = event.currentTarget.getAttribute('data-anime-id');
    const currentDislikeButton = document.querySelector(`button[data-anime-id="${clickedButtonID}"].animeDislike`);
    const currentLikeButton = document.querySelector(`button[data-anime-id="${clickedButtonID}"].animeLike`);

    let animeDislikeJson = {
      animeID: clickedButtonID,
      like: false,
      dislike: true
    }
    const oldButtonColour = 'bg-black';
    const newButtonColour = 'bg-red-600';

    fetch('/api/dislike/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animeDislikeJson),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isAuthenticated == true) {
          if (data.dislikeResponse == true) {
            currentDislikeButton.classList.replace(oldButtonColour, newButtonColour);
            currentDislikeButton.querySelector('span.dislike').innerHTML = data.totalDislikes;
            if (data.likeResponse == false) {
              currentLikeButton.classList.replace("bg-blue-600", "bg-black");
              // currentLikeButton.querySelector('span.like').innerHTML = likeUnlikFetchHandle().animeTotalLikes[clickedButtonID];
            }
          }
          else if (data.dislikeResponse == false) {
            currentDislikeButton.classList.replace(newButtonColour, oldButtonColour);
            currentDislikeButton.querySelector('span.dislike').innerHTML = data.totalDislikes;
          
          }
        } else if (data.isAuthenticated == false) {
          loginHandle(currentDislikeButton);
        }
      })
      .catch((error) => console.error('Error:', error));
  }
}

function likeUnlikFetchHandle() {
  fetch('/api/like-dislike/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      var animeTotalLikes = data.animeUserLiked;
      var animeTotalDislikes = data.animeUserLiked
      return { animeTotalLikes, animeTotalDislikes }
    })
    .catch((error) => console.error('Error:', error));
}
animeLikeEvent();
animeDislikeEvent();