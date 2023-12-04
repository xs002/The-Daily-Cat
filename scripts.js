//API endpoint for getting random cat facts
const CAT_FACTS_API_URL = '';

//API endpoint for submitting cat facts
const SUBMIT_FACT_API_URL = '';

//API endpoint for searching cat facts
const SEARCH_FACTS_API_URL = '';

// Function to fetch a random cat fact
async function getRandomCatFact() {
    const response = await fetch(CAT_FACTS_API_URL);
    const data = await response.json();
        return data.fact; 
}

// Function to submit a cat fact
async function submitCatFact(fact) {
        const response = await fetch(SUBMIT_FACT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fact }),
        });
        return response.json(); 
    }

// Function to search cat facts
async function searchCatFacts(keyword) {
        const url = new URL(SEARCH_FACTS_API_URL);
        url.searchParams.set('keyword', keyword);

        const response = await fetch(url);
        return await response.json(); 
    }