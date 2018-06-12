window.onload = function onLoad() {
	updateLocalStorage('teama');
	updateLocalStorage('teamb');
	updateLocalStorage('teamc');
	updateLocalStorage('teamd');
}

function updateLocalStorage(team) {
	let teamNaamClass = document.getElementsByClassName(team);														//array voor alle team namen in een class
	
	let teamLetter = team.substring(4, 5);																			//team letter pakken
	teamLetter = teamLetter.toUpperCase();

	for (let teamNaamClassIndex = 0; teamNaamClassIndex < teamNaamClass.length; teamNaamClassIndex++) {				//net zo lang uitvoeren tot het aantal keer dat een team voorkomt 										
		teamNaamClass[teamNaamClassIndex].innerHTML = localStorage.getItem(`team${teamLetter}`);					//invoer uit local storage halen en schrijven naar class
	}
	document.getElementById(`name_t${teamLetter}`).value = localStorage.getItem(`team${teamLetter}`);				//

	// Spelers
	for (let spelerNummer = 1; spelerNummer < 5; spelerNummer++) { 													//4 spelers in een team
		let spelerNaamClass = document.getElementsByClassName(`t${teamLetter}s${spelerNummer}`);					//array voor alle namen in een class	
		for (let spelerNaamClassIndex = 0; spelerNaamClassIndex < spelerNaamClass.length; spelerNaamClassIndex++) {	//net zo lang uitvoeren tot het aantal keer dat een speler voorkomt 
			spelerNaamClass[spelerNaamClassIndex].innerHTML = localStorage.getItem(`team${teamLetter}s${spelerNummer}`);	//pak de naam uit local storage en schrijven naar class
		}
		document.getElementById(`name_t${teamLetter}s${spelerNummer}`).value = localStorage.getItem(`team${teamLetter}s${spelerNummer}`);
	}


	// Scores
	for (let gameNummer = 1; gameNummer < 7; gameNummer++) {
		
		for (let spelerNummer = 1; spelerNummer < 5; spelerNummer++) {											//for loop voor 4 spelers
			
			document.getElementById(`g${gameNummer}t${teamLetter}s${spelerNummer}`).value = localStorage.getItem(`g${gameNummer}t${teamLetter}s${spelerNummer}`); // score uit local storage
		}

		if(teamLetter === 'D' && gameNummer === 6) {
			editScore();
		}

	}
	
}


	// NAMEN BIJWERKEN

function editTeam() {			// indrukken opslaan knop teams	
	updateNames('teama');
	updateNames('teamb');
	updateNames('teamc');
	updateNames('teamd');
}	


function updateNames(team) {
	let teamNaamClass = document.getElementsByClassName(team);														//array voor alle team namen in een class
	
	let teamLetter = team.substring(4, 5);																			//team letter pakken
	teamLetter = teamLetter.toUpperCase();
	
	let invoerTeamNaam = document.getElementById('name_t' + teamLetter).value;										//ingevoerde teamnaam lezen
	localStorage.setItem(`team${teamLetter}`, `${invoerTeamNaam}`);													//teamnaam naar local storage

	for (let teamNaamClassIndex = 0; teamNaamClassIndex < teamNaamClass.length; teamNaamClassIndex++) {				//net zo lang uitvoeren tot het aantal keer dat een team voorkomt 
		//teamNaamClass[teamNaamClassIndex].innerHTML = invoerTeamNaam;												
		teamNaamClass[teamNaamClassIndex].innerHTML = localStorage.getItem(`team${teamLetter}`);					//invoer uit local storage halen en schrijven naar class
	}
	
	// Spelers
	for (let spelerNummer = 1; spelerNummer < 5; spelerNummer++) { 													//4 spelers in een team
		
		let spelerNaamClass = document.getElementsByClassName(`t${teamLetter}s${spelerNummer}`);					//array voor alle namen in een class	
		let invoerSpelerNaam = document.getElementById(`name_t${teamLetter}s${spelerNummer}`).value;				//ingevoerde spelersnaam lezen
		localStorage.setItem(`team${teamLetter}s${spelerNummer}`, `${invoerSpelerNaam}`);								//spelersnaam naar local storage
		
		for (let spelerNaamClassIndex = 0; spelerNaamClassIndex < spelerNaamClass.length; spelerNaamClassIndex++) {	//net zo lang uitvoeren tot het aantal keer dat een speler voorkomt 
			spelerNaamClass[spelerNaamClassIndex].innerHTML = localStorage.getItem(`team${teamLetter}s${spelerNummer}`);	//pak de naam uit local storage en schrijven naar class
		}
	}
}

	// WEDSTRIJDEN

let totaalPuntenTeamA = 0,
	totaalPuntenTeamB = 0,
	totaalPuntenTeamC = 0,
	totaalPuntenTeamD = 0;

function editScore() {			//	indrukken opslaan knop wedstrijden
	totaalPuntenTeamA = 0;
	totaalPuntenTeamB = 0;
	totaalPuntenTeamC = 0;
	totaalPuntenTeamD = 0;

	updateScore('teamA');
	updateScore('teamB');
	updateScore('teamC');
	updateScore('teamD');
}

function updateScore(team) {
	for (let gameNummer = 1; gameNummer < 7; gameNummer++) {
		
		let teamLetter = team.substring(4, 5);																	//team letter pakken
		let spelersScore = [];																					//Array aanmaken voor scores van spelers
		
		for (let spelerNummer = 1; spelerNummer < 5; spelerNummer++) {											//for loop voor 4 spelers
			
			let score = Number(document.getElementById(`g${gameNummer}t${teamLetter}s${spelerNummer}`).value);	//score uit inputbox halen
			spelersScore.push(score);
			localStorage.setItem(`g${gameNummer}t${teamLetter}s${spelerNummer}`, `${score}`);																			//score toevoegen aan spelers score array
		}
		
		function getSum(total, num) {																			//function voor optellen scores in array
			return total + num;
		}
		
		let totaalGameTeam = spelersScore.reduce(getSum);														//totaal score van team
		document.getElementById(`g${gameNummer}t${teamLetter}`).innerHTML = `${totaalGameTeam}`;				//team score in game schrijven in html


		switch (teamLetter) {	//punten van alle games per team bijelkaar op tellen
			case 'A':
				totaalPuntenTeamA += totaalGameTeam;
				break;
			case 'B':
				totaalPuntenTeamB += totaalGameTeam;
				break;
			case 'C':
				totaalPuntenTeamC += totaalGameTeam;
				break;
			case 'D':
				totaalPuntenTeamD += totaalGameTeam;
				break;
			default:
				break;

		}

			//  STAND INVULLEN EN SORTEREN

		if(teamLetter === 'D' && gameNummer === 6) {
				//Team A
			document.getElementById(`tableTeamName1`).innerHTML =  document.getElementById('name_tA').value;
			document.getElementById(`totaalPunten1`).innerHTML = `${totaalPuntenTeamA}`;

				//Team B
			document.getElementById(`tableTeamName2`).innerHTML =  document.getElementById('name_tB').value;
			document.getElementById(`totaalPunten2`).innerHTML = `${totaalPuntenTeamB}`;

				//Team C
			document.getElementById(`tableTeamName3`).innerHTML =  document.getElementById('name_tC').value;
			document.getElementById(`totaalPunten3`).innerHTML = `${totaalPuntenTeamC}`;

				//Team D
			document.getElementById(`tableTeamName4`).innerHTML =  document.getElementById('name_tD').value;
			document.getElementById(`totaalPunten4`).innerHTML = `${totaalPuntenTeamD}`;

			sortTable();

		}
	}
}

function sortTable() {
	let table, 
		rows, 
		switching, 
		i, 
		x, 
		y, 
		shouldSwitch;

	table = document.getElementById("tableStand");
	switching = true;
	  
	while (switching) {				//Loop totdat er niet meer geswitched hoeft te worden

		switching = false;			// Zeg eerst dat er niet geswitched is
		rows = table.getElementsByTagName("tr");

		for (i = 1; i < (rows.length - 1); i++) {	// Door alle tabel rijen heen, behalve eerste (headers)

			shouldSwitch = false;	// Zeg eerst dat er niet geswitched hoeft te worden

			x = rows[i].getElementsByTagName("td")[1];		// Pak 2 elementen om te vergelijken, 1 van huidige rij en 1 van volgende
			y = rows[i + 1].getElementsByTagName("td")[1];

	      if (Number(x.innerHTML) < Number(y.innerHTML)) {	// Check of de rijen moeten switchen

	        shouldSwitch= true;		// Zo ja, Zeg dat ie moet switchen en stop de loop
	        break;
	      }
	    }

	    if (shouldSwitch) {
	      
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);	//Als er geswitched moet worden, doe dan de switch en zeg dat er geswitched is
	      switching = true;
	    }
	  }
}


function wedTabelKnop(dag) {
	let x = document.getElementById(`wedTabel${dag}`);
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}














//HIERONDER STAAN MIJN IDEEËN VOOR VERDERE ONTWIKKELING
//	Alle eigenschappen van de teams (objecten) met een class gebruiken. Die kan ik dan gebruiken voor de Stand.

/*
class Team {
	constructor(name) {
		this._name = name;
		this._speler1 = 'Speler 1';
		this._speler2 = 'Speler 2';
		this._speler3 = 'Speler 3';
		this._speler4 = 'Speler 4';
		this._gespeeld = 0;
		this._totaalPunten = 0;
		this._saldo = 0;
	}
	
	set name(nameIn) {
		let teamNaamClass = document.getElementsByClassName(nameIn);	
		
		let teamLetter = nameIn.substring(4, 5);										
		teamLetter = teamLetter.toUpperCase();
		
		this._name = document.getElementById("name_t" + teamLetter).value;	
		
		teamNaamClass[0].innerHTML = this._name;
			
	}
	
	get name() {
		
		return this._name;
	}
	
	get speler1() {
		return this._speler1;
	}
	
	get speler2() {
		return this._speler2;
	}
	
	get speler3() {
		return this._speler3;
	}
	
	get speler4() {
		return this._speler4;
	}
	
	get gespeeld() {
		return this._gespeeld;
	}
	
	get totaalPunten() {
		return this._totaalPunten;
	}
	
	get saldo() {
		return this._saldo;
	}	
	
}*/




/*
const teamA = new team('A');
const teamB = new team('B');
const teamC = new team('C');
const teamD = new team('D');

*/

