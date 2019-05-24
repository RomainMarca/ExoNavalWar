// Met à jour le message affiché à l´adversaire à chaque nouvelle
// lettre saisie dans l´input ´Mon nom´
let myName;
let shoot;
let counter = 0;
let boat = 2;
let boatDestroyed = 0;

$("#moi").keyup(function(event) {
  myName = $("#moi").val();
});
$("#canon").keyup(function (e) {
  shoot = $("#canon").val();
});

document.addEventListener("keydown", function(e) {
	if (e.keyCode === 13) {
        if (myName.length > 0 && shoot.length > 0) {
            $("#megaphone").text(promptMessage(myName, shoot));
            if (shoot[0] >= 'a' && shoot[0] <= 'f' && shoot[1] > 0 && shoot[1] <= 9) {
                let shootSquare = "#"+ shoot;
                $(shootSquare).css("background-color", "red");
                let text1 = "Le joueur " + myName + " a tiré en " + shoot + ".\n";
                $("#history").text(text1);
                let inputValue = document.getElementById("canon").value;
                let cellule = document.getElementById(inputValue);
                let celValue = cellule.innerHTML;
                    if (celValue === 'X') {
                    let textTouch = "\nLe navire en " + shoot+ " est TOUCHE!"
                        $("#history").text(text1 + textTouch);
                        cellule.classList.add("checked");
    
                        if (checkBoat(inputValue) === true) {
                        	let textCoule = "\n"+ myName + " a COULE le navire."
                          $("#history").text(text1 + textTouch + textCoule);
                          boatDestroyed += 1;
                          if (boatDestroyed === boat) {
                          	let textWin = "\n"+ myName + " Gagne la partie!!! \nYou WIN!!!";
                            $("#history").text(text1 + textTouch + textCoule + textWin);
                            $('code').text("Click here! You win!");
                            $('code').css("font-size", "40px");
                            $("#no-mans-land").on('click', function() {
                            	$("#no-mans-land").css("background-color", "yellow");
                              $('code').text("YES You win!");
                            })
                          }
                        } 
                        
                    } else {
                        $("#history").text(text1 + "\n" + "Le tir sur " + shoot+ " a fait PLOUF!");
                        }
            } else {
                alert("Les coordonnées sont erronées")
            }
        } else {
        alert("Entrer votre nom et vos coordonnées.")
        }
    }
});

// Génère le message diffusé à l´adversaire
function promptMessage(playerName, playerShoot) {
  if (playerName.length > 0 && playerShoot.length > 0) {
    return ">> " + playerName + " va attaquer en " + playerShoot;
  } else {
    return "> En attente d'un joueur";
  }
}


function checkBoat(valeurId) {
	counter = 0;
  let tabValue = valeurId.split('');
  let i = Number(tabValue[1]);
  if (i < 2) {
    for (let j=i ; j <= i+2 ;j++) {
      tabValue[1] = j;
      valeurId = tabValue.toString().replace(',', '');
      if (document.getElementById(valeurId).classList.contains("checked")) {
        counter += 1;
      }
    }
  } else if (i > 8) {
    for (let j=i-2 ; j <= i ;j++) {
        tabValue[1] = j;
        valeurId = tabValue.toString().replace(',', '');
        if (document.getElementById(valeurId).classList.contains("checked")) {
          counter += 1;
        }
      }
  } else {
    for (let j=i-2 ; j <= i+ 2;j++) {
          tabValue[1] = j;
          valeurId = tabValue.toString().replace(',', '');
          if (document.getElementById(valeurId).classList.contains("checked")) {
            counter += 1;
          }
        }
  }
  
  let letter;
  let a = tabValue[0];
  let codeAsc= a.charCodeAt(0);
  if (codeAsc < 99) {
    for  (let k=codeAsc; k<= codeAsc +2 ; k++) {
      letter = String.fromCharCode(k);
      tabValue[0] = letter;
      valeurId = tabValue.toString().replace(',', '');
      if (document.getElementById(valeurId).classList.contains("checked")) {
      counter += 1;
  		}
     }
  } else if (codeAsc > 101) {
    for  (let k=codeAsc - 2; k<= codeAsc; k++) {
      letter = String.fromCharCode(k);
      tabValue[0] = letter;
      valeurId = tabValue.toString().replace(',', '');
      if (document.getElementById(valeurId).classList.contains("checked")) {
      counter += 1;
      }
    }
  } else {
  	for  (let k=codeAsc - 2; k<= codeAsc +2 ; k++) {
      letter = String.fromCharCode(k);
      tabValue[0] = letter;
      valeurId = tabValue.toString().replace(',', '');
      if (document.getElementById(valeurId).classList.contains("checked")) {
      counter += 1;
      }
    }
  }

  if (counter > 2) {
  return true;
  } else {
  	return false;
  }
}

