document.addEventListener("DOMContentLoaded", () => {
    const svgObject = document.getElementById("turkey-map");
  
    svgObject.addEventListener("load", () => {
      const svgDoc = svgObject.contentDocument;
      const cities = svgDoc.querySelectorAll("path");
      const popup = document.getElementById("popup");
  
      cities.forEach(city => {
        city.style.cursor = "pointer";
  
        city.addEventListener("click", (event) => {
          const cityName = city.id;
  
          fetch(`/weather/${cityName}`)
            .then(response => response.json())
            .then(data => {
              if (data.current) {
                popup.innerHTML = `
                  <strong>${cityName}</strong><br>
                  Temp: ${data.current.temp}°C<br>
                  Wind: ${data.current.wind_speed} m/s<br>
                  Humidity: ${data.current.humidity}%
                `;
              } else {
                popup.innerHTML = `<strong>${cityName}</strong><br>Veri alınamadı.`;
              }
  
              popup.style.top = `${event.clientY + 10}px`;
              popup.style.left = `${event.clientX + 10}px`;
              popup.classList.add("visible");
            })
            .catch(error => {
              popup.innerHTML = `<strong>${cityName}</strong><br>Bağlantı hatası.`;
              popup.classList.add("visible");
            });
        });
      });
    });
  });
  