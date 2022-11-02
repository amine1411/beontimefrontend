import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const missionSlice = createSlice({
  name: 'mission',
  initialState,
  reducers: {
    addMissionToJourney: (state, action) => { 
      console.log(state.value,"STATEVALUE");
      const result = state.value.find((mission) => mission?.idMission === action.payload.idMission);
      if(!result) {
      console.log(result,'Mission ajoutée');
      console.log(action.payload.idMission,"ACTION")
      let existing = state.value.find(
        (p) => p.entreprise === action.payload.entreprise
      );
      // console.log(existing, 'EXISTING');
      // console.log(state, 'STATE');
      if (!state.value.includes(action.payload)) {
        state.value.push(action.payload);
      }}
    },
    loadMissionsJourney: (state, action) => {
      state.value = action.payload;
      console.log('Mission Loaded');
    },
    removeMission: (state, action) => {
      state.value = state.value.filter(
        (mission) => mission.idMission !== action.payload.idMission
      );
      console.log('Mission deleted');
    },
  },
});

export const {
  addMissionToJourney,
  loadMissionsJourney,
  removeMission,
} = missionSlice.actions;
export default missionSlice.reducer;
