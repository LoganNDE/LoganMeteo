window.onload = () =>{

    let popularCities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Murcia', 'Cuenca']



    async function getDataCity(city = null) {
        let response = await fetch('http://www.alpati.net/DWEC/cities/')
        let responseJSON = await response.json()
        console.log(responseJSON);
        let filterES = responseJSON.filter(city => city[5] === 'ES');

    
        if (city){
            filterES.forEach(ciudades => {
                if (ciudades[2] === city && ciudades[5] === 'ES'){
                    console.log(ciudades);
                    createItemsDOM(ciudades);
                }
            });
        }else{
            createItemsDOM(filterES)
        }
    }
    
    /*
    async function saveMeteoInfo(cities, latitude = null, longitude = null) {
        let meteoInfoDefault = [];
        if (Array.isArray(cities)){
            
            cities.forEach(city => {
                let data = getMetaInfo(city[3], city[4])
                meteoInfoDefault.push(data);
            });
            console.log(data);
        }
    }
    */

    async function getMetaInfoPrevious(latitude, longitude) {
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&forecast_days=1`);
        let responseJSON = await response.json();
        return responseJSON;
    }

    async function getMetaInfoCurrent(latitude, longitude) {
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation`);
        let responseJSON = await response.json();
        return responseJSON;
    }
    



    createItemsDOM = (data) =>{
        if (Array.isArray(data)){
            gridMain = document.querySelector('#grid');
            data.forEach(city => {
                if (popularCities.includes(city[2])){
                    getMetaInfoCurrent(city[3], city[4]).then(response => {
                        temperature = 0;
                        console.log(response);
                        //response.hourly.temperature_2m.map(a => temperature += a);
                        //temperature = Math.round(temperature/24); 
                        console.log('Coincidencia ' + city[2]);
                        let grid = document.createElement('div');
                        grid.classList.add('cardBG', 'h-44', 'w-96', 'border-2', 'rounded-lg', 'flex', 'flex-col', 'justify-center', 'items-center');
                        let title = document.createElement('h3');
                        title.classList.add('text-3xl', 'poppins')

                        let divInfo = document.createElement('div');
                        divInfo.classList.add('divInfo', 'w-full', 'flex')

                        //Info Temperatura
                        let divTemperature = document.createElement('div');
                        divTemperature.classList.add('w-1/3', 'py-6')
                        let titleTemperature = document.createElement('h4');
                        titleTemperature.textContent = 'Temperatura'
                        titleTemperature.classList.add('poppins', 'font-light', 'text-center' , 'text-sm');
                        let temperatureDOM = document.createElement('p');
                        temperatureDOM.classList.add('poppins', 'font-extralight', 'text-center');
                        temperatureDOM.textContent = response.current.temperature_2m + response.current_units.temperature_2m;
                        divTemperature.appendChild(titleTemperature);
                        divTemperature.appendChild(temperatureDOM)

                        //Info Precipitaciones
                        let divPrecipitation = document.createElement('div');
                        divPrecipitation.classList.add('w-1/3', 'py-6')
                        let titlePrecipitation = document.createElement('h4');
                        titlePrecipitation.textContent = 'Precipitaciones'
                        titlePrecipitation.classList.add('poppins', 'font-light', 'text-center' , 'text-sm');
                        let precipitationDOM = document.createElement('p');
                        precipitationDOM.classList.add('poppins', 'font-extralight', 'text-center');
                        precipitationDOM.textContent = response.current.precipitation + response.current_units.precipitation;
                        divPrecipitation.appendChild(titlePrecipitation);
                        divPrecipitation.appendChild(precipitationDOM);
                        
                        //Info Humedad
                        let divHumidity = document.createElement('div');
                        divHumidity.classList.add('w-1/3', 'py-6')
                        let titleHumidity = document.createElement('h4');
                        titleHumidity.textContent = 'Humedad'
                        titleHumidity.classList.add('poppins', 'font-light', 'text-center' , 'text-sm');
                        let humidityDOM = document.createElement('p');
                        humidityDOM.classList.add('poppins', 'font-extralight', 'text-center');
                        humidityDOM.textContent = response.current.relative_humidity_2m + response.current_units.relative_humidity_2m;
                        divHumidity.appendChild(titleHumidity);
                        divHumidity.appendChild(humidityDOM);
                        
                        divInfo.appendChild(divTemperature);
                        divInfo.appendChild(divPrecipitation);
                        divInfo.appendChild(divHumidity);

                        title.textContent = city[2];
                        grid.appendChild(title);
                        grid.appendChild(divInfo);
                        gridMain.appendChild(grid);
                    });
                }
            });

        }else{
            console.log(data)
        }



    }


    getDataCity();

}








