import {ListRenderItemInfo} from 'react-native';
import {RowMap} from 'react-native-swipe-list-view';

export type TSwipeListProps<T> = {
  listName?: string;
  data: any;
  renderItemComponent: any;
  renderItemProps?: any;
  renderHiddenItemComponent: any;
  renderHiddenItemProps?: any;
  disableRightSwipe?: boolean;
  disableLeftSwipe?: boolean;
  emptyProps?: TEmptyListComponent;
};

export type TSwipeListItemActionsProps<T> = {
  data: ListRenderItemInfo<T>;
  rowMap: RowMap<T>;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export enum EmptyTypes {
  receipt= 'receipt'
}

export type TEmptyListComponent = {
  emptyTitle?: string;
  emptyIcon?: string;
  type?: EmptyTypes
};
