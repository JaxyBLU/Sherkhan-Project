const matheight = document.getElementById('matrix-height'); /* height of the matrix entered by the user */
const matwidth = document.getElementById('matrix-width'); /* width of the matrix also entered by the user */
const motherofmatrix = document.getElementById('matrix-mother'); /* parent div element in which matrix is displayed */
const createMatrixButton = document.getElementById('create-matrix'); /* button used for creating the matrix */
const solutionButton = document.getElementById('find-solution'); /* Find the solution button */
const choosenMethod = document.getElementById('methods'); /* Dropdown menu for method selection */
const sonelement = document.getElementById('son'); /* Container for Array B's inputs */
const myboard = document.getElementById('board'); /* Textarea in which the answer will be displayed */


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
            }
            break;
        case 'gauss-jacobi':
            for(let h=0; h<25; h++){
                matrixX = GaussJacobi(matrixA, matrixB, matrixX);
            }
            break;
    }
}

/* ========== Gauss Seidel --------------------------------> Completed! ===============*/
function GaussSeidel(matrixAnow, matrixBnow, matrixXnow) {
    
    for (let a = 0; a < matheight.value; a++) {
        let d = matrixBnow[a];
        for (let b = 0; b < matheight.value; b++) {
            if (a != b) {
                d -= matrixAnow[a][b] * matrixXnow[b];
            }
        }
        matrixXnow[a] = d/matrixAnow[a][a];
    }

    let textnow = '';
    matrixXnow.map((element)=>(textnow += element + ' | '));
    myboard.value += textnow + '\r\n';

    return matrixXnow;
}
/* =====================================================================================*/

/*========== Gauss Jacobi ------------------------------------> Completed! =============*/
function GaussJacobi(matrixAnow, matrixBnow, matrixXnow){
    let newX = matrixXnow;

    for(let i=0; i < matheight.value; i++){
        let d = matrixBnow[i];
        for(let j=0; j < matheight.value; j++){
            if(i != j){
                d -= matrixAnow[i][j] * newX[j];
            }
        }

        matrixXnow[i] = d / matrixAnow[i][i];
        matrixXnow[i] = parseFloat(matrixXnow[i].toFixed(10));
    }

    let textnow = '';
    matrixXnow.map((element)=>(textnow += element + ' | '));
    myboard.value += textnow + '\r\n';

    return matrixXnow;
}
/* ======================================================================================*/

function GaussJordan(matrixAnow, matrixBnow, matrixXnow){

    /******** Printing Function ************************/
    function PrintMatrix(a, n){
        let matrixWillBePrinted = '';

        for(let i=0; i<n; i++){
            for(let j=0; j<n; j++){
                matrixWillBePrinted += a[i][j] + ' ';
                matrixWillBePrinted += '<br>';
            }
        }
    }
    /***************************************************/

    function PerformOperation(a, n){     
        let i=0; let j=0; let k=0; let c=0; let flag=0; let m=0; let pro=0;
        
        for(i=0; i<n; i++){
            if(a[i][i] == 0){
                c=1;
                while((i+c) < n && a[i+c][i] == 0){
                    c++; /* Not sure if while block must be close here */
                }
                if((i+c) == n){
                    flag = 1;
                    break;
                }
                for(j=0, k=0; k<=n; k++){
                    let temp = a[j][k];
                    a[j][k] = a[j+c][k];
                    a[j+c][k] = temp;
                }
            }
            
            for(j=0; j<n; j++){
                // Excluding all i==j
                if(i != j){
                    // Converting the matrix to reduced row echelon form (diagonal matrix)
                    let p = a[j][i] / a[i][i];
                    for(k=0; k<=n; k++){
                        a[j][k] = a[j][k] - (a[i][k]) * p;
                    }
                }
            }
        }

        for(let i=0; i<n; i++){
            a[i][n] /= a[i][i];
            a[i][i] /= a[i][i];
        }
        return flag;
    }

    /* Function to print the desired result if unique soltion exists, otherwise prints
    no solution or infinite solutions depending upon the input given. */
    function PrintResult(a, n, flag){
        let message = '';
        message += 'The Result is: \r\n';

        if(flag == 2){
            message += 'Infinite Soltions exists \r\n';
        } else
        if(flag == 3){
            message += 'No solution exists \r\n';
        } else{
            /* Printing the solution by dividing constants by their respective diagonal elements  */
            for(let i=0; i<n; i++){
                message += a[i][n] + ' ';
            }
        }
    }

    /* To check whether infinite solutions exists or no solution exists */
    function CheckConsistency(a, n, flag){
        let i; let j; let sum;
        /* flag == 2 for infinite solution */
        /* flag == 3 for no solution */
        flag = 3;
        for(i=0; i<n; i++){
            sum = 0;
            for(j=0; j<n; j++){
                sum = sum + a[i][j];
            }
            if(sum == a[i][j]){flag = 2;} /* Not sure here also if this statement should be inside for loop up */
        }
        
        return flag;
    }
}
