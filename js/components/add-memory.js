export default class AddMemory{
    constructor(){
        this.btn = document.getElementById('add');
        this.input = document.getElementById('value');
    }

    onClick(callback){
        this.btn.onclick = ()=>{
            
            if(this.input.value > 0){
                callback(this.input.value);
            }else{
                console.log('Error num menor a 0');
            }
        }
    }
}