import { ReactElement } from "react";
import LazyImage from "../../../shared/components/LazyImage";
import {Todo} from '../../model/Todo';

interface Props {
    isShown: boolean;
    todo: Todo;
    onClose: () => void;

}
const TodoModal: React.FC<Props> = ({isShown, todo, onClose}): ReactElement | null => {
    return isShown ? (<div>
        <section className="modal-wrapper">
            <LazyImage src={todo?.picture?.large} alt={todo?.picture?.large} />
            <div className="todo_description">{todo.location.timezone.description}</div>
            <button type="button" onClick={onClose}>
                Close
            </button>
        </section>
    </div>) : null
}
export default TodoModal;