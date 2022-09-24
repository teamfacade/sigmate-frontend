import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import convertDate from 'lib/global/convertDate';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { categories } from 'pages/admin/forum';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { NamedInput } from 'components/admin/mintSchedule';
import { BlueBtnStyle } from 'styles/styleLib';

type PropsType = {
  type: 'New' | 'Edit' | 'Category';
  id: number;
};

const tiers = Array.from({ length: 5 }, (_, i) => i + 1);
const units = ['ETH', 'SOL', 'KLAY', 'MATIC'];

const fetcher = async (id: number) => {
  try {
    const res = await Axios.get(`/calendar/minting/${id}`);
    return res.data.data;
  } catch {
    alert('Error while fetching minting schedule data.\r\nPlease try again.');
    return null;
  }
};

export default function EditSchedule({ type, id }: PropsType) {
  const dispatch = useAppDispatch();
  const [schedule, setSchedule] = useState<Admin.MintScheduleType>({
    id,
    name: '',
    tier: 1,
    mintingTimeTimeStamp: Date.now(),
    mintingUrl: '',
    description: '',
    collectionSlug: '',
    mintingPrice: '',
    mintingPriceSymbol: 'ETH',
  });

  useEffect(() => {
    if (type === 'Edit') {
      fetcher(id).then((data) => {
        if (data) {
          setSchedule({
            id: data.id,
            name: data.name,
            tier: data.tier,
            mintingTimeTimeStamp: new Date(data.mintingTime).getTime(),
            mintingUrl: data.mintingUrl,
            description: data.description,
            collectionSlug: data.collection.id,
            mintingPrice: data.mintingPrice,
            mintingPriceSymbol: data.mintingPriceSymbol,
          });
        }
      });
    }
  }, [fetcher]);

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> =
    useCallback(
      (e) => {
        const { name: elemName, value } = e.currentTarget;

        switch (elemName) {
          case 'Name':
            setSchedule((cur) => ({
              ...cur,
              name: value,
            }));
            break;
          case 'Tier':
            setSchedule((cur) => ({
              ...cur,
              tier: Number.parseInt(value, 10),
            }));
            break;
          case 'Date':
            setSchedule((cur) => ({
              ...cur,
              mintingTimeTimeStamp: new Date(`${value} 00:00`).getTime(),
            }));
            break;
          case 'Time':
            setSchedule((cur) => {
              const YYYYMMDD = convertDate(
                new Date(cur.mintingTimeTimeStamp),
                'dateInput',
                '-'
              );

              return {
                ...cur,
                mintingTimeTimeStamp: new Date(
                  `${YYYYMMDD} ${value}`
                ).getTime(),
              };
            });
            break;
          case 'Category':
            setSchedule((cur) => ({
              ...cur,
              category: value,
            }));
            break;
          case 'Price':
            setSchedule((cur) => ({
              ...cur,
              mintingPrice: value,
            }));
            break;
          case 'Symbol':
            setSchedule((cur) => ({
              ...cur,
              mintingPriceSymbol: value,
            }));
            break;
          case 'MintingUrl':
            setSchedule((cur) => ({
              ...cur,
              mintingUrl: value,
            }));
            break;
          case 'Slug':
            setSchedule((cur) => ({
              ...cur,
              collectionSlug: value,
            }));
            break;
          case 'Description':
            setSchedule((cur) => ({
              ...cur,
              description: value,
            }));
            break;
          default:
            break;
        }
      },
      [id]
    );

  const onClickSubmit: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      if (schedule.name) {
        console.log(schedule);
        dispatch(
          AuthRequiredAxios({
            method: type === 'New' ? 'POST' : 'PATCH',
            url: `/calendar/minting${type === 'New' ? '' : `/${schedule.id}`}`,
            data: {
              name: schedule.name,
              tier: schedule.tier,
              mintingTime: new Date(schedule.mintingTimeTimeStamp),
              mintingUrl: schedule.mintingUrl,
              description: schedule.description,
              collection: schedule.collectionSlug,
              mintingPrice: schedule.mintingPrice,
              mintingPriceSymbol: schedule.mintingPriceSymbol,
            },
          })
        ).then((action: any) => {
          console.log(action.payload);
          if (action.payload.status === (type === 'New' ? 201 : 200))
            alert('Created/Edited a minting schedule.');
          else
            alert(
              `Error while creating a minting schedule.\r\nShow this code to youngwoo: ${action.payload.status}`
            );
        });
      } else {
        alert('Name is required.');
      }
    }, [schedule]);

  return (
    <BasicWrapper>
      <SectionWrapper
        header={
          type === 'New' ? 'New minting event' : 'Edit the minting schedule'
        }
      >
        <Wrapper>
          <NamedInput
            name="Name"
            inputElemName="Name"
            type="text"
            value={schedule.name || ''}
            onChange={onChange}
          />
          <p>tier</p>
          <select name="Tier" onChange={onChange}>
            {tiers.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
          <NamedInput
            name="Date"
            inputElemName="Date"
            type="date"
            value={
              convertDate(
                new Date(schedule.mintingTimeTimeStamp),
                'dateInput',
                '-'
              ) || ''
            }
            onChange={onChange}
          />
          <NamedInput
            name="Time"
            inputElemName="Time"
            type="time"
            value={
              convertDate(
                new Date(schedule.mintingTimeTimeStamp),
                'timeInput',
                ''
              ) || ''
            }
            onChange={onChange}
          />
          <div>
            <span>Category</span>
            <select name="Category" onChange={onChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex' }}>
            <NamedInput
              name="Price"
              inputElemName="Price"
              type="text"
              value={schedule.mintingPrice || ''}
              onChange={onChange}
            />
            <select name="Symbol" onChange={onChange}>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <NamedInput
            name="Minting Link"
            inputElemName="MintingUrl"
            type="url"
            value={schedule.mintingUrl || ''}
            onChange={onChange}
          />
          <NamedInput
            name="Collection slug"
            inputElemName="Slug"
            type="text"
            value={schedule.collectionSlug}
            onChange={onChange}
          />
          <NamedInput
            name="Description"
            inputElemName="Description"
            type="text"
            value={schedule.description || ''}
            onChange={onChange}
          />
        </Wrapper>
        <SaveBtn onClick={onClickSubmit}>
          {type === 'New' ? 'Create' : 'Save'}
        </SaveBtn>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const Wrapper = styled.div`
  height: 60vh;
  overflow: auto;
`;

const SaveBtn = styled.button`
  ${BlueBtnStyle};
  font-weight: 500;
`;
