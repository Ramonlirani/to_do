//@ts-nocheck
import React from 'react';
import { Button, Modal, FormControl, Input, Text } from 'native-base';
import { useState } from 'react';

export const ModalInputs = ({ onAddTask }) => {
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');

  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };

  const handleSave = () => {
    const newTask = {
      task: task,
      descriptionTask: description,
      responsible: responsible,
    };

    onAddTask(newTask);
    setOpen(false);
    setTask('');
    setDescription('');
    setResponsible('');
  };

  return (
    <>
      <Button onPress={() => openModal('center')} backgroundColor={'green.500'} shadow={'1'}>
        <Text color={'white'} bold>
          Clique aqui para adicionar uma nova tarefa
        </Text>
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Adicione uma tarefa</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Task</FormControl.Label>
              <Input value={task} onChangeText={(text) => setTask(text)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Description</FormControl.Label>
              <Input value={description} onChangeText={(text) => setDescription(text)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Responsible</FormControl.Label>
              <Input value={responsible} onChangeText={(text) => setResponsible(text)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="violet"
                onPress={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={handleSave} colorScheme="violet">
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
