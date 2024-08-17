document.querySelector('form').addEventListener('submit', async(e)=>{
    e.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    try{
        const res = await fetch('/user/create-user',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({email , senha})
        })
        const data = await res.json()
        if(res.ok){
            console.log('Usuario criado!');
            
        }else{
            console.log("Ocorreu um problema no cadastro!");
        }
    }catch(e){
        console.log("erro na requisição.", e);
        
    }
})