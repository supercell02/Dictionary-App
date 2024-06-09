const wordInput = document.getElementById('css-input');
const searchBtn = document.getElementById('btn');
const resultContainer = document.getElementById('result-container');

searchBtn.addEventListener('click', async () => {
    const word = wordInput.value.trim();
    if (word) {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();
            const definitions = data[0].meanings[0].definitions;
            const info = definitions.map((definition, index) => {
                return `
                    <div class="definition">
                        <h2>Definition ${index + 1}</h2>
                        <p>${definition.definition}</p>
                    </div>
                `;
            }).join('');
            resultContainer.innerHTML = info;
        } catch (error) {
            console.error(error);
            resultContainer.innerHTML = '<p>Error: Unable to fetch data</p>';
        }
    } else {
        resultContainer.innerHTML = '<p>Please enter a word</p>';
    }
});