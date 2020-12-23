import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { UpdateState } from "./helpers/test_components";

test("it updates object state", async () => {
  const { getByTestId } = render(<UpdateState />);

  const name = "Foo Bar";
  const addr = "314 Pi Circle, Mathtown, MI 48628";

  fireEvent.change(getByTestId("name"), { target: { value: name } });
  await waitFor(() => expect(getByTestId("name").value).toBe(name));

  fireEvent.change(getByTestId("address"), { target: { value: addr } });
  await waitFor(() => expect(getByTestId("address").value).toBe(addr));

  fireEvent.submit(getByTestId("form"));
  await waitFor(() => expect(getByTestId("address-count")).toHaveTextContent("1"));
});

test("it updates array state", async () => {
  const { getByTestId } = render(<UpdateState />);

  const name = "Marty McFly";
  const addr = "248 US Hwy 12, Irish Hills, MI 48586";

  fireEvent.change(getByTestId("name"), { target: { value: name } });
  await waitFor(() => expect(getByTestId("name").value).toBe(name));

  fireEvent.change(getByTestId("address"), { target: { value: addr } });
  await waitFor(() => expect(getByTestId("address").value).toBe(addr));

  fireEvent.submit(getByTestId("form"));
  await waitFor(() => expect(getByTestId("address-count")).toHaveTextContent("1"));

  await waitFor(() => expect(getByTestId("person-0-name")).toHaveTextContent(name));
});

test("it updates object state with a fieldpath", async () => {
  const { getByTestId } = render(<UpdateState />);

  fireEvent.click(getByTestId("complexify"));
  await waitFor(() => expect(getByTestId("object-state")).toHaveTextContent("123"));
});

test("it updates array state with a fieldpath", async () => {
  const { getByTestId } = render(<UpdateState />);

  fireEvent.click(getByTestId("complexify-array"));
  await waitFor(() => expect(getByTestId("array-state")).toHaveTextContent("42"));
});

test("it resets state with the third parameter, the default setState", async () => {
  const { getByTestId } = render(<UpdateState />);

  fireEvent.click(getByTestId("complexify"));
  await waitFor(() => expect(getByTestId("object-state")).toHaveTextContent("123"));

  fireEvent.click(getByTestId("reset"));
  await waitFor(() => expect(getByTestId("object-state")).toHaveTextContent("404"));
});

test("it just writes over primitive state", async () => {
  const { getByTestId } = render(<UpdateState />);

  fireEvent.click(getByTestId("complexify"));
  await waitFor(() => expect(getByTestId("object-state")).toHaveTextContent("123"));

  fireEvent.click(getByTestId("simplify"));
  await waitFor(() => expect(getByTestId("object-state")).toHaveTextContent("23"));
});
