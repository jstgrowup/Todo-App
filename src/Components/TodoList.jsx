import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import styles from "./Todo.module.css";
export default function TodoList({
  handleDelete,
  title,
  status,
  id,
  handleToggle,
}) {
  return (
    <>
      <Flex
        className={styles.ip}
        gap={"32"}
        align={"center"}
        h={"16"}
        borderRadius={"xl"}
      >
        <Heading size={"md"}>{title}</Heading>{" "}
        <Button
          onClick={() => handleToggle(id, status)}
          colorScheme={status ? "green" : "red"}
        >
          {status ? "DONE" : "NOT DONE"}
        </Button>
        <Button onClick={() => handleDelete(id)} colorScheme="red">
          DELETE
        </Button>
      </Flex>
    </>
  );
}
