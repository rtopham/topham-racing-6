import { createSlice } from '@reduxjs/toolkit'

const initialState = { strava: {} }

const stravaSlice = createSlice({
  name: 'strava',
  initialState,
  reducers: {
    filterRaces: (state, action) => {
      const { filter, races } = action.payload
      state.activeFilter = filter
      state.races = races
      state.filtered = races.filter((race) => {
        switch (filter) {
          case 'current':
            return (
              new Date(race.race_date).getFullYear() ===
              new Date().getFullYear()
            )
          case 'lastYear':
            return (
              new Date(race.race_date).getFullYear() ===
              new Date().getFullYear() - 1
            )
          case 'ICUP':
            return race.series.match('Intermountain Cup')
          case 'Mid-Week':
            return race.series.match('Mid-Week')
          case 'USAC':
            return race.series.match('USAC')
          case 'Other':
            return (
              race.series !== 'Intermountain Cup' &&
              race.series !== 'Mid-Week' &&
              race.series !== 'USAC'
            )
          case 'Podiums':
            return race.rank <= 3 && race.rank !== 0
          case 'Wins':
            return race.rank === 1

          default:
            return race
        }
      })

      return state
    }
  }
})

export const { filterRaces } = stravaSlice.actions

export default stravaSlice.reducer
