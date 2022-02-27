import CountUp from 'react-countup';
import { Label, Value, Wrapper } from './NumberWithUnits.elements';
import {
  msToDays,
  msToHours,
  msToMinutes,
  msToSeconds,
} from '../../lib/msConverter';

export enum Unit {
  NONE,
  SECONDS = ' seconds',
  MINUTES = ' minutes',
  HOURS = ' hours',
  DAYS = ' days',
  RATIO = '%',
}

interface NumberWithUnitProps {
  unit?: Unit;
  value: number;
  label: string;
  decimalPlaces: number;
}

export default function NumberWithUnit({
  unit = Unit.NONE,
  value,
  label,
  decimalPlaces,
}: NumberWithUnitProps) {
  switch (unit) {
    case Unit.SECONDS:
      value = msToSeconds(value);
      break;

    case Unit.MINUTES:
      value = msToMinutes(value);
      break;

    case Unit.HOURS:
      value = msToHours(value);
      break;

    case Unit.DAYS:
      value = msToDays(value);
      break;

    case Unit.RATIO:
      value *= 100;
      break;

    default:
      break;
  }

  const suffix = unit === Unit.NONE ? '' : unit === Unit.RATIO ? '%' : unit;

  return (
    <Wrapper>
      <Value>
        <CountUp
          end={value}
          duration={1}
          separator=" "
          suffix={`${suffix}`}
          decimals={decimalPlaces}
          decimal="."
        />
      </Value>
      <Label>{label}</Label>
    </Wrapper>
  );
}
