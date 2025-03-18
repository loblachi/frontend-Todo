export function generateRandomID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

export function validateForm(task,deadline,descrip){
    if(task === "" || deadline === "" || descrip === ""){
        alert("Please fill in all the fields"); 
        return false; 
    }
    return true; 
}
