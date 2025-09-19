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


function submit() {
    const btn = document.getElementById('submit_btn');
    const form = document.querySelector('.contact-form');

    btn.addEventListener('click', function () {
        const formGroup = document.querySelectorAll('.form-group');
        let isValid = true;

        //Inputs validation
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

        //Validate reCAPTCHA separately
        let recaptchaResponse = grecaptcha.getResponse();
        const recError = document.querySelector('.recaptcha-error-message');

        if (!recaptchaResponse) {
            recError.textContent = "Please verify that you are not a robot.";
            isValid = false;
        } else {
            recError.textContent = "";
        }

        if (isValid) {
            const formData = new FormData(form);
            formData.append("g-recaptcha-response", grecaptcha.getResponse());

            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            
        }
    });
}


function saveMessage(){



}