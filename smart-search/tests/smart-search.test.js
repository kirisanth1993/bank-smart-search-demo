import { fixture, html } from "@open-wc/testing";

describe("bank-smart-search", () => {
  it("renders component", async () => {
    const el = await fixture(html`<bank-smart-search></bank-smart-search>`);
    const input = el.shadowRoot.querySelector("input");
    expect(input).to.exist;
  });
});
