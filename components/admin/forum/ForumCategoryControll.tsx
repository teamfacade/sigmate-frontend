import {
  useState,
  useCallback,
  MouseEventHandler,
  ChangeEventHandler,
} from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import styles from 'styles/styleLib';

type PropsType = {
  category: Forum.CategoryType;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function ForumCategoryControll({
  category,
  onClick,
}: PropsType) {
  const dispatch = useAppDispatch();
  const [newName, setNewName] = useState<string>(category.name);
  const [newDescription, setNewDescription] = useState<string>(
    category.description
  );
  const [editting, setEditting] = useState<boolean>(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'Name':
        setNewName(value);
        break;
      case 'Description':
        setNewDescription(value);
        break;
      default:
        break;
    }
  }, []);

  const onClickEdit: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (editting) {
      dispatch(
        AuthRequiredAxios({
          method: 'PATCH',
          url: `/forum/c`,
          data: {
            id: category.id,
            name: newName,
            description: newDescription,
          },
        })
      ).then((action: any) => {
        if (action.payload.status === 200) {
          setNewName(newName);
          setEditting(false);
        } else {
          alert(
            `Error while updating category name. ERR: ${action.payload.status}`
          );
        }
      });
    } else setEditting(true);
  }, [editting, newName, newDescription]);

  return (
    <FlexWrapper>
      <CategoryInfoWrapper>
        {editting ? (
          <>
            <input
              type="text"
              name="Name"
              value={newName}
              onChange={onChange}
            />
            <input
              type="text"
              name="Description"
              value={newDescription}
              onChange={onChange}
            />
          </>
        ) : (
          <>
            <p>{newName}</p>
            <p>{newDescription}</p>
          </>
        )}
      </CategoryInfoWrapper>
      <div>
        <button type="button" onClick={onClickEdit}>
          {editting ? 'Save' : 'Edit'}
        </button>
        <button
          type="button"
          name="Delete"
          data-id={category.id}
          data-category-name={newName}
          onClick={onClick}
        >
          Delete
        </button>
      </div>
    </FlexWrapper>
  );
}

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 4px;
  border: 1px solid black;

  & + & {
    margin-top: 8px;
  }
`;

const CategoryInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  input,
  p {
    margin: 0;
  }

  input + input,
  p + p {
    margin-top: 4px;
  }

  p + p {
    color: ${styles.colors.logColor};
  }
`;
