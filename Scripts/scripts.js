const matheight = document.getElementById('matrix-height'); /* height of the matrix entered by the user */
const matwidth = document.getElementById('matrix-width'); /* width of the matrix also entered by the user */
const motherofmatrix = document.getElementById('matrix-mother'); /* parent div element in which matrix is displayed */
const createMatrixButton = document.getElementById('create-matrix'); /* button used for creating the matrix */
const solutionButton = document.getElementById('find-solution'); /* Find the solution button */
const choosenMethod = document.getElementById('methods'); /* Dropdown menu for method selection */
const sonelement = document.getElementById('son');


createMatrixButton.addEventListener('click', createMatrix);
solutionButton.addEventListener('click', makeInputsReady);

/* Function for creating the matrix with the width and height values entered by the user */
function createMatrix() {
    motherofmatrix.innerHTML = ''; /* Need to make sure that previous values are cleared for the parent div */
    sonelement.innerHTML = ''; /* Also parent element of matrix B */
    
    motherofmatrix.style.gridTemplateColumns = `repeat(${matwidth.value}, 1fr)`;
    motherofmatrix.style.gap = '0.5rem';

    for (let i = 0; i < matheight.value; i++) { /* Loop that many times as the height of matrix */
        for (let j = 0; j < matwidth.value; j++) { /* Loop as many times as the width of matrix */
            let inputelement = document.createElement('input'); /* Creating input element "width" many times */
            inputelement.type = 'number';
            inputelement.max = 9;
            inputelement.min = -9;
            inputelement.value = 0; /* Default value to 0 to avoid undefined value */
            inputelement.className = 'matrix-input'; /* Give a class name */
            inputelement.id = `row${i}-col${j}`;
            motherofmatrix.appendChild(inputelement);
        }

        let matrixbinput = document.createElement('input');
        matrixbinput.type = 'number';
        matrixbinput.style.marginBottom = '0.5rem';
        matrixbinput.value = 0;
        matrixbinput.className = 'matrixbinput';
        matrixbinput.id = `matb${i}`;
        sonelement.appendChild(matrixbinput);
    }
}

function makeInputsReady() {
    let matrixA = new Array(matheight);
    let matrixB = new Array(matheight);
    let matrixX = new Array(matheight);

    for (let x = 0; x < matheight.value; x++) {
        matrixA[x] = new Array(matwidth);
        for (let y = 0; y < matwidth.value; y++) {
            matrixA[x][y] = document.getElementById(`row${x}-col${y}`).value;
        }

        matrixB[x] = document.getElementById(`matb${x}`).value;
        matrixX[x] = 0;
    }

    /* Call corresponding solution method function */
    switch (choosenMethod.value) {
        case 'gauss-jordan':
            alert('Jordan is choosen');
            break;
        case 'gauss-seidel':
            for(let h=0; h<25; h++){
                matrixX = GaussSeidel(matrixA, matrixB, matrixX);
                /*console.log('res: ', matrixX);*/
            }
            break;
        case 'gauss-jacobi':
            alert('Jacobi is choosen')
            break;
    }
}

function GaussSeidel(matrixAnow, matrixBnow, matrixXnow) {
    let aa = matrixAnow.length;
    for (let a = 0; a < matheight.value; a++) {
        let d = matrixBnow[a];
        for (let b = 0; b < matheight.value; b++) {
            if (a != b) {
                d -= matrixAnow[a][b] * matrixXnow[b];
            }
        }
        matrixXnow[a] = d/matrixAnow[a][a];
    }

    console.log(matrixXnow);
    return matrixXnow;
}