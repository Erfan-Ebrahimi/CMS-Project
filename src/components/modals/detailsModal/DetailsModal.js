import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import './DetailsModal.scss';


const DetailsModal = () => {
  return ReactDOM.createPortal(
    <div className='modal-parent active'>
        <div className="details-modal">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>نام محصول</th>
                        <th>قیمت</th>
                        <th>موجودی</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>روغن نباتی</td>
                        <td>100000 تومان</td>
                        <td>50</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    </div> , document.getElementById('modals-parent')
  )
}

export default DetailsModal