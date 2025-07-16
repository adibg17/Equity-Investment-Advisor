import {
  Text,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Alert,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  AlertIcon,
  Stack,
  RadioGroup,
  Button,
  HStack,
  Radio,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { CheckCircleIcon } from "@chakra-ui/icons";

import "./App.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { RiskAppetite } from "./RiskAppetite";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export function ViewRiskAppetite() {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    getValues,

    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { risk_appetite: "LOW" } });

  const {id}=useParams()
  const { isOpen, onOpen, onClose } = useDisclosure();
  function onSubmit(values) {
    return new Promise((resolve) => {
      onOpen();
      resolve();
    });
  }
  const annual_income = watch("annual_income");
  const expenses = watch("expenses");
  useEffect(() => {
    if (annual_income && annual_income > 0) {
      const monthly_income = annual_income / 12;
      setValue("monthly_income", Math.round(monthly_income));
    }
  }, [annual_income]);

  const { risk_appetite, monthly_income, year } = getValues();
  console.log(getValues())
  const openCloseRiskAppetite = { isOpen, onClose, onOpen };
  const navigate = useNavigate()
  const toast = useToast()
  useEffect(()=>{
    axios.get(`http://localhost:5000/finance/${id}`).then((s)=>{
        console.log(s.data)
        reset({...s.data[0],monthly_income:s.data[0].annual_income/12})
    })
  },[])

 const deleteFinance=()=>{
    axios.delete(`http://localhost:5000/finance/${id}`).then(()=>{
        navigate("/table")
        toast({
            title:"Deleted successfully",
            status:"success"
        })
    }).catch((error)=>{
        toast({
            title:error,
            status:"error"
        })
    })
 }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormControl isInvalid={errors.year}>
            <FormLabel htmlFor="year">Year</FormLabel>
            <Input
              id="year"
              placeholder=""
              {...register("year", {
                required: "This is required",
                min: {
                  value: 1,
                  message: "year should be greater than 0",
                },
              })}
            />
            <FormErrorMessage>
              {errors.year && errors.year.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.annual_income}>
            <FormLabel htmlFor="annual_income">Annual Income</FormLabel>
            <Input
              id="annual_income"
              placeholder=""
              {...register("annual_income", {
                required: "This is required",
                min: {
                  value: 1,
                  message: "Annual income should be greater than 0",
                },
              })}
            />
            <FormErrorMessage>
              {errors.annual_income && errors.annual_income.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.monthly_income}>
            <FormLabel htmlFor="monthly_income">Monthly Income</FormLabel>
            <Input
              id="monthly_income"
              placeholder=""
              disabled
              {...register("monthly_income", {
                // required: "This is required",
                min: {
                  value: 1,
                  message: "monthly_income should be greater than 0",
                },
              })}
            />
            <FormErrorMessage>
              {errors.monthly_income && errors.monthly_income.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.expenses}>
            <FormLabel htmlFor="monthly_income">Monthly Expenses</FormLabel>
            <Input
              id="expenses"
              placeholder=""
              {...register("expenses", {
                required: "This is required",
                max: {
                  value: getValues().monthly_income,
                  message: "Expenses should be within the monthly income",
                },
              })}
            />
            <FormErrorMessage>
              {errors.expenses && errors.expenses.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.expenses}>
            <FormLabel htmlFor="risk_appetite">Risk Appetite</FormLabel>
            <SelectRiskAppetite
              value={getValues("risk_appetite")}
              register={register}
            />

            <FormErrorMessage>
              {errors.risk_appetite && errors.risk_appetite.message}
            </FormErrorMessage>
          </FormControl>

          {
            <RiskAppetiteInfo
              year={year}
              expenses={expenses}
              risk_appetite={risk_appetite}
              monthly_income={monthly_income}
              openCloseRiskAppetite={openCloseRiskAppetite}
            />
          }
        </Stack>
        <Stack direction={"row"} justify={"space-between"}>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
          >
          Calculate
        </Button>
        <Button
          mt={4}
          colorScheme="red"
          onClick={deleteFinance}
          >Delete
        </Button>
            </Stack>
      </form>
    </>
  );
}

const calculateSavings = (monthly_income, expenses) => {
  return monthly_income - expenses;
};
const calculateSavingsPercentage = (monthly_income, savedAmount) => {
  return parseInt((savedAmount / monthly_income) * 100);
};

const getSavingsInfo = (percentage) => {
  if (percentage >= 70) {
    return {
      status: "success",
      message: `You're saving percentage is ${percentage}% which was very good`,
    };
  } else if (percentage >= 30) {
    return {
      status: "warning",
      message: `You're saving percentage is ${percentage}% which was good`,
    };
  } else {
    return {
      status: "error",
      message: `You're saving percentage is ${percentage}% which was very poor`,
    };
  }
};

function SelectRiskAppetite({ value, register }) {
  const RISK_APPETITE = "risk_appetite";

  return (
    <RadioGroup defaultValue="LOW">
      <HStack>
        <Radio {...register(RISK_APPETITE)} value={"LOW"}>
          <Text>Low</Text>
        </Radio>
        <Radio {...register(RISK_APPETITE)} value={"MEDIUM"}>
          <Text>Medium</Text>
        </Radio>
        <Radio {...register(RISK_APPETITE)} value={"HIGH"}>
          <Text>High</Text>
        </Radio>
      </HStack>
    </RadioGroup>
  );
}

const getTitle = (risk_appetite, percentage) => {
  switch (risk_appetite) {
    case "HIGH": {
      return "Risk Appetite - High";
    }
    case "MEDIUM": {
      return "Risk Appetite - Medium";
    }
    case "LOW": {
      return "Risk Appetite - Low";
    }
  }
};

function RiskAppetiteInfo({
  monthly_income,
  year,
  expenses,
  risk_appetite,
  openCloseRiskAppetite,
}) {
    
    console.log(expenses,monthly_income)
  const { isOpen, onClose, onOpen } = openCloseRiskAppetite;

  const savedAmount = calculateSavings(monthly_income, expenses);

  const percentage = calculateSavingsPercentage(monthly_income, savedAmount);
  const info = getSavingsInfo(percentage);
  const toast = useToast();

  const onSave = async () => {
    const response = axios
      .post("http://localhost:5000/finance", {
        year: year,
        risk_appetite,
        expenses,
        annual_income: monthly_income * 12,
      })
      .then(() => {
        onClose();
        toast({
          title: "Added successfully",
          // description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        onClose();
        console.error("Error:", error.response.data.error);
        toast({
          title: error.response.data.error,
          // description: "We've created your account for you.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"large"}>
            {getTitle(risk_appetite, percentage)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={2}>
              <Alert status={info.status}>
                <AlertIcon />
                {info.message}
              </Alert>
              {RiskAppetite(risk_appetite, percentage, savedAmount)}
              {/* <RiskAppetite percentage={50} risk_appetite={"HIGH"} /> */}
            </Stack>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={onSave}>
              Save to cloud
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
