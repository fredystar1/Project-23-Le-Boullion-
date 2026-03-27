#!/usr/bin/env python3
"""
Howard Street Wine Merchant — Inventory Scraper
Pulls wine data from their Shopify store JSON API and builds
a Python inventory list ready to drop into howard_wine_quiz.py

Run:  python scrape_howard_street.py
Output: howard_street_inventory.py  (paste into quiz)
"""

import urllib.request
import json
import time
import re
import sys

BASE_URL = "https://howardstreet.wine"
DELAY    = 0.5   # seconds between requests — be polite to their server


# ─────────────────────────────────────────────────────────
#  KEYWORD CLASSIFIERS
#  Used to infer wine attributes from product titles/tags/descriptions
#  since the store doesn't always use structured fields.
# ─────────────────────────────────────────────────────────

WINE_TYPE_KEYWORDS = {
    "Sparkling": ["champagne", "cava", "prosecco", "crémant", "cremant",
                  "sparkling", "pétillant", "pétnat", "pet nat", "mousseux",
                  "sekt", "franciacorta", "lambrusco"],
    "Rosé":      ["rosé", "rose", "rosato", "rosado", "clairet"],
    "Dessert":   ["sauternes", "port", "porto", "sherry", "madeira",
                  "banyuls", "rivesaltes", "vin doux", "late harvest",
                  "eiswein", "ice wine", "trockenbeerenauslese", "tba",
                  "beerenauslese", "auslese", "tokaji", "muscat",
                  "vin santo", "passito", "amarone", "recioto"],
    "White":     ["chardonnay", "sauvignon blanc", "riesling", "pinot gris",
                  "pinot grigio", "viognier", "gewürztraminer", "gewurztraminer",
                  "grüner veltliner", "gruner veltliner", "albariño", "albarino",
                  "verdejo", "vermentino", "greco", "falanghina", "fiano",
                  "chablis", "meursault", "puligny", "chassagne",
                  "muscadet", "vouvray", "chenin blanc", "marsanne",
                  "roussanne", "white", "blanc", "bianco", "blanco", "weiss"],
    "Red":       ["cabernet", "merlot", "pinot noir", "syrah", "shiraz",
                  "grenache", "malbec", "tempranillo", "sangiovese",
                  "nebbiolo", "barolo", "barbaresco", "chianti", "brunello",
                  "rioja", "priorat", "zinfandel", "petite sirah",
                  "mourvèdre", "mourvedre", "carignan", "cinsault",
                  "barbera", "dolcetto", "montepulciano", "aglianico",
                  "primitivo", "nero d'avola", "blaufränkisch",
                  "zweigelt", "gamay", "beaujolais", "red", "rouge",
                  "rosso", "tinto", "rot"],
}

REGION_MAP = {
    # France
    "Champagne":  ["champagne"],
    "Burgundy":   ["burgundy", "bourgogne", "chablis", "meursault", "puligny",
                   "chassagne", "beaune", "gevrey", "vosne", "nuits", "pommard",
                   "volnay", "corton", "romanée", "montrachet", "mâcon", "macon"],
    "Bordeaux":   ["bordeaux", "sauternes", "pomerol", "saint-émilion",
                   "saint emilion", "médoc", "medoc", "pauillac", "margaux",
                   "graves", "entre-deux-mers"],
    "Rhône":      ["rhône", "rhone", "côte rôtie", "cote rotie", "hermitage",
                   "crozes", "cornas", "saint-joseph", "châteauneuf",
                   "chateauneuf", "gigondas", "vacqueyras"],
    "Loire":      ["loire", "muscadet", "vouvray", "sancerre", "pouilly",
                   "chinon", "bourgueil", "anjou", "touraine"],
    "Alsace":     ["alsace", "alsatian"],
    "Provence":   ["provence", "bandol", "cassis"],
    "Languedoc":  ["languedoc", "roussillon", "banyuls", "corbières",
                   "faugères", "saint-chinian", "minervois", "fitou"],
    "Jura":       ["jura", "arbois", "vin jaune"],
    "Beaujolais": ["beaujolais", "morgon", "fleurie", "moulin", "brouilly",
                   "chiroubles", "juliénas", "saint-amour"],
    # Italy
    "Tuscany":    ["tuscany", "toscana", "chianti", "brunello", "montalcino",
                   "montepulciano", "bolgheri", "maremma", "vernaccia"],
    "Piedmont":   ["piedmont", "piemonte", "barolo", "barbaresco", "barbera",
                   "dolcetto", "moscato", "gavi", "asti"],
    "Veneto":     ["veneto", "amarone", "valpolicella", "soave", "bardolino",
                   "prosecco", "valdobbiadene"],
    "Sicily":     ["sicily", "sicilia", "etna", "nerello", "nero d'avola",
                   "marsala", "passito"],
    "Campania":   ["campania", "aglianico", "taurasi", "fiano", "greco",
                   "falanghina"],
    # Spain
    "Rioja":      ["rioja"],
    "Priorat":    ["priorat", "priorato"],
    "Galicia":    ["galicia", "rías baixas", "rias baixas", "albariño",
                   "albarino", "ribeiro", "valdeorras"],
    "Ribera del Duero": ["ribera del duero", "ribera"],
    # Germany
    "Mosel":      ["mosel", "moselle"],
    "Rheingau":   ["rheingau"],
    "Pfalz":      ["pfalz", "palatinate"],
    # Portugal
    "Douro":      ["douro", "port", "porto"],
    "Alentejo":   ["alentejo"],
    # USA
    "Napa Valley":     ["napa"],
    "Sonoma":          ["sonoma", "russian river", "alexander valley"],
    "Willamette Valley": ["willamette", "oregon"],
    "Central Coast":   ["paso robles", "santa barbara", "sta. rita"],
    # Other
    "Mendoza":    ["mendoza", "malbec"],
    "Marlborough":["marlborough", "new zealand"],
    "Barossa":    ["barossa", "south australia"],
    "Rioja":      ["rioja"],
}

COUNTRY_MAP = {
    "France":      ["champagne", "burgundy", "bourgogne", "bordeaux", "rhône",
                    "rhone", "loire", "alsace", "provence", "languedoc", "jura",
                    "beaujolais", "france", "french", "chablis", "sancerre"],
    "Italy":       ["tuscany", "toscana", "piedmont", "piemonte", "veneto",
                    "sicily", "campania", "barolo", "chianti", "amarone",
                    "brunello", "italy", "italian", "etna"],
    "Spain":       ["rioja", "priorat", "galicia", "spain", "spanish",
                    "tempranillo", "garnacha", "cava"],
    "Germany":     ["mosel", "rheingau", "pfalz", "germany", "german",
                    "riesling spätlese", "auslese", "eiswein"],
    "Portugal":    ["douro", "port", "porto", "portugal", "portuguese",
                    "alentejo", "vinho verde"],
    "Austria":     ["austria", "austrian", "grüner", "gruner", "blaufränkisch"],
    "USA":         ["napa", "sonoma", "willamette", "oregon", "california",
                    "washington", "paso robles"],
    "Argentina":   ["mendoza", "argentina", "malbec", "torrontés"],
    "Chile":       ["chile", "chilean", "maipo", "colchagua"],
    "Australia":   ["barossa", "australia", "australian", "shiraz hunter"],
    "New Zealand": ["marlborough", "new zealand", "kiwi"],
    "Greece":      ["greece", "greek", "assyrtiko", "santorini"],
    "Georgia":     ["georgia", "georgian", "qvevri", "rkatsiteli", "saperavi"],
}

FLAVOR_MAP = {
    "blackberry":   ["blackberry", "black berry"],
    "plum":         ["plum"],
    "cherry":       ["cherry"],
    "blackcurrant": ["cassis", "blackcurrant", "black currant"],
    "raspberry":    ["raspberry"],
    "strawberry":   ["strawberry"],
    "cranberry":    ["cranberry"],
    "citrus":       ["citrus", "lemon", "lime", "grapefruit", "orange peel"],
    "peach":        ["peach"],
    "apricot":      ["apricot"],
    "earth":        ["earth", "terroir", "soil", "loam"],
    "tobacco":      ["tobacco"],
    "leather":      ["leather"],
    "truffle":      ["truffle"],
    "cedar":        ["cedar"],
    "vanilla":      ["vanilla"],
    "spice":        ["spice", "pepper", "clove", "cinnamon"],
    "mineral":      ["mineral", "slate", "limestone", "flint", "chalk"],
    "floral":       ["floral", "violet", "rose", "jasmine", "lavender"],
    "oak":          ["oak", "toasty", "toast", "smoke", "wood"],
    "honey":        ["honey", "honeyed"],
    "dried fruit":  ["dried fruit", "raisin", "fig", "prune"],
    "herb":         ["herb", "garrigue", "thyme", "rosemary", "bay"],
}


def fetch_json(url):
    """Fetch a URL and parse JSON, returns None on failure."""
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (educational project)"
        })
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"  ⚠ Could not fetch {url}: {e}", file=sys.stderr)
        return None


def classify(text, keyword_dict):
    """Return the first key whose keywords appear in text (lowercase)."""
    text_lower = text.lower()
    for category, keywords in keyword_dict.items():
        for kw in keywords:
            if kw in text_lower:
                return category
    return None


def extract_flavors(text):
    """Return a list of flavor labels found in text."""
    text_lower = text.lower()
    found = []
    for label, keywords in FLAVOR_MAP.items():
        for kw in keywords:
            if kw in text_lower:
                found.append(label)
                break
    return found[:6]  # cap at 6


def infer_body(wine_type, description):
    """Rough body inference from type + description keywords."""
    desc = description.lower()
    if any(w in desc for w in ["light", "delicate", "ethereal", "pale", "lean"]):
        return "Light"
    if any(w in desc for w in ["full", "powerful", "rich", "dense", "massive",
                                "concentrated", "weighty", "robust", "bold"]):
        return "Full"
    # Defaults by type
    if wine_type in ("Sparkling", "Rosé"):
        return "Light"
    if wine_type == "Red":
        return "Medium"
    return "Medium"


def infer_sweetness(wine_type, title, description):
    """Infer sweetness from type and text."""
    combined = (title + " " + description).lower()
    if any(w in combined for w in ["sec", "brut", "dry", "nature", "extra brut"]):
        return "Dry"
    if any(w in combined for w in ["demi", "off-dry", "off dry", "halbtrocken",
                                    "spätlese", "kabinett", "auslese", "moelleux"]):
        return "Off-Dry"
    if wine_type == "Dessert":
        return "Sweet"
    if any(w in combined for w in ["sweet", "doux", "dulce", "dolce", "süss",
                                    "suss", "late harvest", "botrytis"]):
        return "Sweet"
    return "Dry"


def build_wine_entry(product):
    """Convert a Shopify product dict into a quiz inventory entry."""

    title       = product.get("title", "")
    vendor      = product.get("vendor", "")
    body_html   = product.get("body_html", "") or ""
    tags        = " ".join(product.get("tags", []))
    search_text = f"{title} {vendor} {tags} {body_html}".lower()

    # Price — use lowest available variant price
    variants = product.get("variants", [])
    price    = 0.0
    for v in variants:
        try:
            p = float(v.get("price", 0))
            if p > 0 and (price == 0 or p < price):
                price = p
        except (ValueError, TypeError):
            pass

    # SKU from first variant
    sku = ""
    if variants:
        sku = variants[0].get("sku", "") or product.get("handle", "")[:20].upper()

    # Strip HTML from description
    description = re.sub(r"<[^>]+>", " ", body_html).strip()
    description = re.sub(r"\s+", " ", description)[:300]

    # Classify
    wine_type = "Red"
    for wt, kws in WINE_TYPE_KEYWORDS.items():
        for kw in kws:
            if kw in search_text:
                wine_type = wt
                break
        else:
            continue
        break

    region  = classify(search_text, REGION_MAP)  or "Unknown"
    country = classify(search_text, COUNTRY_MAP) or "Unknown"
    world   = "Old World" if country in (
        "France","Italy","Spain","Germany","Portugal","Austria","Greece","Georgia"
    ) else "New World"

    body      = infer_body(wine_type, description)
    sweetness = infer_sweetness(wine_type, title, description)
    flavors   = extract_flavors(description) or extract_flavors(tags)

    # Mark adventurous: unusual grape varieties or lesser-known regions
    adv_keywords = ["orange wine", "natural", "pét-nat", "pet nat", "amphora",
                    "qvevri", "skin contact", "jura", "georgia", "etna",
                    "swartland", "ribolla", "rkatsiteli", "savagnin",
                    "aligoté", "mencia", "baga", "arinto"]
    adventurous = any(kw in search_text for kw in adv_keywords)

    return {
        "name":        title,
        "winery":      vendor or "Howard Street",
        "region":      region,
        "country":     country,
        "world":       world,
        "wine_type":   wine_type,
        "body":        body,
        "sweetness":   sweetness,
        "tannins":     "High" if wine_type == "Red" and body == "Full" else
                       "Low"  if wine_type in ("White","Sparkling","Rosé","Dessert") else "Medium",
        "acidity":     "High" if wine_type in ("White","Sparkling") else "Medium",
        "flavors":     flavors if flavors else ["fruit", "spice"],
        "price":       price,
        "sku":         sku,
        "description": description if description else f"{wine_type} wine from {region}.",
        "adventurous": adventurous,
    }


def scrape_inventory(max_pages=20):
    """
    Scrape the Shopify products JSON endpoint.
    max_pages: how many pages to pull (8 products/page).
    Increase for more coverage — store has 462 pages total.
    """
    wines = []
    skipped = 0
    page = 1

    print(f"Fetching Howard Street Wine Merchant inventory...")
    print(f"(Pulling up to {max_pages} pages × 8 products = ~{max_pages*8} items)\n")

    while page <= max_pages:
        url  = f"{BASE_URL}/collections/all/products.json?limit=8&page={page}"
        data = fetch_json(url)

        if not data or not data.get("products"):
            print(f"  Page {page}: no more products, stopping.")
            break

        products = data["products"]
        print(f"  Page {page:>3}: {len(products)} products", end="")

        for p in products:
            title = p.get("title", "").lower()

            # Skip non-wine products
            if any(skip in title for skip in [
                "tasting", "class", "event", "subscription", "gift",
                "bourbon", "whiskey", "whisky", "rum", "gin", "vodka",
                "tequila", "mezcal", "brandy", "cognac", "armagnac",
                "calvados", "grappa", "marc", "eaux-de-vie",
            ]):
                skipped += 1
                continue

            entry = build_wine_entry(p)

            # Only include if we got a reasonable price
            if entry["price"] > 0:
                wines.append(entry)

        print(f"  →  {len(wines)} wines so far")

        if len(products) < 8:
            break

        page += 1
        time.sleep(DELAY)

    print(f"\n✓ Collected {len(wines)} wines  ({skipped} non-wine products skipped)")
    return wines


def write_inventory_file(wines, path="howard_street_inventory.py"):
    """Write the wine list as a Python file ready to paste into the quiz."""
    lines = [
        '"""',
        "Howard Street Wine Merchant — Scraped Inventory",
        f"Total wines: {len(wines)}",
        '"""',
        "",
        "INVENTORY = [",
    ]

    for w in wines:
        flavors_str = json.dumps(w["flavors"])
        lines.append("    {")
        lines.append(f'        "name":        {json.dumps(w["name"])},')
        lines.append(f'        "winery":      {json.dumps(w["winery"])},')
        lines.append(f'        "region":      {json.dumps(w["region"])},')
        lines.append(f'        "country":     {json.dumps(w["country"])},')
        lines.append(f'        "world":       {json.dumps(w["world"])},')
        lines.append(f'        "wine_type":   {json.dumps(w["wine_type"])},')
        lines.append(f'        "body":        {json.dumps(w["body"])},')
        lines.append(f'        "sweetness":   {json.dumps(w["sweetness"])},')
        lines.append(f'        "tannins":     {json.dumps(w["tannins"])},')
        lines.append(f'        "acidity":     {json.dumps(w["acidity"])},')
        lines.append(f'        "flavors":     {flavors_str},')
        lines.append(f'        "price":       {w["price"]},')
        lines.append(f'        "sku":         {json.dumps(w["sku"])},')
        lines.append(f'        "description": {json.dumps(w["description"])},')
        lines.append(f'        "adventurous": {w["adventurous"]},')
        lines.append("    },")

    lines.append("]")
    lines.append("")

    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"✓ Inventory written to: {path}")
    print(f"  → Copy the INVENTORY list into howard_wine_quiz.py to replace the sample data.")


if __name__ == "__main__":
    # Adjust max_pages to scrape more of their catalog.
    # Each page = ~8 wines. Store has 462 pages total.
    # Start with 30 for a quick test (~240 wines), raise to 100+ for fuller coverage.
    MAX_PAGES = 30

    wines = scrape_inventory(max_pages=MAX_PAGES)

    if wines:
        write_inventory_file(wines)
    else:
        print("No wines collected — check your internet connection and try again.")
