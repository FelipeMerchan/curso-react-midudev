import { test, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { translate } from "./services/translate";

vi.mock("./services/translate");

test("My App works as expected", async () => {
  vi.mocked(translate).mockResolvedValue("Hello, world");
  const user = userEvent.setup();
  const app = render(<App />);
  const textAreaFrom = app.getByPlaceholderText("Introducir texto");
  await user.type(textAreaFrom, "Hola, mundo");
  const result = await app.findByDisplayValue(
    /Hello, world/i,
    {},
    { timeout: 2000 }
  );

  expect(result).toBeTruthy();
});
