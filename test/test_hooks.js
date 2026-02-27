import { act, renderHook, waitFor } from "@testing-library/react";
import { setState } from "statezero";

import {
  useStatezero,
  useStatezeroPath,
  useStatezeroPathSync,
  useStatezeroSync,
} from "../src/index.js";

describe("useStatezero", () => {
  beforeEach(() => {
    setState("", {});
  });

  it("should return initial state value", () => {
    setState("count", 42);
    const { result } = renderHook(() => useStatezero("count"));
    expect(result.current).toBe(42);
  });

  it("should return undefined for non-existent path", () => {
    const { result } = renderHook(() => useStatezero("nonexistent"));
    expect(result.current).toBeUndefined();
  });

  it("should return full state when no selector provided", () => {
    setState("a", 1);
    setState("b", 2);
    const { result } = renderHook(() => useStatezero());
    expect(result.current).toEqual({ a: 1, b: 2 });
  });
});

describe("useStatezeroSync", () => {
  beforeEach(() => {
    setState("", {});
  });

  it("should return initial state value", () => {
    setState("value", "test");
    const { result } = renderHook(() => useStatezeroSync("value"));
    expect(result.current).toBe("test");
  });
});

describe("useStatezeroPath", () => {
  beforeEach(() => {
    setState("", {});
  });

  it("should return value and setter tuple", () => {
    setState("count", 10);
    const { result } = renderHook(() => useStatezeroPath("count"));
    expect(result.current[0]).toBe(10);
    expect(typeof result.current[1]).toBe("function");
  });

  it("should update state when setter is called", async () => {
    setState("count", 0);
    const { result } = renderHook(() => useStatezeroPath("count"));

    act(() => {
      result.current[1](5);
    });

    await waitFor(() => {
      expect(result.current[0]).toBe(5);
    });
  });

  it("should throw error for non-string path", () => {
    expect(() => {
      renderHook(() => useStatezeroPath(123));
    }).toThrow('must be called with a String "path" argument');
  });

  it("should throw error for function selector", () => {
    expect(() => {
      renderHook(() => useStatezeroPath(() => {}));
    }).toThrow('must be called with a String "path" argument');
  });
});

describe("useStatezeroPathSync", () => {
  beforeEach(() => {
    setState("", {});
  });

  it("should return value and setter tuple", () => {
    setState("name", "Alice");
    const { result } = renderHook(() => useStatezeroPathSync("name"));
    expect(result.current[0]).toBe("Alice");
    expect(typeof result.current[1]).toBe("function");
  });
});
