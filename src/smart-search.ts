import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { debounce } from "./utils/debounce";
import { highlight } from "./utils/highlight";
import { positionDropdown } from "./utils/position";
import "./theme.css";
import "./style.css";
import { SearchResultItem } from "./types";

@customElement("bank-smart-search")
export class BankSmartSearch extends LitElement {
  @property() placeholder = "Search…";
  @property({ type: Array }) results: SearchResultItem[] = [];
  @property({ type: Boolean }) highlight = true;
  @property({ type: Number }) debounceMs = 250;

  @state() private open = false;
  @state() private selectedIndex = 0;
  @state() private term = "";

  private inputRef!: HTMLInputElement;
  private dropdownRef!: HTMLDivElement;

  static style = css``; // styles in external CSS

  firstUpdated() {
    this.inputRef = this.renderRoot.querySelector("input")!;
    // dropdownRef will be set only when dropdown is rendered
  }

  private async updateDropdownPosition() {
    await this.updateComplete;
    this.dropdownRef = this.renderRoot.querySelector(".dropdown")!;
    if (this.inputRef && this.dropdownRef) {
      positionDropdown(this.inputRef, this.dropdownRef);
    }
  }

  private onInput = debounce((ev: any) => {
    this.term = ev.target.value;
    this.selectedIndex = 0;

    this.dispatchEvent(
      new CustomEvent("search-input", {
        detail: { term: this.term },
        bubbles: true,
        composed: true,
      })
    );

    this.open = true;
    this.updateDropdownPosition();
  }, this.debounceMs);

  private onKeyDown(e: KeyboardEvent) {
    if (!this.open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.selectedIndex = Math.min(this.selectedIndex + 1, this.results.length - 1);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    }

    if (e.key === "Enter") {
      this.selectItem(this.results[this.selectedIndex]);
    }

    if (e.key === "Escape") {
      this.open = false;
    }
  }

  private selectItem(item: SearchResultItem) {
    this.dispatchEvent(
      new CustomEvent("result-selected", {
        detail: item,
        bubbles: true,
        composed: true,
      })
    );
    this.open = false;
  }

  private renderItem(item: SearchResultItem, index: number) {
    const selected = index === this.selectedIndex;

    const title = this.highlight
      ? html`<span .innerHTML=${highlight(item.title, this.term)}></span>`
      : item.title;

    return html`
      <div
        class="item"
        ?selected=${selected}
        @click=${() => this.selectItem(item)}
      >
        <div>${title}</div>
        ${item.subtitle ? html`<div class="sub">${item.subtitle}</div>` : ""}
      </div>
    `;
  }

  render() {
    return html`
      <div class="search-container">
        <input
          type="text"
          placeholder=${this.placeholder}
          @input=${this.onInput}
          @keydown=${this.onKeyDown}
          @focus=${() => (this.open = true)}
        />

        <button class="clear-btn" @click=${() => (this.term = "", this.results = [])}>
          ×
        </button>

        ${this.open && this.results.length
          ? html`
              <div class="dropdown">
                ${this.results.map((item, i) => this.renderItem(item, i))}
              </div>
            `
          : ""}
      </div>
    `;
  }
}
