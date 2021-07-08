import { CountUp } from 'use-count-up';
import { format } from 'd3-format';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
`;

const Value = styled.p`
  font-weight: 600;
  font-size: 1.75em;
  letter-spacing: 0.05em;
  color: ${(props) => props.theme.fcPrimary};
  margin: 0 0 0.15em 0;
`;

const Label = styled.p`
  font-weight: 100;
  letter-spacing: 0.03em;
  color: ${(props) => props.theme.fcLight};
  margin: 0;
  text-transform: uppercase;
`;

export default function NumberWithUnit({
  unit = Unit.none,
  value,
  label,
  decimalPlaces,
}) {
  switch (unit) {
    case Unit.seconds:
      value = toSeconds(value);
      break;

    case Unit.minutes:
      value = toMinutes(value);
      break;

    case Unit.hours:
      value = toHours(value);
      break;

    case Unit.days:
      value = toDays(value);
      break;

    case Unit.ratio:
      value = value * 100;

    default:
      break;
  }
  return (
    <Wrapper>
      <Value>
        <CountUp
          isCounting
          end={value}
          duration={2}
          suffix={
            unit === Unit.none ? '' : unit === Unit.ratio ? ' %' : ' ' + unit
          }
          decimalPlaces={
            typeof decimalPlaces !== 'undefined'
              ? decimalPlaces
              : unit === Unit.none
              ? 0
              : 2
          }
          thousandsSeparator=","
        />
      </Value>
      <Label>{label}</Label>
    </Wrapper>
  );
}

const Unit = {
  none: 'none',
  seconds: 'seconds',
  minutes: 'minutes',
  hours: 'hours',
  days: 'days',
  ratio: 'ratio',
};

function toSeconds(time_in_ms) {
  return time_in_ms / 1000;
}

function toMinutes(time_in_ms) {
  return toSeconds(time_in_ms) / 60;
}

function toHours(time_in_ms) {
  return toMinutes(time_in_ms) / 60;
}

function toDays(time_in_ms) {
  return toHours(time_in_ms) / 24;
}
