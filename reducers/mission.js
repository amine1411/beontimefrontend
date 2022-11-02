import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const missionSlice = createSlice({
  name: 'mission',
  initialState,
  reducers: {
    addMissionToJourney: (state, action) => {
      console.log('Mission ajoutée');
      console.log(state.value.includes(action.payload), 'OK');
      let existing = state.value.find(
        (p) => p.entreprise === action.payload.entreprise
      );
      console.log(existing, 'EXISTING');
      console.log(state, 'STATE');
      if (!state.value.includes(action.payload)) {
        state.value.push(action.payload);
      }
    },
    loadMissionsJourney: (state, action) => {
      state.value = action.payload;
      console.log('Mission Loaded');
    },
    removeMission: (state, action) => {
      state.value = state.value.filter(
        (mission) => mission.idMission !== action.payload.title
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
