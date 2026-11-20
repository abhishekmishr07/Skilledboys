 const workers = [
      { name: "Amit Sharma", category: "Electrician", location: "Noida", age: 28, gender: "Male", rating: 4.5, phone: "9876543210", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
      { name: "Ravi Kumar", category: "Plumber", location: "Delhi", age: 35, gender: "Male", rating: 4.2, phone: "9876501234", photo: "https://randomuser.me/api/portraits/men/65.jpg" },
      { name: "Sita Verma", category: "Carpenter", location: "Greater Noida", age: 30, gender: "Female", rating: 4.8, phone: "9876509876", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
      { name: "Arjun Singh", category: "Electrician", location: "Delhi", age: 26, gender: "Male", rating: 4.7, phone: "9876505555", photo: "https://randomuser.me/api/portraits/men/12.jpg" },
    ];

    const form = document.getElementById("searchForm");
    const resultsDiv = document.getElementById("results");

    function renderWorkers(data) {
      resultsDiv.innerHTML = "";
      if (data.length === 0) {
        resultsDiv.innerHTML = `<p class="text-gray-500">No workers found.</p>`;
        return;
      }
      data.forEach(worker => {
        resultsDiv.innerHTML += `
          <div class="bg-white rounded-xl shadow-soft p-6 hover:shadow-lg transition">
            <img src="${worker.photo}" alt="${worker.name}" class="w-24 h-24 rounded-full mx-auto border-4 border-purple-200">
            <h4 class="mt-4 text-lg font-semibold text-gray-800 text-center">${worker.name}</h4>
            <p class="text-gray-500 text-center">${worker.category} • ${worker.location}</p>
            <div class="mt-3 flex justify-center space-x-4 text-sm text-gray-600">
              <span>⭐ ${worker.rating}</span>
              <span>${worker.age} yrs</span>
              <span>${worker.gender}</span>
            </div>
            <p class="mt-2 text-center text-purple-600 font-medium">📞 ${worker.phone}</p>
          </div>        `;
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const category = document.getElementById("category").value;
      const location = document.getElementById("location").value;
      const filtered = workers.filter(w =>
        (category === "" || w.category === category) &&
        (location === "" || w.location === location)
      );
      renderWorkers(filtered);
    });

    // Initial load
    renderWorkers(workers);