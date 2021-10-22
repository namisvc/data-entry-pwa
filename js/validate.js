



//const cropID = document.querySelector("#cropID").value;

const checkFarmerID = () => {
    const farmer_ID = (document.querySelector("#farmer_ID").value).trim();
    let valid = false;

    const min = 6,
        max = 6;

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
    const full_name = (document.querySelector("#full_name").value).trim();
    let valid = false;
    if (!isRequired(full_name)) {
        showError(full_name, 'Farmer name cannot be blank.');
    } else if (!isNameValid(full_name)) {
        showError(full_name, 'Name is not valid.')
    } else {
        showSuccess(full_name);
        valid = true;
    }
    return valid;
};

const checkGender = () => {
    const gender = (document.querySelector("#gender").value).trim();
    let valid = false;

    if (!isRequired(gender)) {
        showError(gender, 'Please select Male or Female.');
    }  else {
        showSuccess(gender);
        valid = true;
    }

    return valid;
};

const checkAddress = () => {
    const Farmer_Address = (document.querySelector("#Farmer_Address").value).trim();
    let valid = false;

    if (!isRequired(Farmer_Address)) {
        showError(Farmer_Address, 'Farmer address cannot be blank.');
    } else {
        showSuccess(Farmer_Address);
        valid = true;
    }
    return valid;
};

const checkLocation = () => {
    const Farm_location = (document.querySelector("#Farm_location").value).trim();
    let valid = false;

    if (!isRequired(Farm_location)) {
        showError(Farm_location, 'Farm location cannot be blank.');
    }  else {
        showSuccess(Farm_location);
        valid = true;
    }
    return valid;
};



const checkAcreage = () => {
    const Acreage = (document.querySelector("#Acreage").value).trim();
    
    let valid = false;

    if (!isRequired(Acreage)) {
        showError(Acreage, 'farmer_ID cannot be blank.');
    } else if (Acreage > 0.1) {
        showError(Acreage, `farmer_ID must be 6 characters.`)
    } else {
        showSuccess(Acreage);
        valid = true;
    }
    return valid;
};

const checkDatePlanted = () => {
    const Date_Planted = (document.querySelector("#Date_Planted").value).trim();
    let valid = false;

    if (!isRequired(Date_Planted)) {
        showError(Date_Planted, 'Please select Male or Female.');
    }  else {
        showSuccess(Date_Planted);
        valid = true;
    }

    return valid;
};


const isNameValid = (full_name) => {
    const re = /^[a-zA-Z ]*$"/;
    return re.test(full_name);
};
/** 
const isGenderChosen = (Gender) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(gender);
};*/

const isFarmAddressValid = (Farmer_Address) => {
    const re = /^[a-zA-Z ]*$"/;
    return re.test(Farmer_Address);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input;
    // add the error class
    formField.classList.remove('valid');
    formField.classList.add('invalid');
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('invalid');
    formField.classList.add('valid');;
}


window.addEventListener('addLogButton', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isfarmer_IDValid = checkFarmerID(),
        isNameValid = checkName(),
        isGenderValid = checkGender(),
        isAddressValid = checkAddress(),
        isLocationValid = checkLocation(),
        isAcreageValid = checkAcreage(),
        isDatePlantedValid = checkDatePlanted();

    let isFormValid = isfarmer_IDValid &&
        isNameValid &&
        isGenderValid &&
        isAddressValid &&
        isLocationValid &&
        isAcreageValid &&
        isDatePlantedValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        addFarmLog();
    }
});

/** 
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

form.addEventListener('submit', debounce(function (e) {
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
}));*/