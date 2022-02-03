function drawPageFromData(rootDivId) {
    const rootDiv = document.getElementById(rootDivId)
    getDataFromApi(`${apiUrl}advertisements.php?search=all`)
        .then(advertisements => {
            console.log(advertisements)
            advertisements.forEach(adv => {
                rootDiv.appendChild(drawAdvertismentCard(adv))
            })
            appartmentsAddEventlistener()
        })
        .catch(err => console.log(err))
}


function drawAdvertismentCard({
                                  advertisementId,
                                  floorLocation,
                                  rooms,
                                  publishedAt,
                                  pictureUrl,
                                  title,
                                  price,
                                  priceType,
                                  addressCity,
                                  addressStreet,
                                  grossArea,
                                  netArea
                              }) {

    const createdDate = new Date(parseInt(publishedAt)).toLocaleString().split(',')[0];

    const apartmentsContainerDiv = document.createElement('div')
    apartmentsContainerDiv.setAttribute('class', 'apartment-cover')
    apartmentsContainerDiv.setAttribute('advertisementId', advertisementId)

    const apartmentDiv = document.createElement('div')
    apartmentDiv.setAttribute('class', 'apartment')

    const mainPicture = document.createElement('img')
    mainPicture.setAttribute('src', pictureUrl)
    mainPicture.setAttribute('class', 'apartmentPic')
    mainPicture.setAttribute('alt', 'Apartment picture')

    const appartmentDescriptionDiv = document.createElement('div')
    appartmentDescriptionDiv.setAttribute('class', 'apartment-description')

    const priceSpan = document.createElement('span')
    priceSpan.setAttribute('class', 'price')
    priceSpan.innerText = price + ' ' + generateSignFromType(priceType)

    const titleSpan = document.createElement('span')
    titleSpan.setAttribute('class', 'title')
    titleSpan.innerText = title

    const addressSpan = document.createElement('span')
    addressSpan.setAttribute('class', 'address')
    addressSpan.innerText = addressCity + ',' + addressStreet

    const dateSpan = document.createElement('span')
    dateSpan.setAttribute('class', 'announce-date')
    dateSpan.innerText = createdDate

    const moreDetailsDiv = document.createElement('div')
    moreDetailsDiv.setAttribute('class', 'more-details')

    const bedSpan = document.createElement('span')
    const bedImg = document.createElement('img')
    bedImg.setAttribute('src', '../assets/bedIcon.png')
    bedSpan.append(bedImg, ' ', rooms)
    const floorSpan = document.createElement('span')
    const floorImg = document.createElement('img')
    floorImg.setAttribute('src', '../assets/floorIcon.png')
    floorSpanText = document.createTextNode(floorLocation)
    floorSpan.append(floorImg, ' ', floorSpanText)

    const areaSpan = document.createElement('span')
    const areaImg = document.createElement('img')
    areaImg.setAttribute('src', '../assets/areaIcon.png')
    areaSpan.innerHTML = grossArea + ' &#13217' + '/' + netArea + ' &#13217'
    areaSpan.prepend(areaImg, ' ')

    moreDetailsDiv.append(bedSpan, floorSpan, areaSpan)
    appartmentDescriptionDiv.append(priceSpan, titleSpan, addressSpan, dateSpan, moreDetailsDiv)
    apartmentDiv.append(apartmentsContainerDiv,mainPicture, appartmentDescriptionDiv)

    return apartmentDiv
}

function appartmentsAddEventlistener() {
    const clickableDivs = document.querySelectorAll('.apartment')
    clickableDivs.forEach(div => div.addEventListener('click', (event) => {
        let currentDivAdvertisementId = event.target.getAttribute('advertisementid')
        window.location = `../pages/forsaleContent.html?advertisementId=${currentDivAdvertisementId}`
    }))
}


async function getDataFromApi(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
}

function generateSignFromType(typeText) {
    return typeText === 'USD' ? '$' : (typeText === 'EUR' ? '€' : '£')
}