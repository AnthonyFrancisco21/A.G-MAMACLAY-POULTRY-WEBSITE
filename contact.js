addEventListener('DOMContentLoaded', function(){

    submit();

})

                        /* saveAdminBtn.addEventListener('click', function() {
                                
                            const formGroup = document.querySelectorAll('.form-group');
                            let isValid = true;


                            formGroup.forEach((group) => {

                                const field = group.querySelector('input');
                                const errorMessage = group.querySelector('.error-message');

                                if(field.value.trim() === ''){
                                    errorMessage.textContent = `${field.name} is required.`
                                    field.classList.add('error');
                                    isValid = false;
                                } else {
                                    errorMessage.textContent = "";
                                    field.classList.remove('error')
                                };
                            });

                            if(isValid){

                                const newPass = document.getElementById('admin_pass').value;
                                const reEnterPass = document.getElementById('re-enter');
                                const reEnterValue = reEnterPass.value;

                                const notMarchError = document.querySelector('.not-match-error');

                                if(reEnterValue != newPass){
                                    notMarchError.textContent = `Password do not matched`
                                    reEnterPass.classList.add('error');
                                    return;
                                }

                                const fname = document.getElementById('admin_fname').value;
                                const lname = document.getElementById('admin_lname').value;
                                const adminEmail = document.getElementById('admin_email').value;
                                
                                const newAdminData = {fname, lname, adminEmail, reEnterValue};

                                saveNewAdmin(newAdminData)

                            }

                        })  */

// A helper function to convert FormData to a plain object
function formDataToObject(formData) {
    const obj = {};
    formData.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}

function submit() {
    const btn = document.getElementById('submit_btn');
    const form = document.querySelector('.contact-form');

    btn.addEventListener('click', function () {
        const formGroup = document.querySelectorAll('.form-group');
        let isValid = true;

        // Inputs validation
        formGroup.forEach((item) => {
            const field = item.querySelector('input, textarea');
            const errorMessage = item.querySelector('.error-message');

            if (field) {
                if (field.value.trim() === '') {
                    errorMessage.textContent = `${field.name} is required.`;
                    field.classList.add('error');
                    isValid = false;
                } else {
                    if (field.type === "email" && !field.value.endsWith("@gmail.com")) {
                        errorMessage.textContent = "Email must end with @gmail.com.";
                        field.classList.add('error');
                        isValid = false;
                    } else {
                        errorMessage.textContent = "";
                        field.classList.remove('error');
                    }
                }
            }
        });

        // Validate reCAPTCHA separately
        let recaptchaResponse = grecaptcha.getResponse();
        const recError = document.querySelector('.recaptcha-error-message');

        if (!recaptchaResponse) {
            recError.textContent = "Please verify that you are not a robot.";
            isValid = false;
        } else {
            recError.textContent = "";
        }

        if (isValid) {
            // Get all form data as a FormData object
            const formData = new FormData(form);

            // Convert formData to a plain object
            const formDataObj = formDataToObject(formData);

            // Add the reCAPTCHA response to the object
            formDataObj['g-recaptcha-response'] = recaptchaResponse;

            console.log(formDataObj);
            saveMessage(formDataObj);
        }
    });
}

async function saveMessage(formDataObj) {
    console.log(`In function:`, formDataObj);

    Swal.fire({
        title: "Sending...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const res = await fetch('sendMessage.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify(formDataObj)
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await res.json();

        if (result.success) {
            Swal.close();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `${result.message}`,
                showConfirmButton: false,
                timer: 3000
            });

            const form = document.querySelector('.contact-form');
            if (form) {
                form.reset();
            }

            // reset captcha
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.reset();
            }
        } else {
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `${result.message}`,
                showConfirmButton: false,
                timer: 5000
            });
        }
    } catch (err) {
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Something went wrong, please try again! ${err.message || ''}`,
            showConfirmButton: false,
            timer: 5000
        });
    }
}