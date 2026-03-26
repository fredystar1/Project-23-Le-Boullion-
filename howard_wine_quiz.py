#!/usr/bin/env python3
"""
Howard Street Wine Merchant — Wine Discovery Quiz
Guides customers from region preferences → taste profile → personalized recommendations.
"""

import sys
import textwrap
import random

# ─────────────────────────────────────────────
#  WINE INVENTORY
#  Add / edit wines here to match real stock.
#  Each entry: name, winery, region, country,
#  world, wine_type, body, sweetness, tannins,
#  acidity, flavors[], price, sku, description,
#  adventurous (bool — marks "wild card" picks)
# ─────────────────────────────────────────────
INVENTORY = [
    # ── FRANCE ────────────────────────────────
    {
        "name": "Château Léoville-Barton 2018",
        "winery": "Château Léoville-Barton",
        "region": "Bordeaux", "country": "France", "world": "Old World",
        "wine_type": "Red", "body": "Full", "sweetness": "Dry",
        "tannins": "High", "acidity": "Medium",
        "flavors": ["blackcurrant", "plum", "cedar", "tobacco", "graphite"],
        "price": 79.99, "sku": "FR-BD-001",
        "description": "A classic St-Julien Bordeaux with layers of dark fruit, firm structure, and a long cedar finish.",
        "adventurous": False,
    },
    {
        "name": "Domaine Leflaive Mâcon-Verzé 2022",
        "winery": "Domaine Leflaive",
        "region": "Burgundy", "country": "France", "world": "Old World",
        "wine_type": "White", "body": "Medium", "sweetness": "Dry",
        "tannins": "Low", "acidity": "High",
        "flavors": ["green apple", "lemon curd", "brioche", "mineral", "hazelnut"],
        "price": 44.99, "sku": "FR-BU-002",
        "description": "Crisp and mineral-driven Chardonnay from one of Burgundy's most revered estates.",
        "adventurous": False,
    },
    {
        "name": "Maison Joseph Drouhin Pinot Noir 2021",
        "winery": "Maison Joseph Drouhin",
        "region": "Burgundy", "country": "France", "world": "Old World",
        "wine_type": "Red", "body": "Light", "sweetness": "Dry",
        "tannins": "Low", "acidity": "High",
        "flavors": ["cherry", "raspberry", "violet", "earth", "spice"],
        "price": 28.99, "sku": "FR-BU-003",
        "description": "Silky, elegant Pinot Noir with bright red fruit and a classic earthy Burgundian character.",
        "adventurous": False,
    },
    {
        "name": "Domaine Weinbach Riesling Cuvée Théo 2021",
        "winery": "Domaine Weinbach",
        "region": "Alsace", "country": "France", "world": "Old World",
        "wine_type": "White", "body": "Medium", "sweetness": "Off-Dry",
        "tannins": "Low", "acidity": "High",
        "flavors": ["peach", "apricot", "petrol", "ginger", "lime zest"],
        "price": 38.99, "sku": "FR-AL-004",
        "description": "Aromatic and expressive Alsatian Riesling with a whisper of sweetness balanced by bright acidity.",
        "adventurous": True,
    },
    {
        "name": "Château d'Esclans Whispering Angel Rosé 2023",
        "winery": "Château d'Esclans",
        "region": "Provence", "country": "France", "world": "Old World",
        "wine_type": "Rosé", "body": "Light", "sweetness": "Dry",
        "tannins": "Low", "acidity": "Medium",
        "flavors": ["strawberry", "peach", "cream", "herb", "citrus"],
        "price": 24.99, "sku": "FR-PR-005",
        "description": "The iconic Provençal rosé — pale salmon, delicate and refreshing with a silky finish.",
        "adventurous": False,
    },
    {
        "name": "Louis Roederer Brut Premier NV",
        "winery": "Louis Roederer",
        "region": "Champagne", "country": "France", "world": "Old World",
        "wine_type": "Sparkling", "body": "Medium", "sweetness": "Dry",
        "tannins": "Low", "acidity": "High",
        "flavors": ["green apple", "brioche", "citrus", "toasted almond", "cream"],
        "price": 59.99, "sku": "FR-CH-006",
        "description": "A beautifully balanced non-vintage Champagne with creamy mousse and refined complexity.",
        "adventurous": False,
    },

    # ── ITALY ─────────────────────────────────
    {
        "name": "Antinori Tignanello 2020",
        "winery": "Antinori",
        "region": "Tuscany", "country": "Italy", "world": "Old World",
        "wine_type": "Red", "body": "Full", "sweetness": "Dry",
        "tannins": "High", "acidity": "Medium",
        "flavors": ["blackberry", "cherry", "tobacco", "leather", "spice"],
        "price": 94.99, "sku": "IT-TU-007",
        "description": "The pioneering Super Tuscan — Sangiovese with Cabernet, powerful yet refined and age-worthy.",
        "adventurous": False,
    },
    {
        "name": "Cavallotto Barolo Riserva Bricco Boschis 2017",
        "winery": "Cavallotto",
        "region": "Piedmont", "country": "Italy", "world": "Old World",
        "wine_type": "Red", "body": "Full", "sweetness": "Dry",
        "tannins": "High", "acidity": "High",
        "flavors": ["tar", "rose", "cherry", "leather", "truffle", "dried herbs"],
        "price": 84.99, "sku": "IT-PI-008",
        "description": "A majestic Barolo from Nebbiolo — the 'king of wines' — complex, tannic, and long-lived.",
        "adventurous": True,
    },
    {
        "name": "Santa Margherita Pinot Grigio Alto Adige 2023",
        "winery": "Santa Margherita",
        "region": "Alto Adige", "country": "Italy", "world": "Old World",
        "wine_type": "White", "body": "Light", "sweetness": "Dry",
        "tannins": "Low", "acidity": "High",
        "flavors": ["pear", "green apple", "lemon", "almond", "white flower"],
        "price": 21.99, "sku": "IT-AA-009",
        "description": "The Italian Pinot Grigio that started it all — crisp, clean, and endlessly refreshing.",
        "adventurous": False,
    },
    {
        "name": "Masi Amarone della Valpolicella Costasera 2018",
        "winery": "Masi",
        "region": "Veneto", "country": "Italy", "world": "Old World",
        "wine_type": "Red", "body": "Full", "sweetness": "Dry",
        "tannins": "High", "acidity": "Medium",
        "flavors": ["dried cherry", "fig", "chocolate", "espresso", "tobacco", "spice"],
        "price": 59.99, "sku": "IT-VE-010",
        "description": "Rich, intense Amarone made from air-dried grapes — a luxurious, warming red.",
        "adventurous": True,
    },

    # ── SPAIN ─────────────────────────────────
    {
        "name": "CVNE Imperial Rioja Gran Reserva 2016",
        "winery": "CVNE",
        "region": "Rioja", "country": "Spain", "world": "Old World",
        "wine_type": "Red", "body": "Full", "sweetness": "Dry",
        "tannins": "High", "acidity": "Medium",
        "flavors": ["dried cherry", "vanilla", "leather", "cedar", "tobacco"],
        "price": 49.99, "sku": "ES-RI-011",
        "description": "A benchmark Rioja Gran Reserva — Tempranillo with elegant oak influence and superb structure.",
        "adventurous": False,
    },
    {
        "name": "Álvaro Palacios L'Ermita 2020",
        "winery": "Álvaro Palacios",
        "region": "Priorat", "country": "Spain", "world": "Old World",
        "wine_type": "Red", "body": "Full", "sweetness": "Dry",
        "tannins": "High", "acidity": "Medium",
        "flavors": ["blackberry", "mineral", "slate", "olive", "dark spice"],
        "price": 149.99, "sku": "ES-PR-012",
        "description": "One of Spain's most iconic wines from old Garnacha vines grown in Priorat's llicorella slate.",
        "adventurous": True,
    },

    # ── GERMANY ───────────────────────────────
    {
        "name": "Dr. Loosen Erdener Treppchen Riesling Spätlese 2021",
        "winery": "Dr. Loosen",
        "region": "Mosel", "country": "Germany", "world": "Old World",
        "wine_type": "White", "body": "Light", "sweetness": "Off-Dry",
        "tannins": "Low", "acidity": "High",
        "flavors": ["peach", "slate", "lime", "honey", "apricot"],
        "price": 29.99, "sku": "DE-MO-013",
        "description": "Quintessential Mosel Riesling — low alcohol, racy acidity, and gorgeous off-dry fruit.",
        "adventurous": False,
    },

    # ── USA ───────────────────────────────────
    {
        "name": "Jordan Cabernet Sauvignon Alexander Valley 2019",
        "winery": "Jordan Winery",
        "region": "Sonoma", "country": "USA", "world": "New World",
        "wine_type": "Red", "body": "Full", "sweetness": "Dry",
        "tannins": "Medium", "acidity": "Medium",
        "flavors": ["blackberry", "cassis", "vanilla", "cedar", "dark chocolate"],
        "price": 64.99, "sku": "US-SO-014",
        "description": "Approachable and elegant Alexander Valley Cab — smooth tannins, bright fruit, classic styling.",
        "adventurous": False,
    },
    {
        "name": "Duckhorn Napa Valley Merlot 2021",
        "winery": "Duckhorn",
        "region": "Napa Valley", "country": "USA", "world": "New World",
        "wine_type": "Red", "body": "Medium", "sweetness": "Dry",
        "tannins": "Medium", "acidity": "Medium",
        "flavors": ["plum", "blackberry", "mocha", "vanilla", "bay leaf"],
        "price": 54.99, "sku": "US-NA-015",
        "description": "Benchmark Napa Merlot — plush and velvety with rich fruit and a chocolatey finish.",
        "adventurous": False,
    },
    {
        "name": "Kistler Les Noisetiers Chardonnay 2022",
        "winery": "Kistler",
        "region": "Sonoma", "country": "USA", "world": "New World",
        "wine_type": "White", "body": "Full", "sweetness": "Dry",
        "tannins": "Low", "acidity": "Medium",
        "flavors": ["lemon curd", "toasted oak", "cream", "apple", "hazelnut"],
        "price": 69.99, "sku": "US-SO-016",
        "description": "World-class California Chardonnay with beautiful richness, texture, and toasty complexity.",
        "adventurous": False,
    },
    {
        "name": "Littorai The Pivot Pinot Noir Sonoma Coast 2021",
        "winery": "Littorai",
        "region": "Sonoma Coast", "country": "USA", "world": "New World",
        "wine_type": "Red", "body": "Light", "sweetness": "Dry",
        "tannins": "Low", "acidity": "High",
        "flavors": ["cranberry", "red cherry", "forest floor", "violet", "spice"],
        "price": 59.99, "sku": "US-SC-017",
        "description": "Cool-climate Sonoma Coast Pinot with Burgundian elegance — precise, aromatic, long-finishing.",
        "adventurous": True,
    },
    {
        "name": "Tablas Creek Esprit de Tablas Blanc 2022",
        "winery": "Tablas Creek",
        "region": "Paso Robles", "country": "USA", "world": "New World",
        "wine_type": "White", "body": "Full", "sweetness": "Dry",
        "tannins": "Low", "acidity": "Medium",
        "flavors": ["honeysuckle", "pear", "white peach", "anise", "cream"],
        "price": 44.99, "sku": "US-PA-018",
        "description": "A Rhône-style white blend from Paso Robles — lush, aromatic, and beautifully textured.",
        "adventurous": True,
    },

    # ── ARGENTINA ─────────────────────────────
    {
        "name": "Achaval Ferrer Quimera 2021",
        "winery": "Achaval Ferrer",
        "region": "Mendoza", "country": "Argentina", "world": "New World",
        "wine_type": "Red", "body": "Full", "sweetness": "Dry",
        "tannins": "High", "acidity": "Medium",
        "flavors": ["blackberry", "plum", "dark chocolate", "tobacco", "spice"],
        "price": 39.99, "sku": "AR-ME-019",
        "description": "A Malbec-led blend from Mendoza — inky, rich, and deeply satisfying at an excellent price.",
        "adventurous": False,
    },
    {
        "name": "Zuccardi Valle de Uco Textural 2021",
        "winery": "Zuccardi",
        "region": "Mendoza", "country": "Argentina", "world": "New World",
        "wine_type": "White", "body": "Medium", "sweetness": "Dry",
        "tannins": "Low", "acidity": "High",
        "flavors": ["citrus blossom", "stone fruit", "lime", "saline mineral"],
        "price": 26.99, "sku": "AR-ME-020",
        "description": "A fascinating Torrontés-Chardonnay blend — floral, crisp, and unlike anything you've tried.",
        "adventurous": True,
    },

    # ── AUSTRALIA ─────────────────────────────
    {
        "name": "Penfolds Bin 389 Cabernet Shiraz 2020",
        "winery": "Penfolds",
        "region": "South Australia", "country": "Australia", "world": "New World",
        "wine_type": "Red", "body": "Full", "sweetness": "Dry",
        "tannins": "High", "acidity": "Medium",
        "flavors": ["blackberry", "dark chocolate", "vanilla", "tobacco", "eucalyptus"],
        "price": 59.99, "sku": "AU-SA-021",
        "description": "The 'Baby Grange' — powerful, structured, and iconic. Classic Aussie Cab-Shiraz at its finest.",
        "adventurous": False,
    },
    {
        "name": "Pewsey Vale Eden Valley Riesling 2023",
        "winery": "Pewsey Vale",
        "region": "Eden Valley", "country": "Australia", "world": "New World",
        "wine_type": "White", "body": "Light", "sweetness": "Dry",
        "tannins": "Low", "acidity": "High",
        "flavors": ["lime", "green apple", "slate", "lemon curd", "jasmine"],
        "price": 18.99, "sku": "AU-EV-022",
        "description": "Australia's answer to German Riesling — bone dry, searing acidity, with incredible aging potential.",
        "adventurous": True,
    },

    # ── NEW ZEALAND ───────────────────────────
    {
        "name": "Cloudy Bay Sauvignon Blanc 2023",
        "winery": "Cloudy Bay",
        "region": "Marlborough", "country": "New Zealand", "world": "New World",
        "wine_type": "White", "body": "Light", "sweetness": "Dry",
        "tannins": "Low", "acidity": "High",
        "flavors": ["passion fruit", "grapefruit", "lime", "cut grass", "gooseberry"],
        "price": 24.99, "sku": "NZ-MA-023",
        "description": "The wine that put NZ on the map — vibrant, zesty, and explosively aromatic.",
        "adventurous": False,
    },

    # ── CHILE ─────────────────────────────────
    {
        "name": "Concha y Toro Don Melchor Cabernet Sauvignon 2020",
        "winery": "Concha y Toro",
        "region": "Maipo Valley", "country": "Chile", "world": "New World",
        "wine_type": "Red", "body": "Full", "sweetness": "Dry",
        "tannins": "High", "acidity": "Medium",
        "flavors": ["blackcurrant", "graphite", "cedar", "mint", "dark chocolate"],
        "price": 74.99, "sku": "CL-MA-024",
        "description": "Chile's most celebrated Cabernet — world-class structure and elegance from the Maipo Valley.",
        "adventurous": False,
    },

    # ── DESSERT ───────────────────────────────
    {
        "name": "Château d'Yquem Sauternes 2019 (375ml)",
        "winery": "Château d'Yquem",
        "region": "Bordeaux", "country": "France", "world": "Old World",
        "wine_type": "Dessert", "body": "Full", "sweetness": "Sweet",
        "tannins": "Low", "acidity": "High",
        "flavors": ["honey", "apricot", "vanilla", "saffron", "candied lemon"],
        "price": 119.99, "sku": "FR-BD-025",
        "description": "The world's most legendary Sauternes — complex botrytis nectar with astonishing longevity.",
        "adventurous": True,
    },
    {
        "name": "Taylor Fladgate 20-Year Tawny Port",
        "winery": "Taylor Fladgate",
        "region": "Douro", "country": "Portugal", "world": "Old World",
        "wine_type": "Dessert", "body": "Full", "sweetness": "Sweet",
        "tannins": "Low", "acidity": "Medium",
        "flavors": ["dried fig", "walnut", "caramel", "orange peel", "coffee"],
        "price": 44.99, "sku": "PT-DO-026",
        "description": "Aged nutty Tawny Port with incredible complexity — the perfect after-dinner companion.",
        "adventurous": False,
    },
]


# ─────────────────────────────────────────────
#  TERMINAL COLORS  (no dependencies needed)
# ─────────────────────────────────────────────
class C:
    RESET  = "\033[0m"
    BOLD   = "\033[1m"
    GOLD   = "\033[93m"
    WINE   = "\033[91m"
    GREEN  = "\033[92m"
    CYAN   = "\033[96m"
    PURPLE = "\033[95m"
    GREY   = "\033[90m"
    WHITE  = "\033[97m"
    DIM    = "\033[2m"


def color(text, *styles):
    return "".join(styles) + text + C.RESET

def hr(ch="─", width=60, clr=C.GOLD):
    print(color(ch * width, clr))

def header(text):
    hr()
    print(color(f"  🍷  {text}", C.GOLD, C.BOLD))
    hr()

def section(text):
    print(f"\n{color('◆ ' + text, C.WINE, C.BOLD)}")

def wrap(text, width=58, indent=4):
    return textwrap.fill(text, width=width, initial_indent=" " * indent,
                         subsequent_indent=" " * indent)


# ─────────────────────────────────────────────
#  QUIZ HELPERS
# ─────────────────────────────────────────────
def ask(question, options, allow_skip=False):
    """
    Prompt the user with a numbered menu and return
    the zero-based index of their choice.
    Pass allow_skip=True to add a 'Skip / No preference' option.
    """
    print(f"\n{color(question, C.CYAN, C.BOLD)}")
    menu = list(options)
    if allow_skip:
        menu.append("No preference / Skip")
    for i, opt in enumerate(menu, 1):
        print(f"  {color(str(i) + '.', C.GOLD)}  {opt}")
    while True:
        try:
            raw = input(color("\n  Your choice ❯ ", C.PURPLE)).strip()
            idx = int(raw) - 1
            if 0 <= idx < len(menu):
                return idx if not allow_skip else (None if idx == len(menu) - 1 else idx)
            print(color(f"  Please enter a number between 1 and {len(menu)}.", C.WINE))
        except (ValueError, KeyboardInterrupt):
            print(color("  Please enter a number.", C.WINE))


def score_wine(wine, prefs):
    """
    Score a wine against the collected preferences dict.
    Returns an int — higher is a better match.
    """
    score = 0

    # World match (high weight)
    if prefs.get("world") and wine["world"] == prefs["world"]:
        score += 10

    # Country match
    if prefs.get("country") and wine["country"] == prefs["country"]:
        score += 8

    # Region match
    if prefs.get("region") and wine["region"] == prefs["region"]:
        score += 6

    # Wine type
    if prefs.get("wine_type") and wine["wine_type"] == prefs["wine_type"]:
        score += 10

    # Body
    if prefs.get("body") and wine["body"] == prefs["body"]:
        score += 5

    # Sweetness
    if prefs.get("sweetness") and wine["sweetness"] == prefs["sweetness"]:
        score += 7

    # Flavor overlaps
    if prefs.get("flavors"):
        overlap = set(prefs["flavors"]) & set(wine["flavors"])
        score += len(overlap) * 3

    return score


def display_recommendation(wine, rank=None, label=None, emoji="🍾"):
    """Pretty-print a single wine recommendation."""
    tag = f"  {emoji}  "
    if label:
        print(f"\n{color(tag + label, C.GOLD, C.BOLD)}")
    elif rank:
        print(f"\n{color(tag + f'Option {rank}', C.GOLD, C.BOLD)}")

    print(f"     {color(wine['name'], C.WHITE, C.BOLD)}")
    print(f"     {color(wine['winery'] + '  ·  ' + wine['region'] + ', ' + wine['country'], C.GREY)}")
    print(f"     {color(wine['wine_type'] + '  |  ' + wine['body'] + ' Body  |  ' + wine['sweetness'], C.CYAN)}")
    print(f"     {color('Flavors: ' + ', '.join(wine['flavors'][:4]), C.DIM)}")
    print(wrap(wine["description"]))
    print(f"     {color('$' + str(wine['price']), C.GREEN, C.BOLD)}   {color('SKU: ' + wine['sku'], C.GREY)}")


# ─────────────────────────────────────────────
#  QUIZ FLOW
# ─────────────────────────────────────────────
def run_quiz():
    prefs = {}

    # ── Welcome ──────────────────────────────
    print("\n" * 2)
    header("Howard Street Wine Merchant")
    print(color("  Welcome to your personal wine discovery guide!", C.WHITE))
    print(color("  Answer a few questions and we'll find the perfect bottle.", C.GREY))
    print()

    try:
        name = input(color("  What's your name? ❯ ", C.PURPLE)).strip() or "friend"
    except KeyboardInterrupt:
        print("\n  Goodbye!")
        sys.exit(0)

    greeting = f"Great to meet you, {name}! Let's find your wine."
    print(f"\n  {color(greeting, C.GOLD)}\n")

    # ── Step 1: World ─────────────────────────
    section("Step 1 of 5 — Old World or New World?")
    world_opts = [
        "Old World  (France, Italy, Spain, Germany, Portugal…)",
        "New World  (USA, Argentina, Chile, Australia, New Zealand…)",
        "Surprise me — I'm open to anything!",
    ]
    world_idx = ask("Which part of the wine world calls to you?", world_opts)

    old_world_countries  = ["France", "Italy", "Spain", "Germany", "Portugal"]
    new_world_countries  = ["USA", "Argentina", "Chile", "Australia", "New Zealand"]

    if world_idx == 0:
        prefs["world"] = "Old World"
        country_list = old_world_countries
    elif world_idx == 1:
        prefs["world"] = "New World"
        country_list = new_world_countries
    else:
        prefs["world"] = None
        country_list = old_world_countries + new_world_countries

    # ── Step 2: Country ───────────────────────
    section("Step 2 of 5 — Narrow by Country")
    country_opts = country_list + ["No preference"]
    country_idx  = ask("Any particular country?", country_opts)
    if country_idx < len(country_list):
        prefs["country"] = country_list[country_idx]
    else:
        prefs["country"] = None

    # ── Step 3: Wine Type ─────────────────────
    section("Step 3 of 5 — Type of Wine")
    type_opts = ["Red", "White", "Rosé", "Sparkling", "Dessert / Fortified"]
    type_map  = ["Red", "White", "Rosé", "Sparkling", "Dessert"]
    type_idx  = ask("What style of wine are you in the mood for?", type_opts, allow_skip=True)
    prefs["wine_type"] = type_map[type_idx] if type_idx is not None else None

    # ── Step 4: Body ──────────────────────────
    section("Step 4 of 5 — How Bold?")
    body_opts = [
        "Light  — delicate, easy-drinking, lower alcohol",
        "Medium — balanced, versatile, food-friendly",
        "Full   — rich, powerful, intense, age-worthy",
    ]
    body_map  = ["Light", "Medium", "Full"]
    body_idx  = ask("How would you describe your ideal wine's body?", body_opts, allow_skip=True)
    prefs["body"] = body_map[body_idx] if body_idx is not None else None

    # ── Step 5: Sweetness ─────────────────────
    section("Step 5 of 5 — Sweetness Level")
    sweet_opts = [
        "Bone Dry  — no residual sugar, crisp and savory",
        "Off-Dry   — a hint of sweetness to balance acidity",
        "Sweet     — honeyed, lush, dessert-style",
    ]
    sweet_map  = ["Dry", "Off-Dry", "Sweet"]
    sweet_idx  = ask("How sweet do you like it?", sweet_opts, allow_skip=True)
    prefs["sweetness"] = sweet_map[sweet_idx] if sweet_idx is not None else None

    # ── Optional: Flavor Hints ────────────────
    print(f"\n{color('◆ Bonus — Flavor Vibes (pick any that appeal):', C.WINE, C.BOLD)}")
    flavor_groups = {
        "Dark fruit  (blackberry, plum, cherry)":  ["blackberry", "plum", "cherry", "blackcurrant"],
        "Red fruit   (raspberry, strawberry)":      ["raspberry", "strawberry", "cranberry", "red cherry"],
        "Citrus      (lemon, lime, grapefruit)":    ["lemon", "lime", "grapefruit", "citrus"],
        "Stone fruit (peach, apricot, nectarine)":  ["peach", "apricot", "nectarine"],
        "Earthy      (truffle, leather, tobacco)":  ["truffle", "leather", "tobacco", "earth", "forest floor"],
        "Oak & toast (vanilla, cedar, coffee)":     ["vanilla", "cedar", "coffee", "mocha", "toasted oak"],
        "Floral      (violet, rose, jasmine)":      ["violet", "rose", "jasmine", "white flower"],
        "Skip this step":                           [],
    }
    flavor_keys  = list(flavor_groups.keys())
    flavor_label = list(flavor_groups.keys())
    print(f"\n{color('  (Enter multiple numbers separated by commas, e.g. 1,3)', C.GREY)}")
    print(f"\n{color('  Which flavors sound appealing?', C.CYAN, C.BOLD)}")
    for i, label in enumerate(flavor_label, 1):
        print(f"  {color(str(i) + '.', C.GOLD)}  {label}")

    chosen_flavors = []
    while True:
        try:
            raw = input(color("\n  Your choices ❯ ", C.PURPLE)).strip()
            if not raw:
                break
            parts = [p.strip() for p in raw.split(",")]
            indices = [int(p) - 1 for p in parts if p.isdigit()]
            # If "Skip" selected or invalid, break
            if any(i == len(flavor_label) - 1 for i in indices):
                break
            for idx in indices:
                if 0 <= idx < len(flavor_label) - 1:
                    chosen_flavors.extend(flavor_groups[flavor_keys[idx]])
            break
        except (ValueError, KeyboardInterrupt):
            print(color("  Enter numbers separated by commas.", C.WINE))

    prefs["flavors"] = chosen_flavors if chosen_flavors else None

    # ── Matching Engine ───────────────────────
    print(f"\n{color('  Searching the cellar...', C.GREY)}")

    scored = [(score_wine(w, prefs), w) for w in INVENTORY]
    scored.sort(key=lambda x: x[0], reverse=True)

    # Separate standard from adventurous
    standard = [(s, w) for s, w in scored if not w["adventurous"]]
    adventurous = [(s, w) for s, w in scored if w["adventurous"]]

    # Top 2 standard picks
    top_picks = [w for _, w in standard[:2]]

    # Best adventurous pick (highest score among adventurous, different from top_picks)
    top_pick_names = {w["name"] for w in top_picks}
    adv_pick = next(
        (w for _, w in adventurous if w["name"] not in top_pick_names),
        random.choice([w for w in INVENTORY if w["adventurous"]])
    )

    # ── Results ───────────────────────────────
    print("\n\n")
    header(f"  {name}'s Personalized Recommendations")

    section("Your Top Matches")
    for i, wine in enumerate(top_picks, 1):
        display_recommendation(wine, rank=i)

    section("Feeling Adventurous? 🎲")
    display_recommendation(adv_pick, label="The Wild Card Pick", emoji="✨")
    print(f"\n{wrap('This one steps a bit outside the usual — a great chance to discover something unexpected!', width=58)}")

    # ── Summary of Preferences ────────────────
    print("\n")
    hr(ch="·", clr=C.GREY)
    print(color("  Your taste profile summary:", C.GREY, C.BOLD))
    profile_parts = []
    if prefs.get("world"):    profile_parts.append(prefs["world"])
    if prefs.get("country"):  profile_parts.append(prefs["country"])
    if prefs.get("wine_type"):profile_parts.append(prefs["wine_type"])
    if prefs.get("body"):     profile_parts.append(prefs["body"] + " body")
    if prefs.get("sweetness"):profile_parts.append(prefs["sweetness"])
    print(color("  " + "  ·  ".join(profile_parts) if profile_parts else "  Open to anything!", C.GREY))
    hr(ch="·", clr=C.GREY)

    # ── Closing ───────────────────────────────
    print(f"""
  {color("Questions? Our staff is happy to help!", C.GOLD, C.BOLD)}
  {color("Howard Street Wine Merchant", C.WHITE)}
  {color("Howard Street · Omaha, Nebraska", C.GREY)}
  {color("─" * 40, C.GOLD)}
""")

    # ── Play Again ────────────────────────────
    again = input(color("  Would you like to start over? (y/n) ❯ ", C.PURPLE)).strip().lower()
    if again == "y":
        run_quiz()


# ─────────────────────────────────────────────
#  ENTRY POINT
# ─────────────────────────────────────────────
if __name__ == "__main__":
    try:
        run_quiz()
    except KeyboardInterrupt:
        print(f"\n\n  {color('Thanks for visiting Howard Street Wine Merchant! Cheers! 🥂', C.GOLD)}\n")
        sys.exit(0)
