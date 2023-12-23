import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
  Grid,
  VStack,
  Stack,
  useToast,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink } from "react-router-dom";
import useTitle from "src/hooks/useTitle";
import { AuthState } from "src/interfaces";

type FormValues = {
  email: string;
  password: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required").min(5),
});

export default function Login() {
  useTitle("Login");
  const { accessToken, user } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );
  const navigate = useNavigate();
  const toast = useToast();
  const registerLinkColor = useColorModeValue("purple.600", "purple.200");

  const {
    register: registerForm,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (accessToken && user) navigate("/todos");
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await login(data).unwrap();
      reset();
      navigate("/todos");
    } catch (error: any) {
      // console.log(error);
      toast({
        title: "Error",
        description: error.data.message || "Something went wrong.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      reset();
    }
  };

  return (
    <Grid placeItems="center" height="100vh">
      <Flex
        align="center"
        justify="center"
        minHeight="full"
        w={"full"}
        py={{ base: 12, sm: 12, md: 20 }}
        px={{ base: 4, sm: 6, lg: 8 }}
      >
        <VStack maxW={"sm"} w={"full"} spacing={8}>
          <Box textAlign="center" fontSize="3xl" fontWeight="extrabold">
            Sign in to your account
          </Box>
          <Stack mt={2} spacing={4} w={"full"}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...registerForm("email")}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...registerForm("password")}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Flex justify="flex-end" align={"center"}>
              <Link
                as={RouterLink}
                to="/register"
                fontWeight={"md"}
                color={registerLinkColor}
                _hover={{
                  textDecoration: "none",
                  color: "purple.500",
                }}
              >
                Register
              </Link>
            </Flex>
            <Button
              mt={4}
              colorScheme="purple"
              isLoading={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              Sign in
            </Button>
          </Stack>
        </VStack>
      </Flex>
    </Grid>
  );
}
