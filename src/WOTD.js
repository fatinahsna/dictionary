var WOTD = JSON.parse(localStorage.getItem("myWOTD")) || [];
displayWOTD()

function displayWOTD() {
    document.getElementById("list").innerHTML = ""
    for(var i=0; i<(WOTD.length); i++) {
        var newDiv = document.createElement("div")
        newDiv.innerHTML = `<div class="divword" style="display: flex;"><div style="width: 98%;"><a href="index.html" id="worda">${WOTD[i].word}</a> <br><br> ${WOTD[i].definition}</div><div style="" class="dropdown"><button id="dots3">&#8942;</button><div class="dropdown-content"><a href="#" onclick="updateWOTD(${i})">Change Definition</a><a href="" onclick="deleteWOTD(${i})">Remove Word</a></div></div></div><br><br>`
        document.getElementById("list").appendChild(newDiv)
    }
}

function deleteWOTD(i) {
    //DELETE WORD
    alert(`${WOTD[i].word} has been removed.`)
    var index = WOTD.indexOf(WOTD[i]);
    if (index > -1) {
        WOTD.splice(index, 1);
    }
    localStorage.setItem("myWOTD", JSON.stringify(WOTD));
    location.reload()
}

function updateWOTD(i) {
    document.getElementById('my-popup').classList.add('show');
    document.getElementById('overlay').classList.add('show');
    var query = WOTD[i].word
    var olddef = WOTD[i].definition

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("displayword").innerHTML = ""
        document.getElementById("displayword").innerHTML = `${data[0].word}`

        document.getElementById("displaymeaning").innerHTML = ""
        var wordmeanings = data[0].meanings 
        for (var x=0; x<wordmeanings.length; x++) { //display partofspeech
            var newMeaning = document.createElement("p");
            newMeaning.innerHTML = `${wordmeanings[x].partOfSpeech}`
            document.getElementById("displaymeaning").appendChild(newMeaning);
        
            var worddefinitions = wordmeanings[x].definitions 
            for (var y=0; y<worddefinitions.length; y++) { //display definition
                var newDefinition = document.createElement("p");
                if (y<3) {
                    newDefinition.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio" name="definition" value="${worddefinitions[y].definition}" id="r${y}"> ${worddefinitions[y].definition}`
                    document.getElementById("displaymeaning").appendChild(newDefinition);
                }
            } 
        }
        document.getElementById("update-btn").innerHTML = ""
        document.getElementById("update-btn").innerHTML = `<button id="update-btn" type="button">Update Definition</button>`

        document.getElementById("update-btn").addEventListener('click', function () {
            var WOTD = JSON.parse(localStorage.getItem("myWOTD")) || [];

            function findWord(word) { 
                return word.definition === olddef;
            }
            var index = WOTD.find(findWord);
            console.log(index.definition)

            var newdef = document.querySelector(
                'input[name="definition"]:checked'
            );
            if(newdef != null) {
                index.definition = newdef.value
                olddef = newdef.value
                localStorage.setItem("myWOTD", JSON.stringify(WOTD));
                alert("New definition successfully updated.")
            } else {
                alert("No definition selected.")
            }
            //CLOSE POPUP
            document.getElementById('my-popup').classList.remove('show');
            document.getElementById('overlay').classList.remove('show');
            location.reload();
        }) 
    }); 
}
  
function closePopup() {
    document.getElementById('my-popup').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    location.reload();
}