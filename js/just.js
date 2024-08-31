// Get Phone Data Through API
const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    return data.data;
};

// Shuffle array function to randomize order
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Show Phone Data With DOM manipulation
const displayPhones = phones => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = "";
    if (phones.length === 0) {
        document.getElementById("search-input-field").value = "Not Found";
        return;
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement("div");
        phoneCard.classList = `border-2 w-[352px] md:w-[363px] lg:w-[352px] h-[560px] rounded-md p-4 flex flex-col gap-4`;
        phoneCard.innerHTML = 
        `<section class="bg-[#0d6dfd13] w-full h-[280px] rounded-md flex justify-center items-center">
            <img src="${phone.image}" alt="">
        </section>
        <section>
            <h2 class="text-[#403F3F] font-bold text-[25px] text-center">${phone.phone_name}</h2>
            <p class="mt-3 text-[#706F6F] text-center">There are many variations of passages of available, but the majority have suffered</p>
            <h2 class="mt-3 text-[#403F3F] font-bold text-[25px] text-center">$999</h2>
            <div class="flex justify-center">
                <button class="bg-[#4d6eff] hover:bg-[#4965e0] active:bg-[#6a9ae2dc] h-[38px] rounded-lg font-semibold text-white px-8 mt-4">Show Details</button>
            </div>
        </section>`;
        phoneContainer.appendChild(phoneCard);
    });
};

// Load all phones from each brand and shuffle them
const loadAllPhones = async () => {
    const brands = ["samsung", "oppo", "iphone", "huawei"];
    let allPhones = [];

    for (let brand of brands) {
        const phones = await loadPhone(brand);
        allPhones = allPhones.concat(phones);
    }

    // Shuffle the array to randomize the order
    const shuffledPhones = shuffleArray(allPhones);
    
    displayPhones(shuffledPhones);
};

// Load all phones on page load
loadAllPhones();