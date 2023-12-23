import { apiSlice } from "../../app/api/apiSlice";
import { Todo } from "src/interfaces";

const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: (userId) => `todos?userId=${userId}`,
    }),

    createTodo: builder.mutation({
      query: (body) => ({
        url: "todos",
        method: "POST",
        body: { ...body },
      }),
      async onQueryStarted(
        newTask,
        { dispatch, queryFulfilled, getState }: any
      ) {
        // optimistic updates
        const patchResult = dispatch(
          todoApi.util.updateQueryData(
            "getAllTodos",
            getState()?.auth?.user?.id,
            (draft) => {
              draft?.unshift(newTask);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err: any) {
          // rollback optimistic updates
          patchResult.undo();
        }
      },
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: { ...patch },
      }),
      async onQueryStarted(
        { id, ...patch },
        { dispatch, queryFulfilled, getState }: any
      ) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData(
            "getAllTodos",
            getState()?.auth?.user?.id,
            (draft) => {
              const index = draft?.findIndex((todo: Todo) => todo.id === id);
              if (index !== -1) {
                draft[index] = {
                  ...draft[index],
                  ...patch,
                };
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err: any) {
          patchResult.undo();
        }
      },
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }: any) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData(
            "getAllTodos",
            getState()?.auth?.user?.id,
            (draft) => {
              const index = draft?.findIndex((todo: Todo) => todo.id === id);
              if (index !== -1) draft?.splice(index, 1);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err: any) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
} = todoApi;

export default todoApi;
