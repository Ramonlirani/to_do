import { Box, Button, HStack, Icon, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const InputHeader = () => {
  return (
    <Box alignItems={'center'} marginTop={3}>
      <HStack>
        <Input placeholder="Digite sua tarefa do dia" w="60%" />
        <Button marginLeft={3}>
          <Icon as={Ionicons} name="add" size={4} color="white" />
        </Button>
      </HStack>
    </Box>
  );
};
