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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    name: updatedName,
    phone: updatedPhone,
    address: updatedAddress,
  } = updatedProfile;

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

    if (updatedName !== "" || updatedPhone !== "" || updatedAddress !== "") {
      if (
        updatedName !== name ||
        updatedPhone !== phone ||
        updatedAddress !== address
      ) {
        setIsSubmitting(true);
        await updateUserData(token, updatedName, updatedPhone, updatedAddress)
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
      <Button onClick={onOpen} mt={3}>
        Ubah Data Profil
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        size={{ sm: "full", md: "lg", lg: "2xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ubah Data Profil</ModalHeader>
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
                <FormLabel>Nomor HP</FormLabel>
                <Input
                  type="number"
                  name="phone"
                  value={updatedPhone}
                  onChange={handleOnChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Alamat Lengkap</FormLabel>
                <Input
                  type="address"
                  name="address"
                  value={updatedAddress}
                  onChange={handleOnChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseModal}>
              Tutup
            </Button>
            <Button
              isDisabled={
                updatedName === name &&
                updatedPhone === phone &&
                updatedAddress === address
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
