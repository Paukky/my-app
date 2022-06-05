import "@fontsource/manrope/800.css";
import React,{useEffect,useState} from 'react';
import Divider from './images/pattern-divider-desktop.svg'
import Dice from './images/icon-dice.svg'
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  extendTheme,
  Center,
  Heading,
  Text,
  Image,
  Circle
} from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
})

const App = () => {
  const [advice, setAdvice] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios.get('https://api.adviceslip.com/advice')
    .then((res) => {
      setId(res.data.slip.id);
      setAdvice(res.data.slip.advice);  
    })
  }, [])
  

  const reroll = (e) => {
    e.stopPropagation()
    axios.get('https://api.adviceslip.com/advice')
    .then((res) => {
      setId(res.data.slip.id);
      setAdvice(res.data.slip.advice);  
    })
  }

  return (
    <ChakraProvider theme={theme}>
        <Center>
          <Box p={5} pb={16} mt={48}borderRadius="lg" bgColor={'gray.600'} boxShadow='dark-lg' width="md" alignItems={'center'} justifyContent={'center'}>
            <Text textAlign='center' pb={3} color='#52ffa8'>#{id}</Text>
            <Heading fontSize={28} textAlign='center'>"{advice}"</Heading>
            <Image src={Divider} mt={10} brightness={'150%'}/>
            <Center>
              <Circle
                mt={32}
                as={'button'}
                position='fixed'
                bgColor='#52ffa8'
                p={3}
                _hover={{
                  boxShadow:"0 0 25px 1px #52ffa8",
                  bgColor: '#52ffa8'
                }}
                onClick={reroll }
              >
                <Image src={Dice}/>
              </Circle>
            </Center>
          </Box>    
                
        </Center>
        <Text fontSize={11} textAlign="center" color="#3e52a3" mt={10}>
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
            Coded by <a href="#">Paul Ly</a>.
        </Text>
    </ChakraProvider>
  );
}

export default App;
