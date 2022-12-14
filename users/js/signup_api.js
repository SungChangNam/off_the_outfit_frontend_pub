

async function handleSignup() {
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    const username = document.getElementById("username").value
    const nickname = document.getElementById("nickname").value
    const email = document.getElementById("email").value
    const address = document.getElementById("address").value
    const gender = document.getElementById("gender").value
    const height = document.getElementById("height").value
    const weight = document.getElementById("weight").value
    const date_of_birth = document.getElementById("date_of_birth").value
    const term_agree = document.getElementById("term_agree").value

    const response = await fetch(`${backEndBaseUrl}/users/`, {
        
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            
            "username": username,
            "nickname": nickname,
            "password": password,
            "password2": password2,
            "email": email,
            "address": address,
            "gender": gender,
            "height": height,
            "weight": weight,
            "date_of_birth": date_of_birth,
            "term_agree": term_agree
            
            
        })
    })

    const response_json = await response.json()

    if (response.status == 201){
        alert(response_json["message"])
            window.location.replace(`${frontEndBaseUrl}/users/login.html`);
    }else{
        alert(response_json["username"])
        alert(response_json["username"])


    }
}


function showPopup(){
    var options = 'top=300, left=500, width=700, height=600, status=no, menubar=no, toolbar=no, resizable=no';
    window.open("term.html","팝업 테스트",options);
}


function WinClose()

 {

   window.open('','_self').close();     

}


