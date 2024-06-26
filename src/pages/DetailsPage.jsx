
import { useParams } from 'react-router-dom';

import FooterOffice from '../components/footer_office/footer_office';

import './../styles/office.css'
import './../styles/detailspage.css'

import React, { useState } from 'react';
import HeaderOffice, { ModalContext } from './../components/header_office/header_office';
import { FOOD_ROUTE, HOME_ROUTE, OFFICE_ROUTE, PERSONINFORMATION_ROUTE, PROGRESS_ROUTE, SUBSCRIPTIONS_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaDumbbell } from "react-icons/fa6";
import { PiForkKnifeBold } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";

import artem from './../img/photo/artem.jpg'

import { IoTrendingUpOutline } from "react-icons/io5";
import { GiMuscleUp } from "react-icons/gi";

import { logout } from './../http/AuthServices';

import j1 from './../img/photo/jm1.jpeg'
import j2 from './../img/photo/jm3.jpg'
import j3 from './../img/photo/jm2.jpg'
import c1 from './../img/photo/c0.jpg'
import c2 from './../img/photo/c1.jpg'
import c3 from './../img/photo/c2.jpg'
import h1 from './../img/photo/h1.jpg'
import h2 from './../img/photo/h2.jpg'
import h3 from './../img/photo/h3.1.jpeg'

import pj1 from './../img/photo/pj1.jpeg'
import pj2 from './../img/photo/pj2.jpeg'
import pj3 from './../img/photo/pj3.jpg'
import pj4 from './../img/photo/pj4.jpg'
import pj5 from './../img/photo/pj5.jpg'
import pj6 from './../img/photo/pj6.jpeg'
import pj7 from './../img/photo/pj7.jpg'

import pc1 from './../img/photo/pc1.jpg'
import pc2 from './../img/photo/pc2.jpg'
import pc3 from './../img/photo/pc3.jpg'
import pc4 from './../img/photo/pc4.jpg'
import pc5 from './../img/photo/pc5.jpg'
import pc6 from './../img/photo/pc6.jpg'
import pc7 from './../img/photo/pc7.jpg'

import ph1 from './../img/photo/ph1.jpg'
import ph2 from './../img/photo/ph2.jpg'
import ph3 from './../img/photo/ph3.jpg'
import ph4 from './../img/photo/ph4.jpg'
import ph5 from './../img/photo/ph5.jpg'
import ph6 from './../img/photo/ph6.jpg'
import ph7 from './../img/photo/ph7.jpeg'


const DetailsPage = () => {
  let { id } = useParams();
  

  const data = {
    'beginner-office': {
        title: 'BEGINNER',
        description0: 'Початковий рівень (Beginner): Цей рівень призначений для тих, хто тільки починає свій шлях у фітнесі. Головна мета - навчитися правильно виконувати основні вправи і підготувати тіло до більш високих навантажень. Не намагайтеся виконувати вправи з великою вагою або великою швидкістю - краще зосередьтеся на техніці виконання.',
        description1: ' Кардіо: 10 хвилин на біговій доріжцi',
        description11: ' Це відмінний спосіб розігріти ваше тіло перед тренуванням. Ви можете використовувати комфортне темпо, щоб підготувати своє серце і м’язи до подальшого навантаження.',
        image1: pj1,
        description2: ' Присідання: 2 сети по 10 повторень',
        description21: ' Присідання - це відмінна вправа для роботи над нижньою частиною тіла, включаючи бедра, сідниці і квадрицепси. Пам’ятайте про правильну техніку: тримайте спину прямо, коліна не виходять за лінію носків.',
        image2: pj2,
        description3: ' Вправи на грудні м`язи: 2 сети по 10 повторень',
        description31: ' Це можуть бути жими лежачи або віджимання. Обидві вправи допомагають розробити грудні м’язи.',
        image3: pj3,
        description4: ' Вправи на спину: 2 сети по 10 повторень',
        description41: ' Тяга гирі в наклоні або тяга блоку до грудей допоможуть вам розробити широкий і сильний спинний м’яз.',
        image4: pj4,
        description5: ' Вправи на біцепс: 2 сети по 10 повторень',
        description51: ' Згинання рук з гантелями або штангою допоможуть вам розробити біцепси.',
        image5: pj5,
        description6: ' Вправи на трицепс: 2 сети по 10 повторень',
        description61: ' Французький жим або віджимання від паралелей допоможуть вам розробити трицепси.',
        image6: pj6,
        description7: ' Кардіо: 5 хвилин на еліптичному тренажері',
        description71: ' Це відмінний спосіб завершити тренування, допомагаючи вам спалити додаткові калорії і охолодити м’язи.',
        image7: pj7,
        image: j1,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для залу',
          intensityLevel: 'Низька'
        }
        // інші деталі...
    },
    'intermediate-office': {
        title: 'INTERMEDIATE',
        description1: ' Кардіо: 15 хвилин на біговій доріжці',
        description11: ' Це відмінний спосіб розігріти ваше тіло перед тренуванням. Ви можете використовувати комфортне темпо, щоб підготувати своє серце і м’язи до подальшого навантаження.',
        image1: pj1,
        description2: ' Присідання: 3 сети по 15 повторень',
        description21: ' Присідання - це відмінна вправа для роботи над нижньою частиною тіла, включаючи бедра, сідниці і квадрицепси. Пам’ятайте про правильну техніку: тримайте спину прямо, коліна не виходять за лінію носків.',
        image2: pj2,
        description3: ' Вправи на грудні м`язи: 3 сети по 15 повторень',
        description31: ' Це можуть бути жими лежачи або віджимання. Обидві вправи допомагають розробити грудні м’язи.',
        image3: pj3,
        description4: ' Вправи на спину: 3 сети по 15 повторень',
        description41: ' Тяга гирі в наклоні або тяга блоку до грудей допоможуть вам розробити широкий і сильний спинний м’яз.',
        image4: pj4,
        description5: ' Вправи на біцепс: 3 сети по 15 повторень',
        description51: ' Згинання рук з гантелями або штангою допоможуть вам розробити біцепси.',
        image5: pj5,
        description6: ' Вправи на трицепс: 3 сети по 15 повторень',
        description61: ' Французький жим або віджимання від паралелей допоможуть вам розробити трицепси.',
        image6: pj6,
        description7: ' Кардіо: 10 хвилин на еліптичному тренажері',
        description71: ' Це відмінний спосіб завершити тренування, допомагаючи вам спалити додаткові калорії і охолодити м’язи.',
        image7: pj7,
        image: j2,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для залу',
          intensityLevel: 'Середня'
        }
        // інші деталі...
    },
    'advanced-office': {
        title: 'ADVANCED',
        description0: 'Високий рівень (Advanced): Цей рівень призначений для тих, хто вже давно займається фітнесом і готовий до високих навантажень. Ви можете додавати ще більше ваги до своїх вправ, виконувати вправи з високою інтенсивністю або використовувати складніші варіації вправ. Пам’ятайте, що важливо зберігати правильну техніку виконання, незалежно від того, наскільки високим є ваш рівень.',
        description1: ' Кардіо: 20 хвилин на біговій доріжці',
        description11: ' Це відмінний спосіб розігріти ваше тіло перед тренуванням. Ви можете використовувати комфортне темпо, щоб підготувати своє серце і м’язи до подальшого навантаження.',
        image1: pj1,
        description2: ' Присідання: 4 сети по 20 повторень',
        description21: ' Присідання - це відмінна вправа для роботи над нижньою частиною тіла, включаючи бедра, сідниці і квадрицепси. Пам’ятайте про правильну техніку: тримайте спину прямо, коліна не виходять за лінію носків.',
        image2: pj2,
        description3: ' Вправи на грудні м`язи: 4 сети по 20 повторень',
        description31: ' Це можуть бути жими лежачи або віджимання. Обидві вправи допомагають розробити грудні м’язи.',
        image3: pj3,
        description4: ' Вправи на спину: 4 сети по 20 повторень',
        description41: ' Тяга гирі в наклоні або тяга блоку до грудей допоможуть вам розробити широкий і сильний спинний м’яз.',
        image4: pj4,
        description5: ' Вправи на біцепс: 4 сети по 20 повторень',
        description51: ' Згинання рук з гантелями або штангою допоможуть вам розробити біцепси.',
        image5: pj5,
        description6: ' Вправи на трицепс: 4 сети по 20 повторень',
        description61: ' Французький жим або віджимання від паралелей допоможуть вам розробити трицепси.',
        image6: pj6,
        description7: ' Кардіо: 15 хвилин на еліптичному тренажері',
        description71: ' Це відмінний спосіб завершити тренування, допомагаючи вам спалити додаткові калорії і охолодити м’язи.',
        image7: pj7,
        image: j3,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для залу',
          intensityLevel: 'Висока'
        }
        // інші деталі...
    },
    'beginner-court': {
        title: 'BEGINNER',
        description0: 'Початковий рівень (Beginner): Цей рівень призначений для тих, хто тільки починає свій шлях у фітнесі. Головна мета - навчитися правильно виконувати основні вправи і підготувати тіло до більш високих навантажень. Не намагайтеся виконувати вправи з великою вагою або великою швидкістю - краще зосередьтеся на техніці виконання.',
        description1: ' Кардіо: 10 хвилин бігу навколо майданчику.',
        description11: ' Кардіо: Почніть з легкого бігу на місці або швидкої ходьби. Це допоможе вам підготувати м’язи до подальшого навантаження.',
        image1: pc1,
        description2: ' Присідання: 2 сети по 10 повторень.',
        description21: ' Присідання: Під час виконання присідань слідкуйте за тим, щоб коліна не виходили за лінію носків. Якщо важко виконувати повні присідання, спробуйте півприсідання.',
        image2: pc2,
        description3: ' Віджимання від землі: 2 сети по 5 повторень.',
        description31: ' Віджимання від землі: Якщо важко виконувати повні віджимання, спробуйте віджимання від колін або від стіни.',
        image3: pc3,
        description4: ' Підтягування на турніку: 2 сети по 3 повторення.',
        description41: ' Підтягування на турніку: Якщо важко виконувати повні підтягування, спробуйте “австралійські” підтягування.',
        image4: pc4,
        description5: ' Зворотні віджимання від лавки: 2 сети по 5 повторень.',
        description51: ' Віджимання від лавки: Ця вправа виконується так само, як і звичайні віджимання, але ви тримаєте руки за спиною на лавці. Якщо це занадто важко, ви можете спробувати віджимання від стіни.',
        image5: pc5,
        description6: ' Вправи на прес: 2 сети по 10 повторень.',
        description61: ' Вправи на прес: Ви можете виконати будь-які вправи на прес, які вам подобаються, наприклад, “ножиці”, “велосипед” або піднімання ніг лежачи на спині.',
        image6: pc6,
        description7: ' Кардіо: 5 хвилин бігу на місці.',
        description71: ' Кардіо: Завершіть тренування ще 5 хвилинами бігу на місці або пробіжки.',
        image7: pc7,
        image: c1,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для майданчика',
          intensityLevel: 'Низька'
        }
        // інші деталі...
    },
    'intermediate-court': {
        title: 'INTERMEDIATE',
        description0: 'Середній рівень (Intermediate): На цьому рівні ви вже знайомі з основними вправами і готові додати більше інтенсивності до своїх тренувань. Ви можете почати додавати вагу до своїх вправ або збільшувати кількість повторень. Головне - слухати своє тіло і не перевантажувати себе.',
        description1: ' Кардіо: 15 хвилин бігу навколо майданчику.',
        description11: ' Кардіо: Почніть з 15 хвилин бігу на місці або пробіжки. Це допоможе підготувати ваше тіло до високих навантажень.',
        image1: pc1,
        description2: ' Присідання: 3 сети по 15 повторень.',
        description21: ' Присідання: Спробуйте додати вагу для присідань, наприклад, використовуйте гирю або воду в пляшці. Це допоможе зміцнити ваші ноги і ягодиці.',
        image2: pc2,
        description3: ' Віджимання від землі: 3 сети по 10 повторень.',
        description31: ' Віджимання від землі: Для додаткового навантаження ви можете виконати віджимання на одній руці або з високої позиції. Це допоможе зміцнити ваші грудні м’язи і трицепс.',
        image3: pc3,
        description4: ' Підтягування на турніку: 3 сети по 5 повторень.',
        description41: ' Підтягування на турніку: Спробуйте виконати підтягування зі звуженим хватом для більшого навантаження на біцепс. Це допоможе зміцнити ваші спинні м’язи і біцепс.',
        image4: pc4,
        description5: ' Зворотні віджимання від лавки: 3 сети по 10 повторень.',
        description51: ' Віджимання від лавки: Для більшого навантаження ви можете виконати віджимання від лавки з використанням ваги. Це допоможе зміцнити ваші трицепс і грудні м’язи.',
        image5: pc5,
        description6: ' Вправи на прес: 3 сети по 15 повторень.',
        description61: ' Вправи на прес: Додайте вагу до ваших вправ на прес, наприклад, виконуйте піднімання ніг з медицинською м’ячем між ногами. Це допоможе зміцнити ваші прес-м’язи.',
        image6: pc6,
        description7: ' Кардіо: 10 хвилин бігу на місці.',
        description71: ' Кардіо: Завершіть тренування 10 хвилинами бігу на місці або пробіжки. Це допоможе підтримувати вашу серцево-судинну систему в тонусі.',
        image7: pc7,
        image: c2,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для майданчика',
          intensityLevel: 'Середня'
        }
        // інші деталі...
    },
    'advanced-court': {
        title: 'ADVANCED',
        description0: 'Високий рівень (Advanced): Цей рівень призначений для тих, хто вже давно займається фітнесом і готовий до високих навантажень. Ви можете додавати ще більше ваги до своїх вправ, виконувати вправи з високою інтенсивністю або використовувати складніші варіації вправ. Пам’ятайте, що важливо зберігати правильну техніку виконання, незалежно від того, наскільки високим є ваш рівень.',
        description1: ' Кардіо: 20 хвилин бігу навколо майданчику.',
        description11: ' Кардіо: Почніть з 20 хвилин інтенсивного бігу на місці або пробіжки. Це допоможе підготувати ваше тіло до високих навантажень.',
        image1: pc1,
        description2: ' Присідання: 4 сети по 20 повторень.',
        description21: ' Присідання: Додайте ще більше ваги до ваших присідань або спробуйте виконати присідання на одній нозі. Це допоможе зміцнити ваші ноги і ягодиці.',
        image2: pc2,
        description3: ' Віджимання від землі: 4 сети по 15 повторень.',
        description31: ' Віджимання від землі: Спробуйте виконати віджимання на двох пальцях або віджимання зі стрибком. Це допоможе зміцнити ваші грудні м’язи і трицепс.',
        image3: pc3,
        description4: ' Підтягування на турніку: 4 сети по 10 повторень.',
        description41: ' Підтягування на турніку: Спробуйте виконати підтягування з додатковою вагою. Це допоможе зміцнити ваші спинні м’язи і біцепс.',
        image4: pc4,
        description5: ' Зворотні віджимання від лавки: 4 сети по 15 повторень.',
        description51: ' Віджимання від лавки: Спробуйте виконати віджимання від лавки з додатковою вагою. Це допоможе зміцнити ваші трицепс і грудні м’язи.',
        image5: pc5,
        description6: ' Вправи на прес: 4 сети по 20 повторень.',
        description61: ' Вправи на прес: Виконуйте складні вправи на прес, такі як піднімання ніг у висі на турніку. Це допоможе зміцнити ваші прес-м’язи.',
        image6: pc6,
        description7: ' Кардіо: 15 хвилин бігу на місці.',
        description71: ' Кардіо: Завершіть тренування 15-20 хвилинами інтенсивного бігу на місці або пробіжки. Це допоможе підтримувати вашу серцево-судинну систему в тонусі.',
        image7: pc7,
        image: c3,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Для майданчика',
          intensityLevel: 'Висока'
        }
        // інші деталі...
    },
    'beginner-home': {
        title: 'BEGINNER',
        description0: 'Початковий рівень (Beginner): Цей рівень призначений для тих, хто тільки починає свій шлях у фітнесі. Головна мета - навчитися правильно виконувати основні вправи і підготувати тіло до більш високих навантажень. Не намагайтеся виконувати вправи з великою вагою або великою швидкістю - краще зосередьтеся на техніці виконання.',
        description1: ' Кардіо: 5 хвилин прогулянки на місці.',
        description11: ' Прогулянка на місці: Станьте прямо, поставте ноги на ширину плечей. Почніть ходити на місці, активно рухаючи руками. Ця вправа допомагає розігріти м’язи і підготувати тіло до тренування.',
        image1: ph1,
        description2: ' Присідання: 1 сет по 10 повторень.',
        description21: ' Присідання: Станьте прямо, поставте ноги на ширину плечей. Почніть присідати, ніби сідаєте на стілець, тримаючи спину прямо. Ваші коліна повинні бути над п’ятками. Присідання допомагають розробити м’язи ніг і сідниць.',
        image2: ph2,
        description3: ' Віджимання від стіни: 1 сет по 10 повторень.',
        description31: ' Віджимання від стіни: Станьте перед стіною на відстані витягнутої руки. Покладіть долоні на стіну, тримаючи руки на ширині плечей. Почніть віджиматися від стіни, згинаючи руки в ліктях. Віджимання від стіни допомагають розробити грудні м’язи.',
        image3: ph3,
        description4: ' Вправи на спину: 1 сет по 10 повторень “Superman” вправи.',
        description41: ' “Superman” вправа: Лягте на живіт, витягніть руки вперед. Піднімайте руки і ноги вгору, ніби ви літаєте, як Супермен. Ця вправа допомагає розробити м’язи спини.',
        image4: ph4,
        description5: ' Вправи на біцепс: 1 сет по 10 повторень згинання рук з водяними пляшками.',
        description51: ' Згинання рук з водяними пляшками: Станьте прямо, тримайте в руках водяні пляшки. Почніть згинати руки в ліктях, піднімаючи пляшки до плечей. Ця вправа допомагає розробити біцепси.',
        image5: ph5,
        description6: ' Вправи на трицепс: 1 сет по 10 повторень віджимань від стіни.',
        description61: ' Віджимання від стіни (для трицепса): Станьте перед стіною на відстані витягнутої руки. Покладіть долоні на стіну, тримаючи руки вузько. Почніть віджиматися від стіни, згинаючи руки в ліктях. Ця вправа допомагає розробити трицепси.',
        image6: ph6,
        description7: ' Кардіо: 5 хвилин прогулянки на місці.',
        description71: ' Пробіжка на місці: Станьте прямо, почніть бігти на місці, активно рухаючи руками. Ця вправа допомагає підвищити частоту серцевих скорочень і спалити калорії.',
        image7: ph7,
        image: h1,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Вдома',
          intensityLevel: 'Низька'
        }
        // інші деталі...
    },
    'intermediate-home': {
        title: 'INTERMEDIATE',
        description0: 'Середній рівень (Intermediate): На цьому рівні ви вже знайомі з основними вправами і готові додати більше інтенсивності до своїх тренувань. Ви можете почати додавати вагу до своїх вправ або збільшувати кількість повторень. Головне - слухати своє тіло і не перевантажувати себе.',
        description1: ' Кардіо: 10 хвилин пробіжки на місці.',
        description11: ' Прогулянка на місці: Станьте прямо, поставте ноги на ширину плечей. Почніть ходити на місці, активно рухаючи руками. Ця вправа допомагає розігріти м’язи і підготувати тіло до тренування.',
        image1: ph1,
        description2: ' Присідання: 2 сети по 15 повторень.',
        description21: ' Присідання: Станьте прямо, поставте ноги на ширину плечей. Почніть присідати, ніби сідаєте на стілець, тримаючи спину прямо. Ваші коліна повинні бути над п’ятками. Присідання допомагають розробити м’язи ніг і сідниць.',
        image2: ph2,
        description3: ' Віджимання: 2 сети по 10 повторень.',
        description31: ' Віджимання від стіни: Станьте перед стіною на відстані витягнутої руки. Покладіть долоні на стіну, тримаючи руки на ширині плечей. Почніть віджиматися від стіни, згинаючи руки в ліктях. Віджимання від стіни допомагають розробити грудні м’язи.',
        image3: ph3,
        description4: ' Вправи на спину: 2 сети по 10 повторень “Superman” вправи.',
        description41: ' “Superman” вправа: Лягте на живіт, витягніть руки вперед. Піднімайте руки і ноги вгору, ніби ви літаєте, як Супермен. Ця вправа допомагає розробити м’язи спини.',
        image4: ph4,
        description5: ' Вправи на біцепс: 2 сети по 10 повторень згинання рук з водяними пляшками.',
        description51: ' Згинання рук з водяними пляшками: Станьте прямо, тримайте в руках водяні пляшки. Почніть згинати руки в ліктях, піднімаючи пляшки до плечей. Ця вправа допомагає розробити біцепси.',
        image5: ph5,
        description6: ' Вправи на трицепс: 2 сети по 10 повторень віджимань від стіни.',
        description61: ' Віджимання від стіни (для трицепса): Станьте перед стіною на відстані витягнутої руки. Покладіть долоні на стіну, тримаючи руки вузько. Почніть віджиматися від стіни, згинаючи руки в ліктях. Ця вправа допомагає розробити трицепси.',
        image6: ph6,
        description7: ' Кардіо: 10 хвилин пробіжки на місці.',
        description71: ' Пробіжка на місці: Станьте прямо, почніть бігти на місці, активно рухаючи руками. Ця вправа допомагає підвищити частоту серцевих скорочень і спалити калорії.',
        image7: ph7,
        image: h2,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Вдома',
          intensityLevel: 'Середня'
        }
        // інші деталі...
    },
    'advanced-home': {
        description0: 'Високий рівень (Advanced): Цей рівень призначений для тих, хто вже давно займається фітнесом і готовий до високих навантажень. Ви можете додавати ще більше ваги до своїх вправ, виконувати вправи з високою інтенсивністю або використовувати складніші варіації вправ. Пам’ятайте, що важливо зберігати правильну техніку виконання, незалежно від того, наскільки високим є ваш рівень.',
        title: 'ADVANCED',
        description1: ' Кардіо: 15 хвилин пробіжки на місці з високим темпом.',
        description11: ' Прогулянка на місці: Станьте прямо, поставте ноги на ширину плечей. Почніть ходити на місці, активно рухаючи руками. Ця вправа допомагає розігріти м’язи і підготувати тіло до тренування.',
        image1: ph1,
        description2: ' Присідання: 3 сети по 20 повторень.',
        description21: ' Присідання: Станьте прямо, поставте ноги на ширину плечей. Почніть присідати, ніби сідаєте на стілець, тримаючи спину прямо. Ваші коліна повинні бути над п’ятками. Присідання допомагають розробити м’язи ніг і сідниць.',
        image2: ph2,
        description3: ' Віджимання: 3 сети по 15 повторень.',
        description31: ' Віджимання від стіни: Станьте перед стіною на відстані витягнутої руки. Покладіть долоні на стіну, тримаючи руки на ширині плечей. Почніть віджиматися від стіни, згинаючи руки в ліктях. Віджимання від стіни допомагають розробити грудні м’язи.',
        image3: ph3,
        description4: ' Вправи на спину: 3 сети по 15 повторень “Superman” вправи.',
        description41: ' “Superman” вправа: Лягте на живіт, витягніть руки вперед. Піднімайте руки і ноги вгору, ніби ви літаєте, як Супермен. Ця вправа допомагає розробити м’язи спини.',
        image4: ph4,
        description5: ' Вправи на біцепс: 3 сети по 15 повторень згинання рук з водяними пляшками.',
        description51: ' Згинання рук з водяними пляшками: Станьте прямо, тримайте в руках водяні пляшки. Почніть згинати руки в ліктях, піднімаючи пляшки до плечей. Ця вправа допомагає розробити біцепси.',
        image5: ph5,
        description6: ' Вправи на трицепс: 3 сети по 15 повторень віджимань від стіни.',
        description61: ' Віджимання від стіни (для трицепса): Станьте перед стіною на відстані витягнутої руки. Покладіть долоні на стіну, тримаючи руки вузько. Почніть віджиматися від стіни, згинаючи руки в ліктях. Ця вправа допомагає розробити трицепси.',
        image6: ph6,
        description7: ' Кардіо: 15 хвилин пробіжки на місці з високим темпом.',
        description71: ' Пробіжка на місці: Станьте прямо, почніть бігти на місці, активно рухаючи руками. Ця вправа допомагає підвищити частоту серцевих скорочень і спалити калорії.',
        image7: ph7,
        image: h3,
        trainer: {
          name: 'Кругляк Артем',
          location: 'Вдома',
          intensityLevel: 'Висока'
        }
        // інші деталі...
    },

  };
  
  const details = data[id];

  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();


  return ( 
    <>
    <HeaderOffice/>
    <div className='office'>
        <div className="container_office">
        <ModalContext.Provider value={setModalVisible}>
            <HeaderOffice />
            {modalVisible && (
                <div className="modal" onClick={() => setModalVisible(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="dark-container">
                            <button className="modal-button" onClick={() => navigate(PERSONINFORMATION_ROUTE)}>ОСОБИСТА ІНФОРМАЦІЯ</button>
                            <button className="modal-button" onClick={() => navigate(SUBSCRIPTIONS_ROUTE)}>МОЯ ПІДПИСКА</button>
                            <button className="modal-button" onClick={() => {logout(); navigate(HOME_ROUTE);}}>ВИХІД</button>
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>

            <div className="half_office">
                <div className="details-container-t">
                    <div className='head_title'>
                        <h1 className='h1_details_title'>{details.title}</h1>
                        <GiMuscleUp alt="Логотип" className="logo"/>
                    </div>
                    <div className="header_details">
                        <div className='img_trainer_t'>
                            <img src={artem} alt={details.trainer.name} className='img_trainer_logo' />
                            <span>{details.trainer.name}</span>
                        </div>
                        <div className='location_t'>
                            <span>{details.trainer.location}</span>
                        </div>
                        <div className="trainer-info">
                            <div className='icon_Trending'><IoTrendingUpOutline/></div>
                            <span>Інтенсивність <p className='bold_t'>{details.trainer.intensityLevel}</p></span>
                        </div>
                    </div>
                    
                    <div className='content_detail'>
                        <img src={details.image} alt={details.title} className='img_detailspage'/>
                        {/* Відобразити інші деталі... */}
                        <div className='t_trains_first'>{details.description0}</div>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description1}</div>
                        <div className='t_trains_1'>{details.description11}</div>
                        <img src={details.image1} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description2}</div>
                        <div className='t_trains_1'>{details.description21}</div>
                        <img src={details.image2} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description3}</div>
                        <div className='t_trains_1'>{details.description31}</div>
                        <img src={details.image3} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description4}</div>
                        <div className='t_trains_1'>{details.description41}</div>
                        <img src={details.image4} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description5}</div>
                        <div className='t_trains_1'>{details.description51}</div>
                        <img src={details.image5} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description6}</div>
                        <div className='t_trains_1'>{details.description61}</div>
                        <img src={details.image6} alt={details.title} className='img_detail_photo'/>
                        <div className='t_trains'><p className='mark'><CiBookmark /></p>{details.description7}</div>
                        <div className='t_trains_1'>{details.description71}</div>
                        <img src={details.image7} alt={details.title} className='img_detail_photo'/>
                    </div>
                </div>
            
            </div>
            <div className="half_office">
                
                <div className="navigation-panel">
                    <ul className="nav-links">
                        <li>
                            <NavLink to={OFFICE_ROUTE} className='l_registration'>
                            <div className='nav_btn'>
                                <FaDumbbell />
                                <div className='text_btn_nav'>ПРОГРАМИ ТРЕНУВАНЬ</div>
                            </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={FOOD_ROUTE} className='l_registration'>
                            <div className='nav_btn'>
                                <PiForkKnifeBold />
                                <div className='text_btn_nav'>ХАРЧУВАННЯ</div>
                            </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={PROGRESS_ROUTE} className='l_registration'>
                            <div className='nav_btn'>
                                <GiProgression />
                                <div className='text_btn_nav'>ПРОГРЕС</div>
                            </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <FooterOffice/>
    </>
 );

};

export default DetailsPage;