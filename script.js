let seatsElement = document.querySelector('.seats');
let selection;


const seats = document.querySelectorAll('.seats .seat:not(.reserved)');

let chargetext = document.querySelector('.charge-text');
let countText = document.querySelector('#count');
let feeText = document.querySelector('#fee');
let fee;
let count;
let selectElement = document.querySelector('.movie-selector')
let selectedSeatIndexes;


const seatsArr = []
seats.forEach(element => {
    seatsArr.push(element);
});
const selectedSeats = [];


getFromLocalStorage();







function seatSelection() {

    // Sadece tek koltuk alınabilmesi için.
    // if (selectedSeat != null) {
    //     selectedSeat.classList.remove('selected');
    // }



    // Seçilen koltuğu arraye eklemek.
    if (selection.classList.contains('selected')) {
        selectedSeats.push(selection);
        localStorage.setItem("selectedIndexes", JSON.stringify(selectedSeatIndexes));


    }
    else {
        // Seçimden kaldırılan koltuğu arrayden silmek.
        var willRemoveIndex = selectedSeats.indexOf(selection)
        selectedSeats.splice(willRemoveIndex, 1);



    }





}

function calculatePrice() {
    // Fiyat ve koltuk sayısı hesaplamaları.

    count = selectedSeats.length
    fee = selectedSeats.length * selectElement.value;


    calculateDiscount(count);
    countText.textContent = count;
    feeText.textContent = fee;
    // Fiyat bilgisi kutusu gizlemek ve göstermek.
    selectedSeats.length == 0 ? chargetext.classList.add('d-none') : chargetext.classList.remove('d-none');
}

function calculateDiscount(count) {
    if (count > 4) {
        fee = fee - (fee * 0.10);
    }

}


seatsElement.addEventListener('click', (e) => {

    // Tıklanan element seat classına sahip ve reserved classına sahip değil ise



    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {

        // Seçim
        selection = e.target;
        selection.classList.toggle('selected');


        seatSelection();
        calculatePrice()


        selectedSeatIndexes = selectedSeats.map(function (seat) {

            return seatsArr.indexOf(seat);
        })
        console.log("selected indexes", selectedSeatIndexes);

        localStorage.setItem("selectedIndexes", JSON.stringify(selectedSeatIndexes));
        localStorage.setItem("selectedMovie", JSON.stringify(selectElement.selectedIndex))

        console.log(seatsArr)
        console.log(selectedSeats)


    }



})

selectElement.addEventListener('change', () => {
    calculatePrice()
    localStorage.setItem("selectedIndexes", JSON.stringify(selectedSeatIndexes));
    localStorage.setItem("selectedMovie", JSON.stringify(selectElement.selectedIndex))
})

function getFromLocalStorage() {

    let selectedSeats = JSON.parse(localStorage.getItem("selectedIndexes"));

    console.log(selectedSeats)
    if (selectedSeats != null && selectedSeats.length > 0) {

        seats.forEach((seat, index) => {

            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");


            }


        })


    }

    const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));

    if (selectedMovie != null) {
        selectElement.selectedIndex = selectedMovie;

    }

}
