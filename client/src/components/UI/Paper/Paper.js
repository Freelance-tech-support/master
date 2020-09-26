import React from 'react'
import classes from './Paper.module.css'

const Paper = ({children, ...rest}) => {

   return (
      <div className={classes.Paper} {...rest}>
         {children}
      </div>
   )
}

export default Paper