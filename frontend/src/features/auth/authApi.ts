import { apiSlice } from "src/app/api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg: any, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result?.data?.accessToken,
              user: result?.data?.user,
            })
          );
        } catch (err: any) {
          // console.log(`err: `, err);
          return;
        }
      },
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg: any, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result?.data?.accessToken,
              user: result?.data?.user,
            })
          );
        } catch (err: any) {
          // console.log(`err: `, err);
          return;
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg: any, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(userLoggedOut());
        } catch (err: any) {
          // console.log(`err: `, err);
          return;
        }
      },
    }),
    getNewAccessToken: builder.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(_arg: any, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.accessToken,
              user: result?.data?.user,
            })
          );
        } catch (err: any) {
          // console.log(`err: `, err);
          return;
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetNewAccessTokenMutation,
} = authApi;

export default authApi;
