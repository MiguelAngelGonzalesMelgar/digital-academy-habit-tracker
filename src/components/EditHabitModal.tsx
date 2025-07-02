import { Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  Input, 
  ModalFooter, 
  Button, 
  RadioGroup,
  HStack,
  Radio,
  Box} 
  from "@chakra-ui/react";
import { useState } from "react";

import { AVAILABLE_COLORS } from "../constants/availableColors";


interface EditHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  initialColor: string;
  onSave: (newName: string, newColor: string) => void;
}
  

const EditHabitModal = ({isOpen, onClose, initialName, 
  initialColor, onSave }: EditHabitModalProps) => {

    // States for edit
    const [newName, setNewName] = useState(initialName);
    const [newColor, setNewColor] = useState(initialColor);

    // Handlers for edit
    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewName(event.target.value);
    
    }

    const onChangeColor = (newColor: React.SetStateAction<string>) => {
      setNewColor(newColor)
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Habit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Habit name"
            value={newName}
            mb={3}
            onChange={onChangeName}
          />
          <RadioGroup 
            value={newColor} 
            onChange={onChangeColor}>
            <HStack 
              spacing={3} 
              wrap="wrap">
              
              {AVAILABLE_COLORS.map((color) => (
                <Radio 
                  key={color} 
                  value={color}
                >
                  <Box
                    w="6"
                    h="6"
                    bg={color}
                    borderRadius="full"
                    border="2px solid gray"
                    cursor="pointer"
                  />
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
        </ModalBody>

        <ModalFooter>
          <Button 
            mr={3} 
            onClick={onClose}
            >Cancel
          </Button>

          <Button 
            colorScheme="teal" 
            onClick={() => onSave(newName, newColor)}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

}

export default EditHabitModal;

