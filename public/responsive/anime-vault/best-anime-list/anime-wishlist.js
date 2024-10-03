
var WishlistButtonsWithListener = new WeakSet();
function animeWishlistHandle() {

    const wishlistButtons = document.querySelectorAll('.animeWishlistButtons');
    wishlistButtons.forEach(element => {
        element.removeEventListener('click', addRemoveToWishList);
        if (!WishlistButtonsWithListener.has(element)) {
            WishlistButtonsWithListener.add(element);
            element.addEventListener('click', addRemoveToWishList);
        }
    });


    function addRemoveToWishList(event) {
        const clickedButtonID = event.currentTarget.getAttribute('data-wishlist-anime-id');
        const wishlistButton = document.querySelector(`button[data-wishlist-anime-id="${clickedButtonID}"].animeWishlistButtons`);
        var wishListPostData = {
            addToWihslist: true,
            animeId: clickedButtonID
        }
        fetch('/api/wishlist/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wishListPostData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.isAuthenticated ) {
                    if (data.wishlisted) {
                        wishlistButton.classList.replace("bg-black", "bg-violet-600");
                    } else if(data.wishlisted == false) {
                        wishlistButton.classList.replace("bg-violet-600", "bg-black");
                    }
                } else {
                   loginHandle(wishlistButton)
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }
}
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
function wishlistAnimation() {}
animeWishlistHandle();  