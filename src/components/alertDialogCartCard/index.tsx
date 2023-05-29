import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FormEvent, useRef } from "react";

export interface AlertCartTypes {
  // this is the type of props that this component will receive from its parent component
  notes: string | undefined;
  isSubmitting: boolean;
  handleCheckout: (e: FormEvent) => Promise<void>;
}

const AlertDialogCartCard = ({
  isSubmitting,
  notes,
  handleCheckout,
}: AlertCartTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = useRef();
  return (
    <Center>
      <VStack>
        <Text fontSize="sm">Tipe Pembayaran: Gopay</Text>
        <Button isDisabled={!notes} colorScheme="green" my="5" onClick={onOpen}>
          Lakukan Pembayaran
        </Button>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Konfirmasi Checkout</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Apakah anda yakin ingin melakukan checkout?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Batal
              </Button>
              <Button
                type="submit"
                colorScheme="green"
                ml={3}
                onClick={handleCheckout}
                isLoading={isSubmitting}
                loadingText="Loading"
              >
                Checkout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </VStack>
    </Center>
  );
};

export default AlertDialogCartCard;
