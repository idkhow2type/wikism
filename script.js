const wordDisplay = document.querySelector('h1');
const defDisplay = document.querySelector('.def');
const weightStrengthSlider = document.querySelector('#weight-strength');

const words = await (await fetch('ism.json')).json();
const searchParams = new URLSearchParams(window.location.search);
const totalOccurences = Object.values(words).reduce((a, b) => a + b['freq'], 0);

// set default weightStrength
if (!localStorage.getItem('weightStrength')) {
    localStorage.setItem('weightStrength', 1.7);
}

// set weightStrengthSlider value to weightStrength
weightStrengthSlider.value = localStorage.getItem('weightStrength');

weightStrengthSlider.onchange = () => {
    localStorage.setItem('weightStrength', weightStrengthSlider.value);
};

// check query param p
// if p is set, use it as the word
// else pick a random word from object keys
// weighted by freq
// the effectiveness of the weight is determined by weightStrength
let wordKeys = Object.keys(words);
let wordFrequencies = wordKeys.map((key) => words[key]['freq']);
let word =
    searchParams.get('p') ||
    wordKeys[
        weightedRandom(wordFrequencies, localStorage.getItem('weightStrength'))
    ];

function weightedRandom(weights, weightStrength) {
    let totalWeight = 0;
    let cumulativeWeights = new Array(weights.length);
    for (let i = 0; i < weights.length; i++) {
        totalWeight += Math.pow(weights[i], weightStrength);
        cumulativeWeights[i] = totalWeight;
    }

    let random = Math.random() * totalWeight;
    for (let i = 0; i < cumulativeWeights.length; i++) {
        if (random < cumulativeWeights[i]) {
            return i;
        }
    }

    return -1; // should not reach here
}

// set word and definition
wordDisplay.textContent = word;
defDisplay.textContent = `Discrimination against ${
    words[word]['desc'] || word.slice(0, -3).toLowerCase() + 's'
}`;

// set query param p to word
// so that the word can be shared
searchParams.set('p', word);
window.history.replaceState({}, '', `${location.pathname}?${searchParams}`);

console.log(
    (words[word]['freq'] / totalOccurences) * 100,
    (Math.max(...wordFrequencies) / totalOccurences) * 100
);
