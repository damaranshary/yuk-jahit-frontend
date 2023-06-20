import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FormEvent, useRef } from "react";

export interface AlertCancelOrderTypes {
  index: number;
  isSubmitting: boolean;
  status: string | undefined;
  handleCancelOrder: (e: FormEvent) => void;
}

const AlertDialogCancelOrder = ({
  index,
  isSubmitting,
  status,
  handleCancelOrder,
}: AlertCancelOrderTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = useRef();

  if (status === "pending") {
    // you can cancel order only if it's at pending state
    return (
      <>
        <Button
          id={`cancel-order-button-${index + 1}`}
          colorScheme="red"
          borderRadius="full"
          size="sm"
          px={5}
          fontSize="sm"
          variant="solid"
          onClick={onOpen}
          mt={3}
        >
          Batalkan
        </Button>
        <AlertDialog
          id="cancel-order-alert-dialog"
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Konfirmasi Batal Transaksi</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Apakah anda yakin ingin membatalkan transaksi?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                id="cancel-order-close-button"
                ref={cancelRef}
                onClick={onClose}
              >
                Kembali
              </Button>
              <Button
                id="cancel-order-confirmation-button"
                colorScheme="red"
                ml={3}
                isLoading={isSubmitting}
                onClick={handleCancelOrder}
                loadingText="Loading"
              >
                Batalkan
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
  return (
    // if status is not pending, then return disabled button
    <Button
      isDisabled
      colorScheme="red"
      borderRadius="full"
      size="sm"
      px={5}
      fontSize="sm"
      variant="solid"
      mt={3}
    >
      Batalkan
    </Button>
  );
};

export default AlertDialogCancelOrder;
