import Model from './model.js';
import AddMem from './components/add-memory.js';
import RemMem from './components/remove-memory.js';

export default class View {
    constructor(){
        this.model = null;
        this.slots = document.getElementById('container');
        this.addMemory = new AddMem();
        this.removeMemory = new RemMem();
        
        this.addMemory.onClick((value) => {this.allocMemory(value)});
        this.removeMemory.onClick((id)=> {this.deallocMemory(id)});
    }

    setModel(model){
        this.model = model;
    }

    allocMemory(value){
        const allocated = this.model.allocMemory(value, 1, this.slots);
        //console.log(`AllocatedFinal: ${allocated}`);
        if(!allocated){
            console.error('No se aloja');
        }
        this.model.save();
        //console.log(this.model.slots);
    }

    deallocMemory(id){
        const deallocated = this.model.deallocMemory(id, 1, this.slots);
        //console.log(`DeallocatedFinal: ${deallocated}`);
        if(!deallocated){
            console.error('No se desaloja');
        }

        //console.log(this.model.slots);
        this.model.save();
    }

    splitSlot(slot, leftValue, rightValue){
        slot.innerHTML = `
        <div class="row col-6 h-100 w-50 border border-2 text-center m-0 p-0">
            ${leftValue}GB
        </div>
        <div class="row col-6 h-100 w-50 border border-2 text-center m-0 p-0">
            ${rightValue}GB
        </div>`;
    }

    joinSlot(slot, value){
        slot.innerHTML = `${value}GB`;
    }
}