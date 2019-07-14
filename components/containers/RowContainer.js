import React from 'react'

export default function RowContainer({ children }) {
  return (
    <div style={ row_container }>
      { children }
    </div>
  )
}

const row_container = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
}
