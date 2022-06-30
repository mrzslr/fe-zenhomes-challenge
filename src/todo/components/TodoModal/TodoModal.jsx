import LazyImage from "../../../shared/components/LazyImage";

const TodoModal = ({isShown, todo, onClose}) => {
    return isShown ? (<div>
        <section className="modal-wrapper">
            <LazyImage src={todo?.picture?.large} alt={todo?.picture?.large} />
            <div className="todo_description">{todo?.description}</div>
            <button type="button" onClick={onClose}>
                Close
            </button>
        </section>
    </div>) : null
}
export default TodoModal;