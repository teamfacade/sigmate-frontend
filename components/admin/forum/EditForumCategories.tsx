import { MouseEventHandler, useCallback } from 'react';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { ForumCategoryControll } from 'components/admin/forum';

const fetcher: Fetcher<Forum.CategoryType[], string> = async (url: string) => {
  try {
    const res = await Axios.get(url);
    return res.data.categories;
  } catch {
    return [{ id: -1, name: 'ERR' }];
  }
};

export default function EditForumCategories() {
  const dispatch = useAppDispatch();
  const { data: categories, mutate } = useSWR('/forum/c', fetcher);

  const onClickDelete: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { dataset } = e.currentTarget;
      if (dataset.id && dataset.categoryName)
        dispatch(
          AuthRequiredAxios({
            method: 'DELETE',
            url: `/forum/c/${dataset.id}`,
          })
        ).then(async (action: any) => {
          if (action.payload.status === 204) {
            alert('Deleted');
            await mutate(
              categories?.filter(
                (category: any) =>
                  category.id !== Number.parseInt(dataset.id || '0', 10)
              )
            );
          }
        });
    },
    [categories, mutate]
  );

  return (
    <BasicWrapper>
      <SectionWrapper header="Edit Categories">
        <Wrapper>
          {categories?.map((category) => (
            <ForumCategoryControll
              key={category.id}
              category={category}
              onClick={onClickDelete}
            />
          ))}
        </Wrapper>
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
