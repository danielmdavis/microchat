import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDown } from '@fortawesome/free-solid-svg-icons'

interface BottomButtonProps {
  scrollDown: any,
  isScrolledDown: boolean
}

export default function BottomButton(props: BottomButtonProps) {

  const scrollVisibility: any = props.isScrolledDown ? 'hidden' : 'visible'
  const resetTransition: string = props.isScrolledDown ? '' : 'bottom-button-transition'

  return (
    <div className={resetTransition}>
      <FontAwesomeIcon style={{ visibility: scrollVisibility }} onClick={props.scrollDown} className='icon' icon={faCircleDown} />
    </div>
  )
}
