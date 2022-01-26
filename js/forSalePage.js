window.addEventListener("load", pageOnLoad);


function pageOnLoad() {
    const url = window.location;
    const urlGetParams = new URLSearchParams(url.search);
    const advertisementIdArray = urlGetParams.getAll('advertisementId');
    const [advertisementId, fakeAdvertisementId] = advertisementIdArray
    if (fakeAdvertisementId || !advertisementId) {
        window.location.replace('../forSale/forSale.html?incorrect_search_params')
    }

    getDataFromApi(`https://61e932047bc0550017bc6112.mockapi.io/advertisements`, advertisementId)
        .then(adv => {
            console.log('advertisement', adv)
            const houseMainPicture = document.getElementById('houseMainPicture')
            houseMainPicture.src = adv.mainPictureUrl
            getDataFromApi(`https://61e932047bc0550017bc6112.mockapi.io/users`, adv.createdByUser).then(user => {
                const userContainerDiv = document.getElementById('main-aside')
                userContainerDiv.innerHTML = drawUserSection(user)
            })
        })
        .catch(err => {
            console.log(err)
        })


}


async function getDataFromApi(url, endpoint) {
    const response = await fetch(`${url}/${endpoint}`);
    const responseData = await response.json();
    return responseData;
}

function drawUserSection({avatar, email, phoneNumber, firstName, lastName, isPremium, profession}) {
    const userHtml = `<div class="specialist">
                <div class="experience-icon"></div>
                <div class="specialist-border">
                    <div class="specialist-container">
                        <div class="specialist-image-status">
                            <div class="specialist-image" id="userImageContainer">
                                <img src=${avatar} alt="${firstName} ${lastName}">
                            </div>
                            <div class="specialist-status" id="userIsPremium"></div>
                        </div>
                        <div class="full_name">
                            <p  id="userFullName">${firstName} ${lastName}</p>
                        </div>
                        <div class="specialist-position">
                            <p id="userProfession">${profession}</p>
                        </div>
                        <div class="call-button">
                            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5916 11.0085L12.4983 8.91519C11.7507 8.16759 10.4798 8.46666 10.1807 9.43852C9.95646 10.1114 9.20886 10.4852 8.53601 10.3356C7.0408 9.96184 5.02227 8.01807 4.64847 6.4481C4.42418 5.77522 4.87275 5.02762 5.54559 4.80336C6.51748 4.50432 6.81652 3.23339 6.06892 2.48579L3.97562 0.392493C3.37754 -0.130831 2.48041 -0.130831 1.95709 0.392493L0.536636 1.81294C-0.883814 3.30815 0.686158 7.27046 4.1999 10.7842C7.71365 14.298 11.676 15.9427 13.1712 14.4475L14.5916 13.027C15.115 12.4289 15.115 11.5318 14.5916 11.0085Z"
                                      fill="white"/>
                            </svg>
                            <span class="span-button">VIEW PHONE</span>
                        </div>
                        <div class="send-message-button">
                            <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.94287 7.57688L14.9997 10.7738V4.245L9.94287 7.57688Z" fill="#434FAA"/>
                                <path d="M0 4.245V10.7738L5.05688 7.57688L0 4.245Z" fill="#434FAA"/>
                                <path d="M14.0627 2.34375H0.937695C0.469883 2.34375 0.0986328 2.6925 0.0283203 3.14156L7.5002 8.06437L14.9721 3.14156C14.9018 2.6925 14.5305 2.34375 14.0627 2.34375Z"
                                      fill="#434FAA"/>
                                <path d="M9.08465 8.14313L7.75809 9.01688C7.67934 9.06844 7.59027 9.09375 7.50027 9.09375C7.41027 9.09375 7.32121 9.06844 7.24246 9.01688L5.9159 8.14219L0.0302734 11.865C0.102461 12.3103 0.471836 12.6563 0.937773 12.6563H14.0628C14.5287 12.6563 14.8981 12.3103 14.9703 11.865L9.08465 8.14313Z"
                                      fill="#434FAA"/>
                            </svg>
                            <span class="span-button">SEND MESSAGE</span>
                        </div>
                    </div>
                </div>
            </div>`;


    return userHtml
}