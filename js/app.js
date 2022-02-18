// DarkMode toggle with local storage

let dark = localStorage.getItem('dark');

const themeSwitcher = document.querySelector('.theme-switcher');
const body = document.querySelector('body');
const themeText = document.querySelector('.theme-text');
const themeIcon = document.querySelector('.theme-icon');

// Dark Mode
const enableDarkMode = () => {
	document.body.classList.add('dark');
	// 2. Update darkMode in localStorage
	localStorage.setItem('dark', 'enabled');
	themeText.innerHTML = 'LIGHT';
	themeIcon.src = 'assets/icon-sun.svg';
};

// Light Mode
const enableLightMode = () => {
	// 1. Remove the class from the body
	document.body.classList.remove('dark');
	// 2. Update darkMode in localStorage
	localStorage.setItem('dark', null);
	themeText.innerHTML = 'DARK';
	themeIcon.src = 'assets/icon-moon.svg';
};

// If the user already visited and enabled darkMode
// start things off with it on
if (dark === 'enabled') {
	enableDarkMode();
}

// When someone clicks the button
themeSwitcher.addEventListener('click', () => {
	// get their darkMode setting
	dark = localStorage.getItem('dark');

	// if it not current enabled, enable it
	if (dark !== 'enabled') {
		enableDarkMode();
		// if it has been enabled, turn it off
	} else {
		enableLightMode();
	}
});

// Grab input text
const inputField = document.querySelector('#github-search');
const searchButton = document.querySelector('.btn');

let githubProfile = document.querySelector('.github-profile');
let githubName = document.querySelector('.github-name');
let githubUserName = document.querySelector('.github-username');
let githubRepos = document.querySelector('.repos');
let githubFollowers = document.querySelector('.followers');
let githubFollowing = document.querySelector('.following');
let githubLocation = document.querySelector('.locations');
let githubTwitter = document.querySelector('.twitter');
let githubWebsite = document.querySelector('.website');
let githubCompany = document.querySelector('.company');
let githubBio = document.querySelector('.github-bio');
let githubDate = document.querySelector('.github-date');
let error = document.querySelector('.error');

// Input field
function searchField() {
	let field = inputField.value;
	if (field === '') {
		error.classList.add('active');
		console.log('nooooo');
	}
}

async function getUserName() {
	let username = inputField.value;

	let url = 'https://api.github.com/users/' + username;
	try {
		const response = await fetch(url);
		const data = await response.json();
		if (!response.ok) {
			return error.classList.remove('active');
		}
		return data;
	} catch (error) {
		console.log('Something went wrong', error);
	}
}

getUserName().then((data) => {
	githubProfile.src = data.avatar_url;
	githubName.innerHTML = data.name;
	githubUserName.innerHTML = data.login;
	githubRepos.innerHTML = data.public_repos;
	githubFollowers.innerHTML = data.followers;
	githubFollowing.innerHTML = data.following;
	githubLocation.innerHTML = data.location;
	githubTwitter.innerHTML = data.twitter_username;
	githubWebsite.innerHTML = data.blog;
	githubWebsite.href = data.blog;
	githubCompany.innerHTML = data.company;
	// Formatting the date
	let stringDate = data.created_at;
	var date = new Date(stringDate).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
	githubDate.innerHTML = 'Joined ' + date;
	githubBio.innerHTML = data.bio;
});
searchButton.addEventListener('submit', getUsername());

function refreshPage() {
	window.location.reload();
}
