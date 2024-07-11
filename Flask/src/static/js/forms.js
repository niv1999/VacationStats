// JS for the add and edit forms:
// ----------------------------

// Confirm before returning back from the form:
function confirmBack(event) {
    const ok = confirm("Are you sure you want to go back? Changes won't be saved.");
    if(!ok) event.preventDefault();
}

// Confirm before clearing the form:
function confirmClear(event) {
    const ok = confirm("Are you sure you want to clear the form?");
    if(!ok) event.preventDefault();
}

// Confirm deleting is in "home.js"

// Preview the selected image:
function previewImage(){
    const fileInput = document.getElementById("fileInput");
    const imagePreview = document.getElementById("imagePreview");

    const file = fileInput.files[0]
    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function() {
            imagePreview.src = this.result;
        });

        reader.readAsDataURL(file);
    }
}

// Validate before submitting a new vacation form:
function validateInsert(){
    let isValid = true;

    const startDate = new Date(document.getElementById("startDateAdd").value);
    const endDate = new Date(document.getElementById("endDateAdd").value);

    const formError = document.querySelector(".form-vacation-error");
    const errorMessage = document.getElementById("errorMessage");

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear()

    if (startDate < currentDate) {
        errorMessage.textContent = "The start date can't be in the past.";
        formError.style.display = "block";
        isValid = false;
    }

    if (startDate > endDate) {
        errorMessage.textContent = "The end date must be after the start date.";
        formError.style.display = "block";
        isValid = false;
    }

    if ((startDate.getFullYear() - currentYear) > 5) {
        errorMessage.textContent = "Can't add vacations more than 5 years from now.";
        formError.style.display = "block";
        isValid = false;
    }

    if ((endDate.getFullYear() - startDate.getFullYear()) > 3) {
        errorMessage.textContent = "Vacations can't be longer than 3 years.";
        formError.style.display = "block";
        isValid = false;
    }

    return isValid;
}

// Validate before submitting an edit vacation form:
function validateEdit() {
    let isValid = true;

    const startDate = new Date(document.getElementById("startDateEdit").value);
    const endDate = new Date(document.getElementById("endDateEdit").value);

    const formError = document.querySelector(".form-vacation-error");
    const errorMessage = document.getElementById("errorMessage");

    if (startDate > endDate){
        errorMessage.textContent = "The end date must be after the start date.";
        formError.style.display = "block";
        isValid = false;
    }

    if ((startDate.getFullYear() - currentYear) > 5) {
        errorMessage.textContent = "Can't add vacations more than 5 years from now.";
        formError.style.display = "block";
        isValid = false;
    }

    if ((endDate.getFullYear() - startDate.getFullYear()) > 3) {
        errorMessage.textContent = "Vacations can't be longer than 3 years.";
        formError.style.display = "block";
        isValid = false;
    }

    return isValid
}