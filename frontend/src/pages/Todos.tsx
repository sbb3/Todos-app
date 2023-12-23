import {
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  Input,
  InputGroup,
  List,
  ListItem,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdAdd, MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
  useUpdateTodoMutation,
} from "src/features/todo/todoApi";
import store from "src/app/store";
import { BeatLoader } from "react-spinners";
import hexObjectId from "hex-object-id";
import { useRef, useState } from "react";
import EditTodo from "src/components/todos/EditTodo";
import { useSelector } from "react-redux";
import { AuthState, Todo } from "src/interfaces";
import theme from "src/theme";

type FormValues = {
  task: string;
};

const Todos = () => {
  const { user } = useSelector((state: { auth: AuthState }) => state.auth);
  const toast = useToast();
  const [editedTodoTitle, setEditedTodoTitle] = useState<string>("");
  const [editedTodoId, setEditedTodoId] = useState<string>("");
  const firstFieldRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const {
    data: tasks = [],
    isFetching,
    isLoading,
  } = useGetAllTodosQuery(user?.id, {});
  const [createTodo, { isLoading: isCreatingTodo }] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const onAddTodo: SubmitHandler<FormValues> = async (data) => {
    try {
      await createTodo({
        title: data.task,
        userId: store.getState().auth.user?.id,
        id: hexObjectId(),
        isDone: false,
      }).unwrap();
      reset({
        task: "",
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id).unwrap();
      toast({
        title: "Deleted.",
        description: "Todo has been deleted.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err: any) {
      console.error(err.message);
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const onUpdateTodo = async (id: string, isDone: boolean) => {
    try {
      await updateTodo({
        id,
        isDone,
      }).unwrap();
      toast({
        title: "Updated.",
        description: "Todo status has been updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err: any) {
      console.error(err.message);
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const onEditTodo = async (id: string, title: string) => {
    try {
      await updateTodo({
        id,
        title,
      }).unwrap();
      setEditedTodoTitle("");
      setEditedTodoId("");
      toast({
        title: "Updated.",
        description: "Todo title has been updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    } catch (err: any) {
      console.error(err.message);
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    }
  };

  if (isLoading || isFetching)
    return <BeatLoader size={8} color={theme.colors.loader} />;

  return (
    <Container maxW="container.lg" p={2}>
      <Flex justify="center" align="center" p={2}>
        <FormControl isInvalid={!!errors.task}>
          <InputGroup
            justifyContent="space-between"
            alignItems="center"
            gap={4}
          >
            <Input
              type="text"
              variant="filled"
              placeholder="What's today's task?"
              {...register("task", { required: "What do you want to do?" })}
              onKeyDown={(e) => {
                e.key === "Enter" && handleSubmit(onAddTodo)();
              }}
              borderColor="purple.500"
              _hover={{
                borderColor: "purple.500",
              }}
            />
            <IconButton
              aria-label="add task"
              icon={<Icon as={MdAdd} />}
              size={"md"}
              onClick={handleSubmit(onAddTodo)}
              isLoading={isCreatingTodo}
              isDisabled={isCreatingTodo}
              colorScheme="purple"
            />
          </InputGroup>
          <FormErrorMessage>
            {errors?.task && errors?.task?.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Stack w="full" justify="start" align="center" spacing={2}>
        <List spacing={2} p={2} w="full" maxH="4xl" shadow="md">
          {tasks?.map((task: Todo) => (
            <ListItem
              as={Flex}
              key={task.id}
              w="full"
              justify="space-between"
              align="center"
              p={2}
              gap={4}
              position={"relative"}
            >
              <Checkbox
                size="lg"
                colorScheme="purple"
                spacing={4}
                isChecked={task.isDone}
                onChange={(e) => {
                  e.target.checked
                    ? onUpdateTodo(task.id, true)
                    : onUpdateTodo(task.id, false);
                }}
                wordBreak="break-all"
                textDecoration={task.isDone ? "line-through" : "none"}
                cursor="pointer"
              >
                {task.title}
              </Checkbox>
              <Flex justify="center" align="center" gap={2}>
                <IconButton
                  aria-label="edit"
                  size="sm"
                  icon={<FaEdit />}
                  onClick={() => {
                    setEditedTodoId(task.id);
                    setEditedTodoTitle(task.title);
                    onOpen();
                  }}
                />
                {isOpen && editedTodoId === task.id && (
                  <EditTodo
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    onEditTodo={onEditTodo}
                    editedTodoId={editedTodoId}
                    editedTodoTitle={editedTodoTitle}
                    setEditedTodoId={setEditedTodoId}
                    setEditedTodoTitle={setEditedTodoTitle}
                    firstFieldRef={firstFieldRef}
                  />
                )}
                <IconButton
                  aria-label="delete task"
                  icon={<Icon as={MdDelete} />}
                  size={"sm"}
                  cursor="pointer"
                  onClick={() => onDeleteTodo(task.id)}
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Container>
  );
};

export default Todos;
