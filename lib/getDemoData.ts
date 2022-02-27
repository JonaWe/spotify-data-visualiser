import data from './data.json';
import HistoryItem from './Types/HistoryItem';
export function getDemoData(): HistoryItem[] {
  return data as HistoryItem[];
}
