// JS for the home page:
// ----------------------------

// Define sessionData globally so it can be accessed through multiple functions
let sessionData;

// If it's the home page then fetch the session data then greet the current user and add likes to the previously liked vacations if they are not an admin:
if (window.location.pathname.includes('/vacations')) {
    document.addEventListener('DOMContentLoaded', () => {
        fetchSessionData()
            .then(() => {
                greetUser();
                if (sessionData.current_user.role_id === 2) likeUsersLikedVacations();
            })
            .catch(error => {
                console.error('Error loading session data:', error);
            });
    });
}

// Fetch the session data from the server side:
async function fetchSessionData() {
    try{
        const response = await fetch('/get-session-data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        sessionData = await response.json();
    } catch (error) {
        console.error('Error fetching session data:', error);
    }
}

// Greet the user based on the current time of the day:
function greetUser() {
    const currentHour = new Date().getHours();
    let greeting;

    switch (true) {
        case currentHour >= 5 && currentHour < 12:
            greeting = "Good Morning";
            break;
        case currentHour >= 12 && currentHour < 18:
            greeting = "Good Afternoon";
            break;
        case currentHour >= 18 && currentHour < 23:
            greeting = "Good Evening";
            break;
        default:
            greeting = "Good Night";    
    }

    const welcomeMessage = document.querySelector(".welcome-message");
    welcomeMessage.innerHTML = greeting + ",<br>" + sessionData.current_user.first_name + " " + sessionData.current_user.last_name;
}

// Run through all the vacations and add the "liked" CSS class if it's in the current users liked vacations:
function likeUsersLikedVacations() {
    document.querySelectorAll('.likes').forEach(likeElement => {
        const vacationId = parseInt(likeElement.dataset.vacationId);
        if (sessionData.current_user.liked_vacations.includes(vacationId)) {
            likeElement.classList.add('liked');
            likeElement.style.opacity = 1;
        }
    });
}

// Add/Remove the like based on the current like status. Change it visually in the page, and send the new data to the server side
function changeLikeStatus(likes) {
    const likesSpan = likes.querySelector("span");
    const currentLikes = parseInt(likesSpan.textContent);

    let dataToSend = {
        "vacation_id": parseInt(likes.dataset.vacationId),
        "user_id": sessionData.current_user.user_id
    }

    if (!likes.classList.contains("liked")) {
        likes.classList.add("liked");
        likes.style.opacity = 1;
        likesSpan.textContent = currentLikes + 1;
        dataToSend.liked = true;
    } else {
        likes.classList.remove("liked");
        likesSpan.textContent = currentLikes - 1;
        likes.style.opacity = 0.7;
        dataToSend.liked = false;
    }

    sendLikeData(dataToSend);
}

// Send the like data to the server side to add/remove it to/from the database:  
async function sendLikeData(data) {
    try{
        const response = await fetch('/update-likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        return await response.json();
    } catch (error) {
        console.error('Error while passing the data:', error);
        throw error;
    }
}

// Confirm logging out:
function confirmLogout(event) {
    const ok = confirm("Are you sure you want to logout?");
    if (!ok) event.preventDefault();
}

// Confirm deleting a vacation:
function confirmDelete(event) {
    const ok = confirm("Are you sure you want to delete this vacation?");
    if (!ok) event.preventDefault();
}

// Display the error message for only 4 seconds:
const errorContainer = document.querySelector("errorContainer");

if (errorContainer) {
    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 4000);
}