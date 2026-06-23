import { renderHook, act } from "@testing-library/react";
import { useProfileCompletionStore } from "@/store/profileCompletionStore";

describe("Profile Completion Store", () => {
  beforeEach(() => {
    // Clear store before each test
    const store = useProfileCompletionStore.getState();
    store.clearDismissedItems();
    store.resetFields();
  });

  it("should calculate completion percentage correctly", () => {
    const { result } = renderHook(() => useProfileCompletionStore());

    act(() => {
      const fields = result.current.fields.map((f, i) => ({
        ...f,
        filled: i < 3, // Fill first 3 fields
      }));
      result.current.setFields(fields);
    });

    expect(result.current.getCompletionPercentage()).toBe(50); // 3/6 = 50%
  });

  it("should dismiss items correctly", () => {
    const { result } = renderHook(() => useProfileCompletionStore());

    act(() => {
      result.current.dismissItem("bio");
    });

    expect(result.current.dismissedItems.has("bio")).toBe(true);
  });

  it("should restore dismissed items", () => {
    const { result } = renderHook(() => useProfileCompletionStore());

    act(() => {
      result.current.dismissItem("bio");
      result.current.restoreItem("bio");
    });

    expect(result.current.dismissedItems.has("bio")).toBe(false);
  });

  it("should sort incomplete fields by importance", () => {
    const { result } = renderHook(() => useProfileCompletionStore());

    const incomplete = result.current.getIncompleteFields();

    // Check that high importance fields come first
    const firstField = incomplete[0];
    expect(firstField.importance).toBe("high");
  });

  it("should detect when all items are dismissed", () => {
    const { result } = renderHook(() => useProfileCompletionStore());

    act(() => {
      result.current.fields
        .filter((f) => !f.filled)
        .forEach((f) => result.current.dismissItem(f.id));
    });

    expect(result.current.hasDismissedAll()).toBe(true);
  });
});
