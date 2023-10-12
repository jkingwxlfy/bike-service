import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { headerSetModal } from '../../header/headerSlice';

import './mymodal.sass';

const MyModal = ({children}) => {

    const dispatch = useDispatch();

    const isModal = useSelector(state => state.header.isModal);

    const clazzWrapper = isModal ? "my-modal modal_active" : "my-modal";
    const clazzContent = isModal ? "my-modal_content modal_active" : "my-modal_content";

    return (
        <main className={clazzWrapper} onClick={() => dispatch(headerSetModal(false))}>
            <div className={clazzContent} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </main>
    )
}

export default MyModal;