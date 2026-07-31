#!/usr/bin/env python3
"""
Vexloft Data — portfolio PDF builder.

Generates one polished, dark-themed A4 portfolio PDF per dashboard, combining
marketing copy, the live demo link, framed dashboard screenshots and a KPI strip.

Run:  python3 scripts/pdf/build_portfolios.py
Out:  public/demo/pdf/<slug>-portfolio.pdf
"""

from __future__ import annotations

import json
import os
import tempfile
from typing import Any

from PIL import Image as PILImage, ImageDraw
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Image, Table,
    TableStyle, KeepTogether,
)

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
JSON_DIR = os.path.join(ROOT, "lib", "demo-data", "data")
SHOTS = "/private/tmp/claude-501/-Users-fatihozata/04454412-54a9-4a51-b29c-7e935c341b4e/scratchpad/shots"
OUT_DIR = os.path.join(ROOT, "public", "demo", "pdf")
TMP_IMG = os.path.join(tempfile.gettempdir(), "vexloft-pdf-img")
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(TMP_IMG, exist_ok=True)

# palette
BG = HexColor("#080c17")
CARD = HexColor("#0f1524")
INDIGO = HexColor("#6366f1")
VIOLET = HexColor("#8b5cf6")
CYAN = HexColor("#22d3ee")
WHITE = HexColor("#f5f6fa")
MUTED = HexColor("#9aa4b8")
FAINT = HexColor("#5b6577")
BORDER = HexColor("#232b3d")
GREEN = HexColor("#34d399")

PAGE_W, PAGE_H = A4
MARGIN = 42

# ---------------------------------------------------------------- copy
CONTENT: dict[str, dict[str, Any]] = {
    "sales": {
        "tagline": "Raw sales exports in. Decisions out.",
        "intro": "Most sales reporting lives in five different spreadsheets that nobody opens twice. "
                 "This dashboard replaces all of them with a single screen. It takes a full year of "
                 "NovaRetail's transactions and turns them into something a sales lead can actually read "
                 "in ten seconds — revenue, margin, how each region is pulling its weight, and which "
                 "products are quietly carrying the quarter. Filter by region or category and every chart "
                 "updates on the spot.",
        "delivers": [
            "Headline KPI scorecard — revenue, gross profit, margin, target achievement",
            "Monthly revenue & profit trend with target tracking",
            "Revenue split by category and by region",
            "Top-performing products, ranked",
            "One-click filters (region × category) across the whole board",
        ],
        "matters": [
            "Catch the months you missed target — and see why",
            "Spot the regions and products worth doubling down on",
            "Retire the weekly copy-paste report for good",
            "The same numbers your team trusts in Excel — just readable",
        ],
        "images": [("sales-top.png", None), ("region-viewport.png", None)],
    },
    "inventory": {
        "tagline": "Reorder before you run out. Not after.",
        "intro": "Stockouts lose the sale; dead stock ties up the cash. AeroParts tracks fifty parts across "
                 "three warehouses, and this dashboard gives them a live read on all of it — what's on hand, "
                 "what it's worth, and exactly which SKUs have dropped below their reorder point. The parts "
                 "that need attention are colour-coded and pushed to the top, so the buyer sees them first "
                 "thing in the morning, not after a customer calls.",
        "delivers": [
            "Inventory value by category and warehouse",
            "Live stock-status split — in stock, low, reorder, out",
            "Top SKUs by value, ranked",
            "Automatic reorder-alert list, sorted by urgency",
            "Turnover and average lead-time KPIs",
        ],
        "matters": [
            "Never get caught out by a stockout again",
            "Free up cash sitting in overstocked shelves",
            "Give the buyer a to-do list, not a spreadsheet",
            "Filter to any category, warehouse or status instantly",
        ],
        "images": [("inv-top.png", None), ("inv-bottom.png", None)],
    },
    "procurement": {
        "tagline": "See where the money goes — and which suppliers earn it.",
        "intro": "Procurement without visibility is just paying invoices and hoping. This board tracks every "
                 "euro Meridian spends — by category, by supplier, by month — and flags the purchase orders "
                 "that are open or overdue. Then it scores each supplier on the three things that actually "
                 "matter: do they deliver on time, is the quality there, and is the price right. The weak "
                 "links show up as a C. The ones worth a long-term contract show up as an A.",
        "delivers": [
            "Spend analysis by category and by supplier",
            "Open vs overdue purchase-order tracking",
            "Monthly spend trend",
            "Supplier scorecard — OTD, quality, price, A–C rating",
            "Savings-versus-baseline KPI",
        ],
        "matters": [
            "Know your biggest spend before contracts renew",
            "Hold suppliers to numbers, not gut feel",
            "Catch overdue orders before they stall production",
            "Walk into negotiations with the scorecard in hand",
        ],
        "images": [("proc-top2.png", None), ("proc-top.png", None)],
    },
    "executive": {
        "tagline": "The whole business on one screen.",
        "intro": "Executives don't want ten reports — they want one, and they want it in under a minute. "
                 "This board rolls Vantage Group's finance, sales and operations into a single snapshot: "
                 "revenue against EBITDA month by month, how each division is performing, where the margin "
                 "is, and which regions are driving it. It's the page you put on the boardroom screen and "
                 "actually leave up.",
        "delivers": [
            "Company KPI scorecard — revenue, EBITDA, win rate, OTD, headcount, eNPS",
            "Revenue vs EBITDA trend, toggleable by metric",
            "Revenue by department and by region",
            "Department table — revenue, YoY growth, margin",
        ],
        "matters": [
            "One source of truth for the leadership team",
            "Growth and margin side by side, no digging",
            "Board-ready in a single screen",
            "Swap in real figures and it becomes your monthly review",
        ],
        "images": [("exec-mid.png", None), ("exec-bottom.png", None)],
    },
}


# ---------------------------------------------------------------- image prep
def prep_image(name: str, cropfrac: tuple[float, float] | None) -> str:
    """Paint over the Next dev badge, optional vertical crop, return processed path."""
    src = os.path.join(SHOTS, name)
    img = PILImage.open(src).convert("RGB")
    w, h = img.size
    # cover the dev indicator in the bottom-left corner
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, h - 150, 165, h], fill=(8, 12, 23))
    if cropfrac:
        top, bottom = cropfrac
        img = img.crop((0, int(h * top), w, int(h * bottom)))
    out = os.path.join(TMP_IMG, f"p-{name}")
    img.save(out, "PNG")
    return out


def framed_image(path: str, max_w: float, max_h: float) -> Table:
    img = PILImage.open(path)
    iw, ih = img.size
    ratio = iw / ih
    w = max_w
    h = w / ratio
    if h > max_h:
        h = max_h
        w = h * ratio
    pic = Image(path, width=w, height=h)
    t = Table([[pic]], colWidths=[w])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CARD),
        ("BOX", (0, 0), (-1, -1), 0.75, BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    t.hAlign = "CENTER"
    return t


# ---------------------------------------------------------------- styles
def styles() -> dict[str, ParagraphStyle]:
    return {
        "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=26,
                                 leading=29, textColor=WHITE),
        "tagline": ParagraphStyle("tagline", fontName="Helvetica-Oblique", fontSize=12.5,
                                   leading=16, textColor=CYAN, spaceBefore=4),
        "eyebrow": ParagraphStyle("eyebrow", fontName="Helvetica-Bold", fontSize=8.5,
                                   leading=11, textColor=INDIGO),
        "intro": ParagraphStyle("intro", fontName="Helvetica", fontSize=10.3,
                                 leading=15.5, textColor=HexColor("#c7cede")),
        "h": ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=9.5, leading=12,
                             textColor=WHITE, spaceAfter=5),
        "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=9, leading=13.5,
                                  textColor=HexColor("#b6bed0")),
        "kpi_val": ParagraphStyle("kv", fontName="Helvetica-Bold", fontSize=15, leading=17,
                                   textColor=WHITE),
        "kpi_lbl": ParagraphStyle("kl", fontName="Helvetica", fontSize=7, leading=9,
                                  textColor=MUTED),
        "cap": ParagraphStyle("cap", fontName="Helvetica-Oblique", fontSize=7.5, leading=10,
                              textColor=FAINT),
        "chip": ParagraphStyle("chip", fontName="Helvetica-Bold", fontSize=8.5, leading=11,
                               textColor=WHITE),
    }


def bullets(items: list[str], st: ParagraphStyle) -> list[Paragraph]:
    out = []
    for it in items:
        out.append(Paragraph(f'<font color="#6366f1">▸</font>&nbsp; {it}', st))
        out.append(Spacer(1, 3))
    return out


# ---------------------------------------------------------------- page frame
def make_on_page(company: str, url: str):
    def on_page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(BG)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        # top gradient band
        band_h = 5
        strips = 120
        cols = [(0x63, 0x66, 0xf1), (0x8b, 0x5c, 0xf6), (0x22, 0xd3, 0xee)]
        for i in range(strips):
            t = i / (strips - 1)
            if t < 0.5:
                a, b, tt = cols[0], cols[1], t / 0.5
            else:
                a, b, tt = cols[1], cols[2], (t - 0.5) / 0.5
            r = (a[0] + (b[0] - a[0]) * tt) / 255
            g = (a[1] + (b[1] - a[1]) * tt) / 255
            bl = (a[2] + (b[2] - a[2]) * tt) / 255
            canvas.setFillColorRGB(r, g, bl)
            canvas.rect(i * PAGE_W / strips, PAGE_H - band_h,
                        PAGE_W / strips + 1, band_h, fill=1, stroke=0)
        # brand row
        canvas.setFont("Helvetica-Bold", 9)
        canvas.setFillColor(WHITE)
        canvas.drawString(MARGIN, PAGE_H - 22, "VEXLOFT")
        canvas.setFillColor(CYAN)
        canvas.drawString(MARGIN + 48, PAGE_H - 22, "DATA")
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(MUTED)
        canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 22, url)
        # footer
        canvas.setStrokeColor(BORDER)
        canvas.setLineWidth(0.5)
        canvas.line(MARGIN, 34, PAGE_W - MARGIN, 34)
        canvas.setFont("Helvetica", 7.5)
        canvas.setFillColor(FAINT)
        canvas.drawString(MARGIN, 24, "Built by Atakan Harman  ·  Vexloft Data  ·  Sample project, fictional data")
        canvas.drawRightString(PAGE_W - MARGIN, 24, "vexloft.com")
        canvas.restoreState()
    return on_page


def link_pill(url: str, st: dict[str, ParagraphStyle]) -> Table:
    p = Paragraph(
        f'<font color="#22d3ee">▶</font>&nbsp;&nbsp;'
        f'<font color="#ffffff"><b>Explore it live</b></font>&nbsp;&nbsp;'
        f'<font color="#c7cede">{url}</font>',
        ParagraphStyle("pill", fontName="Helvetica", fontSize=10, leading=13, textColor=WHITE))
    t = Table([[p]], colWidths=[PAGE_W - 2 * MARGIN])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HexColor("#141b2e")),
        ("BOX", (0, 0), (-1, -1), 1, INDIGO),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("ROUNDEDCORNERS", [6, 6, 6, 6]),
    ]))
    return t


def kpi_strip(kpis: list[dict[str, Any]], st: dict[str, ParagraphStyle]) -> Table:
    picks = kpis[:4]
    cells = []
    for k in picks:
        inner = Table(
            [[Paragraph(k["value"], st["kpi_val"])],
             [Paragraph(k["label"].upper(), st["kpi_lbl"])]],
            colWidths=[(PAGE_W - 2 * MARGIN) / 4 - 8])
        inner.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), CARD),
            ("LINEABOVE", (0, 0), (-1, 0), 2, VIOLET),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ("TOPPADDING", (0, 0), (0, 0), 9),
            ("TOPPADDING", (0, 1), (0, 1), 0),
            ("BOTTOMPADDING", (0, 0), (0, 0), 1),
            ("BOTTOMPADDING", (0, 1), (0, 1), 9),
        ]))
        cells.append(inner)
    row = Table([cells], colWidths=[(PAGE_W - 2 * MARGIN) / 4] * 4)
    row.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return row


def build(slug: str, data: dict[str, Any], st: dict[str, ParagraphStyle]) -> str:
    c = CONTENT[slug]
    url = f"data.vexloft.com/{slug}"
    out_path = os.path.join(OUT_DIR, f"{slug}-portfolio.pdf")
    content_w = PAGE_W - 2 * MARGIN

    doc = BaseDocTemplate(
        out_path, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN, topMargin=48, bottomMargin=44,
        title=f"{data['title']} — Vexloft Data", author="Atakan Harman")
    frame = Frame(MARGIN, 44, content_w, PAGE_H - 48 - 44, id="main",
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="p", frames=[frame],
                                       onPage=make_on_page(data["company"], url))])

    story: list[Any] = []
    story.append(Paragraph(f"{data['company'].upper()}  —  INTERACTIVE EXCEL &amp; BI DASHBOARD", st["eyebrow"]))
    story.append(Spacer(1, 7))
    story.append(Paragraph(data["title"], st["title"]))
    story.append(Paragraph(c["tagline"], st["tagline"]))
    story.append(Spacer(1, 12))
    story.append(link_pill(url, st))
    story.append(Spacer(1, 13))
    story.append(Paragraph(c["intro"], st["intro"]))
    story.append(Spacer(1, 14))
    story.append(framed_image(prep_image(*c["images"][0]), content_w, 300))
    story.append(Paragraph("Live interactive dashboard — filter, drill down, then open the real Excel file behind it.", st["cap"]))
    story.append(Spacer(1, 16))

    # two-column value
    left = [Paragraph("WHAT IT DELIVERS", st["h"])] + bullets(c["delivers"], st["bullet"])
    right = [Paragraph("WHY IT MATTERS", st["h"])] + bullets(c["matters"], st["bullet"])
    cols = Table([[left, right]], colWidths=[content_w / 2 - 8, content_w / 2 - 8])
    cols.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, 0), 0),
        ("LEFTPADDING", (1, 0), (1, 0), 16),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(cols)
    story.append(Spacer(1, 16))

    story.append(KeepTogether([
        framed_image(prep_image(*c["images"][1]), content_w, 300),
        Paragraph("Every chart, KPI and table is built natively inside the .xlsx — no screenshots, no images.", st["cap"]),
    ]))
    story.append(Spacer(1, 16))
    story.append(Paragraph("HEADLINE METRICS", st["h"]))
    story.append(Spacer(1, 4))
    story.append(kpi_strip(data["kpis"], st))

    doc.build(story)
    return out_path


def main() -> None:
    st = styles()
    for slug in ("sales", "inventory", "procurement", "executive"):
        with open(os.path.join(JSON_DIR, f"{slug}.json"), encoding="utf-8") as f:
            data = json.load(f)
        path = build(slug, data, st)
        print(f"  pdf -> {os.path.relpath(path, ROOT)}  ({os.path.getsize(path)//1024} KB)")
    print("Done.")


if __name__ == "__main__":
    main()
