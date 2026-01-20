console.log("Register working")


const usernameField=document.querySelector('#usernameField')
const feedbackField=document.querySelector('.invalid-feedback')

usernameField.addEventListener("keyup", (e)=> { //here e is the element typed on the keyboard
    const usernameVal=e.target.value

    if(usernameVal.length>0){
    fetch("/authentication/validate-username",{
        body: JSON.stringify({username:usernameVal}),
        headers:{
            "Content-Type":"application/json",
            
        },
        method:"POST",
    }).then((res)=>res.json()).then((data)=>{
        console.log('data',data)
        if(data.username_error)
        {
                usernameField.classList.add('is-invalid')
                feedbackField.style.display='block'
                feedbackField.innerHTML= `<p>${data.username_error}</p>`
            }
            else{
                usernameField.classList.remove('is-invalid');
                feedbackField.style.display='none';
                feedbackField.innerHTML='';
            }
    });
}
    });
//when types