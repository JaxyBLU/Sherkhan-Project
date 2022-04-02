const matheight = document.getElementById('matrix-height');
const matwidth = document.getElementById('matrix-width');
const motherofmatrix = document.getElementById('matrix-mother');

const createMatrixButton = document.getElementById('create-matrix');

createMatrixButton.addEventListener('click', createMatrix);

function createMatrix(){
    for(let i=0; i<matheight.value; i++){
        for(let j=0; j<matwidth.value; j++){
            let inputelement = document.createElement('input');
            inputelement.type = 'number';
            inputelement.className = 'matrix-input';
            motherofmatrix.appendChild(inputelement);
        }
    }
}