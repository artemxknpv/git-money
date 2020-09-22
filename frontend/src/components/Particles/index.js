import React from 'react'
import Particles from 'react-particles-js';


const Particlesdiv = () => {
  return (
    <Particles params={{

      particles: {
        number:{
          value: 30,
        },
        shape:{
          stroke:{
            width: 0.5,
            color: '#6dc4c4',
          },
        },

      line_linked: {
      shadow: {
      enable: true,
      color: '#6dc4c4',
      blur: 1,
    },
        distance: 200,
        opacity: 0.24,
        width: 1,
    }
    }
    }}
               style={{
                 position: 'fixed',
                 width: '100%',
                 height: '100%',
                 zIndex: '-100',
               }}
    />
  )
}

export default  Particlesdiv
