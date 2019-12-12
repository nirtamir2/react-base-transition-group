import { Status } from "../src/types";
import { mergeItemsStateWithNewItems } from "../src/mergeItemsStateWithNewItems";

describe("mergeItemsStateWithNewItems", () => {
  it("should not change if no changes made to empty array", () => {
    expect(mergeItemsStateWithNewItems([], []).length).toBe(0);
  });

  it("should not change if no changes made", () => {
    const result = mergeItemsStateWithNewItems(
      [
        { item: { id: 1 }, status: Status.ENTERED },
        { item: { id: 2 }, status: Status.NONE },
        { item: { id: 3 }, status: Status.EXITED },
      ],
      [{ id: 1 }, { id: 2 }, { id: 3 }]
    );
    expect(result).toEqual([
      { item: { id: 1 }, status: Status.ENTERED },
      { item: { id: 2 }, status: Status.NONE },
      { item: { id: 3 }, status: Status.EXITED },
    ]);
  });

  it("should add items to an empty array", () => {
    const result = mergeItemsStateWithNewItems([], [{ id: 1 }, { id: 2 }]);
    expect(result).toEqual([
      { item: { id: 1 }, status: Status.ENTERED },
      { item: { id: 2 }, status: Status.ENTERED },
    ]);
  });

  it("should add items to the start", () => {
    const result = mergeItemsStateWithNewItems(
      [
        { item: { id: 2 }, status: Status.NONE },
        { item: { id: 3 }, status: Status.NONE },
      ],
      [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
    );

    expect(result).toEqual([
      { item: { id: 0 }, status: Status.ENTERED },
      { item: { id: 1 }, status: Status.ENTERED },
      { item: { id: 2 }, status: Status.NONE },
      { item: { id: 3 }, status: Status.NONE },
    ]);
  });

  it("should add items to the end", () => {
    const result = mergeItemsStateWithNewItems(
      [
        { item: { id: 1 }, status: Status.NONE },
        { item: { id: 2 }, status: Status.NONE },
      ],
      [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    );
    expect(result).toEqual([
      { item: { id: 1 }, status: Status.NONE },
      { item: { id: 2 }, status: Status.NONE },
      { item: { id: 3 }, status: Status.ENTERED },
      { item: { id: 4 }, status: Status.ENTERED },
    ]);
  });

  it("should remove item from the middle", () => {
    const result = mergeItemsStateWithNewItems(
      [
        { item: { id: 1 }, status: Status.NONE },
        { item: { id: 2 }, status: Status.NONE },
        { item: { id: 3 }, status: Status.NONE },
      ],
      [{ id: 1 }, { id: 3 }]
    );

    expect(result).toEqual([
      { item: { id: 1 }, status: Status.NONE },
      { item: { id: 2 }, status: Status.EXITED },
      { item: { id: 3 }, status: Status.NONE },
    ]);
  });

  it("should add items to the middle", () => {
    const result = mergeItemsStateWithNewItems(
      [
        { item: { id: 1 }, status: Status.NONE },
        { item: { id: 4 }, status: Status.NONE },
      ],
      [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    );

    expect(result).toEqual([
      { item: { id: 1 }, status: Status.NONE },
      { item: { id: 2 }, status: Status.ENTERED },
      { item: { id: 3 }, status: Status.ENTERED },
      { item: { id: 4 }, status: Status.NONE },
    ]);
  });

  it("should handle remove before add", () => {
    const result = mergeItemsStateWithNewItems(
      [
        { item: { id: 1 }, status: Status.NONE },
        { item: { id: 2 }, status: Status.NONE },
        { item: { id: 3 }, status: Status.NONE },
      ],
      [{ id: 1 }, { id: 4 }, { id: 3 }]
    );

    expect(result).toEqual([
      { item: { id: 1 }, status: Status.NONE },
      { item: { id: 2 }, status: Status.EXITED },
      { item: { id: 4 }, status: Status.ENTERED },
      { item: { id: 3 }, status: Status.NONE },
    ]);
  });

  it("should handle multiple removes before adds", () => {
    const result = mergeItemsStateWithNewItems(
      [
        { item: { id: 1 }, status: Status.NONE },
        { item: { id: 2 }, status: Status.NONE },
        { item: { id: 3 }, status: Status.NONE },
        { item: { id: 4 }, status: Status.NONE },
        { item: { id: 5 }, status: Status.NONE },
      ],
      [{ id: 1 }, { id: 10 }, { id: 3 }, { id: 5 }, { id: 6 }]
    );

    expect(result).toEqual([
      { item: { id: 1 }, status: Status.NONE },
      { item: { id: 2 }, status: Status.EXITED },
      { item: { id: 10 }, status: Status.ENTERED },
      { item: { id: 3 }, status: Status.NONE },
      { item: { id: 4 }, status: Status.EXITED },
      { item: { id: 5 }, status: Status.NONE },
      { item: { id: 6 }, status: Status.ENTERED },
    ]);
  });
});
