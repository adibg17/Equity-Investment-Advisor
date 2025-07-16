import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text,
    FormErrorMessage,
    useToast
  } from '@chakra-ui/react'
import { useState } from 'react'

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

  
  export const Login = () =>{ 

    const {
      handleSubmit,
      register,
      setValue,
      watch,
      getValues,
  
      formState: { errors, isSubmitting },
    } = useForm({ defaultValues: { risk_appetite: "LOW" } });
    
     const toast= useToast()
     const navigate = useNavigate()

    const onSubmit=(values)=>{
      if(values.password&&values.email){
        if(values.password=="12345678" && values.email=="test@gmail.com") {
          localStorage.setItem("login",true)
          toast({
            title:"Login successful",
            status:"success"
          })
          navigate("/table")

        }else{
          localStorage.removeItem("login")
          toast({
            title:"Invalid email or password",
            status:"error"
          })
        }
      }
    }

    return(
    
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
        {/* lo */}
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
            <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder=""
              {...register("email", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              placeholder=""
              {...register("password", {
                required: "This is required",
                minLength:{
                  value:8,
                  message:"password should be greater than or equal to 8"
                }
                
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
            <Stack spacing="6" >
              <Button type='submit'>Sign in</Button>
            </Stack>
          </Stack>
          </form>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )}