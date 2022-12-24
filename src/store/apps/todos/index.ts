// ** Toolkit Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Todos List
export const fetchData = createAsyncThunk(
  'appContents/fetchData',
  async (params: any) => {
    const response = await axios.post(params)

    if (response.data.errCd === 3000) {
      window.localStorage.removeItem('userData')
      window.location.href = '/login'
    }
    if (response.data.errCd === 4000) {
      return response.data
    }

    return response.data
  },
)

export const appContentsSlice = createSlice({
  name: 'appContents',
  initialState: {
    errCd: '',
    errMsg: '',
    responseData: [],
    responseNoData: '',
    loadingStat: false,
    totCnt: 0,
  },

  reducers: {},
  extraReducers: (builder) => {
    // ** Todos List pending
    builder.addCase(fetchData.pending, (state, action) => {
      if (!state.loadingStat) {
        state.loadingStat = true
      }
    })

    // ** Todos List fulfilled
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.errCd = action.payload.errCd
      state.errMsg = action.payload.errMsg
      state.responseData = action.payload.responseData
        ? action.payload.responseData
        : null
      if (state.loadingStat) {
        state.loadingStat = false
      }
    })
  },
})

export default appContentsSlice.reducer
