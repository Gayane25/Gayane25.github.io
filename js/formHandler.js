let form = document.forms.namedItem("advertisementForm");
const picturesInput = document.querySelector('input[type="file"]')

picturesInput.addEventListener('change', function () {
    const uploadedFiles = picturesInput.files
    document.getElementById('fileUploaderParagraph').innerText = uploadedFiles.length + " file(s) selected"
})

form.addEventListener('submit', async function (ev) {
    ev.preventDefault();
    const advertisementData = ev.target;
    const uploadedFiles = picturesInput.files
    const pictureUrls = []
    //Validating emty inputs
    if (advertisementData.price.value === '' || advertisementData.titleInput.value === '' || advertisementData.addressStreet.value === '' ||
        advertisementData.rooms.value === '' || advertisementData.livingRooms.value === '' || advertisementData.grossSquare.value === '' ||
        advertisementData.netSquare.value === '' || advertisementData.buildingAge.value === '' || advertisementData.floorLocation.value === '' ||
        advertisementData.duesValue.value === '' || advertisementData.rentalIncomeValue === '' || advertisementData.addressCity.value === '' ||
        uploadedFiles.length === 0 || advertisementData.longitude.value === '' || advertisementData.latitude.value === ''
    ) {
        if (advertisementData.longitude.value === '' || advertisementData.latitude.value === '') {
            alert('Please choose correct location on the map!')
        } else {
            alert('There are still empty fields')
        }
        return false
    }

    if (uploadedFiles.length > 0) {
        for (let img of uploadedFiles) {
            const basePhoto = await toBase64(img)
            pictureUrls.push(basePhoto)
        }
    }
    const obj = {
        "price": advertisementData.price.value,
        "priceType": advertisementData.priceType.value,
        "title": advertisementData.titleInput.value,
        "addressCity": advertisementData.addressCity.value,
        "addressStreet": advertisementData.addressStreet.value,
        "mainPictureUrl": "http://placeimg.com/640/480",
        "pictureUrls": pictureUrls,
        "advertisementNo": Date.now(),
        "publishedAt": Date.now(),
        "advertisementStatus": advertisementData.statusSelect.value,
        "housingShape": advertisementData.selectHousing.value,
        "saleRental": advertisementData.saleRental.value,
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
        "longitude": advertisementData.longitude.value,
        "latitude": advertisementData.latitude.value,
        "interiorFeatures": [{
            "adsl": advertisementData.hasAdsl.checked,
            "alarm": advertisementData.hasAlarm.checked,
            "balcony": advertisementData.hasBalcony.checked,
            "barbecue": advertisementData.hasBarbecue.checked,
            "laundryRoom": advertisementData.hasLaundryRoom.checked,
            "wallpaper": advertisementData.hasWallpaper.checked,
            "dressingRoom": advertisementData.hasDressingRoom.checked,
            "videoIntercom": advertisementData.hasVideointercom.checked,
            "shower": advertisementData.hasShower.checked,
            "laminate": advertisementData.hasLaminate.checked,
            "panelDoor": advertisementData.hasPanelDoor.checked,
            "blinds": advertisementData.hasBlinds.checked,
            "sauna": advertisementData.hasSauna.checked,
            "satinPlaster": advertisementData.hasSatinPlaster.checked,
            "satinColor": advertisementData.hasSatinColor.checked,
            "ceramicFloor": advertisementData.hasCeramicFloor.checked,
            "elevator": advertisementData.hasElevator.checked,
            "gardened": advertisementData.isGardened.checked,
            "fitness": advertisementData.hasFitness.checked,
            "security": advertisementData.hasSecurity.checked,
            "thermalInsulation": advertisementData.hasTermalInsulation.checked,
            "generator": advertisementData.hasGenerator.checked,
            "tennisCourt": advertisementData.hasTennisCourt.checked,
            "carPark": advertisementData.hasCarPark.checked,
            "pvc": advertisementData.hasPvc.checked,
            "basketballField": advertisementData.hasBasketballField.checked,
            "market": advertisementData.hasMarket.checked,
            "hasBuiltInKitchen": advertisementData.hasBuiltInKitchen.checked,
            "isFurnished": advertisementData.isFurnished.checked,
            "hasAirConditioner": advertisementData.hasAirConditioner.checked,
        }]
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.set("params", JSON.stringify(obj));

    var requestOptions = {
        method: 'POST',
        mode: 'no-cors',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };


    fetch(`${apiUrl}/newadvertisement.php`, requestOptions)
        .then(response => {
            console.log(response)
            window.location.reload()

        }).catch(err => {
        console.log(err)

    })
})


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});