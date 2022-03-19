export default class RemoveMemory{
    constructor(){
        this.btn = document.getElementById('remove');
        this.input = document.getElementById('removeValue'); 
    }

    onClick(callback){
        this.btn.onclick = ()=>{
            if(this.input.value > 0){
                callback(this.input.value);
            }
            else{
                console.error('MID invalid range');
            }
        } 
    }
}