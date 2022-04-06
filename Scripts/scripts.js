const matheight = document.getElementById('matrix-height'); /* height of the matrix entered by the user */
const matwidth = document.getElementById('matrix-width'); /* width of the matrix also entered by the user */
const motherofmatrix = document.getElementById('matrix-mother'); /* parent div element in which matrix is displayed */
const createMatrixButton = document.getElementById('create-matrix'); /* button used for creating the matrix */
const solutionButton = document.getElementById('find-solution');

let matrixInputArray = [];

createMatrixButton.addEventListener('click', createMatrix);
solutionButton.addEventListener('click', findSolution);

/* Function for creating the matrix with the width and height values entered by the user */
function createMatrix(){
    motherofmatrix.innerHTML = ''; /* Need to make sure that previous values are cleared for the parent div */
    motherofmatrix.style.gridTemplateColumns = `repeat(${matwidth.value}, 1fr)`;
    var myArray = [...Array(6)].map(e => Array(6));
    console.log(myArray);

    for(let i=0; i<matheight.value; i++){ /* Loop that many times as the height of matrix */
        for(let j=0; j<matwidth.value; j++){ /* Loop as many times as the width of matrix */
            let inputelement = document.createElement('input'); /* Creating input element "width" many times */
            inputelement.type = 'number';
            inputelement.max = 9;
            inputelement.min = -9;
            inputelement.value = 0; /* Default value to 0 to avoid undefined value */
            inputelement.className = 'matrix-input'; /* Give a class name */ 
            motherofmatrix.appendChild(inputelement);
        }
    }
}

function findSolution(){
    
}