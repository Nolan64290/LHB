// Index statut programme du WE
let index = 1;

// Fonction permettant de déplier le programme du WE
function programme() {
    var div = document.getElementById("toggle-div");
    if (index === 1) {
        div.classList.add('expanded');
        index = 2;
    } else if (index === 2) {
        div.classList.remove('expanded')
        index = 1;
    }

}