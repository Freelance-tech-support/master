import React from 'react'
import classes from './Question.module.css'
import Paper from '../../UI/Paper/Paper'

const Question = props => {
   return (
      <Paper>
      <div className={classes.Question}>
         {props.title} {props.user} {props.description}
      </div>
      </Paper>

   )
}

export default Question