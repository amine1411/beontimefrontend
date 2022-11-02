// // import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { useDispatch, useSelector } from 'react-redux';
// import Link from 'next/link';
// import styles from '../styles/Home.module.css';
// import Image from 'next/image';
// import MesMissions from './MesMissions';
// import ReminderTask from './ReminderTask';
// import InputFilter from './InputFilter';
// import MaJournee from './MaJournee';

// function Home() {
//   console.log(new Date(2019, 4, 25) - new Date(2019, 3, 25));
  // const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.value);

//   // Redirect to /login if not logged in
//   const router = useRouter();

//   // if (!user.token) {
//   //   router.push('/login');
//   // }
//   return (
//     <div className={styles.container}>
//       {/*LeftSection begins */}

//       <div className={styles.leftSection}>
//         <div>
//           <div className={styles.logo}>
//             <Link href='/'>
//               <Image
//                 src='/owl.png'
//                 alt='Logo'
//                 width={100}
//                 height={100}
//                 className={styles.logo}
//               />
//             </Link>
//           </div>
//           <div className={styles.navigateContainer}>
//             <Link href='/home'>
//               <button className={styles.navigationButtonStatic}>
//                 <p className={styles.navigation}>Ma journée</p>
//               </button>
//             </Link>
//             <Link href='/dashboard'>
//               <button className={styles.navigationButton}>
//                 <p className={styles.navigation}>Tableau de bord</p>
//               </button>
//             </Link>

//             <Link href='/clients'>
//               <button className={styles.navigationButton}>
//                 <p className={styles.navigation}>Mes clients</p>
//               </button>
//             </Link>
//             <Link href='/missions'>
//               <button className={styles.navigationButton}>
//                 <p className={styles.navigation}>Mes Missions</p>
//               </button>
//             </Link>
//             <Link href='/collaborateurs'>
//               <button className={styles.navigationButton}>
//                 <p className={styles.navigation}>
//                   Mes Collaborateurs
//                 </p>
//               </button>
//             </Link>
//             <div className={styles.popoverContent}>
//               <Link className={styles.navigation} href='/'>
//                 <button className={styles.navigationButton}>
//                   <p className={styles.navigation}>Logout</p>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/*LeftSection ends */}
//       {/*MidleSection begins */}
//       <div>
//         <div className={styles.midleTopMissions}>
//           <MesMissions />
//         </div>
//         <div className={styles.midleBottomMissions}>
//           <MaJournee />
//         </div>
//       </div>
//       {/*MidleSection ends */}
//       {/*RightSection begins */}
//       <div className={styles.rightSection}>
//         <ReminderTask />
//       </div>
//       {/*RightSection ends */}
//     </div>
//   );
// }

// export default Home;
