import { Box, Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import Pagination from "./Pagination";
import TodoList from "./TodoList";
// adding
// toggle
// delete
// sorting
// pagination
export default function Todo() {
  const [todo, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, updateSort] = useState("ASC");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getTodos();
  }, [sortBy, page]);
  const getTodos = () => {
   
    
    axios
      .get(
        `https://obscure-taiga-80364.herokuapp.com/data?_sort=title&_order=${sortBy}&_page=${page}&_limit=3`
      )
      .then((res) => setTodos(res.data))
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };
  const AddTodos = (todo) => {
    setLoading(true);
    axios
      .post(`https://obscure-taiga-80364.herokuapp.com/data`, todo)
      .then((res) => getTodos())
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  const handleAdd = (text) => {
    const item = {
      title: text,
      status: false,
    };
    AddTodos(item);

    // console.log(todo);
  };
  const handleToggle = (id, status) => {
    axios
      .patch(`https://obscure-taiga-80364.herokuapp.com/data/${id}`, {
        status: !status,
      })
      .then((res) => getTodos())
      .catch((err) => alert(err));
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://obscure-taiga-80364.herokuapp.com/data/${id}`)
      .then((res) => getTodos())
      .catch((err) => console.log(err));
  };
  const handleSort = () => {
    updateSort(sortBy === "ASC" ? "DESC" : "ASC");
   
  };
  // console.log(todo);
  return loading ? (
    <Box p={"200px"} ml={"500px"}>
      <Image
        src="https://c.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif"
        alt="loading"
      />
    </Box>
  ) : (
    <>
      <Heading size={"2xl"} ml={"600px"}>
        TODO APP
      </Heading>
      <Box mr={"300px"} ml={"500px"} mt={"100px"}>
        <AddTodo handleAdd={handleAdd} />

        <Button onClick={handleSort} mb="20px" colorScheme="blue">
          {sortBy === "ASC" ? "SHOW ASCENDING" : "SHOW DESCENDING"}
        </Button>
        <Heading size={"lg"} mb="20px">
          Pending
        </Heading>
        <Box>
          {todo
            .filter((el) => !el.status)
            .map((el) => (
              <TodoList
                title={el.title}
                status={el.status}
                key={el.id}
                id={el.id}
                handleToggle={handleToggle}
                handleDelete={handleDelete}
              />
            ))}
        </Box>

        <Heading size={"lg"} mb="20px">
          Completed
        </Heading>

        {todo
          .filter((el) => el.status)
          .map((el) => (
            <TodoList
              title={el.title}
              status={el.status}
              key={el.id}
              id={el.id}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          ))}
        <Center>
          <Flex align={"center"} gap={"6"} mb="20px">
            <Button
              colorScheme="teal"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              PREV
            </Button>
            <Heading size={"md"}>{page}</Heading>
            <Button
              colorScheme="teal"
              onClick={() => setPage((prev) => prev + 1)}
            >
              NEXT
            </Button>
          </Flex>
        </Center>

        <Box>
          <Pagination
            total={10}
            current={page}
            onchange={(value) => setPage(value)}
          />
        </Box>
      </Box>
    </>
  );
}
