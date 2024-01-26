

const openFileButton = document.getElementById('open-file');
const randomFileButton = document.getElementById('open-random');
const createBooksButton = document.getElementById('create-books');
const clippingsArea = document.getElementById('clippingsArea');
const stats = document.getElementById('stats');

let highlights, highlightsArray;

openFileButton.addEventListener('click', async () => {
    window.api.send('toMain');

    window.api.receive('fromMain', async (data) => {
        // display txt file on txtarea
        highlights = data;
        clippingsArea.textContent = highlights;

        
        // clippings = await data;

        highlightsArray = highlights.split("==========");
        let totalClippings = highlightsArray.length;


        stats.innerText = `${totalClippings} highlights and notes`
    });
});

randomFileButton.addEventListener('click', () => {
    // ToDo: check if file is opened already

    clippingsArea.textContent = getRandomHighlights(highlightsArray);
});

createBooksButton.addEventListener('click', () => {
    let books = {}
    // ToDo: check if file has been opened

    // ToDo: ask for saving location

    for (let i = 0; i < highlightsArray.length; i++) {
        let clipping = highlightsArray[i].split('\r\n')
        clipping = clipping.filter(e => e.length);

        if (clipping.length === 0) {
            continue;
        }

        let title = clipping[0];

        if (title.length > 160) {
            title = title.substring(0, 159) + '...';
        };

        let highlight = clipping[2];
        if(!highlight) {
            continue;
        };

        if (books[title]) {
            books[title].push(highlight)
        }
        else {
            books[title] = [highlight];
        }
    }

    window.api.send('create-books', books);
})


function getRandomHighlights(arr, numOfRandomHighlights) {
    let shuffledHighlights = shuffle(arr);
    let randomHighlights = shuffledHighlights.slice(0, 3)
    return randomHighlights;
};

function shuffle(arr) {
    // fisher-yates algorithm
    let currentIndex = arr.length;
    let randomIndex;

    while(currentIndex !=0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr

}



 `this app is using Chrome v${window.versions.chrome()}`


