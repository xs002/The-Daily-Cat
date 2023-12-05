//API endpoint for getting random cat facts
const CAT_FACTS_API_URL = 'https://catfact.ninja/fact?max_length=140';

// //switch between the pages
// document.addEventListener('DOMContentLoaded', function () {
//     const isLandingPage = document.getElementById('generationsPage');
//     const isGenerationsPage = document.getElementById('landingPage');
//     if (isLandingPage) {
//         isLandingPage.addEventListener('click', function () {
//             window.location.href = 'pastgenerations.html';
//         });
//     }
//     if (isGenerationsPage) {
//         isGenerationsPage.addEventListener('click', function () {
//             window.location.href = 'landingpage.html';
//         });
//     }
// });

const pastGenerationsList = document.getElementById('pastGenerationsList');
const generateButton = document.getElementsByClassName('gen-button');
const pastGenerations = [];

generateButton.addEventListener("click", function () {
    generateRandomFact();
});

// // Function to generate a random cat fact
async function generateRandomFact(){
    let response = await fetch(CAT_FACTS_API_URL, {
        headers: {
            'Accept': 'application/json'
        }
    });
    let data = await response.json(); 
    displayFact(data.fact);
    pastGenerations.push(data.fact);
    displayPastGenerations();
}
 
// display the cat fact-not working bc it isn't accessing pastgenerations.html
function displayFact(fact) {
    const factbox = document.getElementById('generated-facts');
    factbox.innerHTML = ''; // Clear previous content
    factbox.textContent = fact;
}

//display past generations
function displayPastGenerations() {
    const pastGenerationsList = document.getElementById('generatedList');
    pastGenerationsList.innerHTML = '';  
    const list = document.createElement('ul');
    pastGenerations.forEach((generation, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Generation ${index + 1}: ${generation}`;
        list.appendChild(listItem);
    });

    pastGenerationsList.appendChild(list);
}


// // Function to submit a cat fact
async function submitCatFact(fact) {
    const response = await fetch(SUBMIT_FACT_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fact }),
    });

    const responseData = await response.json();
    if (responseData.success) {
        updateUserSubmittedFactsList(fact);
    }
}

//updated list for user submitted facts
function updateUserSubmittedFactsList(fact) {
    const listElement = document.getElementById('userSubmittedFactsList');
    const listItem = document.createElement('li');
    listItem.textContent = fact;
    listElement.appendChild(listItem);
}


// Function to search cat facts
async function searchCatFacts(keyword) {
        const url = new URL(SEARCH_FACTS_API_URL);
        url.searchParams.set('keyword', keyword);

        const response = await fetch(url);
        return await response.json(); 
    }


