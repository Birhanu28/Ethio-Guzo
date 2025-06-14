
document.addEventListener('DOMContentLoaded', function() {
    // --- Form Elements ---
    let signIn_form = document.getElementById('signInForm');
    let userInput_name = document.getElementById('userInput_name');
    let name_check = document.getElementById('name_check');
    let userInput_gender = document.getElementById('userInput_gender'); // Assuming this is a select or radio
    let userInput_age = document.getElementById('userInput_age');
    let age_check = document.getElementById('age_check');
    let userInput_email = document.getElementById('userInput_email');
    let email_check = document.getElementById('email_check');
    let userInput_phone = document.getElementById('userInput_phone');
    let phone_check = document.getElementById('phone_check');
    let userInput_address = document.getElementById('userInput_address');
    let address_check = document.getElementById('address_check');
    let submitBtn = document.getElementById('submitBtn');
    let resetBtn = document.getElementById('resetBtn');

    // --- Profile Display Elements ---
    let user_profile = document.getElementById('user_profile');
    let user_name = document.getElementById('userName');
    let user_gender = document.getElementById('userGender');
    let user_address = document.getElementById('userAddress');
    let user_email = document.getElementById('userEmail');
    let user_phone = document.getElementById('userPhoneNumber');
    let profileBtnContainer = document.getElementById('profileBtnContainer');
    let bookingFormContainer = document.getElementById('bookingFormContainer');

    // --- Form Submission Handler ---
    if (signIn_form) {
        signIn_form.addEventListener('submit', e => {
            e.preventDefault(); // Prevent default form submission initially

            let isValid = true; // Flag to track overall form validity

            // Validate Name
            if (userInput_name.value.trim() === "") {
                name_check.textContent = 'Please enter your name!';
                userInput_name.style.borderColor = 'red';
                isValid = false;
            } else {
                name_check.textContent = '';
                userInput_name.style.borderColor = 'green';
            }

            // Validate Age
            if (userInput_age.value.trim() === "") {
                age_check.textContent = 'Please enter your age!';
                userInput_age.style.borderColor = 'red';
                isValid = false;
            } else {
                const age = parseInt(userInput_age.value);
                if (isNaN(age)) { // Check if it's a valid number
                    age_check.textContent = 'Please enter a valid age!';
                    userInput_age.style.borderColor = 'red';
                    isValid = false;
                } else if (age < 18) {
                    age_check.textContent = 'You are not allowed!';
                    userInput_age.style.borderColor = 'red';
                    isValid = false;
                } else if (age >= 100) {
                    age_check.textContent = 'You are too old!';
                    userInput_age.style.borderColor = 'red';
                    isValid = false;
                } else {
                    age_check.textContent = '';
                    userInput_age.style.borderColor = 'green';
                }
            }

            // Validate Email
            if (userInput_email.value.trim() === "") {
                email_check.textContent = 'Please enter your email!';
                userInput_email.style.borderColor = 'red';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput_email.value.trim())) { // Basic email regex
                email_check.textContent = 'Please enter a valid email address!';
                userInput_email.style.borderColor = 'red';
                isValid = false;
            } else {
                email_check.textContent = '';
                userInput_email.style.borderColor = 'green';
            }

            // Validate Phone Number
            if (userInput_phone.value.trim() === "") {
                phone_check.textContent = 'Please enter your phone number!';
                userInput_phone.style.borderColor = 'red';
                isValid = false;
            } else if (userInput_phone.value.slice(0, 4) !== "+251") {
                phone_check.textContent = 'This site is valid only for Ethiopia (+251)!';
                userInput_phone.style.borderColor = 'red';
                isValid = false;
            } else if (userInput_phone.value.trim().length !== 13) { // Example: +251912345678 is 13 characters
                                                                    // Adjust this length based on your exact phone number format expectations
                phone_check.textContent = 'Your phone number is invalid (e.g., +251912345678)!';
                userInput_phone.style.borderColor = 'red';
                isValid = false;
            } else {
                phone_check.textContent = '';
                userInput_phone.style.borderColor = 'green';
            }

            // Validate Address
            const validCities = ["gondar", "bahir dar", "addis ababa"];
            if (userInput_address.value.trim() === "") {
                address_check.textContent = 'Please choose your address!';
                userInput_address.style.borderColor = 'red';
                isValid = false;
            } else if (!validCities.includes(userInput_address.value.toLowerCase().trim())) {
                address_check.textContent = 'This site is valid only for listed cities';
                userInput_address.style.borderColor = 'red';
                isValid = false;
            } else {
                address_check.textContent = '';
                userInput_address.style.borderColor = 'green';
            }

            // If all validations pass, proceed
            if (isValid) {
                populateUserProfile(); // Populate profile data
                show_user_profile();   // Show the profile section

                // If you want the form to actually submit to a new page AFTER validation,
                // uncomment the line below. Make sure your <form> tag has an 'action' attribute.
                // signIn_form.submit();
                window.location.href = 'Ethio Guzo Loading.html'
            }
        });
    }

    // --- Functions for Showing/Hiding Containers ---
    window.showBookingFormContainer = function() {
        if (bookingFormContainer) {
            bookingFormContainer.style.display = 'block';
        }
    };

    window.closeBookingFormContainer = function() {
        if (bookingFormContainer) {
            bookingFormContainer.style.display = 'none';
        }
    };

    window.show_user_profile = function() {
        if (user_profile) {
            user_profile.style.display = 'block';
            profileBtnContainer.style.backgroundColor = '#803e00'; // Highlight the profile button
        }
    };

    window.close_user_profile = function() {
        if (user_profile) {
            user_profile.style.display = 'none';
            profileBtnContainer.style.backgroundColor = 'transparent'; // Reset button highlight
        }
    };

    // --- Function to Populate User Profile Data ---
    function populateUserProfile() {
        if (user_name && userInput_name) user_name.textContent = 'Name: ' + userInput_name.value;
        if (user_address && userInput_address) user_address.textContent = 'Address: Ethiopia, ' + userInput_address.value;
        if (user_email && userInput_email) user_email.textContent = 'Email: ' + userInput_email.value;
        if (user_phone && userInput_phone) user_phone.textContent = 'Phone No. : ' + userInput_phone.value;
    }

    // --- Function for Sign Out ---
    window.signOut = function() {
        window.location.href = 'index.html'
        close_user_profile();
        if (signIn_form) signIn_form.reset(); // Resets form fields
        // Clear displayed profile data
        if (user_name) user_name.textContent = 'Name: ';
        if (user_gender) user_gender.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>';
        if (user_address) user_address.textContent = 'Address: Ethiopia, ';
        if (user_email) user_email.textContent = 'Email: ';
        if (user_phone) user_phone.textContent = 'Phone No. : ';
        alert('You have been signed out.');
    };

    // --- Display Current Time ---
    let date_time = document.getElementById('time');
    function updateTime() {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const timeString = now.toLocaleTimeString('en-US', options);
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', dateOptions);
        if (date_time) {
            date_time.textContent = `${dateString}, ${timeString} EAT`;
        }
    }
    updateTime();
    setInterval(updateTime, 1000);

    // --- Typewriter Animation ---
    const textElement = document.querySelector('.typewriter-text');
    const sentences = [
        "Book Your Seat Now...",
        "Gondar, Bahir Dar & Addis Ababa",
        "Fast, Safe & Comfortable",
        "Your Journey Starts With A Click!."
    ];
    let sentenceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenSentences = 1500;

    function typeWriter() {
        const currentSentence = sentences[sentenceIndex];
        if (isDeleting) {
            textElement.classList.add('deleting-active');
            textElement.classList.remove('typing-active');
            if (charIndex > 0) {
                textElement.textContent = currentSentence.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeWriter, deletingSpeed);
            } else {
                textElement.classList.remove('deleting-active');
                isDeleting = false;
                sentenceIndex = (sentenceIndex + 1) % sentences.length;
                setTimeout(typeWriter, delayBetweenSentences / 2);
            }
        } else {
            textElement.classList.add('typing-active');
            textElement.classList.remove('deleting-active');
            if (charIndex < currentSentence.length) {
                textElement.textContent += currentSentence.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                textElement.classList.remove('typing-active');
                isDeleting = true;
                setTimeout(typeWriter, delayBetweenSentences);
            }
        }
    }
    typeWriter(); // Start the typewriter animation
});


// Message box
let msgBox = document.getElementById('message');
let msgHeader = document.getElementById('messageH1');
let msgContent = document.getElementById('messageP');

 msgBox.style.display = 'none';
window.msg_privacy_policy = function(){
    if(msgBox){
        msgBox.style.display = 'block';
        msgHeader.textContent = 'Privacy policy';
        msgContent.textContent = 'We respect your privacy. Ethio Guzo only collects essential data to ensure a smooth travel experience. We do not sell or share your personal information. Read our full privacy policy for details.'
    }
}
window.msg_terms = function(){
    if(msgBox){
        msgBox.style.display = 'block';
        msgHeader.textContent = 'Terms & Conditions';
        msgContent.textContent = 'By booking with Ethio Guzo, you agree to follow our travel policies, refund rules, and passenger code of conduct. Seat reservations are confirmed upon booking. We reserve the right to adjust schedules due to emergencies.'
    }
}
window.close_message = function(){
    if(msgBox){
        msgBox.style.display = 'none';
    }
}

let phoneMenu = document.getElementById('onPhoneMenu');
phoneMenu.style.display = 'none';

window.show_menu = function(){
    if(phoneMenu){
        phoneMenu.style.display = 'block';
    }
}
window.close_menu = function(){
    if(phoneMenu){
        phoneMenu.style.display = 'none';
    }
}