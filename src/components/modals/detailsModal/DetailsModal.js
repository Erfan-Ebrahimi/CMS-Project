import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import './DetailsModal.scss';

//hideModal az ProductsTable miad
const DetailsModal = ({ hideModal }) => {

    useEffect(() => {
        const closed = (event) => {
            // 27 => ESCAPE in keyboard
            if (event.keyCode === 27){
                hideModal()
            }
        }
        
        window.addEventListener('keydown' , closed)

        //baray jelogiri az tadakhol event anra bad az unMouting remove mikonim
        //baray faze unMouting dar useEffect bayad return anjam dahim

        return () => window.removeEventListener('keydown' , closed)
    })

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