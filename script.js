// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordLength = 0;
var selectedChars = "";
var generatedPassword = "";

// Character sets
var alphaLower = "abcdefghijklmnopqrstuvwxyz";
var alphaUpper = alphaLower.toUpperCase();
var numeric = "0123456789";
var specChar = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

// Password options stored as array, all set true initially
// lowercase, uppercase, numeric, special
var options = [true, true, true, true];

// Does the password contain at least one character from the selected character sets
var validPassword = [false, false, false, false];

var generatedPassword = "";

function getPasswordLength() {
  passwordLength = 0;
  // asks user for number of characters used in password, 8 is default
  while (true) {
    passwordLength = prompt("What length of password do you require? \n8 character minimum, 128 character maximum.", 8);

    if (passwordLength == null) {
      return false;
    }

    if (parseInt(passwordLength) >= 8 && parseInt(passwordLength) <= 128) {
      return true;
    }
  }
}


function notOptions() {
  for (var i = 0; i < options.length; i++) {
    validPassword[i] = !options[i];
  }
}

function getPasswordCharSet(allCharacters) {

  if (allCharacters.length !== options.length) {
    return false;
  }
  // promts given to user to select what they want in password, also alert given if user doesnt select any of promts given
  var isValid = false;
  while (!isValid) {
    options[0] = confirm("Include lowercase characters in the password?");
    options[1] = confirm("Include uppercase characters in the password?");
    options[2] = confirm("Include numeric characters in the password?");
    options[3] = confirm("Include special characters in the password?");
    notOptions();
    if (options.indexOf(true) !== -1) {
      console.log("Password criteria: (lowercase, uppercase, numeric, special)", options);
      isValid = true;
    }
    else {
      alert("Please select at least one character set!");
    }
  }
  // Generate combined string of charcters from user selection
  selectedChars = "";
  for (var i = 0; i < options.length; i++) {
    if (options[i]) {
      selectedChars += allCharacters[i];
    }
  }
  return true;
}

// Function to generate a random number between 0 and 'upperLimit' - 'upperLimit' exclusive
function getRandom(upperLimit) {
  return Math.floor(Math.random() * upperLimit);
}

function MakePassword(requiredPasswordLength) {
  notOptions();
  generatedPassword = "";
  for (var j = 0; j < requiredPasswordLength; j++) {
    var nextChar = selectedChars[getRandom(selectedChars.length)];
    generatedPassword += nextChar;
    charValidate(nextChar);
  }
  console.log("Generated Password: ", generatedPassword, "Password Length: ", generatedPassword.length);
}

// Set character as valid for each selected set
function charValidate(testChar) {
  for (var i = 0; i < testChar.length; i++) {
    if (alphaLower.indexOf(testChar[i]) !== -1) {
      validPassword[0] = true;
    }
    else if (alphaUpper.indexOf(testChar[i]) !== -1) {
      validPassword[1] = true;
    }
    else if (numeric.indexOf(testChar[i]) !== -1) {
      validPassword[2] = true;
    }
    else {
      validPassword[3] = true;
    }

  }
}

function generatePassword() {

  // Add available characters into array
  var allChar = [alphaLower, alphaUpper, numeric, specChar];
  console.log("All Characters: ", allChar);

  if (getPasswordLength() && getPasswordCharSet(allChar)) {
    console.log("getPasswordLength: ", passwordLength);
    console.log("Selected character list: ", selectedChars);

    var valCount = 0;
    while (validPassword.indexOf(false) !== -1) {
      // Generate password
      MakePassword(passwordLength);
      valCount++;
      if (valCount > 100) {
        alert("Please try again.");
        return "";
      }
    }
    console.log("Generation: ", valCount);
    return generatedPassword;

  }
  // Something went wrong, end.
  alert("Something went wrong.")
  return "";
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  if (password !== "") {
    passwordText.value = password;
  }
  else {
    passwordText.value = "";
    passwordText.placeholder = "Your Secure Password"
  }

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);