import View from './view.js';

export default class Model {
    constructor(){
        this.view = null;
        this.slots = JSON.parse(localStorage.getItem('slots'));
        this.idCounter = 1;

        if(!this.slots){
            
            let s = 1024;
            for(let i = 0; i < 2048; i++){
                this.slots[i] = {id:-1, size: s, value:null,};
            }
        }

        console.log(this.slots);
    }

    setView(view){
        this.view = view;
    }


    allocMemory(value, node){
        const tree = this.slots;
        const leftNode = node*2;
        const rightNode = node*2 + 1;
        let allocated;
        //has children
        if(tree[node].id == 0){
            allocated = allocMemory(value, leftNode);

            if(!allocated){
                allocated = allocMemory(value, rightNode);
            }
            
            return allocated;
        }

        //its been allocated
        if(tree[node].id > 0){
            return false;
        }

        //its the lastttttttt
        if(tree[node].size <= value/2){
            allocated = allocMemory(value, leftNode);
            if(!allocated){
                allocated = allocMemory(value, rightNode);
            }
            if(!allocated){
                tree[node].id=0;
            }
            return false;
        }
        if(tree[node].size <= value){
            tree[node].id = this.idCounter;
            this.idCounter++;

            tree[node].value = value;

            return true;
        }

        return false;
    }

    save(){
        localStorage.setItem('slots', JSON.stringify(this.slots));
    }

}