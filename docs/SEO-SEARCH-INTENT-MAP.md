# TGPI Search Intent Map

| Cluster | Example query | Primary destination | Product continuation | Index rule |
|---|---|---|---|---|
| Brand | The Global Polymath Institute | `/` | Countries, Compare, Learn | Index |
| Brand | TGPI founder | `/founder` | About TGPI | Index |
| Country | Portugal country guide | `/countries/portugal` | Compare or save | Index after quality gate |
| Cost | Portugal cost of living | `/countries/portugal#cost-of-living` | Monthly planner, Compare | Use country canonical until a sourced standalone page exists |
| Work | work in Japan | `/countries/japan` | Documents, relevant course | Use country canonical until a materially complete work guide exists |
| Study | study in Canada | `/countries/canada` | Learn, Compare | Use country canonical until a materially complete study guide exists |
| Move | moving to Spain | `/countries/spain` | Documents checklist | Use country canonical until a sourced moving guide exists |
| Documents | documents needed to move abroad | `/passport` | Personal checklist, account | Index |
| Compare | Portugal vs Spain | `/compare?country=portugal&country=spain` | Refine, save, account | Canonical to `/compare`; no editorial pair URL yet |
| Best countries | best countries to study | Future decision hub | Shortlist, Compare | Do not create until ranking methodology and original content exist |
| Learn | English for living abroad | `/courses/english-abroad` | Start course, account | Public overview index; lessons noindex |
| Methodology | how TGPI ranks countries | `/authority` | Editorial policy | Index |
| Internal search | Lisbon, Portuguese, affordable Europe | `/search?q=...` | Country or product result | Noindex, follow |

## Priority country set

United States, Canada, Portugal, Spain, United Kingdom, Germany, France, Italy, Switzerland, Netherlands, Ireland, Australia, New Zealand, Japan, South Korea, Singapore, United Arab Emirates, Brazil and Mexico.

Priority does not equal permanent index eligibility. It is the first editorial queue. A page should remain noindex if its facts, costs, sources or country-specific content have not passed review.

## Search-to-product events

| Event | Meaning |
|---|---|
| `seo_landing_viewed` | User arrived on an indexable TGPI landing page |
| `country_comparison_started` | Organic visitor moved from research to a decision action |
| `country_saved` | Visitor created persistent product value |
| `account_created_from_seo` | Organic visitor activated a TGPI Global Key |
| `course_started_from_seo` | Search visitor entered the learning system |
| `premium_intent_from_seo` | Activated visitor demonstrated purchase intent |

Organic performance should be evaluated through activation and assisted conversion, not pageviews alone.
