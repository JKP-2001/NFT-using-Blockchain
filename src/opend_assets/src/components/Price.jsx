import React from 'react'

function Price(props) {
  return (
    <div>
      <div className="disButtonBase-root disChip-root makeStyles-price-23 disChip-outlined">
          <span className="disChip-label">{props.price} Etherium</span>
        </div>
    </div>
  )
}

export default Price
