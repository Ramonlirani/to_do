import {
  Input,
  IconButton,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  useToast,
  Modal,
  FormControl,
  Button,
} from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { ModalInputs } from '../Modal/ModalInputs';

export const InputList = () => {
  const toast = useToast();
  const [list, setList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [idTaskEdit, setIdTaskEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTaskEdit, setSelectedTaskEdit] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editInputValue, setEditInputValue] = useState('');

  const openModalEdit = (item, itemId) => {
    setSelectedTaskEdit(item);
    setIdTaskEdit(itemId);
    setOpenEdit(true);
  };

  const openModal = (item) => {
    setSelectedTask(item);
    setOpen(true);
  };

  const listTask = () => {
    axios
      .get('http://192.168.1.17:4000/tasks')
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listTask();
  }, []);

  const handleAddTask = (newTask) => {
    axios
      .post('http://192.168.1.17:4000/newTask', newTask) // Pass the newTask object directly
      .then((resp) => {
        console.log(resp.data);
        setList([...list, resp.data]);
        listTask();
        toast.show({
          render: () => {
            return (
              <Box bg="green.500" px="2" py="1" rounded="sm" mb={5}>
                <HStack spacing={2} alignItems="center">
                  <Icon as={Entypo} name="check" size={4} color="white" mr={2} />
                  <Text color="white">Tarefa inserida com sucesso!</Text>
                </HStack>
              </Box>
            );
          },
        });
      })
      .catch((error) => {
        console.error('catch', error);
      });
  };

  const handleEditTask = (itemId, newDescription) => {
    axios
      .put(`http://192.168.1.17:4000/updateTask/task/${itemId}`, {
        descriptionTask: newDescription,
      })
      .then((res) => {
        setList((prevList) => {
          const updatedList = prevList.map((item) => {
            if (item.id === itemId) {
              return { ...item, descriptionTask: newDescription };
            }
            return item;
          });
          return updatedList;
        });
        listTask();
        setEditInputValue('');
        toast.show({
          render: () => {
            return (
              <Box bg="violet.500" px="2" py="1" rounded="sm" mb={5}>
                <HStack spacing={2} alignItems="center">
                  <Icon as={Entypo} name="edit" size={4} color="white" mr={2} />
                  <Text color="white">Tarefa atualizada com sucesso!</Text>
                </HStack>
              </Box>
            );
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteTask = (itemId) => {
    axios
      .delete(`http://192.168.1.17:4000/deleteTask/task/${itemId}`)
      .then((res) => {
        setList(list.filter((item) => item.id !== itemId));
        toast.show({
          render: () => {
            return (
              <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
                <HStack spacing={2} alignItems="center">
                  <Icon as={Entypo} name="trash" size={4} color="white" mr={2} />
                  <Text color="white">Tarefa excluída com sucesso!</Text>
                </HStack>
              </Box>
            );
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Center w="100%">
      <Box maxW="300" w="100%">
        <VStack space={4} mt={2} alignItems={'center'}>
          <HStack>
            <ModalInputs onAddTask={handleAddTask} />
          </HStack>
          <VStack space={2}>
            {list.map((item, itemId) => (
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={item.id}
                borderWidth={1}
                borderColor={'gray.300'}
              >
                <Text
                  width="100%"
                  flexShrink={1}
                  textAlign="left"
                  bold
                  mx="2"
                  onPress={() => openModal(item)}
                >
                  {itemId + 1} - {item.task[0].toUpperCase() + item.task.substr(1)}
                </Text>
                <IconButton
                  size="sm"
                  colorScheme="trueGray"
                  icon={<Icon as={Entypo} name="edit" size="md" color="violet.500" />}
                  onPress={() => openModalEdit(item)}
                />
                <IconButton
                  size="sm"
                  colorScheme="trueGray"
                  icon={<Icon as={Entypo} name="trash" size="md" color="danger.500" />}
                  onPress={() => handleDeleteTask(item.id)}
                />
              </HStack>
            ))}
          </VStack>
          {/* Modal view */}
          <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
            <Modal.Content maxWidth="350">
              <Modal.CloseButton />
              <Modal.Header>Sua tarefa</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>Tarefa</FormControl.Label>
                  <Text>{selectedTask?.task}</Text>
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>Descrição</FormControl.Label>
                  <Text>{selectedTask?.descriptionTask}</Text>
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>Responsável</FormControl.Label>
                  <Text>{selectedTask?.responsible}</Text>
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onPress={() => {
                    setOpen(false);
                  }}
                  colorScheme={'violet'}
                >
                  Ok
                </Button>
              </Modal.Footer>
            </Modal.Content>
            {/* Modal Edit */}
          </Modal>
          <Modal isOpen={openEdit} onClose={() => setOpenEdit(false)} safeAreaTop={true}>
            <Modal.Content maxWidth="350">
              <Modal.CloseButton />
              <Modal.Header>Sua tarefa</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>Tarefa</FormControl.Label>
                  <Text>{selectedTaskEdit?.task}</Text>
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>Descrição</FormControl.Label>
                  <Input
                    placeholder={selectedTaskEdit?.descriptionTask}
                    value={editInputValue}
                    onChangeText={(text) => setEditInputValue(text)}
                  />
                </FormControl>
                <FormControl mt="3">
                  <FormControl.Label>Responsável</FormControl.Label>
                  <Text>{selectedTaskEdit?.responsible}</Text>
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onPress={() => {
                    handleEditTask(selectedTaskEdit.id, editInputValue);
                    setOpenEdit(false);
                  }}
                  colorScheme={'violet'}
                >
                  Ok
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </VStack>
      </Box>
    </Center>
  );
};
