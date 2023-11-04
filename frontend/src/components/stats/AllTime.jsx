import React, { Fragment } from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import SeriesIcon from '../races/SeriesIcon'
import { Icon, CHART_ICON } from '../icons'

const AllTime = ({ races }) => {
  const allTimeICUP = races.filter((race) =>
    race.series.match('Intermountain Cup')
  ).length

  const allTimeMidWeek = races.filter((race) =>
    race.series.match('Mid-Week')
  ).length
  const allTimeUSAC = races.filter((race) => race.series.match('USAC')).length

  const allTimeOther = races.length - allTimeICUP - allTimeUSAC - allTimeMidWeek

  const allTimePodiums = races.filter(
    (race) => race.rank <= 3 && race.rank !== 0
  ).length

  const allTimeWins = races.filter((race) => race.rank === 1).length

  let totalTime = 0
  let allTimeTimeString = ''

  races.forEach((race) => {
    let hms = race.time
    let a = hms.split(':')
    let seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2]
    totalTime = totalTime + seconds
  })

  let hoursprefix = ''
  let minutesprefix = ''
  let secondsprefix = ''
  let hours = Math.floor(totalTime / 3600)
  let minutes = Math.floor((totalTime - hours * 3600) / 60)
  let seconds = totalTime - hours * 3600 - minutes * 60
  if (hours < 10) hoursprefix = '0'
  if (minutes < 10) minutesprefix = '0'
  if (seconds < 10) secondsprefix = '0'
  allTimeTimeString =
    hoursprefix +
    hours +
    ':' +
    minutesprefix +
    minutes +
    ':' +
    secondsprefix +
    seconds

  return (
    <Fragment>
      {' '}
      <Card>
        <Card.Header as='h6'>
          <Icon icon={CHART_ICON} /> All Time
        </Card.Header>
        <Card.Body>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <SeriesIcon
                series='Intermountain Cup'
                styleString='statsLogoImage'
              />
              &nbsp;ICUP Races: {allTimeICUP}
            </ListGroupItem>
            <ListGroupItem>
              <SeriesIcon series='Mid-Week' styleString='statsLogoImage' />
              &nbsp;Mid-Week Races: {allTimeMidWeek}
            </ListGroupItem>
            <ListGroupItem>
              <SeriesIcon series='USAC' styleString='statsLogoImage' />
              &nbsp;USAC Races: {allTimeUSAC}
            </ListGroupItem>
            <ListGroupItem>
              <SeriesIcon series='default' styleString='statsLogoImage' />
              &nbsp;Other Races: {allTimeOther}
            </ListGroupItem>
            <ListGroupItem>Races: {races.length}</ListGroupItem>
            <ListGroupItem>Podiums: {allTimePodiums}</ListGroupItem>
            <ListGroupItem>Wins: {allTimeWins}</ListGroupItem>
            <ListGroupItem>Time: {allTimeTimeString}</ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default AllTime
