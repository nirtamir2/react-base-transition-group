import * as React from "react";
import { mergeItemsStateWithNewItems } from "./mergeItemsStateWithNewItems";
import { Status } from "./types";

type IId = string | number;

export interface IItem {
  id: IId;
}

export interface IItemWithStatus<T extends IItem> {
  item: T;
  status: Status;
}

interface IProps<T extends IItem> {
  initialStatus?: Status.ENTERED | Status.NONE;
  items: T[];
  renderItem: (item: T, status: Status) => React.ReactElement;
}

function getInitialItemsWithStatus<T>({
  items,
  initialStatus,
}: {
  items: T[];
  initialStatus: Status.ENTERED | Status.NONE;
}) {
  return items.map(item => ({
    item,
    status: initialStatus,
  }));
}

export function TransitionGroup<T extends IItem>(props: IProps<T>) {
  const { items: newItems, initialStatus = Status.NONE, renderItem } = props;
  const [itemsState, setItemsState] = React.useState<IItemWithStatus<T>[]>(() =>
    getInitialItemsWithStatus({ items: newItems, initialStatus })
  );

  React.useEffect(() => {
    const updatedItemsState = mergeItemsStateWithNewItems(itemsState, newItems);

    const hasChanges =
      updatedItemsState.length !== itemsState.length ||
      !updatedItemsState.every(i =>
        itemsState.some(
          state => state.item.id === i.item.id && state.status === i.status
        )
      );

    if (hasChanges) {
      setItemsState(updatedItemsState);
    }
  }, [newItems, itemsState]);

  const handleTransitionEnd = ({
    event,
    id,
  }: {
    event: React.TransitionEvent | React.AnimationEvent;
    id: IId;
  }) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    setItemsState(itemsState => {
      return itemsState.reduce((acc, current) => {
        if (current.item.id === id) {
          switch (current.status) {
            case Status.ENTERED:
              return [...acc, { item: current.item, status: Status.NONE }];
            case Status.NONE:
              return [...acc, current];
            case Status.EXITED:
              return acc;
            default:
              throw new Error(
                `<TransitionGroup> - unhandled Status ${current.status}`
              );
          }
        }
        return [...acc, current];
      }, [] as IItemWithStatus<T>[]);
    });
  };

  return itemsState.map(state => {
    const { item, status } = state;
    const { id } = item;
    const element = renderItem(item, status);
    return React.cloneElement(element, {
      key: id,
      onTransitionEnd: (event: React.TransitionEvent) => {
        handleTransitionEnd({ event, id });
      },
      onAnimationEnd: (event: React.AnimationEvent) => {
        handleTransitionEnd({ event, id });
      },
    });
    /** Casting to any because of bug in @types/react
     * @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356 */
  }) as any;
}
