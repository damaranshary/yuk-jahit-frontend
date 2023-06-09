import {
  Button,
  FormControl,
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
  address: string;
}

const EditProfileModal = ({ token, name, phone, address }: Props) => {
  const [updatedProfile, setUpdatedProfile] = useState({
    name: name,
    phone: phone,
    address: address,
  }); // this is the state for the updated profile

  const [isSubmitting, setIsSubmitting] = useState(false); // this is the state for the loading button
  const {
    name: newName,
    phone: newPhone,
    address: newAddress,
  } = updatedProfile; // destructuring the updated profile state

  const { isOpen, onOpen, onClose } = useDisclosure(); // this is the state for the modal
  const toast = useToast(); // this is the state for the toast

  const handleOnChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value }); // this is the function to update the state of the updated profile
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (newName !== "" || newPhone !== "" || newAddress !== "") {
      // profile can't be updated without a value
      if (
        newName !== name ||
        newPhone !== phone ||
        newAddress !== address // and profile can't be updated if there's no change
      ) {
        setIsSubmitting(true);
        await updateUserData(token, newName, newPhone, newAddress)
          .then(() => {
            toast({
              // this is the toast for the success update
              description: "Edit Profile Berhasil",
              status: "success",
              isClosable: true,
            });
          })
          .catch(() => {
            // this is the toast for the failed update
            toast({
              description: "Edit Profile Gagal",
              status: "error",
              isClosable: true,
            });
          })
          .finally(() => {
            // the page will reload to get the updated profile value from the server instantly
            setIsSubmitting(false);
            onClose();
          });
      }
    } else {
      toast({
        // this is the toast for the empty update
        description: "Tolong isi form dengan benar",
        status: "warning",
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <>
      <Button id="edit-profile-button" onClick={onOpen} mt={3}>
        Ubah Data Profil
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ sm: "full", md: "lg", lg: "2xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ubah Data Profil</ModalHeader>
          <ModalCloseButton id="edit-profile-modal-header-close-button" />
          <ModalBody>
            <VStack gap={5}>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  id="edit-profile-modal-name-input"
                  type="text"
                  name="name"
                  value={newName}
                  onChange={handleOnChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Nomor HP</FormLabel>
                <Input
                  id="edit-profile-modal-phone-input"
                  type="number"
                  name="phone"
                  value={newPhone}
                  onChange={handleOnChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Alamat Lengkap</FormLabel>
                <Input
                  id="edit-profile-modal-address-input"
                  type="address"
                  name="address"
                  value={newAddress}
                  onChange={handleOnChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              id="edit-profile-modal-footer-close-button"
              variant="ghost"
              mr={3}
              onClick={() => {
                setUpdatedProfile({
                  name: name,
                  phone: phone,
                  address: address,
                });
                onClose();
              }}
            >
              Batal
            </Button>
            <Button
              id="edit-profile-modal-button"
              isDisabled={
                newName === name && newPhone === phone && newAddress === address // this is the condition to disable the button if there's no change
              }
              variant="solid"
              colorScheme="green"
              type="submit"
              onClick={handleOnSubmit}
              isLoading={isSubmitting}
            >
              Ubah
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
