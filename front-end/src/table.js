import {
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table,
  Stack,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const FinanceTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate()
  const list = async () => {
    const response = await fetch("http://localhost:5000/finance")
    const result = await response.json();
    console.log(result)
    setRows(result)
  };

  useEffect(()=>{
    list()
  },[])

  return (
    <Stack>
    <TableContainer>
        <Stack justify={"space-between"} direction={"row"}>
        <Text fontSize={"large"} fontWeight={"bold"}>Finance History</Text>
        <Button colorScheme="teal" onClick={()=>{navigate("/add")}}>Add</Button>
        </Stack>
      <Table>
        <Thead>

          <Tr>
            <Th>Year</Th>
            <Th>Annual Income</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map(({ year,annual_income,id}) => (
              <Tr>
                <NavLink to={`/finance/${id}`}>
              <Td>{year}</Td>
                </NavLink>
              <Td>{annual_income}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </Stack>

  );
};
