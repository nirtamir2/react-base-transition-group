import { Status } from "./types";
import { IItem, IItemWithStatus } from "./TransitionGroup";

export function mergeItemsStateWithNewItems<T extends IItem>(
  prevItemsState: IItemWithStatus<T>[],
  newItems: T[]
): IItemWithStatus<T>[] {
  const mergedItemsState: IItemWithStatus<T>[] = [];
  let newItemsIndex = 0;

  prevItemsState.forEach(prevItemState => {
    const isItemExistsInNewItems = newItems.some(
      newItem => newItem.id === prevItemState.item.id
    );
    if (!isItemExistsInNewItems) {
      mergedItemsState.push({
        item: prevItemState.item,
        status: Status.EXITED,
      });
    } else {
      // Add new props that have not added till prevItemState
      while (newItems[newItemsIndex].id !== prevItemState.item.id) {
        mergedItemsState.push({
          item: newItems[newItemsIndex],
          status: Status.ENTERED,
        });
        newItemsIndex += 1;
      }

      mergedItemsState.push(prevItemState);
      newItemsIndex += 1;
    }
  });

  // Add only new items that does not exists (if added to the end of the array)
  while (newItemsIndex < newItems.length) {
    const newItem = newItems[newItemsIndex];
    if (!mergedItemsState.some(i => i.item.id === newItem.id)) {
      mergedItemsState.push({ item: newItem, status: Status.ENTERED });
    }
    newItemsIndex += 1;
  }

  return mergedItemsState;
}
