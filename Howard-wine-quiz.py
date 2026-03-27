"""
Howard Street Wine Merchant — Wine Discovery Quiz
Guides customers from region preferences → taste profile → personalized recommendations.
"""

import sys
import textwrap
import random

from howard_street_inventory import INVENTORY


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
