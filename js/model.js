import View from './view.js';

export default class Model {
    constructor(){
        this.view = null;
        this.slots = JSON.parse(localStorage.getItem('slots'));
        this.idCounter = 1;

        if(!this.slots){
            this.slots=[];
            const cantNodes = 2048;
            this.slots[1] = {id:-1, size: 1024, value: null,};
            for(let i = 2; i < cantNodes; i++){
                let fatherNode;
                if(i%2 == 0){ //even
                    fatherNode = i/2;
                }else{ //odd
                    fatherNode = (i-1)/2;
                }
                this.slots[i] = {id:-1, size: (this.slots[fatherNode].size/2), value:null,};  
            }
        }
    }

    setView(view){
        this.view = view;
    }


    allocMemory(value, node, slot){
        const tree = this.slots;
        const leftNode = node*2;
        const rightNode = node*2 + 1;

       // console.log(`Node: ${node} -- Valor: ${value}`);
        //console.log(`ActualNodeSize: ${tree[node].size} -- NodeID: ${tree[node].id}`);

        let allocated;
        //has children
        if(tree[node].id == 0){

            //console.log('has children');

            allocated = this.allocMemory(value, leftNode,slot.children[0]);

            if(!allocated){
                allocated = this.allocMemory(value, rightNode, slot.children[1]);
            }
            
            return allocated;
        }

        //its been allocated
        if(tree[node].id > 0){
            //console.log('its been allocated');
            return false;
        }

        //its the lastttttttt
        if(value <= (tree[node].size/2)){
            //console.log('lets go to the next step');
            this.view.splitSlot(slot, tree[node].size/2, tree[node].size/2);
            allocated = this.allocMemory(value, leftNode, slot.children[0]);
            if(!allocated){
                allocated = this.allocMemory(value, rightNode, slot.children[1]);
            }
            if(allocated){
                tree[node].id=0;
            }
            return allocated;
        }
        if(value <= tree[node].size){
            //console.log('lets alloc');
            tree[node].id = this.idCounter;
            this.idCounter++;

            tree[node].value = value;

            slot.innerHTML = `
            MID: ${tree[node].id}
            Size: ${tree[node].value}
            Empty: ${tree[node].size - tree[node].value}`;
            slot.classList.add('bg-success');
            return true;
        }
    }

    deallocMemory(id, node, slot){
        const tree = this.slots;
        const leftNode = node*2;
        const rightNode = node*2 + 1;

        let deallocated;
        //has children
        if(tree[node].id == 0){

            //console.log('has children');

            deallocated = this.deallocMemory(id, leftNode,slot.children[0]);

            if(!deallocated){
                deallocated = this.deallocMemory(id, rightNode, slot.children[1]);
            }

            if(tree[leftNode].id == -1 && tree[rightNode].id == -1){
                tree[node].id = -1;
                this.view.joinSlot(slot, tree[node].size);
            }
            
            return deallocated;
        }

        //its been allocated
        if(tree[node].id < 0){
            //console.log('its been allocated');
            slot.innerHTML = `${tree[node].size}GB`
            return false;
        }

        //its the lastttttttt
        if(id == tree[node].id){
            tree[node].id = -1;
            tree[node].value = null;
            return true;
        }else{
            return false;
        }
    }
    
    save(){
        localStorage.setItem('slots', JSON.stringify(this.slots));
    }

}