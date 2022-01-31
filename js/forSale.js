window.addEventListener("load", pageOnLoad);


function pageOnLoad() {
    getDataFromApi(`https://61e932047bc0550017bc6112.mockapi.io/advertisements`, '')
        .then(advs => {
            console.log('advertisement', advs)
            let newContainer = ''
            const adsContainerDiv = document.getElementById('apartment-list')
            for (let ad of advs) {
                newContainer += drawAdvertisements(ad)
            }
            adsContainerDiv.innerHTML = newContainer
            appartmentsAddEventlistener()
        })
        .catch(err => {
            console.log(err)
        })


}


function appartmentsAddEventlistener() {
    const clickableDivs = document.querySelectorAll('.apartment-cover')
    clickableDivs.forEach(div => div.addEventListener('click', (event) => {
        let currentDivAdvertisementId = event.target.getAttribute('advertisementId')
        window.location = `../pages/forsaleContent.html?advertisementId=${currentDivAdvertisementId}`
    }))
}


function drawAdvertisements({
                                price,
                                id,
                                mainPictureUrl,
                                floorLocation,
                                rooms,
                                grossArea,
                                title,
                                addressCity,
                                addressStreet,
                                createdAt
                            }) {
    return `<div class="apartment">
                <div class="apartment-cover"  advertisementId= ${id}></div>
                <img class="apartmentPic" src=${mainPictureUrl} alt=${title}/>
                <div class="apartment-description">
                    <span class="price">${price} \$</span>
                    <span class="title">${title}</span>
                    <span class="address">${addressCity}, ${addressStreet}</span>
                    <span class="announce-date">${createdAt}</span>
                    <div class="more-details">
                        <span><img src="../assets/bedIcon.png" alt="">${rooms}</span>
                        <span><img src="../assets/floorIcon.png" alt="">${floorLocation}</span>
                        <span><img src="../assets/areaIcon.png" alt="">${grossArea} &#13217</span>
                    </div>
                </div>
            </div>`
}

async function getDataFromApi(url, endpoint) {
    const response = await fetch(`${url}/${endpoint}`);
    const responseData = await response.json();
    return responseData;
}