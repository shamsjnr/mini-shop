import PrimaryButton from "./PrimaryButton"

function BottomSubmit({ type, action, buttonText, isFixed=false, disabled=false }) {
  return (
    <div className={`${isFixed && 'fixed bottom-0 left-0 right-0'} p-4 bg-white-90 dark:bg-gray-800/90 backdrop-blur-sm`}>
        <PrimaryButton type={type} className="w-full" disabled={disabled} onClick={ action }>{ buttonText }</PrimaryButton>
    </div>
  )
}

export default BottomSubmit
