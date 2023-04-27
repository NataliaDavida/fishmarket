const burger = document.querySelector('.burger')
const closeBtn = document.querySelector('.btn-close')
const navList = document.querySelector('.nav-list')
const btnLeft = document.querySelector('.fa-arrow-left')
const btnRight = document.querySelector('.fa-arrow-right')
const slider = document.querySelector('.slider-container')
const counters = document.querySelectorAll('.item')
const main = document.querySelector('main')

// telegram
let name = document.querySelector('input[name="name"]').value
let email  = document.querySelector('input[name="email"]').value
let msg  = document.querySelector('textarea[name="msg"]').value

// validate form
let nameError = document.getElementById('name-error')
let emailError = document.getElementById('email-error')
let messageError = document.getElementById('message-error')


burger.addEventListener('click', () => {
    navList.classList.toggle('active')
    slider.classList.toggle('active')
    main.classList.toggle('active')
})
closeBtn.addEventListener('click', () => {
    navList.classList.toggle('active')
    slider.classList.toggle('active')
    main.classList.toggle('active')

})
btnRight.addEventListener('click', () =>{
    slider.style = "background-image: url('./img/banner1.jpeg')";

})
btnLeft.addEventListener('click', () =>{
    slider.style = "background-image: url('./img/banner.jpeg')";

})
window.sr = ScrollReveal()
sr.reveal('.product-cart .cart-img',{
    duraction: 2000,
    origin: "left",
    distance: "200px",

})
sr.reveal('.product-cart .product-info', {
    duraction: 2000,
    origin: "rigth",
    distance: "200px"
})

counters.forEach(counter => {
    counter.innerText = '0'

    const updateCounter = () => {
        const target = +counter.getAttribute('data-target')
        const c = +counter.innerText

        const increment = target / 10

        if(c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 200)
        } else {
            counter.innerText = target
        }

    }
    updateCounter()
})

// telegran
const TOKEN = "5852920915:AAEPt9NJwsKT1xS-r8ftfbdR9ZOzlyjR_Y0"
const CHAT_ID= "-1001791774378"
const URI_API= `https://api.telegram.org/bot${ TOKEN }/sendMessage`


document.getElementById('tg').addEventListener('submit', function(e) {
    e.preventDefault()

    let message = `<b>Повідомлення з сайту</b>\n`
        message+= `<b>Відправник: </b>${this.name.value}\n`
        message+= `<b>Почта: </b>${this.email.value}\n`
        message+= `<b>${this.msg.value}</b>`
    console.log(message)

    axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message
    })
    .then((res) => {
        this.name.value =""
        this.email.value =""
        this.message.value =""
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        alert('Send message')
        location.reload()

    })
})


// validateform
function valideteName() {
    let name = document.getElementById('name').value
    console.log(nameError);
    if(name.lenght == 0) {
        nameError.innerHTML = 'Name is reguired'
        return false
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = 'Write full name'
        return false
        
    }
    nameError.innerHTML = `<i class="fas fa-check-circle"></i>`
         return true;

}
function valideteEmail() {
    let email = document.getElementById('email').value
    if(email.lenght == 0) {
        emailError.innerHTML = 'Email is reguired'
        return false
    }
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = 'Email invalid'
        return false
        
    }
    emailError.innerHTML = `<i class="fas fa-check-circle"></i>`
         return true;

}
function valideteMessage() {
    let message = document.getElementById('message').value
    let required = 30
    let left = required - message.lenght

    if(left > 0) {
        messageError.innerHTML = left + 'more characters reguired'
        return false
    }
    messageError.innerHTML = `<i class="fas fa-check-circle"></i>`
         return true;

}