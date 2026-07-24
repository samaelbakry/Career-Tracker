import React from 'react'

export default function ScreensLayout({children}:{children:React.ReactNode}) {
  return (
    <div>
        NAVBAR , CHILDREN , FOOTER
        {children}
    </div>
  )
}
