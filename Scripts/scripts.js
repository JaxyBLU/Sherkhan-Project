const matheight = document.getElementById('matrix-height');
const matwidth = document.getElementById('matrix-width');

const createMatrixButton = document.getElementById('create-matrix');

createMatrixButton.addEventListener('click', createMatrix);

function createMatrix(){
    for(let i=0; i<matheight.value){
        for(let j=0; j<matwidth.value){
            document.createElement('input')
        }
    }
}