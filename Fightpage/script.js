const africanCities = [
  "Lagos",
  "Abuja",
  "Kano",
  "PortHarcourt",
  "Kaduna",
  "Jos",
];

const fromSelect = document.getElementById("fromCity");
const toSelect = document.getElementById("toCity");

africanCities.forEach((city) => {
  const optionFrom = document.createElement("option");
  optionFrom.value = optionFrom.textContent = city;
  fromSelect.appendChild(optionFrom);

  const optionTo = document.createElement("option");
  optionTo.value = optionTo.textContent = city;
  toSelect.appendChild(optionTo);
});

function getRandomDate(startOffset = 0, range = 30) {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * range) + startOffset;
  const result = new Date(today);
  result.setDate(today.getDate() + randomDays);
  return result.toISOString().split("T")[0];
}

function formatPrice() {
  const price = Math.floor(Math.random() * 200000 + 50000);
  return `₦${price.toLocaleString()}`;
}

const cityImages = {
  Lagos: "../imgfolder/lagos.jpeg",
  Abuja: "../imgfolder/abuja.jpeg",
  Kano: "../imgfolder/kano.jpeg",
  PortHarcourt: "../imgfolder/portharcout.jpeg",
  Jos: "../imgfolder/jos.jpeg",
  Kaduna: "../imgfolder/kaduna.jpeg",
};

function getCityImage(city) {
  return cityImages[city] || "imgfolder/img5.jfif";
}

function searchFlights() {
  const from = fromSelect.value;
  const to = toSelect.value;
  const userDepart = document.getElementById("departDate").value;
  const userReturn = document.getElementById("returnDate").value;

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (!from || !to || !userDepart) {
    alert("Please select origin, destination and departure date.");
    return;
  }

  const cardsWrapper = document.createElement("div");
  cardsWrapper.className = "flight-results";

  for (let i = 0; i < 8; i++) {
    const randomDepart = getRandomDate(1, 10);
    const randomReturn = getRandomDate(11, 20);
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
        <img src="${getCityImage(to)}" alt="${to}" class="flight-img"/>
        <h3>${from}-${to}</h3>
        <p><strong>Departure:</strong> ${randomDepart}</p>
        <p><strong>Return:</strong> ${userReturn || randomReturn}</p>
        <p><strong>Airline:</strong> NigeriaLink ${i + 1}</p>
        <p><strong>Price:</strong> ${formatPrice()}</p>
        <button onclick="fillBooking('${from}', '${to}', '${randomDepart}', '${
      userReturn || randomReturn
    }')">Book Now</button>
      `;
    cardsWrapper.appendChild(card);
  }

  resultsContainer.appendChild(cardsWrapper);
}

function fillBooking(from, to, depart, returnDate) {
  document.getElementById("formFrom").value = from;
  document.getElementById("formTo").value = to;
  document.getElementById("formDepart").value = depart;
  document.getElementById("formReturn").value = returnDate;

  document
    .getElementById("bookingSection")
    .scrollIntoView({ behavior: "smooth" });
}

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("✅ Booking confirmed! You’ll receive an email shortly.");
  this.reset();
});

document.getElementById("cancelBooking").addEventListener("click", function () {
  document.getElementById("bookingForm").reset();
});

document.getElementById("menu-btn").addEventListener("click", function () {
  document.getElementById("nav-links").classList.toggle("open");
});
