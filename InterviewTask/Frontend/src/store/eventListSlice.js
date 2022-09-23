import {createSlice} from '@reduxjs/toolkit';

const eventlistSlice = createSlice({
    name:'eventList',
    initialState:{
        itemList:[],
        totalQuantity:0,
        
    }
})