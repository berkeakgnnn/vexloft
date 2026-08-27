#!/usr/bin/env python3
"""
Vexloft Data — Fiverr Gig Kit PDF.
One designed, dark-themed PDF: seller bio + the 4 rewritten gigs (title, packages,
description, FAQ, tags) with a dashboard screenshot each. Copy-paste reference + portfolio.

Run:  python3 scripts/pdf/build_gig_kit.py   ->  public/demo/pdf/vexloft-gig-kit.pdf
"""
from __future__ import annotations

import os
import tempfile
from typing import Any

from PIL import Image as PILImage, ImageDraw
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Image, Table,
    TableStyle, KeepTogether, PageBreak,
)

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SHOTS = "/private/tmp/claude-501/-Users-fatihozata/04454412-54a9-4a51-b29c-7e935c341b4e/scratchpad/shots"
OUTDIR = os.path.join(ROOT, "public", "demo", "pdf")
TMP_IMG = os.path.join(tempfile.gettempdir(), "vexloft-gigkit-img")
os.makedirs(TMP_IMG, exist_ok=True)

BG = HexColor("#080c17"); CARD = HexColor("#0f1524"); INDIGO = HexColor("#6366f1")
VIOLET = HexColor("#8b5cf6"); CYAN = HexColor("#22d3ee"); WHITE = HexColor("#f5f6fa")
MUTED = HexColor("#9aa4b8"); FAINT = HexColor("#5b6577"); BORDER = HexColor("#232b3d")
HEADROW = HexColor("#1b2236")
PAGE_W, PAGE_H = A4
MARGIN = 42
CONTENT_W = PAGE_W - 2 * MARGIN

BIO = ("I'm Atakan, a mechanical engineer (MSc) who spent years in aviation and procurement "
       "drowning in spreadsheets — so I learned to build the dashboards I wished I'd had. "
       "Today I turn messy Excel exports into clean, interactive dashboards a manager can read "
       "in ten seconds. Everything I build is native Excel — real charts, KPIs, slicers and "
       "automation, not screenshots. See live samples at data.vexloft.com and open the exact "
       "Excel file behind each one.")
SKILLS = ["Microsoft Excel", "Dashboards", "Data Visualization", "KPI Reporting", "Power BI",
          "Google Sheets", "Excel Automation", "Pivot Tables", "Procurement Analytics",
          "Inventory Management"]

GIGS: list[dict[str, Any]] = [
    {
        "slug": "sales", "cat": "DATA · DATA ANALYTICS · BI ANALYTICS",
        "title": "Interactive Excel sales dashboard & KPI tracker",
        "tagline": "Turn a year of raw sales exports into a screen your sales lead reads in ten seconds.",
        "pkg_names": ["Sales Tracker", "Sales Dashboard", "Sales Analytics Pro"],
        "prices": ["€22.80", "€59.29", "€118.57"],
        "delivery": ["2 days", "4 days", "6 days"],
        "revisions": ["1", "2", "Unlimited"],
        "includes": ["Revenue tracker + basic KPIs",
                     "Interactive KPIs, trends, product analysis, charts, filters",
                     "Automated: revenue, profit, product, region, customer & exec KPIs"],
        "desc": "Revenue, margin, targets, top products, which region is pulling its weight — all on one "
                "interactive Excel dashboard. Filter by region or product and every chart updates instantly. "
                "The same numbers your team trusts in Excel, finally readable.",
        "build": ["Sales KPI scorecard — revenue, profit, margin, target achievement",
                  "Monthly & yearly trends, target vs actual",
                  "Product, customer and regional performance",
                  "Pivot tables, slicers and automated calculations"],
        "faq": [("Can you tailor it to my business?", "Yes — your KPIs, products, regions, customers and branding."),
                ("Can you improve my current sales report?", "Yes — redesign and automate your existing file."),
                ("Is my sales data confidential?", "Always — private, NDA on request.")],
        "tags": "sales dashboard · kpi dashboard · excel dashboard · sales analytics · sales tracker",
        "img": "sales-top.png",
    },
    {
        "slug": "inventory", "cat": "DATA · DATA ANALYTICS · BI ANALYTICS",
        "title": "Interactive inventory management Excel dashboard",
        "tagline": "Reorder before you run out. Not after.",
        "pkg_names": ["Stock Tracker", "Inventory Dashboard", "Inventory Analytics Pro"],
        "prices": ["€22.80", "€54.73", "€109.45"],
        "delivery": ["2 days", "3 days", "5 days"],
        "revisions": ["1", "2", "Unlimited"],
        "includes": ["Stock levels, basic KPIs, charts, auto totals",
                     "Interactive KPIs, stock movement, charts, filters",
                     "Automation, KPI reporting, exec summary, reorder alerts"],
        "desc": "A live read on what you have, what it's worth, and exactly which SKUs have dropped below "
                "their reorder point — colour-coded and pushed to the top so your buyer sees them first "
                "thing, not after a customer calls.",
        "build": ["Inventory value by category, warehouse and product",
                  "Live stock status — in stock / low / reorder / out — with alerts",
                  "Reorder point tracking and top-SKU-by-value analysis",
                  "Inventory turnover and lead-time KPIs"],
        "faq": [("Can you add reorder alerts?", "Yes — automatic flags below your reorder point, colour-coded by urgency."),
                ("Can it handle multiple warehouses?", "Yes — filter and compare by warehouse, category or status."),
                ("Is my data confidential?", "Always — kept private, NDA on request.")],
        "tags": "inventory dashboard · stock tracker · excel inventory · inventory management · reorder alerts",
        "img": "inv-top.png",
    },
    {
        "slug": "procurement", "cat": "DATA · DATA ANALYTICS · BI ANALYTICS",
        "title": "Procurement dashboard & supplier performance tracker",
        "tagline": "See where the money goes — and which suppliers earn it.",
        "pkg_names": ["Purchase Order Tracker", "Procurement Dashboard", "Supplier Analytics Pro"],
        "prices": ["€27.36", "€68.41", "€136.81"],
        "delivery": ["2 days", "4 days", "6 days"],
        "revisions": ["1", "2", "Unlimited"],
        "includes": ["PO tracker: supplier, status, due date, spend, basic KPIs",
                     "Interactive spend analysis, open orders, supplier KPIs, charts",
                     "Supplier scorecards, spend analysis, automation, KPI reporting"],
        "desc": "Track every euro you spend — by category, supplier and month — flag open and overdue POs, "
                "and score each supplier on on-time delivery, quality and price. Weak links show up as a C; "
                "the ones worth a long-term contract show up as an A.",
        "build": ["Spend analysis by category and supplier",
                  "Purchase-order tracking — open, received, overdue",
                  "Supplier scorecard: OTD, lead time, quality, price → A–C rating",
                  "RFQ / quotation comparison and savings tracking"],
        "faq": [("Can you build a supplier scorecard?", "Yes — OTD, lead time, quality, price and an overall rating."),
                ("Can you improve my existing tracker?", "Yes — redesign, organise and automate your current file."),
                ("Is my supplier and price data confidential?", "Always — strictly private, NDA on request.")],
        "tags": "procurement dashboard · supplier tracker · spend analysis · excel dashboard · vendor management",
        "img": "proc-top2.png",
    },
    {
        "slug": "executive", "cat": "DATA · DATA ANALYTICS · BI ANALYTICS",
        "title": "Professional Excel dashboard, KPI report & automation",
        "tagline": "Your data already has the answers. This makes them impossible to miss.",
        "pkg_names": ["Starter Dashboard", "Business Dashboard", "Executive Dashboard"],
        "prices": ["€22.80", "€54.73", "€109.45"],
        "delivery": ["2 days", "3 days", "5 days"],
        "revisions": ["1", "2", "Unlimited"],
        "includes": ["Up to 2 charts + KPI cards, clean formatting",
                     "Interactive charts, KPIs, slicers, data cleaning, insights",
                     "Full interactive + automation, exec summary, insights report"],
        "desc": "Replace five spreadsheets nobody opens with one interactive Excel dashboard where revenue, "
                "KPIs and trends are obvious at a glance — a report managers read instead of forward. Native "
                "Excel: real charts, slicers and automation you keep and update yourself.",
        "build": ["Interactive dashboard with KPI cards and slicers",
                  "The charts that fit your data — trend, comparison, breakdown, target vs actual",
                  "Data cleaning and automated calculations with one-click refresh",
                  "A short executive summary of what the numbers are telling you"],
        "faq": [("Will it stay editable?", "Yes — native Excel; update the data and everything refreshes."),
                ("Can you automate the reporting?", "Yes — formulas, KPI calcs, dynamic ranges, refresh on new data."),
                ("Is my data confidential?", "Always — private, NDA on request.")],
        "tags": "excel dashboard · kpi dashboard · data visualization · excel automation · data analytics",
        "img": "exec-mid.png",
    },
    {
        "slug": "financial", "cat": "DATA · DATA ANALYTICS · BI ANALYTICS",
        "title": "Financial & cash-flow Excel dashboard (P&amp;L, budget, KPIs)",
        "tagline": "Know your cash position before the month closes — not after.",
        "pkg_names": ["P&amp;L Tracker", "Financial Dashboard", "CFO Suite"],
        "prices": ["€27.36", "€68.41", "€136.81"],
        "delivery": ["2 days", "4 days", "6 days"],
        "revisions": ["1", "2", "Unlimited"],
        "includes": ["Revenue, cost & profit tracker with KPIs",
                     "Interactive P&amp;L, cash-flow & expense charts",
                     "Budget vs actual, automation & executive summary"],
        "desc": "One screen that tells finance whether the business is healthy — revenue against EBITDA, "
                "where every euro of expense goes, and whether cash in is beating cash out month after month. "
                "Native Excel you can take straight into a leadership meeting.",
        "build": ["Revenue, gross margin, EBITDA & net cash-flow KPIs",
                  "Revenue vs EBITDA trend across the year",
                  "Cash-in vs cash-out with net cash-flow overlaid",
                  "Expense breakdown and budget-vs-actual by department"],
        "faq": [("Can you match my chart of accounts?", "Yes — the P&amp;L and expense structure is built around your accounts and categories."),
                ("Can you automate the monthly refresh?", "Yes — drop in the new month's figures and every KPI and chart updates."),
                ("Is my financial data confidential?", "Always — strictly private, NDA on request.")],
        "tags": "financial dashboard · cash flow · p&l dashboard · budget dashboard · excel finance",
        "img": "financial-top.png",
    },
    {
        "slug": "marketing", "cat": "DATA · DATA ANALYTICS · BI ANALYTICS",
        "title": "Marketing & social media analytics Excel dashboard",
        "tagline": "Stop guessing which channel works. This tells you.",
        "pkg_names": ["Campaign Tracker", "Marketing Dashboard", "Growth Analytics Pro"],
        "prices": ["€22.80", "€59.29", "€118.57"],
        "delivery": ["2 days", "4 days", "6 days"],
        "revisions": ["1", "2", "Unlimited"],
        "includes": ["Channel spend, revenue & ROAS tracker",
                     "Interactive funnel, ROAS & leads charts",
                     "Full channel scorecard, automation & insights"],
        "desc": "Put spend, revenue and ROAS side by side for every channel, track the funnel from visitor to "
                "customer, and see exactly where the leads come from. The channel earning 6x and the one "
                "burning cash both become obvious in seconds.",
        "build": ["Blended ROAS, CAC, leads & conversion-rate KPIs",
                  "ROAS and spend-vs-revenue by channel",
                  "Visitor-to-customer conversion funnel",
                  "Monthly leads trend and a full channel scorecard"],
        "faq": [("Which channels can you include?", "Any — Google, Meta, LinkedIn, TikTok, email and more, mapped to your data."),
                ("Can you connect it to my exports?", "Yes — I build around your ad-platform and analytics CSV/Sheets exports."),
                ("Is my campaign data confidential?", "Always — private, NDA on request.")],
        "tags": "marketing dashboard · roas · social media analytics · campaign report · excel",
        "img": "marketing-top.png",
    },
    {
        "slug": "hr", "cat": "DATA · DATA ANALYTICS · BI ANALYTICS",
        "title": "HR & people analytics Excel dashboard",
        "tagline": "The people numbers your leadership keeps asking for.",
        "pkg_names": ["Headcount Tracker", "HR Dashboard", "People Analytics Pro"],
        "prices": ["€22.80", "€54.73", "€109.45"],
        "delivery": ["2 days", "3 days", "5 days"],
        "revisions": ["1", "2", "Unlimited"],
        "includes": ["Headcount & attrition tracker with KPIs",
                     "Interactive department, funnel & tenure charts",
                     "Hiring pipeline, automation & per-team scorecard"],
        "desc": "Bring your people data together: who's on each team, where attrition is climbing, how the "
                "hiring pipeline is flowing, and how long people actually stay. HR answers in seconds instead "
                "of rebuilding a report every board cycle.",
        "build": ["Headcount, attrition, open roles, tenure & eNPS KPIs",
                  "Headcount and attrition by department",
                  "Hiring funnel from applied to hired",
                  "Tenure distribution and a per-team scorecard"],
        "faq": [("What data do you need?", "A simple headcount/roster export and (optionally) hiring and leaver data."),
                ("Can you track attrition monthly?", "Yes — trend attrition, hiring and tenure over time with automated refresh."),
                ("Is employee data confidential?", "Always — handled privately and anonymised on request.")],
        "tags": "hr dashboard · people analytics · attrition · headcount · excel hr",
        "img": "hr-top.png",
    },
    {
        "slug": "ecommerce", "cat": "DATA · DATA ANALYTICS · BI ANALYTICS",
        "title": "E-commerce & Shopify sales analytics Excel dashboard",
        "tagline": "Where the revenue really comes from — and what to sell more of.",
        "pkg_names": ["Sales Tracker", "Store Dashboard", "E-commerce Analytics Pro"],
        "prices": ["€22.80", "€59.29", "€118.57"],
        "delivery": ["2 days", "4 days", "6 days"],
        "revisions": ["1", "2", "Unlimited"],
        "includes": ["Revenue, orders & AOV tracker with KPIs",
                     "Interactive source, product & conversion charts",
                     "Cohort/repeat analysis, automation & insights"],
        "desc": "Your whole store on one screen — revenue and orders month by month, average order value, "
                "conversion, and exactly which traffic sources and products pull their weight. The stuff you "
                "need to decide where to spend and what to restock.",
        "build": ["Revenue, orders, AOV, conversion & repeat-rate KPIs",
                  "Revenue vs orders trend across the year",
                  "Revenue and conversion by traffic source",
                  "Top products and a full source-performance table"],
        "faq": [("Do you work with Shopify exports?", "Yes — Shopify, WooCommerce, Amazon or any CSV/Sheets export."),
                ("Can you track traffic sources?", "Yes — revenue, sessions and conversion per source, plus top products."),
                ("Is my store data confidential?", "Always — private, NDA on request.")],
        "tags": "ecommerce dashboard · shopify · sales analytics · conversion · excel",
        "img": "ecom-top.png",
    },
]


def st() -> dict[str, ParagraphStyle]:
    return {
        "brand": ParagraphStyle("b", fontName="Helvetica-Bold", fontSize=30, leading=34, textColor=WHITE),
        "sub": ParagraphStyle("s", fontName="Helvetica", fontSize=12, leading=17, textColor=MUTED),
        "eyebrow": ParagraphStyle("e", fontName="Helvetica-Bold", fontSize=8, leading=11, textColor=INDIGO),
        "title": ParagraphStyle("t", fontName="Helvetica-Bold", fontSize=22, leading=25, textColor=WHITE),
        "tag": ParagraphStyle("tg", fontName="Helvetica-Oblique", fontSize=10.5, leading=14, textColor=CYAN),
        "body": ParagraphStyle("bd", fontName="Helvetica", fontSize=9.6, leading=14.5, textColor=HexColor("#c7cede")),
        "h": ParagraphStyle("h", fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=WHITE),
        "bullet": ParagraphStyle("bl", fontName="Helvetica", fontSize=8.8, leading=13, textColor=HexColor("#b6bed0")),
        "cellh": ParagraphStyle("ch", fontName="Helvetica-Bold", fontSize=9, leading=11, textColor=WHITE),
        "cellp": ParagraphStyle("cp", fontName="Helvetica-Bold", fontSize=11, leading=13, textColor=WHITE),
        "cell": ParagraphStyle("c", fontName="Helvetica", fontSize=7.8, leading=10, textColor=HexColor("#b6bed0")),
        "lbl": ParagraphStyle("l", fontName="Helvetica-Bold", fontSize=7.8, leading=10, textColor=MUTED),
        "faqq": ParagraphStyle("fq", fontName="Helvetica-Bold", fontSize=8.6, leading=11.5, textColor=WHITE),
        "faqa": ParagraphStyle("fa", fontName="Helvetica", fontSize=8.6, leading=11.5, textColor=HexColor("#a8b0c2")),
        "tags": ParagraphStyle("tags", fontName="Helvetica", fontSize=8, leading=11, textColor=FAINT),
        "cap": ParagraphStyle("cap", fontName="Helvetica-Oblique", fontSize=7.3, leading=9.5, textColor=FAINT),
    }


def prep_image(name: str) -> str:
    img = PILImage.open(os.path.join(SHOTS, name)).convert("RGB")
    w, h = img.size
    ImageDraw.Draw(img).rectangle([0, h - 150, 165, h], fill=(8, 12, 23))
    out = os.path.join(TMP_IMG, f"g-{name}")
    img.save(out, "PNG")
    return out


def framed(name: str, max_w: float, max_h: float) -> Table:
    path = prep_image(name)
    iw, ih = PILImage.open(path).size
    w = max_w; h = w * ih / iw
    if h > max_h:
        h = max_h; w = h * iw / ih
    t = Table([[Image(path, width=w, height=h)]], colWidths=[w])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), CARD), ("BOX", (0, 0), (-1, -1), 0.75, BORDER),
                           ("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                           ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
    t.hAlign = "LEFT"
    return t


def pkg_table(g: dict[str, Any], s: dict[str, ParagraphStyle]) -> Table:
    P = lambda t, sty: Paragraph(t, s[sty])
    head = ["", P("BASIC", "cellh"), P("STANDARD", "cellh"), P("PREMIUM", "cellh")]
    names = [P("Package", "lbl")] + [P(n, "cell") for n in g["pkg_names"]]
    price = [P("Price", "lbl")] + [P(p, "cellp") for p in g["prices"]]
    deliv = [P("Delivery", "lbl")] + [P(d, "cell") for d in g["delivery"]]
    rev = [P("Revisions", "lbl")] + [P(r, "cell") for r in g["revisions"]]
    inc = [P("Includes", "lbl")] + [P(i, "cell") for i in g["includes"]]
    col = (CONTENT_W - 70) / 3
    t = Table([head, names, price, deliv, rev, inc], colWidths=[70, col, col, col])
    t.setStyle(TableStyle([
        ("BACKGROUND", (1, 0), (-1, 0), HEADROW),
        ("LINEABOVE", (1, 0), (1, 0), 2, INDIGO), ("LINEABOVE", (2, 0), (2, 0), 2, VIOLET),
        ("LINEABOVE", (3, 0), (3, 0), 2, CYAN),
        ("BACKGROUND", (0, 1), (-1, -1), CARD),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return t


def bullets(items: list[str], s) -> list[Any]:
    out = []
    for it in items:
        out.append(Paragraph(f'<font color="#6366f1">▸</font>&nbsp; {it}', s["bullet"]))
        out.append(Spacer(1, 2))
    return out


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(BG); canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    strips = 120; cols = [(0x63, 0x66, 0xf1), (0x8b, 0x5c, 0xf6), (0x22, 0xd3, 0xee)]
    for i in range(strips):
        t = i / (strips - 1)
        a, b, tt = (cols[0], cols[1], t / 0.5) if t < 0.5 else (cols[1], cols[2], (t - 0.5) / 0.5)
        canvas.setFillColorRGB(*[(a[j] + (b[j] - a[j]) * tt) / 255 for j in range(3)])
        canvas.rect(i * PAGE_W / strips, PAGE_H - 5, PAGE_W / strips + 1, 5, fill=1, stroke=0)
    canvas.setFont("Helvetica-Bold", 9); canvas.setFillColor(WHITE)
    canvas.drawString(MARGIN, PAGE_H - 22, "VEXLOFT")
    canvas.setFillColor(CYAN); canvas.drawString(MARGIN + 48, PAGE_H - 22, "DATA")
    canvas.setFont("Helvetica", 8); canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 22, "Fiverr Gig Kit · Atakan Harman")
    canvas.setStrokeColor(BORDER); canvas.setLineWidth(0.5); canvas.line(MARGIN, 34, PAGE_W - MARGIN, 34)
    canvas.setFont("Helvetica", 7.5); canvas.setFillColor(FAINT)
    canvas.drawString(MARGIN, 24, "Live portfolio: data.vexloft.com  ·  Sample data is fictional")
    canvas.drawRightString(PAGE_W - MARGIN, 24, f"{doc.page}")
    canvas.restoreState()


def build_one(g: dict[str, Any], s: dict[str, ParagraphStyle]) -> str:
    out = os.path.join(OUTDIR, f"{g['slug']}-gig.pdf")
    doc = BaseDocTemplate(out, pagesize=A4, leftMargin=MARGIN, rightMargin=MARGIN,
                          topMargin=48, bottomMargin=44,
                          title=f"Fiverr Gig — {g['title']}", author="Atakan Harman")
    frame = Frame(MARGIN, 44, CONTENT_W, PAGE_H - 48 - 44, id="m",
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="p", frames=[frame], onPage=on_page)])

    story: list[Any] = []
    story.append(Paragraph(g["cat"], s["eyebrow"]))
    story.append(Spacer(1, 6))
    story.append(Paragraph(g["title"], s["title"]))
    story.append(Paragraph(g["tagline"], s["tag"]))
    story.append(Spacer(1, 12))
    story.append(pkg_table(g, s))
    story.append(Spacer(1, 13))
    story.append(Paragraph(g["desc"], s["body"]))
    story.append(Spacer(1, 12))
    story.append(framed(g["img"], CONTENT_W, 250))
    story.append(Paragraph(f"Live, interactive demo: data.vexloft.com/{g['slug']}", s["cap"]))
    story.append(Spacer(1, 14))
    col_l = [Paragraph("WHAT I BUILD", s["h"]), Spacer(1, 4)] + bullets(g["build"], s)
    faq_items = [Paragraph("FAQ", s["h"]), Spacer(1, 4)]
    for q, a in g["faq"]:
        faq_items.append(Paragraph(q, s["faqq"]))
        faq_items.append(Paragraph(a, s["faqa"]))
        faq_items.append(Spacer(1, 5))
    two = Table([[col_l, faq_items]], colWidths=[CONTENT_W / 2 - 8, CONTENT_W / 2 - 8])
    two.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                             ("LEFTPADDING", (1, 0), (1, 0), 16),
                             ("LEFTPADDING", (0, 0), (0, 0), 0),
                             ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    story.append(two)
    story.append(Spacer(1, 12))
    story.append(Paragraph(f'<b>Search tags:</b>&nbsp; {g["tags"]}', s["tags"]))
    story.append(Spacer(1, 14))
    # bio strip
    bio = Table([[Paragraph("<b>About the seller</b> &nbsp;—&nbsp; " + BIO, s["cap"])]], colWidths=[CONTENT_W])
    bio.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), CARD), ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
                             ("LEFTPADDING", (0, 0), (-1, -1), 12), ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                             ("TOPPADDING", (0, 0), (-1, -1), 9), ("BOTTOMPADDING", (0, 0), (-1, -1), 9)]))
    story.append(bio)

    doc.build(story)
    return out


def build():
    s = st()
    for g in GIGS:
        path = build_one(g, s)
        print(f"  pdf -> {os.path.relpath(path, ROOT)}  ({os.path.getsize(path)//1024} KB)")
    print("Done.")


if __name__ == "__main__":
    build()
