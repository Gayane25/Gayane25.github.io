function drawPageFromData(mainDivId,rootDivId,searchParam,pageNumber=1) {
    const rootDiv = document.getElementById(rootDivId)
    const mainDiv = document.getElementById(mainDivId)
    const foundResults = document.getElementById('found-results')
    getDataFromApi(`${apiUrl}advertisements.php?search=${searchParam}&page_number=${pageNumber}`)
        .then(items => {
            foundResults.innerText = items.pagination.totalCount
            rootDiv.innerHTML=''
            items.advertisements.forEach(adv => {
                rootDiv.prepend(drawAdvertismentCard(adv))
            })
            console.log(items)
            drawPagination(mainDivId,rootDivId,items.pagination)
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
function pageNumbersAddEventlistener(mainDivId,rootDivId,searchParam) {
    const clickableDivs = document.querySelectorAll('.page_number')
    clickableDivs.forEach(div => div.addEventListener('click', (event) => {
        if(event.target.classList.contains('active')) return false
        let pageNumber = event.target.getAttribute('pageNumber')
        // let purpose = event.target.getAttribute('pageNumber')
        drawPageFromData(mainDivId,rootDivId,searchParam,pageNumber)
        disableClickedButton(event.target)
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


function drawPagination(mainDivId,rootDivId,{countOnEachPage,currentPage,totalCount,searchParam}){
    const pages = Math.ceil(totalCount/countOnEachPage)
    const paginationContainer = document.createElement('section')
    paginationContainer.setAttribute('class', 'pagination')
    if(currentPage > 1){
        const previousLink = document.createElement('button')
        previousLink.setAttribute('class', 'next-previous')
        previousLink.setAttribute('id', 'previousButton')
        previousLink.setAttribute('onclick', `changePage('-','${mainDivId}','${rootDivId}','${searchParam}')`)
        previousLink.textContent = 'Previous'
        paginationContainer.prepend(previousLink)
    }

    for(let i = 1; i <= pages; i++){
        const pageLink = document.createElement('button')
        pageLink.setAttribute('class', 'page_number')
        pageLink.setAttribute('pageNumber', i)
        pageLink.setAttribute('purpose', searchParam)
        if(i == currentPage)pageLink.classList.add('active')
        pageLink.textContent=`${i}`
        paginationContainer.append(pageLink)
    }
    if(pages > 1 && currentPage < pages) {
        const nextLink = document.createElement('button')
        nextLink.setAttribute('class', 'next-previous')
        nextLink.setAttribute('id', 'nextButton')
        nextLink.setAttribute('onclick', `changePage('+','${mainDivId}','${rootDivId}','${searchParam}')`)
        nextLink.textContent = 'Next'
        paginationContainer.append(nextLink)
    }
    const oldPagination = document.querySelector('.pagination')
    if(oldPagination) oldPagination.remove()
    document.getElementById(mainDivId).append(paginationContainer)
    pageNumbersAddEventlistener(mainDivId,rootDivId,searchParam)
}



function disableClickedButton(target){
    target.setAttribute('disabled',true)
    const iTag = document.createElement('i')
    iTag.classList.add('fa','fa-spinner', 'fa-spin')
    target.append(iTag)
}

function changePage(sign,mainDivId,rootDivId,searchParam){
    const activePageElement = document.querySelector('.active')
    const pageNumber = sign === '+' ? parseInt(activePageElement.getAttribute('pagenumber')) + 1 : parseInt(activePageElement.getAttribute('pagenumber')) - 1
    const clickedButton = sign === '+' ? document.getElementById('nextButton') : document.getElementById('previousButton')
    disableClickedButton(clickedButton)
    drawPageFromData(mainDivId,rootDivId,searchParam,pageNumber)

}
