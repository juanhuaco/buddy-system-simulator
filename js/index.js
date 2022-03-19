import View from './view.js';
import Model from './model.js';

//la idea de esta implementacion es usar un fenwick tree para simular el sistema compa;
//cada slot representara un div con col-6 y cada slot ser[a un nuevo sistema de columnas]

document.addEventListener('DOMContentLoaded', ()=>{
    //localStorage.clear();
    const view = new View();
    const model = new Model();
    model.setView(view);
    view.setModel(model);
});