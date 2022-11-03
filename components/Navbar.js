import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import React, { useState } from 'react';
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUsers,
  FiBookOpen,
} from 'react-icons/fi';
import NavItem from '../components/NavItem';

const Navbar = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

    const handleLogout = () => {
      dispatch(logout());
      console.log("LogoutDone")
    };

  // Redirect to /login if not logged in
  const router = useRouter();

  if (!user.token) {
  router.push('/');
  }

  const [navSize, changeNavSize] = useState('large');

  return (
    <Flex
      pos='sticky'
      left='5'
      bg='#133559'
      color='white'
      paddingTop='2.5vh'
      paddingBottom='2.5vh'
      w={navSize == 'small' ? '75px' : '250px'}
      flexDir='column'
      justifyContent='space-between'
    >
      <Flex
        p='5%'
        flexDir='column'
        w='100%'
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        as='nav'
      >
        <IconButton
          background='none'
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == 'small') changeNavSize('large');
            else changeNavSize('small');
          }}
        />

        <Link href='/dashboard2'>
          <NavItem
            navSize={navSize}
            icon={FiHome}
            title='Tableau de bord'
          ></NavItem>
        </Link>
        <Link href='/majournee2'>
          <NavItem
            navSize={navSize}
            icon={FiCalendar}
            title='Ma journée'
          ></NavItem>
        </Link>
        <Link href='/mesmissions2'>
          <NavItem
            navSize={navSize}
            icon={FiBookOpen}
            title='Gérer les missions'
          ></NavItem>
        </Link>
        <Link href='/mesclients2'>
          <NavItem
            navSize={navSize}
            icon={FiUsers}
            title='Mes clients'
          ></NavItem>
        </Link>
        <Link href='/mescollab2'>
          <NavItem
            navSize={navSize}
            icon={FiUsers}
            title='Mes collaborateurs'
          ></NavItem>
        </Link>
      </Flex>

      <Flex
        p='5%'
        flexDir='column'
        w='100%'
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize == 'small' ? 'none' : 'flex'} />
        <Flex mt={4} align='center' fontSize='lg'>
          <Avatar size='sm' src={user.picture} />
          <Flex
            flexDir='column'
            ml={4}
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <button onClick={() => handleLogout()}>
              Se déconnecter
            </button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
