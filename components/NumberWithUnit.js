import { CountUp } from 'use-count-up';

export default function NumberWithUnit({
  unit = Unit.none,
  value,
  prefix = '',
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

    default:
      break;
  }
  return (
    <b>
      <CountUp
        isCounting
        end={value}
        duration={2}
        prefix={prefix}
        suffix={unit === Unit.none ? '' : ' ' + unit}
        decimalPlaces={
          typeof decimalPlaces !== 'undefined'
            ? decimalPlaces
            : unit === Unit.none
            ? 0
            : 2
        }
      />
    </b>
  );
}

const Unit = {
  none: 'none',
  seconds: 'seconds',
  minutes: 'minutes',
  hours: 'hours',
  days: 'days',
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
