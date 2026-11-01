let ageCheck = document.getElementById("age-check")



function checkAge() {
    ageCheck.style.display = "flex"
}


function closeAgeCheck() {
    ageCheck.style.display = "none"
}

function acceptAge() {
    window.location.href = "game.html"
}