const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"

// 게시글 전체 리스트 조회
async function getIndexFeedList(){
    const response = await fetch(`${backEndBaseUrl}/communities/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

// 로그인 사용자 정보 가져오기
async function getUser(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()
    return response_json
}


// 시간 변형 코드 (value 시간을 현재 시간이랑 비교하여 '~ 전' 출력)
function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}



window.onload = async function getIndex_API(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontEndBaseUrl}/users/login.html`;
        
        
    } else {
  
        //게시글 전체 리스트 조회
        feed_list = await getIndexFeedList()

        // 인기 게시글
        best_feed_list = await getIndexFeedList()
        best_feed_list = best_feed_list.sort((a, b) => b.like_count - a.like_count).slice(0,3);

        //인기 게시글 출력 반복문 부분
        var best_wrap = document.getElementsByClassName('main_feed_list_box')[0];

        best_feed_list.forEach(best_feed => {
            //태그 출력 반복문
            best_feed.tags.forEach(tag => {
                
                best_wrap.innerHTML += `
                <div class="new_feed_box vertical_alignment">
                    <div class="nf_image_box">
                        <img class="nf_image" src="${backEndBaseUrl}${best_feed.image}" onclick="location.href='${frontEndBaseUrl}/communities/detail.html?id=${best_feed.id}'"/>
                    </div>
                    <div class="nf_info_box horizontal_alignment">
                        <div class="left_section vertical_alignment">
                            <div class="nf_nickname">${best_feed.user}</div>
                            <div class="nf_content">${best_feed.content}</div>
                            <div class="nf_tag">${tag}</div>
                        </div>
                        <div class="right_section vertical_alignment">
                            <div class="like_box horizontal_alignment">
                                <div class="nf_like">${best_feed.like_count}</div>
                                <div class="nf_unlike">${best_feed.unlike_count}</div>
                            </div>
                            <div class="right_section_middle"></div>
                            <div class="nf_create_at">${timeForToday(best_feed.created_at)}</div>
                        </div>
                    </div>
                </div>
                `
            })    
        })

        // 전체 게시글 출력 반복문 부분
        wrap = document.getElementsByClassName('sub_feed_list_box')[0];

        feed_list.forEach(feed => {
            // 태그 출력 반복문
            feed.tags.forEach(tag => {
                
                wrap.innerHTML += `
                <div class="sub_feed_box vertical_alignment">
                    <div class="sub_feed_image_box">
                        <img class="feed_image" src="${backEndBaseUrl}${feed.image}"/>
                    </div>
                    <div class="sub_feed_info_box">
                        <div class="info_top_section horizontal_alignment">
                            <div class="sub_nickname">${feed.user}</div>
                            <div class="sub_like">${feed.like_count}</div>
                        </div>
                        <div class="info_middle_section">
                            <div class="sub_content">${feed.content}</div>
                        </div>
                        <div class="info_bottom_section horizontal_alignment">
                            <div class="sub_tags">${tag}</div>
                            <div class="sub_created_at">${timeForToday(feed.updated_at)}</div>
                        </div>
                    </div>
                </div>
                `
            })
        })
        
}
}
