import { Box, Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import Pagination from "./Pagination";
import TodoList from "./TodoList";
import styles from "./Todo.module.css";
console.log("styles:", styles);
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
        `https://todobe.onrender.com/data?_sort=title&_order=${sortBy}&_page=${page}&_limit=3`
      )
      .then((res) => setTodos(res.data))
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };
  const AddTodos = (todo) => {
    setLoading(true);
    axios
      .post(`https://todobe.onrender.com/data`, todo)
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
  };
  const handleToggle = (id, status) => {
    axios
      .patch(`https://todobe.onrender.com/data/${id}`, {
        status: !status,
      })
      .then((res) => getTodos())
      .catch((err) => alert(err));
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://todobe.onrender.com/data/${id}`)
      .then((res) => getTodos())
      .catch((err) => console.log(err));
  };
  const handleSort = () => {
    updateSort(sortBy === "ASC" ? "DESC" : "ASC");
  };

  return loading ? (
    <Box p={"200px"} ml={"500px"}>
      <Image
        src="https://c.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif"
        alt="loading"
      />
    </Box>
  ) : (
    <>
      <Flex gap={"3"} align={"center"} direction={"column"}>
        <Heading
          // className={styles.ip}

          color={"white"}
          size={"2xl"}
        >
          TODO APP
        </Heading>
        <Flex direction={"column"} align={"center"} gap={"3"} color={"white"}>
          <AddTodo handleAdd={handleAdd} />

          <Button onClick={handleSort}  colorScheme="whatsapp">
            {sortBy === "ASC" ? "SHOW ASCENDING" : "SHOW DESCENDING"}
          </Button>
          <Heading size={"lg"}>
            Pending
          </Heading>
          <Flex direction={"column"} gap={"4"} w={"100%"}>
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
          </Flex>

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
                colorScheme="whatsapp"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                PREV
              </Button>
              <Heading size={"md"}>{page}</Heading>
              <Button
                colorScheme="whatsapp"
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
        </Flex>
      </Flex>
    </>
  );
}
