// Get Phone Data Through API
const loadPhone = async (searchText = "Galaxy", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
};

// Show Phone Data With DOM manipulation
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    if (phones.length === 0) {
        // document.getElementById("search-input-field").value = "Not Found";
        document.getElementById("search-input-field").placeholder = "Not Found";
        toggleLoadingSpinner(false);
        return;
    }
    else {
        document.getElementById("search-input-field").placeholder = "Search your phone";
    }
    phoneContainer.textContent = "";
    const showAllBtn = document.getElementById("show-all-btn");
    if (phones.length > 6 && !isShowAll){
        showAllBtn.classList.remove("hidden");
        showAllBtn.classList.add("flex");
    }
    else {
        showAllBtn.classList.add("hidden");
    };
    if (!isShowAll){
        phones = phones.slice(0,6);
    };
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
                <button onclick="handleShowDetails('${phone.slug}'); show_details_modal.showModal()" class="bg-[#4d6eff] hover:bg-[#4965e0] active:bg-[#6a9ae2dc] h-[38px] rounded-lg font-semibold text-white px-8 mt-4">Show Details</button>
            </div>
        </section>`;
        toggleLoadingSpinner(false);
        phoneContainer.appendChild(phoneCard);
    });
};

// Search Functionality
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById("search-input-field");
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
    searchField.value = '';
};

// Show Details Functionality
const handleShowDetails = (inputPhoneID) => {
    // const res = await fetch
};

// Show All Functionality
const handleShowAll = () => {
    handleSearch(true);
};

// Loading Spinner Functionality
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading){
        loadingSpinner.classList.remove("hidden");
        loadingSpinner.classList.add("flex");
    }
    else {
        loadingSpinner.classList.add("hidden");
        loadingSpinner.classList.remove("flex");
    }
};

loadPhone();