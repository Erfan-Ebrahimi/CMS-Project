import ReactDOM from 'react-dom';
import './DetailsModal.scss';

//hideModal az ProductsTable miad
const DetailsModal = ({ children }) => {

  return ReactDOM.createPortal(
      <div className='modal-parent active'>
        <div className="details-modal">
            {/* Table ra dar ProductsTable misazim v be inja mifrestim */}
            {children}
        </div>
    </div> , document.getElementById('modals-parent')
  )
}

export default DetailsModal;