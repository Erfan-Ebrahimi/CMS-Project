import './ErrorBox.scss';

const ErrorBox = ({msg}) => {
  return (
    <div className='msg-err'>
        <h1>{msg}</h1>
    </div>
  )
}

export default ErrorBox;