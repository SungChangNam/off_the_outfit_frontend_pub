const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


// 회원 정보 조회 API
async function getUserDetailInfo(){

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    response_json = await response.json()
    return response_json
}


// 닉네임 변경 API
async function updateNickname(value){
    
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const nickname = value
    const response = await fetch(`${backEndBaseUrl}/users/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify({
            "nickname":nickname
        })
    })
    const response_json = await response.json()
    if (response.status == 200){
        alert(response_json["message"])
        window.location.reload();
    }else {
        alert(response_json["detail"])
    }   
return response_json
}

// 닉네임 변경 버튼 01
function handleUpdate_nickname() {

    const edit_nickname = document.getElementById("edit_nickname")
    const updateInputNickname = document.createElement("input",[edit_nickname]);
    
    edit_nickname.style.visibility = "hidden"
    edit_nickname.style.width = "0"
    updateInputNickname.setAttribute("id","update-InputNickname")
    updateInputNickname.value = edit_nickname.innerHTML
    edit_nickname.parentNode.insertBefore(updateInputNickname, edit_nickname)

    const updateNickButton = document.getElementById("edit_nick_button")

    updateNickButton.setAttribute("onclick", "handleUpdateConfirm_nick()")
}

// 닉네임 변경 버튼 02
function handleUpdateConfirm_nick(){

    const updateInputNickname = document.getElementById('update-InputNickname')
    const edit_nickname = document.getElementById("edit_nickname")
    
    updateNickname(updateInputNickname.value)
    
    edit_nickname.style.visibility = "visible"
    edit_nickname.style.width = "400px"

    const updateNickButton = document.getElementById("edit_nick_button")
 
    updateNickButton.setAttribute("onclick", "handleUpdate_nickname()")
    updateInputNickname.remove()
}


// 주소 변경 API
async function updateAddress(value){
    
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const address = value
    const response = await fetch(`${backEndBaseUrl}/users/`, {
        headers: {
        'content-type': 'application/json',
        "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify({
            "address":address
        })
    })
    const response_json = await response.json()
    if (response.status == 200){
        alert(response_json["message"])
            window.location.reload();
    }else {
        alert(response_json["detail"])
    
    }
return response_json
}


// 주소 변경 버튼 01
function handleUpdate_address(){

    const edit_address = document.getElementById("edit_address")
    const updateInput3 = document.createElement("input",[ edit_address]);

    edit_address.style.visibility = "hidden"
    edit_address.style.width = "0"

    updateInput3.setAttribute("id","update-input3")
    updateInput3.value = edit_address.innerHTML
    edit_address.parentNode.insertBefore(updateInput3, edit_address)

    const updateAddressButton = document.getElementById("edit_address_button")

    updateAddressButton.setAttribute("onclick", "handleUpdateConfirm_address()")
}

// 주소 변경 버튼 02
function handleUpdateConfirm_address(){

    const updateInput3 =document.getElementById('update-input3')
    const edit_address = document.getElementById("edit_address")

    updateAddress(updateInput3.value)

    edit_address.style.visibility = "visible"
    edit_address.style.width = "400px"

    const updateAddressButton = document.getElementById("edit_address_button")

    updateAddressButton.setAttribute("onclick", "handleUpdate_address()")
    updateInput3.remove()
}


// 신체 정보 변경 API
async function updateBody(value){
    
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/users/`, {
        headers: {
        'content-type': 'application/json',
        "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify({
            "height":value.height,
            "weight":value.weight
        })
    })
    const response_json = await response.json()
    if (response.status == 200){
        alert(response_json["message"])
            window.location.reload();
    }else {
        alert(response_json["detail"]) 
    }
    return response_json
}

// 신체 정보 변경 버튼 01 
function handleUpdate_Body(){

    const edit_body_height = document.getElementById("edit_body_height")
    const edit_body_weight = document.getElementById("edit_body_weight")

    const updateInputHeight = document.createElement("input",[edit_body_height]);
    const updateInputWeight = document.createElement("input",[edit_body_weight]);

    edit_body_height.style.visibility = "hidden"
    edit_body_weight.style.visibility = "hidden"

    updateInputHeight.setAttribute("id","update-InputHeight")
    updateInputWeight.setAttribute("id","update-InputWeight")
    updateInputHeight.value = edit_body_height.innerHTML
    updateInputWeight.value = edit_body_weight.innerHTML
    edit_body_height.parentNode.insertBefore(updateInputHeight, edit_body_height)
    edit_body_weight.parentNode.insertBefore(updateInputWeight, edit_body_weight)

    const updateBodyButton = document.getElementById("edit_body_button")
    
    updateBodyButton.setAttribute("onclick", "handleUpdateConfirm_Body()")
}

// 신체 정보 변경 버튼 02
function handleUpdateConfirm_Body(){

    const updateInputHeight =document.getElementById('update-InputHeight')
    const updateInputWeight =document.getElementById('update-InputWeight')
    const edit_body_height = document.getElementById("edit_body_height")
    const edit_body_weight = document.getElementById("edit_body_weight")
    
    values = {
        "height":updateInputHeight.value,
        "weight":updateInputWeight.value
    }

    updateBody(values)
    
    edit_body_height.style.visibility = "visible"
    edit_body_weight.style.visibility = "visible"

    const updateBodyButton = document.getElementById("edit_body_button")

    updateBodyButton.setAttribute("onclick", "handleUpdate_Body()")
    updateInputHeight.remove()
    updateInputWeight.remove()
}


// 프로필 이미지 변경 API
async function updateProfileImage(){
    profile_Image = document.getElementById("update-InputProfileImage").files[0];
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    
    const formData = new FormData();
    
    formData.append("profile_image", profile_Image);

    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/`, {
        headers: {
        "Authorization":"Bearer " + localStorage.getItem("access"),
        },
        method: 'PUT',
        body: formData,

    });
    const response_json = await response.json()
    if (response.status == 200){
        alert(response_json["message"])
        window.location.reload();
    }else {
        alert(response_json["detail"])
    }   
return response_json
}

// 프로필 이미지 변경 버튼 01
function handleUpdate_profile_image() {

    const id_profile_image = document.getElementById("id_profile_image")
    const updateInputProfileImage = document.createElement("input",[id_profile_image]);
    
    id_profile_image.style.visibility = "hidden"
    id_profile_image.style.width = "0"
    updateInputProfileImage.setAttribute("id","update-InputProfileImage")
    updateInputProfileImage.setAttribute("type", "file")
    updateInputProfileImage.setAttribute("name", "profile_image")
    updateInputProfileImage.setAttribute("required", "required")
    updateInputProfileImage.setAttribute("value", "image")

    id_profile_image.parentNode.insertBefore(updateInputProfileImage, id_profile_image)

    const updateProfileImageButton = document.getElementById("edit_profile_image_button")

    updateProfileImageButton.setAttribute("onclick", "handleUpdateConfirm_profile_image()")
}

// 프로필 이미지 변경 버튼 02
function handleUpdateConfirm_profile_image(){

    const updateInputProfileImage = document.getElementById('update-InputProfileImage')
    const id_profile_image = document.getElementById("id_profile_image")
    
    updateNickname()
    
    id_profile_image.style.visibility = "visible"
    id_profile_image.style.width = "400px"

    const updateProfileImageButton = document.getElementById("edit_profile_image_button")
 
    updateProfileImageButton.setAttribute("onclick", "handleUpdate_profile_image()")
    updateInputProfileImage.remove()
}



// 인기 검색어 랭킹 조회
async function getHeaderSearchWordRanking(){
    const response = await fetch(`${backEndBaseUrl}/communities/search/word/ranking/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}
                

// 회원 정보 출력 API
window.onload = async function getProfile_API(){
    //회원정보 리스트 조회
    profile_list = await getUserDetailInfo()
    console.log(profile_list.profile_image)
    
    //회원정보 출력 반복문 부분
    var edit_image_view = document.getElementsByClassName('edit_image_view')[0];
    var edit_view_username = document.getElementsByClassName('edit_view_username')[0];
    var edit_view_nickname = document.getElementsByClassName('edit_view_nickname')[0];
    var edit_view_dob = document.getElementsByClassName('edit_view_dob')[0];
    var edit_view_body_height = document.getElementsByClassName('edit_view_body_height')[0];
    var edit_view_body_weight = document.getElementsByClassName('edit_view_body_weight')[0];
    var edit_view_gender = document.getElementsByClassName('edit_view_gender')[0];
    var edit_view_address = document.getElementsByClassName('edit_view_address')[0];
    var edit_view_email = document.getElementsByClassName('edit_view_email')[0];

    edit_view_email.innerText = `${profile_list.email}`
    edit_image_view.setAttribute("src", `${backEndBaseUrl}${profile_list.profile_image}`)
    edit_view_dob.innerText = `${profile_list.date_of_birth}`
    edit_view_username.innerText = `${profile_list.username}`
    edit_view_nickname.innerText = `${profile_list.nickname}`
    edit_view_gender.innerText = `${profile_list.gender}`
    edit_view_body_height.innerText =`${profile_list.height}`
    edit_view_body_weight.innerText =`${profile_list.weight}`
    edit_view_address.innerText = `${profile_list.address}`


    // 검색어 랭킹 조회
    search_word_list = await getHeaderSearchWordRanking()
    if (search_word_list.length > 9) {
        search_word_list = search_word_list.sort((a, b) => b.count - a.count)

        var word_rank_01 = document.getElementsByClassName('rank_01')[0];
        var word_rank_02 = document.getElementsByClassName('rank_02')[0];
        var word_rank_03 = document.getElementsByClassName('rank_03')[0];
        var word_rank_04 = document.getElementsByClassName('rank_04')[0];
        var word_rank_05 = document.getElementsByClassName('rank_05')[0];
        var word_rank_06 = document.getElementsByClassName('rank_06')[0];
        var word_rank_07 = document.getElementsByClassName('rank_07')[0];
        var word_rank_08 = document.getElementsByClassName('rank_08')[0];
        var word_rank_09 = document.getElementsByClassName('rank_09')[0];
        var word_rank_10 = document.getElementsByClassName('rank_10')[0];

        word_rank_01.innerText = `1등 : ${search_word_list[0]['word']}`
        word_rank_02.innerText = `2등 : ${search_word_list[1]['word']}`
        word_rank_03.innerText = `3등 : ${search_word_list[2]['word']}`
        word_rank_04.innerText = `4등 : ${search_word_list[3]['word']}`
        word_rank_05.innerText = `5등 : ${search_word_list[4]['word']}`
        word_rank_06.innerText = `6등 : ${search_word_list[5]['word']}`
        word_rank_07.innerText = `7등 : ${search_word_list[6]['word']}`
        word_rank_08.innerText = `8등 : ${search_word_list[7]['word']}`
        word_rank_09.innerText = `9등 : ${search_word_list[8]['word']}`
        word_rank_10.innerText = `10등 : ${search_word_list[9]['word']}`
    }

 }