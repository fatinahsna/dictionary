//FETCH API (search word fx)
function searchWord() { 
    var query = document.getElementById("searchword").value

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data) //output API into console
        
        //SOURCE
        document.getElementById("source").innerHTML = ""
        document.getElementById("source").innerHTML = `Definitions from <a href="${data[0].sourceUrls}">Wiktionary</a>`
    
        //WORD
        document.getElementById("huehue").innerHTML = ""
        document.getElementById("displayword").innerHTML = ""
        document.getElementById("displayword").innerHTML = `<button onclick="playaudio()" style="font-size: 20pt;" id="audioIcon">🔉</button>  &nbsp;${data[0].word}`

        //PHONETIC
        document.getElementById("displayphonetic").innerHTML = ""
        if (data[0].phonetic != null) {
            document.getElementById("displayphonetic").innerHTML = `${data[0].phonetic}`
        } else {
            var wordphonetics = data[0].phonetics
            for (var b=0; b<wordphonetics.length; b++) {
                if ((wordphonetics[b].text != undefined) && (wordphonetics[b].text != null)) {
                    document.getElementById("displayphonetic").innerHTML = `${wordphonetics[b].text}`
                }
            }
        }

        //PRONOUNCIATION
        document.getElementById("aaa").innerHTML = "" 
        //create audio element to play the audio for word's pronounciation
        var wordaudio = data[0].phonetics
        for (var a=0; a<wordaudio.length; a++) {
            if ((wordaudio[a].audio != undefined) && (wordaudio[a].audio != '')) {
                var newAudio = document.createElement("audio");
                newAudio.setAttribute("id","audio")
                newAudio.setAttribute("src",`${wordaudio[a].audio}`)
                document.getElementById("aaa").appendChild(newAudio);
            }
        }

        //WORD MEANINGS, DEFINITIONS, EXAMPLES, SYNONYMS & ANTONYMS
        document.getElementById("displaymeaning1").innerHTML = ""
        document.getElementById("displaysynonyms").innerHTML = ""
        document.getElementById("displayantonyms").innerHTML = ""
        var wordmeanings = data[0].meanings 
        for (var x=0; x<wordmeanings.length; x++) { //display partofspeech
            var newMeaning = document.createElement("p");
            newMeaning.innerHTML = `<br> ${wordmeanings[x].partOfSpeech}`
            document.getElementById("displaymeaning1").appendChild(newMeaning);
        
            var worddefinitions = wordmeanings[x].definitions 
            for (var y=0; y<worddefinitions.length; y++) { //display definition
                var newDefinition = document.createElement("p");
                if (y<3) {
                    if (worddefinitions[y].example != undefined) { //display example
                        newDefinition.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${y+1}.  ${worddefinitions[y].definition} <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i>"${worddefinitions[y].example}</i>"`
                    } else {
                        newDefinition.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${y+1}.  ${worddefinitions[y].definition} <br>`
                    }
                    document.getElementById("displaymeaning1").appendChild(newDefinition);
                }} 
                
            var wordsynonyms = wordmeanings[x].synonyms
            var wordantonyms = wordmeanings[x].antonyms
            for (var z=0; z<wordsynonyms.length; z++) { //display synonyms
                var newSynonyms = document.createElement("p");
                if (wordsynonyms[z] != '') {
                    newSynonyms.innerHTML = `${wordsynonyms[z]}`
                    newSynonyms.setAttribute("class","syno")
                    document.getElementById("displaysynonyms").appendChild(newSynonyms)
                }
            }
            for (var w=0; w<wordantonyms.length; w++) { //display antonyms
                var newAntonyms = document.createElement("p");
                if (wordantonyms[z] != '') {
                    newAntonyms.innerHTML = `${wordantonyms[w]}`
                    newAntonyms.setAttribute("class","anto")
                    document.getElementById("displayantonyms").appendChild(newAntonyms)
                }
            }
        }
    }); 
    document.getElementById("displayaddBtn").innerHTML = ""
    document.getElementById("displayaddBtn").innerHTML = `<button onclick="addtoWOTD()" id="add-btn">Add to Word Of The Day</button>`
} 

//TO PLAY AUDIO
function playaudio() {
    var audio = document.getElementById("audio")
    audio.play()
}

//SAVE INTO LOCAL STORAGE
var WOTD = JSON.parse(localStorage.getItem("myWOTD")) || [];
console.log(WOTD) //nak tgk getItem berjaya ke tidak
function addtoWOTD() {
    var query = document.getElementById("searchword").value

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
    .then((response) => response.json())
    .then((data) => {
        var newWords = data[0].word
        var newDefinition = data[0].meanings[0].definitions[0].definition
        alert(`${newWords} has been added!`)
        var newWOTD = {
            word : newWords,
            definition : newDefinition,
        }
        console.log(newWOTD)
        WOTD.push(newWOTD)
        console.log(WOTD) //checking whether the new objects successfully added into the array
        localStorage.setItem("myWOTD", JSON.stringify(WOTD)); //save array into local storage
    }); 
}