import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverContent,
  Stack,
} from "@chakra-ui/react";
import ReactFocusLock from "react-focus-lock";

type EditTodoProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onEditTodo: (id: string, title: string) => void;
  editedTodoId: string;
  editedTodoTitle: string;
  setEditedTodoId: (id: string) => void;
  setEditedTodoTitle: (id: string) => void;
  firstFieldRef: any;
};

const EditTodo = ({
  isOpen,
  onOpen,
  onClose,
  onEditTodo,
  editedTodoId,
  editedTodoTitle,
  setEditedTodoId,
  setEditedTodoTitle,
  firstFieldRef,
}: EditTodoProps) => {
  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={() => {
        setEditedTodoId("");
        setEditedTodoTitle("");
        onClose();
      }}
      closeOnBlur={true}
      // placement="left"
    >
      <PopoverContent p={2} top="8px" left="95%">
        <ReactFocusLock returnFocus persistentFocus={false}>
          <Flex justify="end" align="center">
            <CloseButton
              size="sm"
              onClick={() => {
                setEditedTodoId("");
                setEditedTodoTitle("");
                onClose();
              }}
            />
          </Flex>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="task">Edit Task</FormLabel>
              <Input
                ref={(firstFieldRef) => firstFieldRef && firstFieldRef.focus()}
                id="task"
                placeholder="Task"
                defaultValue={editedTodoTitle}
                value={editedTodoTitle}
                onChange={(e) => setEditedTodoTitle(e.target.value)}
                onFocus={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.setSelectionRange(
                    input.value.length,
                    input.value.length
                  );
                }}
              />
            </FormControl>
            <Button
              colorScheme="purple"
              size="sm"
              onClick={() => {
                onEditTodo(editedTodoId, editedTodoTitle);
              }}
            >
              Save
            </Button>
          </Stack>
        </ReactFocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default EditTodo;
