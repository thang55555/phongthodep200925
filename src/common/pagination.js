module.exports =  (page, totalPages, dealta=2)=>{
    const pages =[];
    const left = page - dealta;
    const right = page + dealta;
    
    for(let i=1; i<=totalPages; i++){
        if(
            i===1 ||
            i===totalPages ||
            i===page||
            (i>=left && i<= right)
        ){
            pages.push(i);
        }
        else if(
            i===left-1 ||
            i===right+1
        ){
            pages.push(". . .")
        }
     
    }
    return pages;
}