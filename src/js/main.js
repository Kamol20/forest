const burgerMenu = document.querySelector('.burger-icon')
const navLinks = document.querySelector('.nav-links')

const username = document.querySelector('#name')
const email = document.querySelector('#email')
const message = document.querySelector('#msg')
const sendBtn = document.querySelector('.send')
const msgStatus = document.querySelector('.msg-status')

const scrollSpySections = document.querySelectorAll('section')
const links = document.querySelectorAll('.nav-link')
const home = document.querySelector('.home')

const closeBtn = document.querySelector('.close-btn')

const inputArr = [username, email, message]

const handleScrollSpy = () => {
	if (document.body.classList.contains('main-page')) {
		const sections = []

		scrollSpySections.forEach(section => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 65) {
				sections.push(section)

				const activeSection = document.querySelector(`[href*="${sections[0].id}"]`)

				links.forEach(link => link.classList.remove('active'))

				activeSection.classList.add('active')
			}

			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 0) {
				const lastSection = document.querySelector('a:last-of-type')
				links.forEach(link => link.classList.remove('active'))

				lastSection.classList.add('active')
			}
		})
	}

	if (window.scrollY === 0) {
		links.forEach(link => link.classList.remove('active'))
		home.classList.add('active')
	}
}

const toggleMobileMenu = () => {
	navLinks.classList.toggle('mobile-menu')
}

const showError = (input, msg) => {
	const contactBox = input.parentElement
	const errorMsg = contactBox.querySelector('.error-text')

	contactBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const contactBox = input.parentElement
	contactBox.classList.remove('error')
}

const checkform = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. ${min} znaków`)
	}
}

const checkEmail = email => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'E-mail jest niepoprawny')
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.contact-box')
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		msgStatus.classList.add('success')
	}
}

const closeMsg = () => {
	msgStatus.classList.remove('success')
}

window.addEventListener('scroll', handleScrollSpy)
burgerMenu.addEventListener('click', toggleMobileMenu)
closeBtn.addEventListener('click', closeMsg)
sendBtn.addEventListener('click', e => {
	e.preventDefault()

	checkform([username, email, message])
	checkLength(username, 3)
	checkEmail(email)
	checkErrors()

	inputArr.forEach(el => {
		el.value = ''
		// clearError(el)
	})
})
