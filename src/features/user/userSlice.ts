import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAddress } from "@/services/apiGeocoding";

import type { StoreState, UserState } from "@/types";

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // 1) We get the user's geolocation position
  const positionObject = await getPosition();
  const position = {
    latitude: positionObject.coords.latitude,
    longitude: positionObject.coords.longitude,
  };

  // 2) We use a reverse geocoding API to get a description of the user's address so we can display it the order form to be corrected if necessary
  const addressObject = await getAddress(position);
  const address = `${addressObject?.locality}, ${addressObject?.city}, ${addressObject?.countryName}`;

  // 3) We return an object with the data we are interested in - this is the payload of the fulfilled state
  return { position, address };
});

const initialState: UserState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Here is where the actual reducer finally comes into play
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action?.payload?.position || {};
        state.address = action?.payload?.address || "";
        state.status = "idle";
      })
      // Adding a case for a possible error
      // This might happen if the user does not accept geolocation
      .addCase(fetchAddress.rejected, (state) => {
        state.error =
          "There was a problem getting your address. Make sure to fill out this field!";
        state.status = "error";
      });
  },
});

export const { updateName } = userSlice.actions;

export const getUsername = (state: StoreState) => state.user.username;

export default userSlice.reducer;
