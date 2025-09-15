addEventListener('DOMContentLoaded', function(){

    submit();

})

function submit(){
    const btn = document.getElementById('submit_btn');
    const form = document.querySelector('.contact-form')

    const input = form.querySelectorAll('input, textarea');

    btn.addEventListener('click', function(){

        input.forEach((item) => {
            console.log(item.value)
        })

    })


}