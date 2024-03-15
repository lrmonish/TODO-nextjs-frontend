import { createSlice } from '@reduxjs/toolkit'


let data = !localStorage.getItem('auth');

if(data === undefined)
{
    data = false;
}


const initialState = { value: data }

const authslice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuth(state)
    {
        state.value = !state.value;
    },
  },
})

export const { changeAuth } = authslice.actions
export default authslice.reducer