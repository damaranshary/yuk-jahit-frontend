import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

interface Props {
  name: string;
  phone: string;
}

const EditProfileModal = ({ name, phone }: Props) => {
  const [updatedProfile, setUpdatedProfile] = useState({
    name: name,
    phone: phone,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleOnSubmit = () => {
    console.log(updatedProfile);
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
    // setUpdatedProfile({ name: "", phone: "" });
  };

  return (
    <>
      <Button onClick={onOpen}>Edit Profile</Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={5}>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={updatedProfile.name}
                  onChange={handleOnChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel mt={3}>Nomor HP</FormLabel>
                <Input
                  type="number"
                  name="phone"
                  value={updatedProfile.phone}
                  onChange={handleOnChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="solid" onClick={handleOnSubmit}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
