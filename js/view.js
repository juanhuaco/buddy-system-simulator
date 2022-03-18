import Model from './model.js';
import Mem from './components/add-memory.js'

export default class View {
    constructor(){
        this.model = null;
        this.slots = JSON.parse(localStorage.getItem('slots')) || [{id: -1, value:1024,}];
        this.addMemory = new Mem();
        
        this.addMemory.onClick((value) => {this.allocMemory(value)});
    }

    setModel(model){
        this.model = model;
    }

    allocMemory(value){
        const allocated = this.model.allocMemory(value, 0);
        if(!allocated){
            console.error('No se aloja');
        }

        console.log(this.model.slots);
    }

}