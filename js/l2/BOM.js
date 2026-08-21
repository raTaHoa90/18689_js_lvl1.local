// BOM - Browser Object Model
// window - вкладка браузера, основной корневой объект всей страницы и других объектов
// top - самый верхний window, в котором могут быть фреймы со своими window
// parent - объект window в котором открыт текущий window

// https://domain.com:8080/page/name?var1=value&var2=value#hash_text
/*
    location.hash     = '#hash_text'
    location.pathname = '/page/name'
    location.port     = '8080'
    location.host     = 'domain.com'
    location.protocol = 'https:'
    location.search   = '?var1=value&var2=value'

    location = 'url' - открыть определенный адресс
    location = location - присваиваем текущий адресс = перезагрузка страницы
    location.reload() - принудительная перезагрузка страницы
*/

/*
Объект Screen.
    height - высота в пикселях
    width - ширина в пикселях
    colorDepth - глубина цвета в битах
    isExtended - true если несколько мониторов
    avail***  - дозволенная зона действий, если не равна обычным, то, что-то захватило окно
    orientation - Объект разворота устройства
        angle - угл наклона
        type - положение экрана
            landscape-primary   - горизонтальный обычный 
            landscape-secondary - горизонтальный перевернутый
            portrait-primary    - вертикальный обычный
            portrait-secondary  - вертикальный перевернутый
*/

/* НАВИГАЦИЯ ПО ИСТОРИИ
    history.length    - получить размер текущей истории
    history.back()    - загрузить предыдущую страницу
    history.forward() - загрузить следующую страницу
    history.go(count) - прыгнуть на указанное количество позиций по истории
    history.state     - получить сохраненные в истории данные
    history.replaceState(data, title, url) - изменить данные в истории текущего положения, url вводить необязательно
    history.pushState(data, title, url) - добывить новые данные в историю, если неуказать url, то возьмется текущий
    window.addEventListener("popstate", function_popstate) - событие которое будет вызываться каждый раз, когда пользователь будет переходить по истории или открывать новые страницы в текущей вкладке
*/

/* Определение геолокации

    - получение текущего местоположения
    navigator.geolocation.getCurrentPosition(
        (objNav)=>console.log(obj), - функция, которая будет вызывана, когда придет ответ от устройства/сервиса, о вашем местоположении
        ()=>console.log('ERROR'),- функция, которая будет вызвана, если в ходе определения местоположения произойдет ошибка
        { - параметры запроса положения
            maximumAge: 100,   - максимальное время кеширования результата, при запросе, пока не прошло это времяс последнего запроса, будут возвращаться сохраненные на этот срок данные о местоположении
            timeout: 1000,     - время ожидания ответа о текущем местоположении, по истечении которого будет вызвана функция обработки ошибки
            enableHighAccuracy: false - true = наиболее точное определение местоположения, false - наиболее быстрое определение местоположения
        })
    
    - подписываемся на получение изменения местоположения
    watchID = navigator.geolocation.watchPosition(funcSuccess, funcErr, options)

    - отписываемся от получения изменений местоположения    
    navigator.geolocation.clearWatch(watchID)

    objNav = {
        coords: GeolocationCoordinates{
            accuracy: 100000       - точность определения положения в метрах (радиус вокруг указанной точки)
            altitude: null         - высота, на которой мы находимся
            altitudeAccuracy: null - точность определения высоты (погрешность/радиус)
            heading: null          - направление движения в градусах (0 - север, 180 - юг)
            latitude: 55.75586318969727  - ширина
            longitude: 37.61769866943359 - долгота
            speed: null            - скорость нашего движения в м/с
        }
        timestamp: 1745659008757   - время, когда были полученны эти данные
    }
*/

// получение данных из буфера обмена
//navigator.clipboard.readText().then(data=>console.log(data))
//navigator.clipboard.read().then(data=>console.log(data[0].types))

// navigator.getGamepads(): array(4)
//        возвращает информацию о подключенных джойстиках, воспринимает до 4 устройств

/*
// Датчик поворотов устройства в пространстве
let gyroscope = new Gyroscope({ frequency: 60 }); // вызывать 60 раз в секунду

gyroscope.addEventListener("reading", (e) => {
    console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
    console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
    console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);
});
gyroscope.start();

// датчик ускорения/движения объекта
const acl = new Accelerometer({ frequency: 60 });
acl.addEventListener("reading", () => {
    console.log(`Acceleration along the X-axis ${acl.x}`);
    console.log(`Acceleration along the Y-axis ${acl.y}`);
    console.log(`Acceleration along the Z-axis ${acl.z}`);
});

acl.start();

// Датчик освещения
if ("AmbientLightSensor" in window) {
    const sensor = new AmbientLightSensor();
    sensor.addEventListener("reading", (event) => {
        console.log("Current light level:", sensor.illuminance);
    });
    sensor.addEventListener("error", (event) => {
        console.log(event.error.name, event.error.message);
    });
    sensor.start();
}


// Датчик силы тяжести приложенной к устройству
let gravitySensor = new GravitySensor({ frequency: 60 });

gravitySensor.addEventListener("reading", (e) => {
    console.log(`Gravity along the X-axis ${gravitySensor.x}`);
    console.log(`Gravity along the Y-axis ${gravitySensor.y}`);
    console.log(`Gravity along the Z-axis ${gravitySensor.z}`);
});

gravitySensor.start();

// Датчик магнитного поля по трем осям
let magSensor = new Magnetometer({ frequency: 60 });

magSensor.addEventListener("reading", (e) => {
    console.log(`Magnetic field along the X-axis ${magSensor.x}`);
    console.log(`Magnetic field along the Y-axis ${magSensor.y}`);
    console.log(`Magnetic field along the Z-axis ${magSensor.z}`);
});
magSensor.start();
*/