const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=samsung');
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
};

const displayPhones = phones => {
    const phoneContainer = document.getElementById("phone-container");
    phones.forEach( phone => {
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
                <button class="bg-[#4d6eff] hover:bg-[#4965e0] active:bg-[#6a9ae2dc] h-[38px] rounded-lg font-semibold text-white px-8 mt-4">Show Details</button>
            </div>
        </section>
        `;
        phoneContainer.appendChild(phoneCard);
    });
};

loadPhone();