import {
  useState,
  useCallback,
  MouseEventHandler,
  ChangeEventHandler,
} from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';

type PropsType = {
  option: CollectionCategoryType;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function CategoryControll({ option, onClick }: PropsType) {
  const dispatch = useAppDispatch();
  const [newName, setNewName] = useState<string>(option.name);
  const [editting, setEditting] = useState<boolean>(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setNewName(e.currentTarget.value),
    []
  );

  const onClickEdit: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (editting) {
      dispatch(
        AuthRequiredAxios({
          method: 'PATCH',
          url: `/wiki/collection/category/${option.id}`,
          data: {
            name: newName,
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
  }, [editting, newName]);

  return (
    <FlexWrapper>
      {editting ? (
        <input type="text" value={newName} onChange={onChange} />
      ) : (
        <p>{newName}</p>
      )}
      <div>
        <button type="button" onClick={onClickEdit}>
          {editting ? 'Save' : 'Edit'}
        </button>
        <button
          type="button"
          name="Delete"
          data-id={option.id}
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
`;
