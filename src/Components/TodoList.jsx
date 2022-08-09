import { Box, Button, Flex, Heading } from "@chakra-ui/react";

export default function TodoList({
  handleDelete,
  title,
  status,
  id,
  handleToggle,
}) {
  return (
    <>
      <Flex gap={"20"} align={"center"} mb={"15px"}>
       <Heading size={"md"}>{title}</Heading>{" "}

        <Button onClick={() => handleToggle(id, status)} colorScheme={status?"green":"red"}>
          {status ? "DONE" : "NOT DONE"}
        </Button>
        <Button onClick={() => handleDelete(id)} colorScheme="red">DELETE</Button>
      </Flex>
    </>
  );
}
