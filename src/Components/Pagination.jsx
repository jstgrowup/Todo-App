import { Button, Flex } from "@chakra-ui/react";

export default function Pagination({ current, onchange, total }) {
  
  const pages = new Array(total).fill(0).map((a, i) => (
    <Button
      colorScheme="whatsapp"
      key={i}
      onClick={() => onchange(i + 1)}
      disabled={current === i + 1}
    >
      {i + 1}
    </Button>
  ));

  return (
    <>
      <Flex gap={"6"}>{pages}</Flex>
    </>
  );
}
