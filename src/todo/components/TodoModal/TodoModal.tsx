import { ReactElement } from "react";
import LazyImage from "../../../shared/components/LazyImage";
import { Todo } from '../../model/Todo';
import './TodoModal.css';

interface Props {
    isShown: boolean;
    todo: Todo;
    onClose: () => void;
}

const TodoModal: React.FC<Props> = ({ isShown, todo, onClose }): ReactElement | null => {
    return isShown ? (<div className="modal">
        <section className="modal-wrapper">
            <LazyImage src={todo?.picture?.large} alt={todo?.picture?.large} />
            <div className="modal-todo__description">{todo.location.timezone.description}</div>
            <div role="button" aria-label="Close" onClick={onClose} className="modal-close">
                &#10006;
            </div>
        </section>
    </div>) : null
}
export default TodoModal;