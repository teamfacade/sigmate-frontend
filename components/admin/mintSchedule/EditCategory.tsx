import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { CategoryControll } from 'components/admin/mintSchedule';
import { BlueBtnStyle } from 'styles/styleLib';

const fetcher: Fetcher<CollectionCategoryType[], string> = async (
  url: string
) => {
  try {
    const res = await Axios.get(url);
    return res.data.categories;
  } catch {
    return [{ id: -1, name: 'ERR' }];
  }
};

export default function EditCategory() {
  const dispatch = useAppDispatch();
  const [pending, setPending] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const { data: options, mutate } = useSWR(
    '/wiki/collection/category',
    fetcher
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setPending(true);
      const { name, dataset } = e.currentTarget;
      switch (name) {
        case 'Delete':
          dispatch(
            AuthRequiredAxios({
              method: 'DELETE',
              url: `/wiki/collection/category/${dataset.id}`,
            })
          ).then(async (action: any) => {
            if (action.payload.status === 200) {
              alert('Deleted');
              await mutate();
            } else if (action.payload.status === 409) {
              alert('Category has descendant utilities.');
            } else
              alert(
                `Error while creating new category: ${action.payload.status}`
              );
            setPending(false);
          });
          break;
        case 'Create':
          dispatch(
            AuthRequiredAxios({
              method: 'POST',
              url: '/wiki/collection/category',
              data: {
                name: newName,
              },
            })
          ).then((action: any) => {
            if (action.payload.status === 201) {
              mutate(options?.concat(action.payload.data.category)).then(() =>
                alert('Created new category')
              );
            } else
              alert(
                `Error while creating new category: ${action.payload.status}`
              );
            setPending(false);
          });
          break;
        default:
          break;
      }
    },
    [options, mutate, newName]
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setNewName(e.currentTarget.value),
    []
  );

  return (
    <BasicWrapper>
      <SectionWrapper header="Edit Categories">
        <Wrapper>
          {options?.map((option) => {
            return (
              <CategoryControll
                key={option.id}
                option={option}
                pending={pending}
                setPending={setPending}
                onClick={onClick}
              />
            );
          })}
        </Wrapper>
        <FlexWrapper>
          <input type="text" value={newName} onChange={onChange} />
          <CreateNewBtn name="Create" disabled={pending} onClick={onClick}>
            Add new category
          </CreateNewBtn>
        </FlexWrapper>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 315px;
  margin-bottom: 16px;
  overflow: auto;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateNewBtn = styled.button`
  ${BlueBtnStyle};
`;
