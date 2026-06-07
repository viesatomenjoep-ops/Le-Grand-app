import json
import urllib.request
import urllib.parse
import re

LANGS = ['pt','it','da','sv','fi','pl','hu','bg','cs','hr','el','et','lt','no']

en_strings = {
    'nav_home':'Home', 'nav_dames':'Ladies', 'nav_events':'Events', 'nav_shop':'Shop', 'nav_meer':'More', 'btn_reserve':'Book an evening', 'subtitle_reserve':'Choose date, time & package', 'welkom_title':'Welcome to the world of indulgence', 'btn_enter':'Enter the club', 'dames_title':'Our ladies', 'dames_subtitle':'Some of our regular ladies.', 'dames_filter_all':'All ladies', 'dames_filter_now':'Present now', 'today_present':'Present today', 'events_title':'Events', 'events_subtitle':'Special events.', 'shop_title':'Webshop', 'vacatures_title':'Jobs', 'info_title':'Information', 'contact_title':'Contact', 'fast_to':'Quick links', 'gate_text':'This place is for adults only. Please confirm your age to continue.', 'gate_yes':'I am 18 or older', 'gate_no':'I am under 18', 'gate_deny_title':'Goodbye', 'gate_deny_text':'You must be 18 or older to view this app. Come back when you are.', 'gate_back':'Back',
    'now_open':'Now open', 'until':'until', 'home_title1':'An evening of', 'home_title2':'pure indulgence', 'home_subtitle':'Exclusive sauna club in Zundert.', 'step_date':'Date', 'step_time':'Time', 'step_package':'Package', 'step_confirm':'Confirm', 'res_close_note':'Reservations are possible up to 2 hours before closing.', 'btn_continue':'Continue', 'today_in_club':'Today in the club', 'who_is_present':'Who is present', 'all_ladies':'All ladies', 'present':'Present', 'view_all':'View all', 'our_wellness':'Our wellness', 'facilities':'Facilities', 'finnish_sauna':'Finnish Sauna', 'finnish_sauna_desc':'Crackling wood, hot stones and a ritual infusion — the heart of the club.', 'steam_bath':'Steam bath', 'steam_bath_desc':'Warm, aromatic vapor with eucalyptus that opens the senses.', 'jacuzzi':'Jacuzzi', 'jacuzzi_desc':'Bubbling warm water in an atmospheric, dim setting.', 'most_chosen':'Most chosen', 'day_entry':'Day entry', 'all_day':'Full day · all-in', 'pp':'p.p.', 'soon':'Soon', 'all_events':'All events', 'regular_night':'Regular night', 'weekly':'Weekly', 'strippers_night':'Strippers Night', 'strippers_night_desc':'Our regular weekend night with a live DJ and various dancers.', 'outside':'Outside', 'on_announcement':'On announcement', 'bbq_time':'BBQ Time at Le Grand', 'bbq_time_desc':'A delicious barbecue on our heated outdoor terrace, combined with all wellness facilities.', 'theme_night':'Theme night', 'orange_party':'Orange Summer Party', 'orange_party_desc':'An exuberant summer edition in orange vibes. Festive cocktails, dancing ladies and music.', 'webshop':'Webshop', 'take_home':'Take home', 'to_shop':'To shop', 'bathrobe':'Le Grand Bathrobe', 'slippers':'Bath slippers', 'guest_exp':'Guest experiences', 'what_guests_say':'What guests say', 'based_on_reviews':'Based on 280+ Google reviews', 'read_all_reviews':'Read all reviews on Google', 'today':'Today', 'monday':'Mon', 'tuesday':'Tue', 'wednesday':'Wed', 'thursday':'Thu', 'friday':'Fri', 'saturday':'Sat', 'sunday':'Sun', 'ago_weeks':'{n} weeks ago', 'ago_months':'{n} months ago', 'ago_week':'1 week ago', 'ago_month':'1 month ago', 'review_1':'A truly stylish club. Spotless facilities and a welcome that makes you feel right at home.', 'review_2':'The private suite was fantastic: discreet, luxurious and perfectly organized. Definitely worth repeating.', 'review_3':'Warm atmosphere, beautiful sauna and friendly staff. Exactly the relaxation we were looking for.', 'review_4':'Everything breathes class, from the lounge to the wellness. It truly feels like a complete getaway.', 'review_5':'Wonderfully pampered with good drinks and a cozy, relaxed ambiance. Top organization.', 'review_6':'Clean, modern spaces and a welcoming team. You can tell they really care about their guests.', 'review_7':'Highly recommended for those who want to enjoy discreetly and in style. We will definitely be back.', 'review_8':'The jacuzzi and sauna are of top quality. A perfect place to completely unwind.', 'review_9':'Friendly welcome, beautiful decor and a relaxed atmosphere. Nothing to complain about really.', 'review_10':'Professional, welcoming and exceptionally well cared for. An evening we will not easily forget.',
    'dames_subtitle_long': 'Some of our regular ladies. For privacy reasons, not all ladies are online — feel free to drop by and meet them.', 'events_intro': 'At Saunaclub Le Grand we organize various monthly events. Every Friday and Saturday is a regular night with a live DJ and various dancers.', 'events_outro': 'In addition to our events, you are very welcome during all regular opening hours. Reservations are recommended on busy evenings.', 'shop_intro': 'Everything for your visit to the club — discreetly delivered to your home.', 'in_cart': 'Add to cart', 'discrete_shipping_title': 'Discreet shipping', 'discrete_shipping_desc': 'Your order is always discreetly delivered to your home in a neutral, blank box. Fast, careful and completely confidential.', 'discrete_shipping_short': 'Discreetly delivered to your home in a neutral, blank box.', 'anonymous': '100% Anonymous.', 'c_ro': 'Romania', 'c_fr': 'France', 'c_es': 'Spain', 'c_co': 'Colombia', 'c_md': 'Moldova', 'c_tr': 'Turkey', 'c_bg': 'Bulgaria',
    'fac_wellness':'Facilities & wellness', 'fac_wellness_sub':'Sauna, jacuzzi, pool, suites', 'rates':'Rates', 'rates_sub':'All-in entry & packages', 'opening_hours':'Opening hours', 'opening_hours_sub':'Today · 11:00 – 23:00', 'vacatures_sub':'Join our team', 'dames_sub':'See who is present', 'events_sub':'Strippers Night, theme nights', 'shop_sub':'Bathrobe, slippers & more', 'preferences':'Preferences', 'choose_lang':'Choose your language', 'route_maps':'Route to the club in Maps', 'open_maps':'Open in Maps', 'call_us':'Call us', 'access_18':'Access from 18 years · Saunaclub Le Grand · Zundert', 'heated_pool':'Heated Pool', 'heated_pool_desc':'A soothing indoor pool with soft underwater light.', 'bar_lounge':'Bar & Lounge', 'bar_lounge_desc':'Unlimited drinks, finger food and a warm, intimate ambiance.', 'priv_suites':'Private Suites', 'priv_suites_desc':'Discreet, luxurious suites with private jacuzzi and lounge.', 'six_rooms':'6 rooms', 'all_in_concept':'All-in concept', 'recommended':'Recommended', 'inc_bathrobe':'Bathrobe, towel & slippers', 'inc_drinks':'Unlimited soda, beer, wine & buffet', 'inc_saunas':'All saunas, jacuzzi & pool', 'happy_hours':'Happy Hours', 'mo_th_from':'Mon–Thu from 11:00', 'full_access':'Full access to facilities', 'inc_bathrobe_only':'Bathrobe & towel included', 'all_in_drinks':'All-in drinks', 'per_2_hours':'Per 2 hours', 'per_suite':'per suite', 'own_jacuzzi':'Private jacuzzi & lounge', 'bottle_champagne':'Bottle of champagne', 'fully_discreet':'Fully discreet', 'open_7_days':'Open 7 days', 'find_us':'Find us', 'loc_contact':'Location & contact', 'call_res':'Call for reservations', 'send_msg':'Send us a message', 'access_18_short':'Access from 18 years', 'id_required':'Valid ID required. We value discretion, respect and a safe atmosphere for everyone.', 'booked_full':'Fully booked', 'almost_full':'Almost full', 'available':'Available', 'party':'Party', 'guest':'guest', 'guests':'guests', 'total_ind':'Total indication', 'fname':'Name', 'fname_ph':'First and last name', 'phone':'Phone', 'booking_terms':'By confirming you agree to our house rules. Your data is treated confidentially.', 'confirm_booking':'Confirm booking', 'req_sent':'Request sent', 'thanks':'Thank you', 'confirm_24h':'We will confirm your reservation within 24 hours by phone.', 'booking_no':'Booking no.', 'back_home':'Back to home', 'new_res':'New reservation', 'step_1_of_4':'Step {n} of 4',
    'crowd_title': 'Live crowd in the club', 'crowd_quiet': 'Quiet', 'crowd_moderate': 'Pleasantly busy', 'crowd_busy': 'Very busy', 'crowd_quiet_desc': 'Plenty of space in the saunas and pools.', 'crowd_moderate_desc': 'There is currently plenty of space in the saunas and pools. No queues.', 'crowd_busy_desc': 'Pleasantly busy. Please expect a bit less space.'
}

keys = list(en_strings.keys())
vals = [en_strings[k] for k in keys]

def chunk_list(l, n):
    for i in range(0, len(l), n):
        yield l[i:i + n]

def translate_chunk(chunk, tl):
    q = "&q=".join(urllib.parse.quote(v) for v in chunk)
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl={tl}&dt=t&q={q}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        resp = urllib.request.urlopen(req)
        data = json.loads(resp.read().decode('utf-8'))
        res = []
        for x in data[0]:
            if x[0]: res.append(x[0].replace('”', "'").replace('“', "'"))
        return res
    except Exception as e:
        print(f"Error {tl}: {e}")
        return chunk

def run():
    out_js = ""
    for tl in LANGS:
        print(f"Translating to {tl}...")
        translated_vals = []
        for c in chunk_list(vals, 15):
            t_chunk = translate_chunk(c, tl)
            # Ensure exact length
            if len(t_chunk) != len(c):
                # fallback if chunk misaligned
                translated_vals.extend(c)
            else:
                translated_vals.extend(t_chunk)
        
        out_js += f"T.{tl}={{ \n"
        for i, k in enumerate(keys):
            val = translated_vals[i].replace("'", "\\'").strip()
            # fix {n} formatting issues Google translate might cause
            val = re.sub(r'\{\s*n\s*\}', '{n}', val)
            out_js += f"  {k}: '{val}',\n"
        out_js += "};\n\n"

    with open('app/translations.js', 'r') as f:
        content = f.read()

    # Find the fallback block
    fallback_code = """['pt','it','da','sv','fi','pl','hu','bg','cs','hr','el','et','lt','no'].forEach(lang => {
  T[lang] = { ...T.en };
  Object.assign(T[lang], extras.en, extras2.en); // Fallback extra keys to English
});"""
    
    if "window.TRANSLATIONS = T;" in content:
        content = content.replace("window.TRANSLATIONS = T;", out_js + "\nwindow.TRANSLATIONS = T;")
    else:
        content += "\n" + out_js

    with open('app/translations.js', 'w') as f:
        f.write(content)

    print("Done writing translations!")

run()
