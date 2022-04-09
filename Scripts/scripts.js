const matheight = document.getElementById('matrix-height'); /* height of the matrix entered by the user */
const matwidth = document.getElementById('matrix-width'); /* width of the matrix also entered by the user */
const motherofmatrix = document.getElementById('matrix-mother'); /* parent div element in which matrix is displayed */
const createMatrixButton = document.getElementById('create-matrix'); /* button used for creating the matrix */
const solutionButton = document.getElementById('find-solution'); /* Find the solution button */
const choosenMethod = document.getElementById('methods'); /* Dropdown menu for method selection */


createMatrixButton.addEventListener('click', createMatrix);
solutionButton.addEventListener('click', findSolution);

/* Function for creating the matrix with the width and height values entered by the user */
function createMatrix(){
    motherofmatrix.innerHTML = ''; /* Need to make sure that previous values are cleared for the parent div */
    motherofmatrix.style.gridTemplateColumns = `repeat(${matwidth.value}, 1fr)`;

    for(let i=0; i<matheight.value; i++){ /* Loop that many times as the height of matrix */
        for(let j=0; j<matwidth.value; j++){ /* Loop as many times as the width of matrix */
            let inputelement = document.createElement('input'); /* Creating input element "width" many times */
            inputelement.type = 'number';
            inputelement.max = 9;
            inputelement.min = -9;
            inputelement.value = 0; /* Default value to 0 to avoid undefined value */
            inputelement.className = 'matrix-input'; /* Give a class name */
            inputelement.id = `row${i}-col${j}`;
            motherofmatrix.appendChild(inputelement);
        }
    }
}

function findSolution(){
    let matrixInputArray = new Array(matheight);
    
    for(let x=0; x<matheight.value; x++){
        matrixInputArray[x] = new Array(matwidth);
        for(let y=0; y<matwidth.value; y++){
            matrixInputArray[x][y] = document.getElementById(`row${x}-col${y}`).value;
            console.log(matrixInputArray[x][y])
        }
    }

    console.log(choosenMethod.value);
}