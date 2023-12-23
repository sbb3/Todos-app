import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useTitle from "src/hooks/useTitle";

const NotFoundPage = () => {
  useTitle("404");
  const navigate = useNavigate();
  return (
    <Box
      display="grid"
      placeItems="center"
      height="100vh"
      width="100vw"
      justifyItems={"center"}
      px={{ base: 4, sm: 6, lg: 8 }}
      py={{ base: 12, sm: 12, md: 24 }}
    >
      <Flex direction={"column"} align="center" justify="center">
        <Text
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          fontWeight="bold"
          mt={4}
          textTransform={"uppercase"}
          letterSpacing={1}
          textAlign={"center"}
        >
          <Text
            display={{
              base: "block",
              sm: "inline-block",
            }}
            mr={2}
            color="purple.600"
          >
            404
          </Text>
          Page not found
        </Text>

        <Button
          mt={4}
          colorScheme="purple"
          onClick={() => {
            navigate("/", { replace: true });
          }}
          textTransform={"uppercase"}
          letterSpacing={1}
        >
          Back to homepage
        </Button>
      </Flex>
    </Box>
  );
};

export default NotFoundPage;
