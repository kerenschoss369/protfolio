import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { ClinicalDemo } from "@/components/demos/clinical/ClinicalDemo";
import { CLINICAL_FICTIONAL_NOTE } from "@/components/demos/clinical/clinical-data";

afterEach(() => {
  cleanup();
});

describe("ClinicalDemo", () => {
  it("renders fictional note and mandatory safety copy", () => {
    render(<ClinicalDemo />);
    expect(screen.getByRole("blockquote")).toHaveTextContent(
      CLINICAL_FICTIONAL_NOTE,
    );
    expect(
      screen.getByText(
        /This portfolio simulation does not send data to OpenAI/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Portfolio simulation/i).length).toBeGreaterThan(
      0,
    );
  });

  it("does not expose arbitrary medical input or file upload", () => {
    const { container } = render(<ClinicalDemo />);
    expect(container.querySelector("textarea")).toBeNull();
    expect(container.querySelector('input[type="file"]')).toBeNull();
    expect(
      container.querySelector('form[action], form[method="post"]'),
    ).toBeNull();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  it("switches modes including architecture selection", async () => {
    const user = userEvent.setup();
    render(<ClinicalDemo />);

    await user.click(
      screen.getByRole("button", { name: /Extracted actions/i }),
    );
    expect(screen.getByText("Repeat CBC")).toBeInTheDocument();
    expect(screen.getByText(/Needs review/i)).toBeInTheDocument();
    expect(
      screen.getByText(/timing is not precise enough/i),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /System architecture/i }),
    );
    expect(
      screen.getByRole("button", { name: /1\. React/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /2\. Node API/i }));
    expect(
      screen.getByText(/Public HTTP boundary, Zod validation/i),
    ).toBeInTheDocument();
  });
});
