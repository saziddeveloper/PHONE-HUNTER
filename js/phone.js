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
    // if (phones.length > 6 && !isShowAll){
    //     showAllBtn.classList.remove("hidden");
    //     showAllBtn.classList.add("flex");
    // }
    // else {
    //     showAllBtn.classList.add("hidden");
    // };
    // if (!isShowAll){
    //     phones = phones.slice(0,6);
    // };
    phones.forEach(phone => {
        const phoneCard = document.createElement("div");
        phoneCard.classList = `border-2 w-[352px] md:w-[363px] lg:w-[352px] h-[560px] rounded-md p-4 flex flex-col gap-4`;
        phoneCard.innerHTML = `
        <section class="bg-[#0d6dfd13] w-full h-[280px] rounded-md flex justify-center items-center">
            <img src="${phone.image}" alt="">
        </section>
        <section>
            <h2 class="text-[#403F3F] font-bold text-[25px] text-center">${phone.phone_name}</h2>
            <p class="mt-3 text-[#706F6F] text-center">There are many variations of passages of available, but the majority have suffered</p>
            <h2 class="mt-3 text-[#403F3F] font-bold text-[25px] text-center">$999</h2>
            <div class="flex justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="bg-[#4d6eff] hover:bg-[#4965e0] active:bg-[#6a9ae2dc] h-[38px] rounded-lg font-semibold text-white px-8 mt-4">Show Details</button>
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

// Handle Show Details Functionality
const handleShowDetails = async (inputPhoneID) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${inputPhoneID}`);
    const data = await res.json();
    const phoneDetails = data.data;
    showPhoneDetails(phoneDetails);
};

// Show Details Functionality
const showPhoneDetails = (inputPhoneDetails) => {
    const modalContainer = document.getElementById("show_details_modal");
    const phoneCard = document.createElement("div");
        phoneCard.classList = `modal-box border-2 w-[292px] md:w-[492px] lg:w-[492px] rounded-md p-4 flex flex-col gap-8`;
        phoneCard.innerHTML = `
        <section class="py-9 bg-[#0d6dfd13] w-full h-[280px] rounded-md flex justify-center items-center">
            <img src="${inputPhoneDetails.image}" alt="">
        </section>
        <section>
            <h2 class="text-[#403F3F] font-bold text-[22px]">${inputPhoneDetails.name}</h2>
            <p class="mt-3 text-[#706F6F] text-[14px]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <div class="mt-4">
                <h3 class="mt-3 font-semibold text-[#403F3F]">Storage : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.mainFeatures?.storage}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">Display Size : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.mainFeatures?.displaySize}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">Chipset : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.mainFeatures?.chipSet}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">Memory : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.mainFeatures?.memory}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">Slug : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.slug}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">Release data : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.releaseDate}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">Brand : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.brand}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">WLAN : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.others?.WLAN}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">Bluetooth : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.others?.Bluetooth}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">GPS : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.others?.GPS}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">NFC : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.others?.NFC}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">Radio : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.others?.Radio}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">USB : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.others?.USB}</span></h3>
                <h3 class="mt-3 font-semibold text-[#403F3F]">Sensors : <span class="font-normal text-[#706F6F]">${inputPhoneDetails?.mainFeatures?.sensors[0]},  ${inputPhoneDetails?.mainFeatures?.sensors[1]},  ${inputPhoneDetails?.mainFeatures?.sensors[2]},  ${inputPhoneDetails?.mainFeatures?.sensors[3]},  ${inputPhoneDetails?.mainFeatures?.sensors[4]}, </span></h3>
            </div>
        </section>
        <div class="modal-action mt-0 md:mt-6 lg:mt-6">
            <form method="dialog">
                <button class="btn text-white bg-[#DC3545] px-9 rounded-lg">Close</button>
            </form>
        </div>`;
        modalContainer.appendChild(phoneCard);
    show_details_modal.showModal();
};

// Show All Functionality
// const handleShowAll = () => {
//     handleSearch(true);
// };

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