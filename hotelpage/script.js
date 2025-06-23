document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  
  if (menuBtn && navLinks) {
    const menuBtnIcon = menuBtn.querySelector("i");
    
    menuBtn.addEventListener("click", (e) => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });

    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === 'A') { // Only close when clicking links
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-line");
      }
    });
  }

  // Scroll Animations
  const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };

  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal(".header__container h1", { ...scrollRevealOption });
    ScrollReveal().reveal(".header__container p", { ...scrollRevealOption, delay: 500 });
    ScrollReveal().reveal(".header__container form", { ...scrollRevealOption, delay: 1000 });
    ScrollReveal().reveal(".hotel__card", { ...scrollRevealOption, interval: 500 });
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init();
  }

  // Filter Functionality
  const filterBtns = document.querySelectorAll(".filter__btn");
  const hotelCards = document.querySelectorAll(".hotel__card");

  if (filterBtns.length && hotelCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.textContent.toLowerCase().trim();
        
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        hotelCards.forEach(card => {
          const categories = card.dataset.category?.toLowerCase() || '';
          if (filter === "all" || categories.includes(filter)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // Booking Form Handling
  const bookingForm = document.querySelector(".booking__form");
  if (bookingForm) {
    const checkInInput = document.getElementById("check-in");
    const checkOutInput = document.getElementById("check-out");
    
    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    if (checkInInput) checkInInput.min = today;
    if (checkOutInput) checkOutInput.min = today;

    // Validate check-out is after check-in
    if (checkInInput && checkOutInput) {
      checkInInput.addEventListener('change', () => {
        if (checkInInput.value) {
          checkOutInput.min = checkInInput.value;
          if (checkOutInput.value < checkInInput.value) {
            checkOutInput.value = '';
          }
        }
      });
    }

    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const hotelSelect = document.getElementById("hotel");
      const hotel = hotelSelect ? hotelSelect.value : null;
      const checkIn = checkInInput ? checkInInput.value : null;
      const checkOut = checkOutInput ? checkOutInput.value : null;
      
      if (!hotel || !checkIn || !checkOut) {
        alert("Please fill in all required fields");
        return;
      }
      
      // Here you would normally send data to a server
      console.log("Booking details:", { hotel, checkIn, checkOut });
      alert(`Booking request received for ${hotelSelect.options[hotelSelect.selectedIndex].text} from ${new Date(checkIn).toLocaleDateString()} to ${new Date(checkOut).toLocaleDateString()}`);
      
      bookingForm.reset();
    });
  }
});