// =========================
// Cards
// =========================

const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");
const card5 = document.getElementById("card5");
const card6 = document.getElementById("card6");
const card7 = document.getElementById("card7");
const card8 = document.getElementById("card8");
const card9 = document.getElementById("card9");
const card10 = document.getElementById("card10");
const card11 = document.getElementById("card11");
const card12 = document.getElementById("card12");

// =========================
// Other Elements
// =========================

const noBtn = document.getElementById("noBtn");
const petals = document.querySelector(".petals");
const music = document.getElementById("bgMusic");

// =========================
// Date Picker
// =========================

const today = new Date().toISOString().split("T")[0];
document.getElementById("dateInput").min = today;

// =========================
// Fade Transition Function
// =========================

function showCard(currentCard, nextCard) {

    currentCard.classList.add("hidden");

    nextCard.classList.remove("hidden");

    nextCard.classList.remove("fadeIn");

    void nextCard.offsetWidth;

    nextCard.classList.add("fadeIn");

}

// =========================
// Navigation
// =========================

document.getElementById("startBtn").onclick = () => showCard(card1, card2);

document.getElementById("card2Btn").onclick = () => showCard(card2, card3);

document.getElementById("card3Btn").onclick = () => showCard(card3, card4);

document.getElementById("card4Btn").onclick = () => showCard(card4, card5);

document.getElementById("card5Btn").onclick = () => showCard(card5, card6);

document.getElementById("yesBtn").onclick = () => showCard(card6, card7);

document.getElementById("card7Btn").onclick = () => showCard(card7, card8);

document.getElementById("card8Btn").onclick = () => showCard(card8, card9);

document.getElementById("card9Btn").onclick = () => showCard(card9, card10);

document.getElementById("card10Btn").onclick = () => showCard(card10, card11);

// =========================
// Final Submit
// =========================

document.getElementById("submitBtn").onclick = async () => {

    // Collect all answers
    const responseData = {

        date: document.getElementById("dateInput").value,

        time:document.getElementById("timeInput").value,

        place: document.querySelector(
            'input[name="place"]:checked'
        )?.value,

        message: document.getElementById("message").value

    };

    try {

        const response = await fetch("/submit", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(responseData)

        });

        const result = await response.json();

        console.log(result);

        // Show final card
        showCard(card11, card12);

        // Start music
        music.play().catch(() => {});

        // Start flower petals
        setInterval(createPetal, 250);

    } catch (error) {

        console.error(error);

        alert("Unable to save your response.");

    }

};

// =========================
// Moving NO Button
// =========================

const noTexts = [

    "🙈 NO",
    "😜 Nice Try!",
    "😂 Too Slow!",
    "🌸 Catch Me!",
    "🥹 Really?",
    "💖 Think Again!",
    "🤭 Almost!"

];

let index = 0;

noBtn.addEventListener("mouseenter", () => {

    index = (index + 1) % noTexts.length;

    noBtn.innerText = noTexts[index];

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

});
const petalsContainer = document.getElementById("petals");

function createPetal(){

    const petal = document.createElement("div");

    petal.classList.add("petal");

    petal.innerHTML = "🌸";

    petal.style.left = Math.random() * window.innerWidth + "px";

    petal.style.fontSize = (20 + Math.random()*20) + "px";

    petal.style.animationDuration = (6 + Math.random()*5) + "s";

    petalsContainer.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },11000);

}