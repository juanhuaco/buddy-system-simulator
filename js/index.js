import View from './view.js';
import Model from './model.js';

document.addEventListener('DOMContentLoaded', ()=>{
    const view = new View();
    const model = new Model();
    model.setView(view);
    view.setModel(model);
});