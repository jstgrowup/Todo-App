import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function AddTodo({ handleAdd }) {
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    handleAdd(text);
  };
  return (
    <>
      <Flex w={"500px"} mb={"60px"} justify="space-evenly" gap={"6"}>
        <Input onChange={handleChange} type="text" placeholder="Add todo" />
        <Button onClick={handleSubmit} colorScheme={"blue"}>
          ADD
        </Button>
      </Flex>
    </>
  );
}
