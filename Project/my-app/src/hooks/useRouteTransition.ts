import { useTransition } from '@react-spring/web'
import { useLocation } from 'react-router-dom'

export const useRouteTransition = () => {
  const location = useLocation()
  
  return useTransition(location, {
    keys: location => location.pathname,
    from: { 
      opacity: 0, 
      transform: 'translate3d(100%,0,0)' 
    },
    enter: { 
      opacity: 1, 
      transform: 'translate3d(0%,0,0)' 
    },
    leave: { 
      opacity: 0, 
      transform: 'translate3d(-50%,0,0)' 
    },
    config: {
      tension: 300,
      friction: 30,
    },
    exitBeforeEnter: true,
  })
}