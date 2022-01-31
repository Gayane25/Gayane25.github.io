window.addEventListener("load", pageOnLoad);
window.addEventListener('scroll', () => {
    let content = document.querySelector('.progress-span')
    let contentPosition = content.getBoundingClientRect().top
    let screenPosition = window.innerHeight

    if (contentPosition < screenPosition) {
        document.querySelectorAll('.progress-span').forEach(el => {
            el.classList.add('active')
        })
    }
})

function pageOnLoad() {
    const url = window.location;
    const urlGetParams = new URLSearchParams(url.search);
    const advertisementIdArray = urlGetParams.getAll('advertisementId');
    const [advertisementId, fakeAdvertisementId] = advertisementIdArray
    if (fakeAdvertisementId || !advertisementId) {
        window.location.replace('../forSale/forSale.html?incorrect_search_params')
    }

    getDataFromApi(`https://acaproject.000webhostapp.com/api/advertisements.php?advertisementId=${advertisementId}`)
        .then(adv => {
            console.log(adv)
            drawMainSection(adv)
            getDataFromApi(`https://61e932047bc0550017bc6112.mockapi.io/users/${adv.createdByUser}` ).then(user => {
                const userContainerDiv = document.getElementById('main-aside')
                userContainerDiv.innerHTML = drawUserSection(user)

                const viewPhoneButton = document.getElementById('view_phone');
                viewPhoneButton.addEventListener('click', function (event) {
                    const mainText = event.target.innerText
                    viewPhoneButton.innerText = event.target.getAttribute('phoneNumber')
                    const newTimeout = setTimeout(() => {
                        viewPhoneButton.innerText = mainText
                    }, 5000)
                })


                showSlides(1);
            })
        })
        .catch(err => {
            console.log(err)
        })


}


async function getDataFromApi(url) {
    const response = await fetch(url);
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
                                        ${(isPremium && '<div class="specialist-status" id="userIsPremium"></div>') || ''}
                                    </div>
                                    <div class="full_name">
                                        <p  id="userFullName">${firstName} ${lastName}</p>
                                    </div>
                                    <div class="specialist-position">
                                        <p id="userProfession">${profession}</p>
                                    </div>
                                    <div class="call-button">
                                        <svg viewBox="0 0 15 15"  xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.5916 11.0085L12.4983 8.91519C11.7507 8.16759 10.4798 8.46666 10.1807 9.43852C9.95646 10.1114 9.20886 10.4852 8.53601 10.3356C7.0408 9.96184 5.02227 8.01807 4.64847 6.4481C4.42418 5.77522 4.87275 5.02762 5.54559 4.80336C6.51748 4.50432 6.81652 3.23339 6.06892 2.48579L3.97562 0.392493C3.37754 -0.130831 2.48041 -0.130831 1.95709 0.392493L0.536636 1.81294C-0.883814 3.30815 0.686158 7.27046 4.1999 10.7842C7.71365 14.298 11.676 15.9427 13.1712 14.4475L14.5916 13.027C15.115 12.4289 15.115 11.5318 14.5916 11.0085Z"
                                                  />
                                        </svg>
                                        <span class="span-button" id="view_phone" phoneNumber = "${phoneNumber}">VIEW PHONE</span>
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
                                        <a href="mailto:info@aca.am" class="span-button">SEND MESSAGE</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;


    return userHtml
}

function drawMainSection({
                             latitude,
                             longitude,
                             pictureUrls,
                             title,
                             addressCity,
                             addressStreet,
                             price,
                             priceType,
                             advertisementNo,
                             publishedAt,
                             advertisementStatus,
                             housingShape,
                             rooms,
                             grossArea,
                             netArea,
                             warmingType,
                             buildingAge,
                             floorLocation,
                             isAvailableWithLoan,
                             furnishedStatus,
                             dues,
                             duesType,
                             isAsSwap,
                             frontDirection,
                             rentalIncome,
                             rentalIncomeType,
                             interiorFeatures,
                             explanationTExt
                         }) {
    const titleSection = document.getElementById('house-title')
    const picturesSection = document.getElementById('house-pictures')
    const generalInfoSection = document.getElementById('house-general-info')
    const explanationSection = document.getElementById('house-explanation')
    const featuresSection = document.getElementById('house-features')
    latitude = parseFloat(latitude)
    longitude = parseFloat(longitude)
    myMap({lat: latitude, lng: longitude})
    titleSection.innerHTML = drawTitleSection(title, addressCity, addressStreet, price,priceType)
    picturesSection.innerHTML = drawPicturesSection(pictureUrls)
    generalInfoSection.innerHTML = drawGeneralInfoSection(advertisementNo, publishedAt, advertisementStatus, housingShape, rooms, buildingAge, grossArea, netArea, warmingType, buildingAge, floorLocation, isAvailableWithLoan, furnishedStatus, dues, duesType,isAsSwap, frontDirection, rentalIncome,rentalIncomeType)
    explanationSection.innerHTML = drawExplanationSection(explanationTExt)
    featuresSection.innerHTML = drawFeaturesSection(JSON.parse(interiorFeatures)[0])

}

function drawTitleSection(title, addressCity, addressStreet, price,priceType) {
    return `<div class="house-subtitle">
                    <h2>${title}</h2>
                    <p class="house-location">${addressCity}, ${addressStreet}</p>
                </div>
                <div class="house-price">
                    <span>${price} ${generateSignFromType(priceType)}</span>
                </div>`
}

function drawPicturesSection(pictureUrls) {
    pictureUrls = JSON.parse(pictureUrls);
    length = pictureUrls.length
    let mainPictureDivs = ''
    let smallPictureDivs = ''
    pictureUrls.forEach( (el, index) => {
        mainPictureDivs +=  `<div class="mySlides">
                                <div class="numbertext">${index + 1} / ${length}</div>
                                <img src=${el}>
                              </div>`
        smallPictureDivs += `<div class="column">
                              <img class="demo cursor" src=${el} style="width:100%" onclick="currentSlide(${index+1})" alt="The Woods">
                            </div>`
    } )
   return `<div class="images-container">
                    <div class="slider-buttons">
                        <input onclick="plusSlides(-1)" type="image" src="../assets/images/left_arrow.png">
                        <input onclick="plusSlides(1)" type="image" src="../assets/images/right_arrow.png">
                    </div>` + mainPictureDivs + `<div class="row">` + smallPictureDivs + `</div></div>`

}


function drawGeneralInfoSection(advertisementNo, createdAt, advertisementStatus, housingShape, rooms, buildingAge, grossArea, netArea, warmingType, buildingAge, floorLocation, isAvailableWithLoan, furnishedStatus, dues,duesType, isAsSwap, frontDirection, rentalIncome,rentalIncomeType) {

    const createdDate = new Date(parseInt(createdAt)).toLocaleString().split(',')[0];
    return `<h4 class="general-info-header">General Information</h4>
                <div class="general-info-container">
                    <div class="general-info-left">
                        <div class="left-title">
                            <p>Advertise No</p>
                            <p>Published Date</p>
                            <p>Advertise Status</p>
                            <p>Housing Shape</p>
                            <p>Room + Living Number</p>
                            <p>Gross / Net M²</p>
                            <p>Warming Type</p>
                            <p>Building Age</p>
                        </div>
                        <div class="right-content">
                            <p class="advertise-number">${advertisementNo}</p>
                            <p>${createdDate}</p>
                            <p>${advertisementStatus}</p>
                            <p>${housingShape}</p>
                            <p>${rooms}</p>
                            <p>${grossArea} M² / ${netArea} M²</p>
                            <p>${warmingType}</p>
                            <p>${buildingAge}</p>
                        </div>
                    </div>
                    <div class="general-info-right">
                        <div class="left-title">
                            <p>Floor Location</p>
                            <p>Available for Loan</p>
                            <p>Furnished</p>
                            <p>Dues</p>
                            <p>Swap</p>
                            <p>Front</p>
                            <p>Rental Income</p>
                        </div>
                        <div class="right-content">
                            <p>${floorLocation || '-'}</p>
                            <p>${isAvailableWithLoan || '-'}</p>
                            <p>${furnishedStatus || '-'}</p>
                            <p>${dues || '-'} ${generateSignFromType(duesType)}</p>
                            <p>${isAsSwap || '-'}</p>
                            <p>${frontDirection || '-'}</p>
                            <p>${rentalIncome || '-'} ${generateSignFromType(rentalIncomeType)}</p>
                        </div>
                    </div>
                </div>`
}


function drawExplanationSection(explanationText) {
    return `<h4 class="general-info-header">Explanation</h4>
                <p>${explanationText}</p>`
}

function drawFeaturesSection(features) {
    return `<div class="house-features-left">
                    <h4 class="general-info-header">Interior Features</h4>
                    <ul>
                        <li class=${features.adsl? 'isChecked' : 'isUnchecked'}>ADSL</li>
                        <li class=${features.alarm? 'isChecked' : 'isUnchecked'}>Alarm</li>
                        <li class=${features.balcony? 'isChecked' : 'isUnchecked'}>Balcony</li>
                        <li class=${features.barbecue? 'isChecked' : 'isUnchecked'}>Barbecue</li>
                        <li class=${features.blinds? 'isChecked' : 'isUnchecked'}>Laundry room</li>
                        <li class=${features.wallpaper? 'isChecked' : 'isUnchecked'}>Wallpaper</li>
                        <li class=${features.dressingRoom? 'isChecked' : 'isUnchecked'}>Dressing Room</li>
                        <li class=${features.videoIntercom? 'isChecked' : 'isUnchecked'}>Video Intercom</li>
                        <li class=${features.shower? 'isChecked' : 'isUnchecked'}>Shower</li>
                        <li class=${features.laminate? 'isChecked' : 'isUnchecked'}>Laminate</li>
                        <li class=${features.panelDoor? 'isChecked' : 'isUnchecked'}>Panel Door</li>
                        <li class=${features.blinds? 'isChecked' : 'isUnchecked'}>Blinds</li>
                        <li class=${features.sauna? 'isChecked' : 'isUnchecked'}>Sauna</li>
                        <li class=${features.satinPlaster? 'isChecked' : 'isUnchecked'}>Satin Plaster</li>
                        <li class=${features.satinColor? 'isChecked' : 'isUnchecked'}>Satin Color</li>
                        <li class=${features.ceramicFloor? 'isChecked' : 'isUnchecked'}>Ceramic Floor</li>
                    </ul>
                </div>
                <div class="house-features-right">
                    <h4 class="general-info-header">External Features</h4>
                    <ul>
                        <li class=${features.elevator? 'isChecked' : 'isUnchecked'}>Elevator</li>
                        <li class=${features.gardened? 'isChecked' : 'isUnchecked'}>Gardened</li>
                        <li class=${features.fitness? 'isChecked' : 'isUnchecked'}>Fitness</li>
                        <li class=${features.security? 'isChecked' : 'isUnchecked'}>Security</li>
                        <li class=${features.thermalInsulation? 'isChecked' : 'isUnchecked'}>Thermal Insulation</li>
                        <li class=${features.generator? 'isChecked' : 'isUnchecked'}>Generator</li>
                        <li class=${features.tennisCourt? 'isChecked' : 'isUnchecked'}>Tennis Court</li>
                        <li class=${features.carPark? 'isChecked' : 'isUnchecked'}>Car Park</li>
                        <li class=${features.pvc? 'isChecked' : 'isUnchecked'}>PVC</li>
                        <li class=${features.basketballField? 'isChecked' : 'isUnchecked'}>Basketball Field</li>
                        <li class=${features.market? 'isChecked' : 'isUnchecked'}>Market</li>
                    </ul>
                </div>`
}



function generateSignFromType(typeText){
    return typeText === 'USD' ? '$' : (typeText === 'EUR' ? '€' : '£')
}