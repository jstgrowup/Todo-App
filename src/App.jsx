import { useState } from "react";
import reactLogo from "./assets/react.svg";
import  styles from "./App.module.css";
import Todo from "./Components/Todo";
import { Box, ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Box className={styles.ip}>
          <Todo />
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
