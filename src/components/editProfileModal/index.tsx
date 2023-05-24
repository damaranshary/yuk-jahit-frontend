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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { updateUserData } from "../../api-call/users";

interface Props {
  token: string;
  name: string;
  phone: string;
}

const EditProfileModal = ({ token, name, phone }: Props) => {
  const [updatedProfile, setUpdatedProfile] = useState({
    name: name,
    phone: phone,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { name: updatedName, phone: updatedPhone } = updatedProfile;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleOnChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(updatedProfile);

    if (updatedName !== "" || updatedPhone !== "") {
      if (updatedName !== name && updatedPhone !== phone) {
        setIsSubmitting(true);
        await updateUserData(token, updatedName, updatedPhone)
          .then((res) => {
            toast({
              description: "Edit Profile Berhasil",
              status: "success",
              isClosable: true,
            });
          })
          .catch((err) => {
            toast({
              description: "Edit Profile Gagal",
              status: "error",
              isClosable: true,
            });
          })
          .finally(() => {
            setIsSubmitting(false);
            onClose();
          });
      } else {
        toast({
          description: "Tidak ada perubahan",
          status: "warning",
          isClosable: true,
        });
        onClose();
      }
    } else {
      toast({
        description: "Tolong isi form dengan benar",
        status: "warning",
        isClosable: true,
      });
      onClose();
    }
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
                  value={updatedName}
                  onChange={handleOnChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel mt={3}>Nomor HP</FormLabel>
                <Input
                  type="number"
                  name="phone"
                  value={updatedPhone}
                  onChange={handleOnChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="solid"
              type="submit"
              onClick={handleOnSubmit}
              isLoading={isSubmitting}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
