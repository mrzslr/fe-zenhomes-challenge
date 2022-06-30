import React, { useMemo } from "react";
import "./TodoItem.css";
import LazyImage from '../../../shared/components/LazyImage';
import TodoModal from "../TodoModal";
import {Todo as TodoObject, Location} from '../../model/Todo';

interface Props {
  todo: TodoObject,
  isCompleted: boolean,
  onChange: () => void,
}

const Todo: React.FC<Props> = ({ todo, onChange, isCompleted }) => {
  const [showModal, setShownModal] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);

  const handleModal = (): void => {
    setShownModal(!showModal);
  };

  const closeModal = (): void => {
    setShownModal(false);
  };

  React.useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);


  let formattedNames: any = [];

  const getNames = (names: {name: any}) => {
    if (names === Object(names)) {
      // Object here
      if (names.name != undefined && names.name != null) {
        if (Object.keys(names.name).length > 2) {
          for (const [key, value] of Object.entries(names.name)) {
            formattedNames += value;
          }
        } else {
          for (const [key, value] of Object.entries(names.name)) {
            formattedNames += key + value;
          }
        }
        return formattedNames;
      } else {
        return "No name";
      }
    } else if (Array.isArray(names)) {
      if (names.name != undefined && names.name != null) {
        if (names.name.length > 2) {
          for (const [key, value] of Object.entries(names.name)) {
            formattedNames += value;
            return formattedNames;
          }
        } else {
          for (const [key, value] of Object.entries(names.name)) {
            formattedNames += key + value;
            return formattedNames;
          }
        }
      } else {
        return "No name";
      }
    }
  };

  const userName = useMemo(() => getNames(todo), []);

  interface LocationProps {
    location: Location
  }
  const getLocation: React.FC<LocationProps> = ({ location }) => {
    const myStreetName = location.street.name;
    const myStreetNumber = location.street.number;
    const myPostcode = location.postcode;
    const myCity = location.city;
    const myState = location.state;
    const myCountry = location.country;

    return (
      <>
        Address: {myStreetName + " " + myStreetNumber}
        <br></br>
        <br></br>
        Postcode: {myPostcode}
      </>
    );
  };

  const userLocation = useMemo(() => getLocation(todo), []);

  const getPicture = (): JSX.Element => {
    return <LazyImage src={todo.picture.large} alt={todo.picture.large} />;
  };

  const onCompletedCheckboxClicked = (e: React.FormEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange();
  }

  return (
    <div className="todo" onClick={handleModal}>
      <div className="todo_title">{userName}</div>

      <div className="todo_image">{getPicture()}</div>

      <div className="todo_location">{userLocation}</div>

      <div className="todo_checkbox">
        Completed:{" "}
        <input
          type="checkbox"
          checked={completed}
          className="todo_checked"
          onClick={(e: React.FormEvent<HTMLInputElement>) => onCompletedCheckboxClicked(e)}
          readOnly
        />
      </div>
      <TodoModal isShown={showModal} todo={todo} onClose={closeModal} />
    </div>
  );
};

export default Todo;