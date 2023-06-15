import { Box, Text } from 'native-base';

export const Header = () => {
  return (
    <Box
      height={'16'}
      backgroundColor={'violet.500'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Text color={'white'} fontSize={'2xl'} bold>
        todo
      </Text>
    </Box>
  );
};
