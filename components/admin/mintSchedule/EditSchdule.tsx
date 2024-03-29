import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import Axios from 'lib/global/axiosInstance';
import convertDate, { changeToUTCinMilli } from 'lib/global/convertDate';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { categoriesFetcher } from 'pages/admin/minting-schedule';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { NamedInput } from 'components/admin/mintSchedule';
import { BlueBtnStyle } from 'styles/styleLib';
import useSWR from 'swr';

type PropsType = {
  type: 'New' | 'Edit' | 'Category';
  id: number;
};

const tiers = Array.from({ length: 5 }, (_, i) => i + 1);
const units = ['ETH', 'KLAY', 'ETC'];

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

  const { data: categories } = useSWR(
    `/wiki/collection/category`,
    categoriesFetcher
  );

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
          /*
          case 'Category':
            setSchedule((cur) => ({
              ...cur,
              category: value,
            }));
            break;
            */
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
        dispatch(
          AuthRequiredAxios({
            method: type === 'New' ? 'POST' : 'PATCH',
            url: `/calendar/minting${type === 'New' ? '' : `/${schedule.id}`}`,
            data: {
              name: schedule.name,
              tier: schedule.tier,
              // @todo : luxon 써서 timezone utc +0 맞춰서 보내기
              mintingTime: new Date(
                changeToUTCinMilli(new Date(schedule.mintingTimeTimeStamp))
              ),
              // mintingTime: new Date(schedule.mintingTimeTimeStamp),
              mintingUrl: schedule.mintingUrl || undefined,
              description: schedule.description,
              document: parseInt(schedule.collectionSlug, 10),
              mintingPrice: schedule.mintingPrice || undefined,
              mintingPriceSymbol: schedule.mintingPriceSymbol,
            },
          })
        ).then((action: any) => {
          if (action.payload.status === (type === 'New' ? 201 : 200))
            alert('Created/Edited a minting schedule.');
          else
            alert(
              `Error while creating a minting schedule.\r\nShow this code to youngwoo: 
              ${action.payload.status}${
                action.payload.status === 400
                  ? `\r\n${action.payload.data.validationErrors[0].param}: ${action.payload.data.validationErrors[0].msg}`
                  : ''
              }`
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
            name="Date (UTC)"
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
            name="Time (UTC)"
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
          {/*
          <div>
            <span>Category</span>
            <select name="Category" onChange={onChange}>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          */}
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
            name="Document id"
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
