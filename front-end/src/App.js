import {
  Box,
  ChakraProvider,
  Text,
  Container,

} from "@chakra-ui/react";

import "./App.css";

import { FinanceTable } from "./table";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import { AddRiskAppetite } from "./AddRiskAppetite";
import { ViewRiskAppetite } from "./ViewRiskAppetite";
import { Login } from "./login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Login/>,
      errorElement: <ErrorPage />,
    },{
      path:"/finance/:id",
      element:<ViewRiskAppetite/>
    },
    
    {
      path: "/table",
      element: <FinanceTable />,
    },
    {
      path: "/add",
      element: <AddRiskAppetite />,
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]);
  return (
    <ChakraProvider>
      <Container maxW="container.sm">
        <Box mb={4} h={35} background={"#0078FF"}>
          <Text textAlign={"center"} fontSize={"x-large"} color={"white"}>
          Financial Management Sytem
          </Text>
        </Box>
        <RouterProvider router={router} />
      </Container>
    </ChakraProvider>
  );
};
export default App

