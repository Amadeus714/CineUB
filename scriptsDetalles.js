// detalles.js

document.addEventListener("DOMContentLoaded", function() {

    const trailer = document.querySelector('.trailer-container iframe');
    if(trailer) {
        trailer.onload = function() {
            this.parentElement.classList.add('loaded');
        };
        
        // Precarga para móviles
        if(window.innerWidth <= 768) {
            trailer.src += "&autoplay=0";
        }
    }


    // 1. Sistema de calificación con estrellas
    const stars = document.querySelectorAll(".stars span");
    const averageRating = document.getElementById("averageRating");

    if (stars.length > 0) {
        let userRating = 0;

        stars.forEach((star, index) => {
            star.addEventListener("click", () => {
                userRating = index + 1;
                updateStars();
            });
            star.addEventListener("mouseover", () => {
                highlightStars(index);
            });
            star.addEventListener("mouseout", () => {
                updateStars();
            });
        });

        function highlightStars(index) {
            stars.forEach((star, i) => {
                star.textContent = i <= index ? "★" : "☆";
            });
        }

        function updateStars() {
            stars.forEach((star, i) => {
                star.textContent = i < userRating ? "★" : "☆";
            });
        }
    }

    // 2. Sistema de selección de butacas
    const buyBtn = document.getElementById("buyBtn");
    const seatModal = document.getElementById("seatModal");
    const closeModal = document.querySelector(".close-modal");
    const confirmPurchase = document.getElementById("confirmPurchase");
    const selectedSeatsContainer = document.getElementById("selectedSeats");
    const totalAmountElement = document.getElementById("totalAmount");

    if (buyBtn && seatModal) {
        const seatPrice = 350;
        let selectedSeats = [];

        generateSeatMap();

        buyBtn.addEventListener("click", function() {
            seatModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        });

        closeModal.addEventListener("click", function() {
            seatModal.style.display = "none";
            document.body.style.overflow = "auto";
        });

        window.addEventListener("click", function(event) {
            if (event.target === seatModal) {
                seatModal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });

        confirmPurchase.addEventListener("click", function() {
            if (selectedSeats.length > 0) {
                alert(`Compra realizada con éxito!\nButacas: ${selectedSeats.join(", ")}\nTotal: $${(seatPrice * selectedSeats.length).toFixed(2)}`);
                seatModal.style.display = "none";
                document.body.style.overflow = "auto";
                resetSeatSelection();
            } else {
                alert("Por favor selecciona al menos una butaca");
            }
        });

        function generateSeatMap() {
            const cinemaSeatMap = document.querySelector(".cinema-seat-map");
            cinemaSeatMap.innerHTML = "";
            
            // Sección Izquierda: A-E (5 columnas)
            createSeatSection(cinemaSeatMap, ['A', 'B', 'C', 'D', 'E'], 30, 'left');
            
            // Sección Central: F-O (10 columnas)
            createSeatSection(cinemaSeatMap, ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'], 30, 'center');
            
            // Sección Derecha: P-T (5 columnas)
            createSeatSection(cinemaSeatMap, ['P', 'Q', 'R', 'S', 'T'], 30, 'right');
        }

        function createSeatSection(container, letters, rows, position) {
            const section = document.createElement("div");
            section.className = `seat-section ${position}-section`;
            
            // Fila de letras
            const letterRow = document.createElement("div");
            letterRow.className = "letter-row";
            letters.forEach(letter => {
                const letterCell = document.createElement("div");
                letterCell.className = "seat-letter";
                letterCell.textContent = letter;
                letterRow.appendChild(letterCell);
            });
            section.appendChild(letterRow);
            
            // Filas de asientos
            for (let rowNum = 1; rowNum <= rows; rowNum++) {
                const rowDiv = document.createElement("div");
                rowDiv.className = "seat-row";
                
                letters.forEach(letter => {
                    const seatId = `${letter}${rowNum}`;
                    const seat = document.createElement("div");
                    seat.className = "seat";
                    seat.textContent = rowNum;
                    seat.id = `seat-${seatId}`;
                    seat.setAttribute("aria-label", `Butaca ${seatId}`);
                    seat.setAttribute("tabindex", "0");

                    if (Math.random() < 0.2) seat.classList.add("reserved");

                    seat.addEventListener("click", function() {
                        toggleSeatSelection(seat, seatId);
                    });
                    
                    seat.addEventListener("keydown", function(e) {
                        if (e.key === "Enter" || e.key === " ") {
                            toggleSeatSelection(seat, seatId);
                        }
                    });
                    
                    rowDiv.appendChild(seat);
                });
                
                section.appendChild(rowDiv);
            }
            
            container.appendChild(section);
        }

        function toggleSeatSelection(seatElement, seatId) {
            if (seatElement.classList.contains("reserved")) return;

            if (seatElement.classList.contains("selected")) {
                seatElement.classList.remove("selected");
                selectedSeats = selectedSeats.filter(seat => seat !== seatId);
            } else {
                seatElement.classList.add("selected");
                selectedSeats.push(seatId);
            }

            updateSelectionSummary();
        }

        function updateSelectionSummary() {
            selectedSeatsContainer.innerHTML = "";
            selectedSeats.forEach(seat => {
                const badge = document.createElement("span");
                badge.className = "seat-badge";
                badge.textContent = seat;
                selectedSeatsContainer.appendChild(badge);
            });

            const total = seatPrice * selectedSeats.length;
            totalAmountElement.textContent = `$${total.toFixed(2)}`;
        }

        function resetSeatSelection() {
            document.querySelectorAll(".seat.selected").forEach(seat => {
                seat.classList.remove("selected");
            });
            selectedSeats = [];
            updateSelectionSummary();
        }
    }

    // 3. Selección de formato, horario y días
    // Generación automática de días
    const dayOptionsContainer = document.querySelector(".day-options");
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const today = new Date();
    
    // Generar los próximos 7 días
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dayBtn = document.createElement("button");
        dayBtn.className = "day-btn";
        dayBtn.setAttribute("aria-label", `Seleccionar día ${i+1}`);
        if (i === 0) dayBtn.classList.add("selected");
        
        // Formatear el texto del botón
        let dayText;
        if (i === 0) dayText = "Hoy";
        else if (i === 1) dayText = "Mañana";
        else dayText = daysOfWeek[date.getDay()];
        
        const dayNumber = date.getDate();
        const month = monthNames[date.getMonth()];
        dayBtn.textContent = `${dayText} ${dayNumber} ${month}`;
        
        dayBtn.addEventListener("click", function() {
            document.querySelectorAll(".day-btn").forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");
        });
        
        dayOptionsContainer.appendChild(dayBtn);
    }

    // Selección de formato
    const formatBtns = document.querySelectorAll(".format-btn");
    formatBtns.forEach((btn, index) => {
        btn.setAttribute("aria-label", `Formato ${btn.textContent}`);
        btn.addEventListener("click", function() {
            formatBtns.forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

    // Selección de horario
    const scheduleBtns = document.querySelectorAll(".schedule-btn");
    scheduleBtns.forEach((btn, index) => {
        btn.setAttribute("aria-label", `Horario ${btn.textContent}`);
        btn.addEventListener("click", function() {
            scheduleBtns.forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

    // Selección de idioma
    const languageBtns = document.querySelectorAll(".language-btn");
    languageBtns.forEach(btn => {
        btn.setAttribute("aria-label", `Versión ${btn.textContent.trim()}`);
        btn.addEventListener("click", function() {
            languageBtns.forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

});