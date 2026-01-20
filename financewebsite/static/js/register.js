console.log("Register working")


const usernameField=document.querySelector('#usernameField')
const feedbackField=document.querySelector('.invalid-feedback')
const emailField=document.querySelector('#emailField')
const emailFeedback=document.querySelector('.emailFeedback')
const usernameSuccessOutput=document.querySelector('.usernameSuccessOutput')
const emailSuccessOutput=document.querySelector('.emailSuccessOutput')


usernameField.addEventListener("keyup", (e)=> { //here e is the element typed on the keyboard
    const usernameVal=e.target.value
    usernameSuccessOutput.style.display='block'
    usernameSuccessOutput.textContent=`Checking ${usernameVal}...}`
    if(usernameVal.length>0){
    fetch("/authentication/validate-username",{
        body: JSON.stringify({username:usernameVal}),
        headers:{
            "Content-Type":"application/json",
            
        },
        method:"POST",
    }).then((res)=>res.json()).then((data)=>{
        console.log('data',data)
        usernameSuccessOutput.style.display='none'
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


emailField.addEventListener("keyup",(e)=>
{
    const emailVal=e.target.value
    emailSuccessOutput.style.display='block'
    emailSuccessOutput.textContent=`Checking ${emailVal}...}`
    if(emailVal.length>0)
    {
        fetch("/authentication/validate-email",{
            body: JSON.stringify({email:emailVal}),
            method:"POST"
        }).then((res)=>res.json()).then((data)=>{
            console.log('data',data)
            emailSuccessOutput.style.display='none'
            if(data.email_error)
            {
                emailField.classList.add('is-invalid')
                emailFeedback.style.display='block'
                emailFeedback.innerHTML= `<p>${data.email_error}</p>`

            }
            else{
                emailField.classList.remove('is-invalid');
                emailFeedback.style.display='none';
                emailFeedback.innerHTML='';
            }
        })
    }
})
//when types