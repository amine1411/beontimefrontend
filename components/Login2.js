import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import { Image } from '@chakra-ui/react';
import {
  Button,
  Flex,
  Heading,
  Input,
  Center,
} from '@chakra-ui/react';

function Login2() {
  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // Redirect to /home if logged in
  const router = useRouter();

  // Méthodes
  const handleSubmit = () => {
    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.result &&
          dispatch(
            login({
              token: data.token,
              username: username,
            })
          );
        if (user.token) {
          // console.log('test');
          router.push('/dashboard2');
        }
      });
  };

  return (
    <Flex min-width='100vw' min-height='100vh'>
      <Center>
        <Image
          src='/bg.jpeg'
          width='100vw'
          height='100vh'
          display='flex'
          // layout='cover'
          position='absolute'
        ></Image>

        <Flex
          height='100vh'
          width='100vw'
          alignItems='center'
          justifyContent='center'
        >
          <Flex direction='column' p={14} rounded={6}>
            <Center>
              <Heading
                bgGradient='linear(to-r, blue.700, blue.500, blue.700)'
                bgClip='text'
                position='absolute'
              >
                Connectez-vous à Watodo pour commencer votre journée
              </Heading>
            </Center>
            <Flex flexDirection='column'>
              <Input
                placeholder='Username'
                _placeholder={{ opacity: 1, color: 'blue.600' }}
                variant='filled'
                mt={40}
                mb={6}
                type='email'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <Input
                placeholder='Password'
                _placeholder={{ opacity: 1, color: 'blue.600' }}
                variant='filled'
                mb={14}
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Button
                mb={6}
                size='lg'
                colorScheme='telegram'
                onClick={() => handleSubmit()}
                mt={-2}
                _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                }}
              >
                Se connecter
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
}

export default Login2;
