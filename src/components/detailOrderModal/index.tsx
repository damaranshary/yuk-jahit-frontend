import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { OrderDataTypes } from "../../types/order";

const DetailOrderModal = ({
  owner,
  _id,
  address,
  notes,
  products,
  status,
  bill,
  updatedAt,
  createdAt,
}: OrderDataTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getDate = (something: string) => {
    const date = new Date(something);
    return date
      .toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
      .concat(" WIB");
  };

  const dateCreated = getDate(updatedAt);

  return (
    <>
      <Center>
        <Button
          onClick={onOpen}
          borderRadius="full"
          colorScheme="green"
          size="sm"
          px={5}
          fontSize="sm"
          variant="outline"
        >
          Lihat Detail Transaksi
        </Button>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} size={{base: "sm", sm: "lg", md: "xl"}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight="bold">
            Detail Transaksi
          </ModalHeader>
          <Divider mb={2} />
          <ModalCloseButton />
          <ModalBody>
            <Box as={Flex} flexDirection="column" gap={1}>
              <Flex maxW="4xl" mb={2} alignItems="center">
                {status === "settlement" && (
                  <Text
                    as="p"
                    fontSize="md"
                    color="white"
                    display="block"
                    bgColor="green"
                    px={2}
                    py={1}
                    borderRadius={5}
                  >
                    Selesai
                  </Text>
                )}
                {status === "pending" && (
                  <Text
                    as="p"
                    fontSize="md"
                    color="white"
                    display="block"
                    bgColor="yellow.400"
                    px={2}
                    py={1}
                    borderRadius={5}
                  >
                    Belum dibayar
                  </Text>
                )}
                {status === "expire" && (
                  <Text
                    as="p"
                    fontSize="md"
                    color="white"
                    display="block"
                    bgColor="gray"
                    fontWeight="bold"
                    px={2}
                    py={1}
                    borderRadius={5}
                  >
                    Kedaluwarsa
                  </Text>
                )}
                {status === "cancel" && (
                  <Text
                    as="p"
                    fontSize="md"
                    color="white"
                    display="block"
                    bgColor="red"
                    fontWeight="bold"
                    px={2}
                    py={1}
                    borderRadius={5}
                  >
                    Dibatalkan
                  </Text>
                )}
                <Spacer />
              </Flex>
              <Flex>
                <Text fontSize="sm">ID Transaksi</Text>
                <Spacer />
                <Text color="green" fontSize="sm" fontWeight="bold">
                  {_id}
                </Text>
              </Flex>
              <Flex>
                <Text fontSize="sm">Tanggal </Text>
                <Spacer />
                <Text fontSize="sm">{dateCreated}</Text>
              </Flex>
            </Box>
            <Box as={Flex} flexDirection="column" gap={1}>
              <Text fontWeight="bold" fontSize="md" mt={5} mb={3}>
                Detail Produk
              </Text>
              {products.map((product) => (
                <Flex
                  key={product._id}
                  mb={3}
                  border="1px gray solid"
                  p={2}
                  borderRadius="10"
                  alignItems="center"
                >
                  <Image
                    src={product.product_img}
                    alt={product.name}
                    maxW="80px"
                    maxH="80px"
                    loading="lazy"
                    borderRadius={10}
                    me={3}
                  />
                  <Flex flexDirection="column">
                    <Text fontWeight="semibold" as="span" fontSize="sm">
                      {product.name} x{product.quantity}
                    </Text>
                    <Box>
                      by{" "}
                      <Text fontSize="sm" as="span" color="green">
                        YukJahit
                      </Text>
                    </Box>
                  </Flex>
                  <Spacer />
                  <Divider orientation="vertical" />
                  <Flex flexDirection="column">
                    <Text fontSize="sm">Total Harga</Text>
                    <Text fontSize="sm" fontWeight="semibold">
                      Rp{" "}
                      {(product.quantity * product.price).toLocaleString(
                        "id-ID"
                      )}
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Box>
            <Box as={Flex} flexDirection="column" gap={1}>
              <Text fontWeight="bold" fontSize="md" mt={5} mb={3}>
                Info Penerima
              </Text>
              <Flex alignItems="center">
                <Text fontSize="sm">Nama </Text>
                <Text ms={7} me={5}>:</Text>
                <Text color="green" fontSize="sm" fontWeight="bold">
                  {owner.name}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="sm">No HP</Text>
                <Text ms={6} me={5}>:</Text>
                <Text fontSize="sm">{owner.phone}</Text>
              </Flex>
              <Flex>
                <Text fontSize="sm">Alamat</Text>
                <Text ms={5} me={5}>:</Text>
                <Text fontSize="sm">{address}</Text>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailOrderModal;
