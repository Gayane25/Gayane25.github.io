var form = document.forms.namedItem("advertisementForm");
form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    const advertisementData = ev.target;
    const obj = {
            "price": advertisementData.price.value,
            "title": advertisementData.titleInput.value,
            "addressCity": advertisementData.addressCity.value,
            "addressStreet": advertisementData.addressStreet.value,
            "mainPictureUrl": "http://placeimg.com/640/480",
            "pictureUrls": [],
            "advertisementNo": Date.now(),
            "publishedAt": Date.now(),
            "advertisementStatus": advertisementData.statusSelect.value,
            "housingShape": advertisementData.selectHousing.value,
            "rooms": `${advertisementData.rooms.value} + ${advertisementData.livingRooms.value}`,
            "grossArea": advertisementData.grossSquare.value,
            "netArea": advertisementData.netSquare.value,
            "warmingType": advertisementData.warmingType.value,
            "buildingAge": advertisementData.buildingAge.value,
            "floorLocation": advertisementData.floorLocation.value,
            "isAvailableWithLoan": advertisementData.loanAvailability.value,
            "furnishedStatus": advertisementData.furnishedStatus.value,
            "dues": advertisementData.duesValue.value,
            "duesType": advertisementData.duesType.value,
            "isAsSwap": advertisementData.swapSelect.value,
            "frontDirection": advertisementData.frontDirectionSelect.value,
            "rentalIncome": advertisementData.rentalIncomeValue.value,
            "rentalIncomeType": advertisementData.rentalIncomeType.value,
            "createdByUser": getRndInteger(1, 99),
            "explanationTExt": advertisementData.explanationText.value,
            "longitude": "-146.7570",
            "latitude": "43.6465",
        }

    fetch('https://61e932047bc0550017bc6112.mockapi.io/advertisements', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)

    }).then(response => {
        console.log(response)

    }).catch(err => {
        console.log(err)

    })
})



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}