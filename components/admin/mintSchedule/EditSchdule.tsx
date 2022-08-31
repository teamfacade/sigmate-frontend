import { ChangeEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { NamedInput } from 'components/admin/mintSchedule';
import { BlueBtnStyle } from 'styles/styleLib';

type PropsType = {
  type: 'New' | 'Edit';
  id?: number;
  name?: string;
  tier?: number;
  date?: string;
};

const tiers = Array.from({ length: 5 }, (_, i) => i + 1);
const units = ['ETH', 'SOL', 'KLAY', 'MATIC'];

export default function EditSchedule({
  type,
  id,
  name: curName,
  date: curDate,
}: PropsType) {
  const [name, setName] = useState(curName);
  const [date, setDate] = useState(curDate);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name: elemName, value } = e.currentTarget;

      switch (elemName) {
        case 'name':
          setName(value);
          break;
        case 'date':
          setDate(value);
          break;
        default:
          break;
      }
    },
    [id]
  );

  return (
    <BasicWrapper>
      <SectionWrapper
        header={
          type === 'New' ? 'New minting event' : 'Edit the minting schedule'
        }
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <Wrapper>
            <NamedInput
              name="Name"
              inputElemName="name"
              type="text"
              value={name || ''}
              onChange={onChange}
            />
            <p>tier</p>
            <select name="tier">
              {tiers.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
            <NamedInput
              name="Date"
              inputElemName="date"
              type="date"
              value={date || ''}
              onChange={onChange}
            />
            <NamedInput
              name="Time"
              inputElemName="time"
              type="time"
              value=""
            />
            <div style={{ display: 'flex' }}>
              <NamedInput
                name="Price"
                inputElemName="price"
                type="text"
                value=""
              />
              <select name="unit">
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <NamedInput
              name="Minting Link"
              inputElemName="officialLink"
              type="url"
              value=""
            />
            <NamedInput
              name="Wiki Link"
              inputElemName="wikiLink"
              type="url"
              value=""
            />
            <NamedInput
              name="Twitter Link"
              inputElemName="twitterLink"
              type="url"
              value=""
            />
            <NamedInput
              name="Telegram Link"
              inputElemName="telegramLink"
              type="url"
              value=""
            />
            <NamedInput
              name="Discord Link"
              inputElemName="discordLink"
              type="url"
              value=""
            />
            <NamedInput
              name="Details"
              inputElemName="details"
              type="text"
              value=""
            />
          </Wrapper>
          <SaveBtn>{type === 'New' ? 'Create' : 'Save'}</SaveBtn>
        </form>
      </SectionWrapper>
    </BasicWrapper>
  );
}

const Wrapper = styled.div`
  height: 60vh;
  overflow: scroll;
`;

const SaveBtn = styled.button`
  ${BlueBtnStyle};
  font-weight: 500;
`;
