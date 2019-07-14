import React from 'react'

export default function ColumnContainer({ children }) {
  return (
    <div style={ column_container }>
      { children }
    </div>
  )
}

const column_container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};