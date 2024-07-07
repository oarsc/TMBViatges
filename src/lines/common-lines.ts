import { createElement, getElementById, querySelectorAll } from "../lib/dom-utils";
import { Line } from "./models";

export function openLine(line: Line, closeRest = true): boolean {
  const lineElement = getElementById(line.id)!;

  if (lineElement.classList.contains('open')) return false;

  if (closeRest) {
    querySelectorAll('.line.open').forEach(a => a.classList.remove('open'));
  }

  lineElement.classList.add('open');
  return true;
}

export function toggleLine(line: Line, closeRest = true) {

  const lineElement = getElementById(line.id)!;

  const isOpened = !openLine(line, closeRest);

  if (isOpened) {
    lineElement.classList.remove('open');
  }
}

export function generateHtmlLogo(line: Line): HTMLSpanElement {
  const logoWrapper = createElement('span', 'logo-wrapper');
  logoWrapper.style.display = 'inline-block';

  const logo = createElement('span', 'line-logo', logoWrapper);
  logo.setAttribute('content', line.logo);
  logo.style.backgroundColor = line.color;

  return logoWrapper;
}

export function toYyyyMmDd(date: Date = new Date()) {
  const ten = (i: number) => (i < 10 ? '0' : '') + i;

  const YYYY = date.getFullYear(),
  MM = ten(date.getMonth() + 1),
  DD = ten(date.getDate());

  return `${YYYY}-${MM}-${DD}`;
}

export function fromYyyyMmDd(yyyyMmDd?: string) {
  return yyyyMmDd && validateYyyyMmDd(yyyyMmDd)
    ? new Date(`${yyyyMmDd}T00:00:00`)
    : new Date();
}

export function validateYyyyMmDd(yyyyMmDd?: string): boolean {
  if (!yyyyMmDd) return true;

  if (yyyyMmDd.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = yyyyMmDd.split('-').map(Number);
    const date = new Date(year, month - 1, day); // Los meses en Date son de 0 a 11

    if (date.getFullYear() == year && date.getMonth() == (month - 1) && date.getDate() == day) {
      return true
    }
  }
  return false;
}