// import { Cafe } from '../models/cafe/types';
// import { LogOrder } from '../models/order/types';

// export const optimization = (cafe: Cafe, order: LogOrder) => {
//   return '11211';
// };

// export const findOptimalCombo = (cafe: Cafe) => {
//   const result = [];

//   const { menu } = cafe;

//   // for (let i = 0; i < menu.length; i++) {
//   //   const element = menu[i];
//   //   for
//   // }

//   return JSON.stringify(result, null, 2);
// };

// const opt = {
//   idPoll: 5440775982577354000,
//   users: [
//     {
//       name: 'Никита Строганов',
//       username: 'findoss',
//       options: ['salad'],
//     },
//     {
//       name: 'XXXASA',
//       username: 'awwwwww',
//       options: ['sup'],
//     },
//   ],
//   optimaze: [
//     // 130 + 130 = 260 - 250 = 10 / 2 = 5
//     {
//       users: [
//         {
//           name: 'Никита Строганов',
//           username: 'findoss',
//           combo: ['sup'],
//           price: 130,
//           discount: 5,
//           sum: 125,
//         },
//         {
//           name: 'XXXASA',
//           username: 'awwwwww',
//           combo: ['salad'],
//           price: 130,
//           discount: 5,
//           sum: 125,
//         },
//       ],
//       //         1         2
//       combo: [['sup'], ['salad']],
//       sum: 250,
//     },
//     // 130 + 200 = 330 - 280 = 50 / 2 = 25
//     {
//       users: [
//         {
//           name: 'Вася',
//           username: 'vasa',
//           combo: ['dish'],
//           price: 200,
//           discount: 25,
//           sum: 175,
//         },
//         {
//           name: 'Алена',
//           username: 'alena',
//           combo: ['sup'],
//           price: 130,
//           discount: 25,
//           sum: 105,
//         },
//       ],
//       //         1         2
//       combo: [['sup'], ['dish']],
//       sum: 280,
//     },
//     // 250 + 200 = 450 - 350 = 100 / 2 = 50
//     {
//       users: [
//         {
//           name: 'Вася',
//           username: 'vasa',
//           combo: ['salad', 'sup'],
//           price: 250,
//           discount: 50,
//           sum: 200,
//         },
//         {
//           name: 'Алена',
//           username: 'alena',
//           combo: ['dish'],
//           price: 200,
//           discount: 50,
//           sum: 200,
//         },
//       ],
//       //          1---------1        2
//       combo: [['salad'], ['sup'], ['dish']],
//       sum: 350,
//     },
//     // 280 + 130 = 410 - 350 = 60 / 2 = 30
//     {
//       users: [
//         {
//           name: 'Омар',
//           username: 'ooo',
//           combo: ['dish', 'sup'],
//           price: 280,
//           discount: 30,
//           sum: 250,
//         },
//         {
//           name: 'Максим',
//           username: 'mmmm',
//           combo: ['salad'],
//           price: 130,
//           discount: 30,
//           sum: 100,
//         },
//       ],
//       //          1         2---------2
//       combo: [['salad'], ['sup'], ['dish']],
//       sum: 350,
//     },
//     // 130 + 130 + 200 = 460 - 350 = 110 / 3 = 35
//     {
//       users: [
//         {
//           name: 'Фиона',
//           username: 'fff',
//           combo: ['sup'],
//           price: 130,
//           discount: 35,
//           sum: 95,
//         },
//         {
//           name: 'Игорь',
//           username: 'iii',
//           combo: ['salad'],
//           price: 130,
//           discount: 35,
//           sum: 95,
//         },
//         {
//           name: 'Юра',
//           username: 'yyy',
//           combo: ['dish'],
//           price: 200,
//           discount: 35,
//           sum: 165,
//         },
//       ],
//       //          1         2         3
//       combo: [['salad'], ['sup'], ['dish']],
//       sum: 350,
//     },
//   ],
//   date: 1659887655494,
// };

// // найти комбо
// // перенести в оптимизацию
// // перенести остатки
// // переписать вывод под оптимизацию
