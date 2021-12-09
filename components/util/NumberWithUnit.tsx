import { CountUp } from 'use-count-up';
import { Label, Value, Wrapper } from './NumberWithUnits.elements';
import {
  msToDays,
  msToHours,
  msToMinutes,
  msToSeconds,
} from '../../lib/msConverter';

export enum Unit {
  NONE,
  SECONDS,
  MINUTES,
  HOURS,
  DAYS,
  RATIO,
}

interface NumberWithUnitProps {
  unit?: Unit;
  value: number;
  label: string;
  decimalPlaces?: number;
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
  decimalPlaces =
    typeof decimalPlaces !== 'undefined'
      ? decimalPlaces
      : unit === Unit.NONE
      ? 0
      : 2;

  return (
    <Wrapper>
      <Value>
        <CountUp
          isCounting
          end={value}
          duration={2}
          formatter={(value) => `${value} ${suffix}`}
          decimalPlaces={decimalPlaces}
          thousandsSeparator=","
        />
      </Value>
      <Label>{label}</Label>
    </Wrapper>
  );
}
