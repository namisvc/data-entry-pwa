
const farmer_ID = document.querySelector("#farmer_ID").value;
const full_name = document.querySelector("#full_name").value;
const gender = document.querySelector("#gender").value;
const Farmer_Address = document.querySelector("#Farmer_Address").value;
const Farm_location = document.querySelector("#Farm_location").value;
const cropID = document.querySelector("#cropID").value;
const Acreage = document.querySelector("#Acreage").value;
const Date_Planted = document.querySelector("#Date_Planted").value;

const form = document.querySelector('#signup');


const checkFarmerID = () => {

    let valid = false;

    const min = 6,
        max = 6;

    const farmer_ID = farmer_ID.value.trim();

    if (!isRequired(farmer_ID)) {
        showError(farmer_ID, 'farmer_ID cannot be blank.');
    } else if (!isBetween(farmer_ID.length, min, max)) {
        showError(farmer_ID, `farmer_ID must be 6 characters.`)
    } else {
        showSuccess(farmer_ID);
        valid = true;
    }
    return valid;
};


const checkName = () => {
    let valid = false;
    const full_name = full_name.value.trim();
    if (!isRequired(full_name)) {
        showError(full_name, 'Farmer name cannot be blank.');
    } else if (!isNameValid(full_name)) {
        showError(full_name, 'Email is not valid.')
    } else {
        showSuccess(full_name);
        valid = true;
    }
    return valid;
};

const checkGender = () => {
    let valid = false;

    const gender = gender.value.trim();

    if (!isRequired(gender)) {
        showError(gender, 'Please select Male or Female.');
    }  else {
        showSuccess(gender);
        valid = true;
    }

    return valid;
};


const isNameValid = (email) => {
    const re = /^[a-zA-Z ]*$"/;
    return re.test(email);
};

const isGenderChosen = (Gender) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(gender);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('helper-text');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('helper-text');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isfarmer_IDValid = checkfarmer_ID(),
        isEmailValid = checkEmail(),
        isGenderValid = checkGender(),
        isConfirmGenderValid = checkConfirmGender();

    let isFormValid = isfarmer_IDValid &&
        isEmailValid &&
        isGenderValid &&
        isConfirmGenderValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'farmer_ID':
            checkfarmer_ID();
            break;
        case 'email':
            checkEmail();
            break;
        case 'Gender':
            checkGender();
            break;
        case 'confirm-Gender':
            checkConfirmGender();
            break;
    }
}));