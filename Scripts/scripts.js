const matheight = document.getElementById('matrix-height');
const matwidth = document.getElementById('matrix-width');
const motherofmatrix = document.getElementById('matrix-mother');
const createMatrixButton = document.getElementById('create-matrix');

let matrixInputArray = [];

createMatrixButton.addEventListener('click', createMatrix);

function createMatrix(){
    motherofmatrix.innerHTML = '';

    for(let i=0; i<matheight.value; i++){
        let firstchild = document.createElement('div');
        firstchild.className = 'first-child';
        for(let j=0; j<matwidth.value; j++){
            let inputelement = document.createElement('input');
            inputelement.type = 'number';
            inputelement.max = 9;
            inputelement.min = -9;
            inputelement.className = 'matrix-input';
            firstchild.appendChild(inputelement);
        }
        motherofmatrix.appendChild(firstchild);
    }
}

function getArrayFromInput(){
    
}