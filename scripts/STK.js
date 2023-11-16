function addProgram(){//funktion för att lägga till program
    //hämtar svar från formulär
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let age = document.getElementById('age').value;

    //gör en array av svaren från formuläret
    let program = {
        title: title,
        description: description,
        age: age
    };
    
    let programs = JSON.parse(localStorage.getItem('programs')) || [];//hämtar de tv-program som redan lagts till
    programs.push(program)//lägger till den nya infon om programmen med de gamla
    localStorage.setItem('programs', JSON.stringify(programs));//lägger det i local storage

    showPrograms(programs);//uppdaterar programmen som visas

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('age').value = '15';
}

function clearPrograms(){//tömmer local storage och gör så inga program finns att visas
    localStorage.removeItem('programs');
    showPrograms([]);
}

function search(){//sökfunktion
    let searchInput = document.getElementById('searchInput').value;//hämtar vad som skrivs i sökrutan
    searchInput = searchInput.toLowerCase();//gör så det inte spelar någon roll om man använder stora eller små bokstäver

    let programs = JSON.parse(localStorage.getItem('programs')) || [];//hämtar de sparade programmen eller en tom array om det första inte går

    let searchPrograms = programs.filter(function(program) {//filtrerar programmen som finns sparade
        let searchTitle = program.title.toLowerCase().includes(searchInput) //jämför med titlarna
        let searchDescription = program.description.toLowerCase().includes(searchInput);//jämför beskrivningarna
        let searchAge = program.age.toString().includes(searchInput);//jämför åldern
        return searchTitle || searchDescription || searchAge;//ger tillbaks  antingen titel beskrivning eller ålder
    });
    showPrograms(searchPrograms);//visar de eftersökta programmen
}

function showPrograms(programs){//funktion för att visa program
    let programList = document.getElementById('programList');//hämtar programlistan från HTML
    programList.innerHTML = '';//tömmer listan
    
    for (let i = 0; i < programs.length; i++){//går lika långt som det finns program
        let listItem = document.createElement('li')//skapar en ny bit på en lista 
        listItem.className = 'programItem';//ger en klass
        listItem.innerHTML = `<strong>Titel: </strong>${programs[i].title}<br><strong>Beskrivning: </strong>${programs[i].description}<br><strong>Åldersgräns: </strong>${programs[i].age}`;//lägger in innehåll i listan
        programList.appendChild(listItem);
    }

}
let savedPrograms = JSON.parse(localStorage.getItem('programs')) || [];//hämtar de sen innan sparade programmen
showPrograms(savedPrograms);//visar sparade program när sidan startas