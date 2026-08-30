# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> light theme >> creator profile has no serious/critical violations
- Location: tests/e2e/a11y.spec.ts:28:11

# Error details

```
Error: 2 axe violation(s) on light theme > creator profile:

[SERIOUS] aria-progressbar-name: Ensure every ARIA progressbar node has an accessible name
  Help: https://dequeuniversity.com/rules/axe/4.10/aria-progressbar-name?application=playwright
  Nodes (1):
    - <div class="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan transition-all duration-700" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1" style="width: 0%;"></div>

[SERIOUS] aria-prohibited-attr: Ensure ARIA attributes are not prohibited for an element's role
  Help: https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr?application=playwright
  Nodes (5):
    - <div title="None" aria-label="Level 0: None" style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.08); border-radius: 2.34px;"></div>
    - <div title="Low" aria-label="Level 1: Low" style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.25); border-radius: 2.34px;"></div>
    - <div title="Medium" aria-label="Level 2: Medium" style="width: 13px; height: 13px; background-color: rgba(15, 108, 123, 0.5); border-radius: 2.34px;"></div>
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic:
    - generic:
      - generic [ref=e2]: Freighter not installed
      - 'status "WebSocket status: Offline" [ref=e3]': Offline
    - generic:
      - link "Back to Explore" [ref=e4] [cursor=pointer]:
        - /url: /explore
        - button "Back to Explore" [ref=e5]:
          - img [ref=e6]
          - text: Back to Explore
      - generic:
        - generic:
          - generic:
            - img "Test User's avatar" [ref=e8]
            - generic:
              - generic:
                - heading "Test User" [level=1]
              - paragraph: "@testuser"
          - generic:
            - link "QR Code" [ref=e9] [cursor=pointer]:
              - /url: /creator/testuser/qr
              - button "QR Code" [ref=e10]
            - link "View in AR" [ref=e11] [cursor=pointer]:
              - /url: /ar?mode=profile&username=testuser
              - img [ref=e12]
              - text: View in AR
            - button "Report @testuser" [ref=e18]: ⚑ Report
        - generic:
          - paragraph: A test creator
          - generic:
            - paragraph: Categories & Tags
            - generic:
              - 'generic "Tag: art" [ref=e19]':
                - text: "#art"
                - img
              - 'generic "Tag: test-tag" [ref=e21]':
                - text: "#test-tag"
                - img
    - generic:
      - generic:
        - generic:
          - heading "Matching Campaigns" [level=2]
          - paragraph: Active matching campaigns that boost tips for this creator.
          - paragraph: No active matching campaigns right now.
        - generic:
          - heading "Creator Statistics" [level=2]
          - generic:
            - generic:
              - heading "Fundraising Goal" [level=2]: Fundraising Goal
              - generic:
                - generic:
                  - heading "Funding Goal Progress" [level=3]
                - generic:
                  - generic [ref=e24]: 1,234.5 / 10,000 XLM
                  - generic [ref=e25]: 12.3%
                - paragraph: 13% to Bronze
            - generic:
              - generic:
                - generic [ref=e28]: +12.5%
                - heading "1,234.5 XLM" [level=3]:
                  - generic [ref=e29]: 1,234.5 XLM
                - paragraph: Total Tips
              - generic:
                - generic [ref=e32]: +8.2%
                - heading "56" [level=3]
                - paragraph: Tip Count
              - generic:
                - generic [ref=e35]: "-2.4%"
                - heading "42" [level=3]
                - paragraph: Supporters
            - generic:
              - generic:
                - heading "Tip History" [level=2]
                - generic:
                  - paragraph: Tips over time (XLM)
              - generic:
                - heading "Top Supporters" [level=2]
                - generic:
                  - paragraph: Top Supporters
                  - list [ref=e36]:
                    - listitem:
                      - text: "1"
                      - generic:
                        - generic:
                          - text: "@stellar-fan"
                          - generic [ref=e37]: 300 XLM
                        - paragraph: 8 tips
                    - listitem:
                      - text: "2"
                      - generic:
                        - generic:
                          - text: "@xlm-lover"
                          - generic [ref=e38]: 250 XLM
                        - paragraph: 5 tips
                    - listitem:
                      - text: "3"
                      - generic:
                        - generic:
                          - text: "@crypto-alice"
                          - generic [ref=e39]: 180 XLM
                        - paragraph: 12 tips
                    - listitem:
                      - text: "4"
                      - generic:
                        - generic:
                          - text: "@blockchainer"
                          - generic [ref=e40]: 120 XLM
                        - paragraph: 3 tips
                    - listitem:
                      - text: "5"
                      - generic:
                        - generic:
                          - text: "@defi-bob"
                          - generic [ref=e41]: 90 XLM
                        - paragraph: 6 tips
            - generic:
              - heading "Activity Heatmap" [level=2]
              - generic:
                - generic:
                  - generic:
                    - generic:
                      - heading "testuser's Tip Activity" [level=3]
                      - paragraph: 531 tips · 208 active days
                    - generic:
                      - generic:
                        - button "1yr" [ref=e42]
                        - button "2yr" [ref=e43]
                        - button "3yr" [ref=e44]
                      - generic:
                        - button "Previous year" [ref=e45]
                        - text: This year
                        - button "Next year" [disabled] [ref=e47]
                      - generic:
                        - button "Ocean theme" [pressed] [ref=e49]
                        - button "Sunrise theme" [ref=e50]
                        - button "Moss theme" [ref=e51]
                        - button "Purple theme" [ref=e52]
                        - button "Mono theme" [ref=e53]
                  - generic:
                    - grid "Tip activity heatmap":
                      - generic [ref=e54]:
                        - generic [ref=e55]:
                          - generic [ref=e56]: Aug
                          - generic [ref=e57]: Sep
                          - generic [ref=e58]: Oct
                          - generic [ref=e59]: Nov
                          - generic [ref=e60]: Dec
                          - generic [ref=e61]: Jan
                          - generic [ref=e62]: Feb
                          - generic [ref=e63]: Mar
                          - generic [ref=e64]: Apr
                          - generic [ref=e65]: May
                          - generic [ref=e66]: Jun
                          - generic [ref=e67]: Jul
                          - generic [ref=e68]: Aug
                        - generic [ref=e69]:
                          - generic [ref=e70]:
                            - generic [ref=e72]: Mon
                            - generic [ref=e74]: Wed
                            - generic [ref=e76]: Fri
                          - generic [ref=e78]:
                            - row "Week of 2025-08-17" [ref=e79]:
                              - 'gridcell "2025-08-17: no tips" [ref=e80] [cursor=pointer]'
                              - 'gridcell "2025-08-18: no tips" [ref=e81] [cursor=pointer]'
                              - 'gridcell "2025-08-19: 165.44 XLM, 4 tips" [ref=e82] [cursor=pointer]'
                              - 'gridcell "2025-08-20: 168.66 XLM, 3 tips" [ref=e83] [cursor=pointer]'
                              - 'gridcell "2025-08-21: 79.51 XLM, 1 tip" [ref=e84] [cursor=pointer]'
                              - 'gridcell "2025-08-22: 217.92 XLM, 3 tips" [ref=e85] [cursor=pointer]'
                              - 'gridcell "2025-08-23: 292.26 XLM, 4 tips" [ref=e86] [cursor=pointer]'
                            - row "Week of 2025-08-24" [ref=e87]:
                              - 'gridcell "2025-08-24: no tips" [ref=e88] [cursor=pointer]'
                              - 'gridcell "2025-08-25: no tips" [ref=e89] [cursor=pointer]'
                              - 'gridcell "2025-08-26: 26.22 XLM, 1 tip" [ref=e90] [cursor=pointer]'
                              - 'gridcell "2025-08-27: 111.56 XLM, 3 tips" [ref=e91] [cursor=pointer]'
                              - 'gridcell "2025-08-28: 118.08 XLM, 1 tip" [ref=e92] [cursor=pointer]'
                              - 'gridcell "2025-08-29: 243.85 XLM, 4 tips" [ref=e93] [cursor=pointer]'
                              - 'gridcell "2025-08-30: 303.84 XLM, 4 tips" [ref=e94] [cursor=pointer]'
                            - row "Week of 2025-08-31" [ref=e95]:
                              - 'gridcell "2025-08-31: no tips" [ref=e96] [cursor=pointer]'
                              - 'gridcell "2025-09-01: 217.61 XLM, 3 tips" [ref=e97] [cursor=pointer]'
                              - 'gridcell "2025-09-02: no tips" [ref=e98] [cursor=pointer]'
                              - 'gridcell "2025-09-03: 120.14 XLM, 3 tips" [ref=e99] [cursor=pointer]'
                              - 'gridcell "2025-09-04: 257.81 XLM, 3 tips" [ref=e100] [cursor=pointer]'
                              - 'gridcell "2025-09-05: no tips" [ref=e101] [cursor=pointer]'
                              - 'gridcell "2025-09-06: no tips" [ref=e102] [cursor=pointer]'
                            - row "Week of 2025-09-07" [ref=e103]:
                              - 'gridcell "2025-09-07: 252.25 XLM, 4 tips" [ref=e104] [cursor=pointer]'
                              - 'gridcell "2025-09-08: no tips" [ref=e105] [cursor=pointer]'
                              - 'gridcell "2025-09-09: 17.14 XLM, 1 tip" [ref=e106] [cursor=pointer]'
                              - 'gridcell "2025-09-10: no tips" [ref=e107] [cursor=pointer]'
                              - 'gridcell "2025-09-11: 206.05 XLM, 4 tips" [ref=e108] [cursor=pointer]'
                              - 'gridcell "2025-09-12: no tips" [ref=e109] [cursor=pointer]'
                              - 'gridcell "2025-09-13: no tips" [ref=e110] [cursor=pointer]'
                            - row "Week of 2025-09-14" [ref=e111]:
                              - 'gridcell "2025-09-14: no tips" [ref=e112] [cursor=pointer]'
                              - 'gridcell "2025-09-15: 235.01 XLM, 4 tips" [ref=e113] [cursor=pointer]'
                              - 'gridcell "2025-09-16: no tips" [ref=e114] [cursor=pointer]'
                              - 'gridcell "2025-09-17: 140.65 XLM, 2 tips" [ref=e115] [cursor=pointer]'
                              - 'gridcell "2025-09-18: no tips" [ref=e116] [cursor=pointer]'
                              - 'gridcell "2025-09-19: 213.56 XLM, 3 tips" [ref=e117] [cursor=pointer]'
                              - 'gridcell "2025-09-20: 351.55 XLM, 4 tips" [ref=e118] [cursor=pointer]'
                            - row "Week of 2025-09-21" [ref=e119]:
                              - 'gridcell "2025-09-21: no tips" [ref=e120] [cursor=pointer]'
                              - 'gridcell "2025-09-22: 277.57 XLM, 3 tips" [ref=e121] [cursor=pointer]'
                              - 'gridcell "2025-09-23: no tips" [ref=e122] [cursor=pointer]'
                              - 'gridcell "2025-09-24: no tips" [ref=e123] [cursor=pointer]'
                              - 'gridcell "2025-09-25: no tips" [ref=e124] [cursor=pointer]'
                              - 'gridcell "2025-09-26: 124.96 XLM, 1 tip" [ref=e125] [cursor=pointer]'
                              - 'gridcell "2025-09-27: 164.75 XLM, 2 tips" [ref=e126] [cursor=pointer]'
                            - row "Week of 2025-09-28" [ref=e127]:
                              - 'gridcell "2025-09-28: 377.16 XLM, 4 tips" [ref=e128] [cursor=pointer]'
                              - 'gridcell "2025-09-29: 101.05 XLM, 1 tip" [ref=e129] [cursor=pointer]'
                              - 'gridcell "2025-09-30: 16.49 XLM, 1 tip" [ref=e130] [cursor=pointer]'
                              - 'gridcell "2025-10-01: no tips" [ref=e131] [cursor=pointer]'
                              - 'gridcell "2025-10-02: 94.52 XLM, 1 tip" [ref=e132] [cursor=pointer]'
                              - 'gridcell "2025-10-03: 48.88 XLM, 1 tip" [ref=e133] [cursor=pointer]'
                              - 'gridcell "2025-10-04: no tips" [ref=e134] [cursor=pointer]'
                            - row "Week of 2025-10-05" [ref=e135]:
                              - 'gridcell "2025-10-05: 48.52 XLM, 2 tips" [ref=e136] [cursor=pointer]'
                              - 'gridcell "2025-10-06: 9.22 XLM, 1 tip" [ref=e137] [cursor=pointer]'
                              - 'gridcell "2025-10-07: 218.73 XLM, 3 tips" [ref=e138] [cursor=pointer]'
                              - 'gridcell "2025-10-08: no tips" [ref=e139] [cursor=pointer]'
                              - 'gridcell "2025-10-09: no tips" [ref=e140] [cursor=pointer]'
                              - 'gridcell "2025-10-10: 157.93 XLM, 3 tips" [ref=e141] [cursor=pointer]'
                              - 'gridcell "2025-10-11: no tips" [ref=e142] [cursor=pointer]'
                            - row "Week of 2025-10-12" [ref=e143]:
                              - 'gridcell "2025-10-12: no tips" [ref=e144] [cursor=pointer]'
                              - 'gridcell "2025-10-13: no tips" [ref=e145] [cursor=pointer]'
                              - 'gridcell "2025-10-14: 188.65 XLM, 2 tips" [ref=e146] [cursor=pointer]'
                              - 'gridcell "2025-10-15: 171.87 XLM, 3 tips" [ref=e147] [cursor=pointer]'
                              - 'gridcell "2025-10-16: 150.42 XLM, 4 tips" [ref=e148] [cursor=pointer]'
                              - 'gridcell "2025-10-17: 89.86 XLM, 2 tips" [ref=e149] [cursor=pointer]'
                              - 'gridcell "2025-10-18: 216.69 XLM, 3 tips" [ref=e150] [cursor=pointer]'
                            - row "Week of 2025-10-19" [ref=e151]:
                              - 'gridcell "2025-10-19: no tips" [ref=e152] [cursor=pointer]'
                              - 'gridcell "2025-10-20: 321.43 XLM, 4 tips" [ref=e153] [cursor=pointer]'
                              - 'gridcell "2025-10-21: 115.77 XLM, 1 tip" [ref=e154] [cursor=pointer]'
                              - 'gridcell "2025-10-22: 75.97 XLM, 3 tips" [ref=e155] [cursor=pointer]'
                              - 'gridcell "2025-10-23: 139.11 XLM, 2 tips" [ref=e156] [cursor=pointer]'
                              - 'gridcell "2025-10-24: 168.31 XLM, 2 tips" [ref=e157] [cursor=pointer]'
                              - 'gridcell "2025-10-25: no tips" [ref=e158] [cursor=pointer]'
                            - row "Week of 2025-10-26" [ref=e159]:
                              - 'gridcell "2025-10-26: no tips" [ref=e160] [cursor=pointer]'
                              - 'gridcell "2025-10-27: 87.63 XLM, 2 tips" [ref=e161] [cursor=pointer]'
                              - 'gridcell "2025-10-28: no tips" [ref=e162] [cursor=pointer]'
                              - 'gridcell "2025-10-29: no tips" [ref=e163] [cursor=pointer]'
                              - 'gridcell "2025-10-30: 210.42 XLM, 3 tips" [ref=e164] [cursor=pointer]'
                              - 'gridcell "2025-10-31: 285.12 XLM, 4 tips" [ref=e165] [cursor=pointer]'
                              - 'gridcell "2025-11-01: 72.61 XLM, 1 tip" [ref=e166] [cursor=pointer]'
                            - row "Week of 2025-11-02" [ref=e167]:
                              - 'gridcell "2025-11-02: 113.40 XLM, 3 tips" [ref=e168] [cursor=pointer]'
                              - 'gridcell "2025-11-03: no tips" [ref=e169] [cursor=pointer]'
                              - 'gridcell "2025-11-04: no tips" [ref=e170] [cursor=pointer]'
                              - 'gridcell "2025-11-05: no tips" [ref=e171] [cursor=pointer]'
                              - 'gridcell "2025-11-06: no tips" [ref=e172] [cursor=pointer]'
                              - 'gridcell "2025-11-07: 285.11 XLM, 3 tips" [ref=e173] [cursor=pointer]'
                              - 'gridcell "2025-11-08: no tips" [ref=e174] [cursor=pointer]'
                            - row "Week of 2025-11-09" [ref=e175]:
                              - 'gridcell "2025-11-09: no tips" [ref=e176] [cursor=pointer]'
                              - 'gridcell "2025-11-10: 318.59 XLM, 4 tips" [ref=e177] [cursor=pointer]'
                              - 'gridcell "2025-11-11: 187.38 XLM, 3 tips" [ref=e178] [cursor=pointer]'
                              - 'gridcell "2025-11-12: no tips" [ref=e179] [cursor=pointer]'
                              - 'gridcell "2025-11-13: 115.60 XLM, 1 tip" [ref=e180] [cursor=pointer]'
                              - 'gridcell "2025-11-14: 112.64 XLM, 2 tips" [ref=e181] [cursor=pointer]'
                              - 'gridcell "2025-11-15: no tips" [ref=e182] [cursor=pointer]'
                            - row "Week of 2025-11-16" [ref=e183]:
                              - 'gridcell "2025-11-16: 118.23 XLM, 4 tips" [ref=e184] [cursor=pointer]'
                              - 'gridcell "2025-11-17: 172.75 XLM, 3 tips" [ref=e185] [cursor=pointer]'
                              - 'gridcell "2025-11-18: 82.23 XLM, 2 tips" [ref=e186] [cursor=pointer]'
                              - 'gridcell "2025-11-19: 334.17 XLM, 4 tips" [ref=e187] [cursor=pointer]'
                              - 'gridcell "2025-11-20: 43.23 XLM, 1 tip" [ref=e188] [cursor=pointer]'
                              - 'gridcell "2025-11-21: no tips" [ref=e189] [cursor=pointer]'
                              - 'gridcell "2025-11-22: 136.11 XLM, 2 tips" [ref=e190] [cursor=pointer]'
                            - row "Week of 2025-11-23" [ref=e191]:
                              - 'gridcell "2025-11-23: no tips" [ref=e192] [cursor=pointer]'
                              - 'gridcell "2025-11-24: no tips" [ref=e193] [cursor=pointer]'
                              - 'gridcell "2025-11-25: 227.14 XLM, 4 tips" [ref=e194] [cursor=pointer]'
                              - 'gridcell "2025-11-26: 137.99 XLM, 2 tips" [ref=e195] [cursor=pointer]'
                              - 'gridcell "2025-11-27: no tips" [ref=e196] [cursor=pointer]'
                              - 'gridcell "2025-11-28: no tips" [ref=e197] [cursor=pointer]'
                              - 'gridcell "2025-11-29: no tips" [ref=e198] [cursor=pointer]'
                            - row "Week of 2025-11-30" [ref=e199]:
                              - 'gridcell "2025-11-30: 159.81 XLM, 4 tips" [ref=e200] [cursor=pointer]'
                              - 'gridcell "2025-12-01: no tips" [ref=e201] [cursor=pointer]'
                              - 'gridcell "2025-12-02: 352.23 XLM, 4 tips" [ref=e202] [cursor=pointer]'
                              - 'gridcell "2025-12-03: no tips" [ref=e203] [cursor=pointer]'
                              - 'gridcell "2025-12-04: no tips" [ref=e204] [cursor=pointer]'
                              - 'gridcell "2025-12-05: 209.50 XLM, 4 tips" [ref=e205] [cursor=pointer]'
                              - 'gridcell "2025-12-06: no tips" [ref=e206] [cursor=pointer]'
                            - row "Week of 2025-12-07" [ref=e207]:
                              - 'gridcell "2025-12-07: no tips" [ref=e208] [cursor=pointer]'
                              - 'gridcell "2025-12-08: no tips" [ref=e209] [cursor=pointer]'
                              - 'gridcell "2025-12-09: 94.10 XLM, 3 tips" [ref=e210] [cursor=pointer]'
                              - 'gridcell "2025-12-10: no tips" [ref=e211] [cursor=pointer]'
                              - 'gridcell "2025-12-11: 316.42 XLM, 4 tips" [ref=e212] [cursor=pointer]'
                              - 'gridcell "2025-12-12: 71.47 XLM, 1 tip" [ref=e213] [cursor=pointer]'
                              - 'gridcell "2025-12-13: 246.40 XLM, 4 tips" [ref=e214] [cursor=pointer]'
                            - row "Week of 2025-12-14" [ref=e215]:
                              - 'gridcell "2025-12-14: 291.26 XLM, 4 tips" [ref=e216] [cursor=pointer]'
                              - 'gridcell "2025-12-15: 6.21 XLM, 1 tip" [ref=e217] [cursor=pointer]'
                              - 'gridcell "2025-12-16: no tips" [ref=e218] [cursor=pointer]'
                              - 'gridcell "2025-12-17: 42.43 XLM, 1 tip" [ref=e219] [cursor=pointer]'
                              - 'gridcell "2025-12-18: no tips" [ref=e220] [cursor=pointer]'
                              - 'gridcell "2025-12-19: 207.69 XLM, 3 tips" [ref=e221] [cursor=pointer]'
                              - 'gridcell "2025-12-20: 218.63 XLM, 2 tips" [ref=e222] [cursor=pointer]'
                            - row "Week of 2025-12-21" [ref=e223]:
                              - 'gridcell "2025-12-21: 171.60 XLM, 2 tips" [ref=e224] [cursor=pointer]'
                              - 'gridcell "2025-12-22: no tips" [ref=e225] [cursor=pointer]'
                              - 'gridcell "2025-12-23: 265.31 XLM, 4 tips" [ref=e226] [cursor=pointer]'
                              - 'gridcell "2025-12-24: no tips" [ref=e227] [cursor=pointer]'
                              - 'gridcell "2025-12-25: 143.30 XLM, 2 tips" [ref=e228] [cursor=pointer]'
                              - 'gridcell "2025-12-26: 83.85 XLM, 1 tip" [ref=e229] [cursor=pointer]'
                              - 'gridcell "2025-12-27: 93.44 XLM, 2 tips" [ref=e230] [cursor=pointer]'
                            - row "Week of 2025-12-28" [ref=e231]:
                              - 'gridcell "2025-12-28: 143.10 XLM, 2 tips" [ref=e232] [cursor=pointer]'
                              - 'gridcell "2025-12-29: no tips" [ref=e233] [cursor=pointer]'
                              - 'gridcell "2025-12-30: no tips" [ref=e234] [cursor=pointer]'
                              - 'gridcell "2025-12-31: 107.24 XLM, 3 tips" [ref=e235] [cursor=pointer]'
                              - 'gridcell "2026-01-01: no tips" [ref=e236] [cursor=pointer]'
                              - 'gridcell "2026-01-02: 220.54 XLM, 3 tips" [ref=e237] [cursor=pointer]'
                              - 'gridcell "2026-01-03: no tips" [ref=e238] [cursor=pointer]'
                            - row "Week of 2026-01-04" [ref=e239]:
                              - 'gridcell "2026-01-04: no tips" [ref=e240] [cursor=pointer]'
                              - 'gridcell "2026-01-05: 300.13 XLM, 4 tips" [ref=e241] [cursor=pointer]'
                              - 'gridcell "2026-01-06: no tips" [ref=e242] [cursor=pointer]'
                              - 'gridcell "2026-01-07: 171.10 XLM, 3 tips" [ref=e243] [cursor=pointer]'
                              - 'gridcell "2026-01-08: 175.53 XLM, 4 tips" [ref=e244] [cursor=pointer]'
                              - 'gridcell "2026-01-09: 112.02 XLM, 1 tip" [ref=e245] [cursor=pointer]'
                              - 'gridcell "2026-01-10: 169.49 XLM, 3 tips" [ref=e246] [cursor=pointer]'
                            - row "Week of 2026-01-11" [ref=e247]:
                              - 'gridcell "2026-01-11: 193.48 XLM, 2 tips" [ref=e248] [cursor=pointer]'
                              - 'gridcell "2026-01-12: 127.35 XLM, 2 tips" [ref=e249] [cursor=pointer]'
                              - 'gridcell "2026-01-13: 60.71 XLM, 1 tip" [ref=e250] [cursor=pointer]'
                              - 'gridcell "2026-01-14: no tips" [ref=e251] [cursor=pointer]'
                              - 'gridcell "2026-01-15: 169.75 XLM, 3 tips" [ref=e252] [cursor=pointer]'
                              - 'gridcell "2026-01-16: 49.29 XLM, 2 tips" [ref=e253] [cursor=pointer]'
                              - 'gridcell "2026-01-17: no tips" [ref=e254] [cursor=pointer]'
                            - row "Week of 2026-01-18" [ref=e255]:
                              - 'gridcell "2026-01-18: 217.61 XLM, 3 tips" [ref=e256] [cursor=pointer]'
                              - 'gridcell "2026-01-19: no tips" [ref=e257] [cursor=pointer]'
                              - 'gridcell "2026-01-20: 92.00 XLM, 1 tip" [ref=e258] [cursor=pointer]'
                              - 'gridcell "2026-01-21: 163.91 XLM, 3 tips" [ref=e259] [cursor=pointer]'
                              - 'gridcell "2026-01-22: no tips" [ref=e260] [cursor=pointer]'
                              - 'gridcell "2026-01-23: no tips" [ref=e261] [cursor=pointer]'
                              - 'gridcell "2026-01-24: no tips" [ref=e262] [cursor=pointer]'
                            - row "Week of 2026-01-25" [ref=e263]:
                              - 'gridcell "2026-01-25: no tips" [ref=e264] [cursor=pointer]'
                              - 'gridcell "2026-01-26: no tips" [ref=e265] [cursor=pointer]'
                              - 'gridcell "2026-01-27: no tips" [ref=e266] [cursor=pointer]'
                              - 'gridcell "2026-01-28: no tips" [ref=e267] [cursor=pointer]'
                              - 'gridcell "2026-01-29: 25.74 XLM, 2 tips" [ref=e268] [cursor=pointer]'
                              - 'gridcell "2026-01-30: 78.63 XLM, 2 tips" [ref=e269] [cursor=pointer]'
                              - 'gridcell "2026-01-31: 115.86 XLM, 1 tip" [ref=e270] [cursor=pointer]'
                            - row "Week of 2026-02-01" [ref=e271]:
                              - 'gridcell "2026-02-01: no tips" [ref=e272] [cursor=pointer]'
                              - 'gridcell "2026-02-02: no tips" [ref=e273] [cursor=pointer]'
                              - 'gridcell "2026-02-03: 198.14 XLM, 4 tips" [ref=e274] [cursor=pointer]'
                              - 'gridcell "2026-02-04: 86.35 XLM, 1 tip" [ref=e275] [cursor=pointer]'
                              - 'gridcell "2026-02-05: 45.67 XLM, 2 tips" [ref=e276] [cursor=pointer]'
                              - 'gridcell "2026-02-06: 204.66 XLM, 4 tips" [ref=e277] [cursor=pointer]'
                              - 'gridcell "2026-02-07: 97.85 XLM, 1 tip" [ref=e278] [cursor=pointer]'
                            - row "Week of 2026-02-08" [ref=e279]:
                              - 'gridcell "2026-02-08: 6.44 XLM, 1 tip" [ref=e280] [cursor=pointer]'
                              - 'gridcell "2026-02-09: no tips" [ref=e281] [cursor=pointer]'
                              - 'gridcell "2026-02-10: 140.70 XLM, 2 tips" [ref=e282] [cursor=pointer]'
                              - 'gridcell "2026-02-11: 261.64 XLM, 3 tips" [ref=e283] [cursor=pointer]'
                              - 'gridcell "2026-02-12: 384.87 XLM, 4 tips" [ref=e284] [cursor=pointer]'
                              - 'gridcell "2026-02-13: 358.72 XLM, 4 tips" [ref=e285] [cursor=pointer]'
                              - 'gridcell "2026-02-14: no tips" [ref=e286] [cursor=pointer]'
                            - row "Week of 2026-02-15" [ref=e287]:
                              - 'gridcell "2026-02-15: no tips" [ref=e288] [cursor=pointer]'
                              - 'gridcell "2026-02-16: no tips" [ref=e289] [cursor=pointer]'
                              - 'gridcell "2026-02-17: 239.32 XLM, 3 tips" [ref=e290] [cursor=pointer]'
                              - 'gridcell "2026-02-18: 176.18 XLM, 2 tips" [ref=e291] [cursor=pointer]'
                              - 'gridcell "2026-02-19: no tips" [ref=e292] [cursor=pointer]'
                              - 'gridcell "2026-02-20: 72.86 XLM, 1 tip" [ref=e293] [cursor=pointer]'
                              - 'gridcell "2026-02-21: no tips" [ref=e294] [cursor=pointer]'
                            - row "Week of 2026-02-22" [ref=e295]:
                              - 'gridcell "2026-02-22: 211.43 XLM, 4 tips" [ref=e296] [cursor=pointer]'
                              - 'gridcell "2026-02-23: no tips" [ref=e297] [cursor=pointer]'
                              - 'gridcell "2026-02-24: 369.99 XLM, 4 tips" [ref=e298] [cursor=pointer]'
                              - 'gridcell "2026-02-25: no tips" [ref=e299] [cursor=pointer]'
                              - 'gridcell "2026-02-26: 89.94 XLM, 2 tips" [ref=e300] [cursor=pointer]'
                              - 'gridcell "2026-02-27: no tips" [ref=e301] [cursor=pointer]'
                              - 'gridcell "2026-02-28: 58.83 XLM, 1 tip" [ref=e302] [cursor=pointer]'
                            - row "Week of 2026-03-01" [ref=e303]:
                              - 'gridcell "2026-03-01: no tips" [ref=e304] [cursor=pointer]'
                              - 'gridcell "2026-03-02: 36.67 XLM, 1 tip" [ref=e305] [cursor=pointer]'
                              - 'gridcell "2026-03-03: 319.72 XLM, 4 tips" [ref=e306] [cursor=pointer]'
                              - 'gridcell "2026-03-04: 261.58 XLM, 4 tips" [ref=e307] [cursor=pointer]'
                              - 'gridcell "2026-03-05: no tips" [ref=e308] [cursor=pointer]'
                              - 'gridcell "2026-03-06: no tips" [ref=e309] [cursor=pointer]'
                              - 'gridcell "2026-03-07: no tips" [ref=e310] [cursor=pointer]'
                            - row "Week of 2026-03-08" [ref=e311]:
                              - 'gridcell "2026-03-08: no tips" [ref=e312] [cursor=pointer]'
                              - 'gridcell "2026-03-09: 343.30 XLM, 4 tips" [ref=e313] [cursor=pointer]'
                              - 'gridcell "2026-03-10: 100.54 XLM, 1 tip" [ref=e314] [cursor=pointer]'
                              - 'gridcell "2026-03-11: no tips" [ref=e315] [cursor=pointer]'
                              - 'gridcell "2026-03-12: no tips" [ref=e316] [cursor=pointer]'
                              - 'gridcell "2026-03-13: no tips" [ref=e317] [cursor=pointer]'
                              - 'gridcell "2026-03-14: 304.68 XLM, 4 tips" [ref=e318] [cursor=pointer]'
                            - row "Week of 2026-03-15" [ref=e319]:
                              - 'gridcell "2026-03-15: no tips" [ref=e320] [cursor=pointer]'
                              - 'gridcell "2026-03-16: no tips" [ref=e321] [cursor=pointer]'
                              - 'gridcell "2026-03-17: 123.89 XLM, 1 tip" [ref=e322] [cursor=pointer]'
                              - 'gridcell "2026-03-18: 241.54 XLM, 4 tips" [ref=e323] [cursor=pointer]'
                              - 'gridcell "2026-03-19: 183.97 XLM, 2 tips" [ref=e324] [cursor=pointer]'
                              - 'gridcell "2026-03-20: 237.79 XLM, 2 tips" [ref=e325] [cursor=pointer]'
                              - 'gridcell "2026-03-21: 380.58 XLM, 4 tips" [ref=e326] [cursor=pointer]'
                            - row "Week of 2026-03-22" [ref=e327]:
                              - 'gridcell "2026-03-22: no tips" [ref=e328] [cursor=pointer]'
                              - 'gridcell "2026-03-23: 48.67 XLM, 1 tip" [ref=e329] [cursor=pointer]'
                              - 'gridcell "2026-03-24: 210.34 XLM, 3 tips" [ref=e330] [cursor=pointer]'
                              - 'gridcell "2026-03-25: no tips" [ref=e331] [cursor=pointer]'
                              - 'gridcell "2026-03-26: 307.09 XLM, 4 tips" [ref=e332] [cursor=pointer]'
                              - 'gridcell "2026-03-27: no tips" [ref=e333] [cursor=pointer]'
                              - 'gridcell "2026-03-28: no tips" [ref=e334] [cursor=pointer]'
                            - row "Week of 2026-03-29" [ref=e335]:
                              - 'gridcell "2026-03-29: no tips" [ref=e336] [cursor=pointer]'
                              - 'gridcell "2026-03-30: 179.40 XLM, 2 tips" [ref=e337] [cursor=pointer]'
                              - 'gridcell "2026-03-31: 279.43 XLM, 3 tips" [ref=e338] [cursor=pointer]'
                              - 'gridcell "2026-04-01: 95.59 XLM, 1 tip" [ref=e339] [cursor=pointer]'
                              - 'gridcell "2026-04-02: no tips" [ref=e340] [cursor=pointer]'
                              - 'gridcell "2026-04-03: 68.23 XLM, 2 tips" [ref=e341] [cursor=pointer]'
                              - 'gridcell "2026-04-04: no tips" [ref=e342] [cursor=pointer]'
                            - row "Week of 2026-04-05" [ref=e343]:
                              - 'gridcell "2026-04-05: no tips" [ref=e344] [cursor=pointer]'
                              - 'gridcell "2026-04-06: 313.40 XLM, 4 tips" [ref=e345] [cursor=pointer]'
                              - 'gridcell "2026-04-07: no tips" [ref=e346] [cursor=pointer]'
                              - 'gridcell "2026-04-08: no tips" [ref=e347] [cursor=pointer]'
                              - 'gridcell "2026-04-09: no tips" [ref=e348] [cursor=pointer]'
                              - 'gridcell "2026-04-10: no tips" [ref=e349] [cursor=pointer]'
                              - 'gridcell "2026-04-11: no tips" [ref=e350] [cursor=pointer]'
                            - row "Week of 2026-04-12" [ref=e351]:
                              - 'gridcell "2026-04-12: 202.03 XLM, 3 tips" [ref=e352] [cursor=pointer]'
                              - 'gridcell "2026-04-13: no tips" [ref=e353] [cursor=pointer]'
                              - 'gridcell "2026-04-14: 102.06 XLM, 1 tip" [ref=e354] [cursor=pointer]'
                              - 'gridcell "2026-04-15: no tips" [ref=e355] [cursor=pointer]'
                              - 'gridcell "2026-04-16: 208.18 XLM, 4 tips" [ref=e356] [cursor=pointer]'
                              - 'gridcell "2026-04-17: 195.59 XLM, 3 tips" [ref=e357] [cursor=pointer]'
                              - 'gridcell "2026-04-18: no tips" [ref=e358] [cursor=pointer]'
                            - row "Week of 2026-04-19" [ref=e359]:
                              - 'gridcell "2026-04-19: 266.49 XLM, 4 tips" [ref=e360] [cursor=pointer]'
                              - 'gridcell "2026-04-20: 175.46 XLM, 3 tips" [ref=e361] [cursor=pointer]'
                              - 'gridcell "2026-04-21: 50.05 XLM, 3 tips" [ref=e362] [cursor=pointer]'
                              - 'gridcell "2026-04-22: 162.97 XLM, 3 tips" [ref=e363] [cursor=pointer]'
                              - 'gridcell "2026-04-23: 214.28 XLM, 3 tips" [ref=e364] [cursor=pointer]'
                              - 'gridcell "2026-04-24: no tips" [ref=e365] [cursor=pointer]'
                              - 'gridcell "2026-04-25: no tips" [ref=e366] [cursor=pointer]'
                            - row "Week of 2026-04-26" [ref=e367]:
                              - 'gridcell "2026-04-26: 8.28 XLM, 1 tip" [ref=e368] [cursor=pointer]'
                              - 'gridcell "2026-04-27: no tips" [ref=e369] [cursor=pointer]'
                              - 'gridcell "2026-04-28: no tips" [ref=e370] [cursor=pointer]'
                              - 'gridcell "2026-04-29: 273.21 XLM, 4 tips" [ref=e371] [cursor=pointer]'
                              - 'gridcell "2026-04-30: no tips" [ref=e372] [cursor=pointer]'
                              - 'gridcell "2026-05-01: no tips" [ref=e373] [cursor=pointer]'
                              - 'gridcell "2026-05-02: 140.71 XLM, 2 tips" [ref=e374] [cursor=pointer]'
                            - row "Week of 2026-05-03" [ref=e375]:
                              - 'gridcell "2026-05-03: no tips" [ref=e376] [cursor=pointer]'
                              - 'gridcell "2026-05-04: 116.97 XLM, 3 tips" [ref=e377] [cursor=pointer]'
                              - 'gridcell "2026-05-05: 141.25 XLM, 2 tips" [ref=e378] [cursor=pointer]'
                              - 'gridcell "2026-05-06: no tips" [ref=e379] [cursor=pointer]'
                              - 'gridcell "2026-05-07: 213.56 XLM, 4 tips" [ref=e380] [cursor=pointer]'
                              - 'gridcell "2026-05-08: 193.71 XLM, 2 tips" [ref=e381] [cursor=pointer]'
                              - 'gridcell "2026-05-09: 87.04 XLM, 1 tip" [ref=e382] [cursor=pointer]'
                            - row "Week of 2026-05-10" [ref=e383]:
                              - 'gridcell "2026-05-10: 154.30 XLM, 2 tips" [ref=e384] [cursor=pointer]'
                              - 'gridcell "2026-05-11: no tips" [ref=e385] [cursor=pointer]'
                              - 'gridcell "2026-05-12: no tips" [ref=e386] [cursor=pointer]'
                              - 'gridcell "2026-05-13: 218.62 XLM, 3 tips" [ref=e387] [cursor=pointer]'
                              - 'gridcell "2026-05-14: 244.89 XLM, 4 tips" [ref=e388] [cursor=pointer]'
                              - 'gridcell "2026-05-15: no tips" [ref=e389] [cursor=pointer]'
                              - 'gridcell "2026-05-16: 296.19 XLM, 4 tips" [ref=e390] [cursor=pointer]'
                            - row "Week of 2026-05-17" [ref=e391]:
                              - 'gridcell "2026-05-17: 58.76 XLM, 1 tip" [ref=e392] [cursor=pointer]'
                              - 'gridcell "2026-05-18: 149.56 XLM, 4 tips" [ref=e393] [cursor=pointer]'
                              - 'gridcell "2026-05-19: 333.80 XLM, 4 tips" [ref=e394] [cursor=pointer]'
                              - 'gridcell "2026-05-20: 225.83 XLM, 2 tips" [ref=e395] [cursor=pointer]'
                              - 'gridcell "2026-05-21: no tips" [ref=e396] [cursor=pointer]'
                              - 'gridcell "2026-05-22: 114.95 XLM, 2 tips" [ref=e397] [cursor=pointer]'
                              - 'gridcell "2026-05-23: no tips" [ref=e398] [cursor=pointer]'
                            - row "Week of 2026-05-24" [ref=e399]:
                              - 'gridcell "2026-05-24: 270.84 XLM, 3 tips" [ref=e400] [cursor=pointer]'
                              - 'gridcell "2026-05-25: no tips" [ref=e401] [cursor=pointer]'
                              - 'gridcell "2026-05-26: no tips" [ref=e402] [cursor=pointer]'
                              - 'gridcell "2026-05-27: no tips" [ref=e403] [cursor=pointer]'
                              - 'gridcell "2026-05-28: no tips" [ref=e404] [cursor=pointer]'
                              - 'gridcell "2026-05-29: no tips" [ref=e405] [cursor=pointer]'
                              - 'gridcell "2026-05-30: no tips" [ref=e406] [cursor=pointer]'
                            - row "Week of 2026-05-31" [ref=e407]:
                              - 'gridcell "2026-05-31: 162.30 XLM, 3 tips" [ref=e408] [cursor=pointer]'
                              - 'gridcell "2026-06-01: 229.77 XLM, 4 tips" [ref=e409] [cursor=pointer]'
                              - 'gridcell "2026-06-02: no tips" [ref=e410] [cursor=pointer]'
                              - 'gridcell "2026-06-03: no tips" [ref=e411] [cursor=pointer]'
                              - 'gridcell "2026-06-04: 180.09 XLM, 2 tips" [ref=e412] [cursor=pointer]'
                              - 'gridcell "2026-06-05: 110.46 XLM, 1 tip" [ref=e413] [cursor=pointer]'
                              - 'gridcell "2026-06-06: no tips" [ref=e414] [cursor=pointer]'
                            - row "Week of 2026-06-07" [ref=e415]:
                              - 'gridcell "2026-06-07: 128.52 XLM, 2 tips" [ref=e416] [cursor=pointer]'
                              - 'gridcell "2026-06-08: 56.20 XLM, 1 tip" [ref=e417] [cursor=pointer]'
                              - 'gridcell "2026-06-09: 323.66 XLM, 4 tips" [ref=e418] [cursor=pointer]'
                              - 'gridcell "2026-06-10: no tips" [ref=e419] [cursor=pointer]'
                              - 'gridcell "2026-06-11: 180.94 XLM, 3 tips" [ref=e420] [cursor=pointer]'
                              - 'gridcell "2026-06-12: no tips" [ref=e421] [cursor=pointer]'
                              - 'gridcell "2026-06-13: 185.01 XLM, 2 tips" [ref=e422] [cursor=pointer]'
                            - row "Week of 2026-06-14" [ref=e423]:
                              - 'gridcell "2026-06-14: no tips" [ref=e424] [cursor=pointer]'
                              - 'gridcell "2026-06-15: no tips" [ref=e425] [cursor=pointer]'
                              - 'gridcell "2026-06-16: 12.43 XLM, 1 tip" [ref=e426] [cursor=pointer]'
                              - 'gridcell "2026-06-17: 59.20 XLM, 1 tip" [ref=e427] [cursor=pointer]'
                              - 'gridcell "2026-06-18: 62.41 XLM, 2 tips" [ref=e428] [cursor=pointer]'
                              - 'gridcell "2026-06-19: 343.03 XLM, 4 tips" [ref=e429] [cursor=pointer]'
                              - 'gridcell "2026-06-20: 134.80 XLM, 2 tips" [ref=e430] [cursor=pointer]'
                            - row "Week of 2026-06-21" [ref=e431]:
                              - 'gridcell "2026-06-21: 210.40 XLM, 2 tips" [ref=e432] [cursor=pointer]'
                              - 'gridcell "2026-06-22: 217.70 XLM, 3 tips" [ref=e433] [cursor=pointer]'
                              - 'gridcell "2026-06-23: 119.17 XLM, 2 tips" [ref=e434] [cursor=pointer]'
                              - 'gridcell "2026-06-24: no tips" [ref=e435] [cursor=pointer]'
                              - 'gridcell "2026-06-25: 53.06 XLM, 1 tip" [ref=e436] [cursor=pointer]'
                              - 'gridcell "2026-06-26: no tips" [ref=e437] [cursor=pointer]'
                              - 'gridcell "2026-06-27: no tips" [ref=e438] [cursor=pointer]'
                            - row "Week of 2026-06-28" [ref=e439]:
                              - 'gridcell "2026-06-28: no tips" [ref=e440] [cursor=pointer]'
                              - 'gridcell "2026-06-29: 367.67 XLM, 4 tips" [ref=e441] [cursor=pointer]'
                              - 'gridcell "2026-06-30: 12.39 XLM, 1 tip" [ref=e442] [cursor=pointer]'
                              - 'gridcell "2026-07-01: 238.35 XLM, 3 tips" [ref=e443] [cursor=pointer]'
                              - 'gridcell "2026-07-02: 184.67 XLM, 3 tips" [ref=e444] [cursor=pointer]'
                              - 'gridcell "2026-07-03: no tips" [ref=e445] [cursor=pointer]'
                              - 'gridcell "2026-07-04: no tips" [ref=e446] [cursor=pointer]'
                            - row "Week of 2026-07-05" [ref=e447]:
                              - 'gridcell "2026-07-05: 23.32 XLM, 1 tip" [ref=e448] [cursor=pointer]'
                              - 'gridcell "2026-07-06: no tips" [ref=e449] [cursor=pointer]'
                              - 'gridcell "2026-07-07: 157.23 XLM, 3 tips" [ref=e450] [cursor=pointer]'
                              - 'gridcell "2026-07-08: no tips" [ref=e451] [cursor=pointer]'
                              - 'gridcell "2026-07-09: 128.11 XLM, 2 tips" [ref=e452] [cursor=pointer]'
                              - 'gridcell "2026-07-10: 161.55 XLM, 3 tips" [ref=e453] [cursor=pointer]'
                              - 'gridcell "2026-07-11: no tips" [ref=e454] [cursor=pointer]'
                            - row "Week of 2026-07-12" [ref=e455]:
                              - 'gridcell "2026-07-12: no tips" [ref=e456] [cursor=pointer]'
                              - 'gridcell "2026-07-13: 121.88 XLM, 1 tip" [ref=e457] [cursor=pointer]'
                              - 'gridcell "2026-07-14: 56.15 XLM, 1 tip" [ref=e458] [cursor=pointer]'
                              - 'gridcell "2026-07-15: 36.12 XLM, 2 tips" [ref=e459] [cursor=pointer]'
                              - 'gridcell "2026-07-16: 227.44 XLM, 3 tips" [ref=e460] [cursor=pointer]'
                              - 'gridcell "2026-07-17: no tips" [ref=e461] [cursor=pointer]'
                              - 'gridcell "2026-07-18: no tips" [ref=e462] [cursor=pointer]'
                            - row "Week of 2026-07-19" [ref=e463]:
                              - 'gridcell "2026-07-19: no tips" [ref=e464] [cursor=pointer]'
                              - 'gridcell "2026-07-20: 111.41 XLM, 2 tips" [ref=e465] [cursor=pointer]'
                              - 'gridcell "2026-07-21: 173.20 XLM, 3 tips" [ref=e466] [cursor=pointer]'
                              - 'gridcell "2026-07-22: 378.57 XLM, 4 tips" [ref=e467] [cursor=pointer]'
                              - 'gridcell "2026-07-23: 199.12 XLM, 3 tips" [ref=e468] [cursor=pointer]'
                              - 'gridcell "2026-07-24: 109.92 XLM, 3 tips" [ref=e469] [cursor=pointer]'
                              - 'gridcell "2026-07-25: no tips" [ref=e470] [cursor=pointer]'
                            - row "Week of 2026-07-26" [ref=e471]:
                              - 'gridcell "2026-07-26: 8.28 XLM, 1 tip" [ref=e472] [cursor=pointer]'
                              - 'gridcell "2026-07-27: 205.48 XLM, 3 tips" [ref=e473] [cursor=pointer]'
                              - 'gridcell "2026-07-28: 97.55 XLM, 2 tips" [ref=e474] [cursor=pointer]'
                              - 'gridcell "2026-07-29: 283.85 XLM, 4 tips" [ref=e475] [cursor=pointer]'
                              - 'gridcell "2026-07-30: no tips" [ref=e476] [cursor=pointer]'
                              - 'gridcell "2026-07-31: no tips" [ref=e477] [cursor=pointer]'
                              - 'gridcell "2026-08-01: 282.97 XLM, 4 tips" [ref=e478] [cursor=pointer]'
                            - row "Week of 2026-08-02" [ref=e479]:
                              - 'gridcell "2026-08-02: 112.97 XLM, 1 tip" [ref=e480] [cursor=pointer]'
                              - 'gridcell "2026-08-03: 112.38 XLM, 1 tip" [ref=e481] [cursor=pointer]'
                              - 'gridcell "2026-08-04: 38.98 XLM, 1 tip" [ref=e482] [cursor=pointer]'
                              - 'gridcell "2026-08-05: no tips" [ref=e483] [cursor=pointer]'
                              - 'gridcell "2026-08-06: 263.81 XLM, 4 tips" [ref=e484] [cursor=pointer]'
                              - 'gridcell "2026-08-07: 251.93 XLM, 3 tips" [ref=e485] [cursor=pointer]'
                              - 'gridcell "2026-08-08: no tips" [ref=e486] [cursor=pointer]'
                            - row "Week of 2026-08-09" [ref=e487]:
                              - 'gridcell "2026-08-09: 273.66 XLM, 4 tips" [ref=e488] [cursor=pointer]'
                              - 'gridcell "2026-08-10: 121.29 XLM, 2 tips" [ref=e489] [cursor=pointer]'
                              - 'gridcell "2026-08-11: no tips" [ref=e490] [cursor=pointer]'
                              - 'gridcell "2026-08-12: no tips" [ref=e491] [cursor=pointer]'
                              - 'gridcell "2026-08-13: no tips" [ref=e492] [cursor=pointer]'
                              - 'gridcell "2026-08-14: 7.13 XLM, 1 tip" [ref=e493] [cursor=pointer]'
                              - 'gridcell "2026-08-15: no tips" [ref=e494] [cursor=pointer]'
                            - row "Week of 2026-08-16" [ref=e495]:
                              - 'gridcell "2026-08-16: no tips" [ref=e496] [cursor=pointer]'
                              - 'gridcell "2026-08-17: 186.04 XLM, 2 tips" [ref=e497] [cursor=pointer]'
                              - 'gridcell "2026-08-18: no tips" [ref=e498] [cursor=pointer]'
                              - 'gridcell "2026-08-19: future" [ref=e499]'
                              - 'gridcell "2026-08-20: future" [ref=e500]'
                              - 'gridcell "2026-08-21: future" [ref=e501]'
                              - 'gridcell "2026-08-22: future" [ref=e502]'
                    - generic:
                      - generic "Activity level legend":
                        - text: Less
                        - 'generic "Level 0: None" [ref=e503]'
                        - 'generic "Level 1: Low" [ref=e504]'
                        - 'generic "Level 2: Medium" [ref=e505]'
                        - 'generic "Level 3: High" [ref=e506]'
                        - 'generic "Level 4: Peak" [ref=e507]'
                        - text: More
                      - paragraph: Today is highlighted with a border
                - generic:
                  - generic:
                    - generic:
                      - paragraph: Total Earned
                      - paragraph: 35,286.6 XLM
                  - generic:
                    - generic:
                      - paragraph: Total Tips
                      - paragraph: "531"
                      - paragraph: 208 active days
                  - generic:
                    - generic:
                      - paragraph: Avg / Active Day
                      - paragraph: 169.6 XLM
                  - generic:
                    - generic:
                      - paragraph: Current Streak
                      - paragraph: 0 days
                  - generic:
                    - generic:
                      - paragraph: Longest Streak
                      - paragraph: 8 days
                  - generic:
                    - generic:
                      - paragraph: Best Day
                      - paragraph: 384.9 XLM
                      - paragraph: Feb 12
        - generic:
          - paragraph: No portfolio items yet.
        - region "Tip milestones":
          - heading "Milestones" [level=2]
          - paragraph: No milestones yet — the first tip unlocks one! 🌱
          - generic:
            - generic:
              - generic [ref=e515]: 0 tips
              - generic [ref=e516]: "Next: 🌱 First Tip! (1)"
            - generic:
              - progressbar
        - generic:
          - heading "Tip History" [level=2]
          - generic:
            - generic:
              - generic [ref=e517]: 8 tips
              - text: Virtual scroll active
            - generic:
              - table [ref=e518]:
                - rowgroup [ref=e519]:
                  - row "Date Amount Recipient Status Memo Transaction Actions" [ref=e520]:
                    - columnheader "Date" [ref=e521]:
                      - button "Date" [ref=e522]:
                        - text: Date
                        - img [ref=e523]
                    - columnheader "Amount" [ref=e525]:
                      - button "Amount" [ref=e526]:
                        - text: Amount
                        - img [ref=e527]
                    - columnheader "Recipient" [ref=e529]:
                      - button "Recipient" [ref=e530]:
                        - text: Recipient
                        - img [ref=e531]
                    - columnheader "Status" [ref=e533]:
                      - button "Status" [ref=e534]:
                        - text: Status
                        - img [ref=e535]
                    - columnheader "Memo" [ref=e537]
                    - columnheader "Transaction" [ref=e538]
                    - columnheader "Actions" [ref=e539]
              - region "Tip history rows":
                - table [ref=e540]:
                  - rowgroup [ref=e541]:
                    - row "Mar 20, 2024, 04:00 PM 50 XLM @alice Completed Great content! abc123... Receipt" [ref=e542]:
                      - cell "Mar 20, 2024, 04:00 PM" [ref=e543]
                      - cell "50 XLM" [ref=e544]
                      - cell "@alice" [ref=e545]:
                        - link "@alice" [ref=e546] [cursor=pointer]:
                          - /url: /creator/alice
                      - cell "Completed" [ref=e547]
                      - cell "Great content!" [ref=e548]
                      - cell "abc123..." [ref=e549]:
                        - link "abc123..." [ref=e550] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/abc123
                      - cell "Receipt" [ref=e551]:
                        - button "Receipt" [ref=e552]:
                          - img [ref=e553]
                          - text: Receipt
                    - row "Mar 19, 2024, 09:15 PM 25 XLM @stellar-dev Completed - def456... Receipt" [ref=e555]:
                      - cell "Mar 19, 2024, 09:15 PM" [ref=e556]
                      - cell "25 XLM" [ref=e557]
                      - cell "@stellar-dev" [ref=e558]:
                        - link "@stellar-dev" [ref=e559] [cursor=pointer]:
                          - /url: /creator/stellar-dev
                      - cell "Completed" [ref=e560]
                      - cell "-" [ref=e561]
                      - cell "def456..." [ref=e562]:
                        - link "def456..." [ref=e563] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/def456
                      - cell "Receipt" [ref=e564]:
                        - button "Receipt" [ref=e565]:
                          - img [ref=e566]
                          - text: Receipt
                    - row "Mar 18, 2024, 02:45 PM 100 XLM @pixelmaker Pending - - Receipt" [ref=e568]:
                      - cell "Mar 18, 2024, 02:45 PM" [ref=e569]
                      - cell "100 XLM" [ref=e570]
                      - cell "@pixelmaker" [ref=e571]:
                        - link "@pixelmaker" [ref=e572] [cursor=pointer]:
                          - /url: /creator/pixelmaker
                      - cell "Pending" [ref=e573]
                      - cell "-" [ref=e574]
                      - cell "-" [ref=e575]
                      - cell "Receipt" [ref=e576]:
                        - button "Receipt" [ref=e577]:
                          - img [ref=e578]
                          - text: Receipt
                    - row "Mar 17, 2024, 07:50 PM 15 XLM @crypto-artist Completed - ghi789... Receipt" [ref=e580]:
                      - cell "Mar 17, 2024, 07:50 PM" [ref=e581]
                      - cell "15 XLM" [ref=e582]
                      - cell "@crypto-artist" [ref=e583]:
                        - link "@crypto-artist" [ref=e584] [cursor=pointer]:
                          - /url: /creator/crypto-artist
                      - cell "Completed" [ref=e585]
                      - cell "-" [ref=e586]
                      - cell "ghi789..." [ref=e587]:
                        - link "ghi789..." [ref=e588] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/ghi789
                      - cell "Receipt" [ref=e589]:
                        - button "Receipt" [ref=e590]:
                          - img [ref=e591]
                          - text: Receipt
                    - row "Mar 16, 2024, 04:30 PM 75 XLM @blockchain-edu Failed - - Receipt" [ref=e593]:
                      - cell "Mar 16, 2024, 04:30 PM" [ref=e594]
                      - cell "75 XLM" [ref=e595]
                      - cell "@blockchain-edu" [ref=e596]:
                        - link "@blockchain-edu" [ref=e597] [cursor=pointer]:
                          - /url: /creator/blockchain-edu
                      - cell "Failed" [ref=e598]
                      - cell "-" [ref=e599]
                      - cell "-" [ref=e600]
                      - cell "Receipt" [ref=e601]:
                        - button "Receipt" [ref=e602]:
                          - img [ref=e603]
                          - text: Receipt
                    - row "Mar 15, 2024, 10:00 PM 30 XLM @community-lab Completed - jkl012... Receipt" [ref=e605]:
                      - cell "Mar 15, 2024, 10:00 PM" [ref=e606]
                      - cell "30 XLM" [ref=e607]
                      - cell "@community-lab" [ref=e608]:
                        - link "@community-lab" [ref=e609] [cursor=pointer]:
                          - /url: /creator/community-lab
                      - cell "Completed" [ref=e610]
                      - cell "-" [ref=e611]
                      - cell "jkl012..." [ref=e612]:
                        - link "jkl012..." [ref=e613] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/jkl012
                      - cell "Receipt" [ref=e614]:
                        - button "Receipt" [ref=e615]:
                          - img [ref=e616]
                          - text: Receipt
                    - row "Mar 14, 2024, 07:15 PM 200 XLM @nft-creator Completed Amazing work! mno345... Receipt" [ref=e618]:
                      - cell "Mar 14, 2024, 07:15 PM" [ref=e619]
                      - cell "200 XLM" [ref=e620]
                      - cell "@nft-creator" [ref=e621]:
                        - link "@nft-creator" [ref=e622] [cursor=pointer]:
                          - /url: /creator/nft-creator
                      - cell "Completed" [ref=e623]
                      - cell "Amazing work!" [ref=e624]
                      - cell "mno345..." [ref=e625]:
                        - link "mno345..." [ref=e626] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/mno345
                      - cell "Receipt" [ref=e627]:
                        - button "Receipt" [ref=e628]:
                          - img [ref=e629]
                          - text: Receipt
                    - row "Mar 13, 2024, 03:40 PM 45 XLM @defi-expert Completed - pqr678... Receipt" [ref=e631]:
                      - cell "Mar 13, 2024, 03:40 PM" [ref=e632]
                      - cell "45 XLM" [ref=e633]
                      - cell "@defi-expert" [ref=e634]:
                        - link "@defi-expert" [ref=e635] [cursor=pointer]:
                          - /url: /creator/defi-expert
                      - cell "Completed" [ref=e636]
                      - cell "-" [ref=e637]
                      - cell "pqr678..." [ref=e638]:
                        - link "pqr678..." [ref=e639] [cursor=pointer]:
                          - /url: https://stellar.expert/explorer/public/tx/pqr678
                      - cell "Receipt" [ref=e640]:
                        - button "Receipt" [ref=e641]:
                          - img [ref=e642]
                          - text: Receipt
        - generic:
          - heading "Comments (0)" [level=2]
          - generic:
            - textbox "Add a comment..." [ref=e644]
            - button "Post Comment" [disabled] [ref=e645]
        - region "Events":
          - generic:
            - generic:
              - heading "Events" [level=2]
              - paragraph: 2 upcoming · 0 past
          - generic:
            - button "upcoming" [pressed] [ref=e646]
            - button "past" [ref=e647]
          - list [ref=e648]:
            - listitem:
              - article "Live Coding Stream":
                - generic:
                  - generic:
                    - generic: STREAM
                    - heading "Live Coding Stream" [level=3]
                    - paragraph: Building a Stellar payment integration live.
                    - paragraph: 🕐 Thu, Aug 20, 4:36 PM UTC
                    - link "🔗 https://twitch.tv/example" [ref=e649] [cursor=pointer]:
                      - /url: https://twitch.tv/example
                - generic:
                  - button "Add to calendar" [ref=e650]: + Add to Calendar
                  - link "Join Event →" [ref=e651] [cursor=pointer]:
                    - /url: https://twitch.tv/example
            - listitem:
              - article "Weekly AMA":
                - generic:
                  - generic:
                    - generic: AMARecurring
                    - heading "Weekly AMA" [level=3]
                    - paragraph: Ask me anything about Web3 and Stellar.
                    - paragraph: 🕐 Tue, Aug 25, 4:36 PM UTC
                - button "Add to calendar" [ref=e652]: + Add to Calendar
        - region "Recommended Creators":
          - generic:
            - generic:
              - heading "Recommended Creators" [level=2]
              - paragraph: Showing popular creators. Your recommendations improve as you explore.
          - list [ref=e653]:
            - listitem:
              - link "View NFT Creator's profile":
                - /url: /creator/nft-creator
                - img "Avatar for NFT Creator" [ref=e654] [cursor=pointer]
                - generic:
                  - paragraph: art
                  - paragraph: NFT Creator
                  - paragraph: Trending creator
                - generic:
                  - paragraph: 4,200
                  - paragraph: followers
            - listitem:
              - link "View Protocol Dev's profile":
                - /url: /creator/protocol-dev
                - img "Avatar for Protocol Dev" [ref=e655] [cursor=pointer]
                - generic:
                  - paragraph: tech
                  - paragraph: Protocol Dev
                  - paragraph: Trending creator
                - generic:
                  - paragraph: 4,100
                  - paragraph: followers
            - listitem:
              - link "View Smart Contract Dev's profile":
                - /url: /creator/smart-contract-dev
                - img "Avatar for Smart Contract Dev" [ref=e656] [cursor=pointer]
                - generic:
                  - paragraph: tech
                  - paragraph: Smart Contract Dev
                  - paragraph: Trending creator
                - generic:
                  - paragraph: 3,800
                  - paragraph: followers
      - generic:
        - generic:
          - generic [ref=e657]: "Preferred asset: XLM"
          - heading "Send a Tip" [level=2]
          - paragraph: Support this creator directly using Stellar assets.
          - form "Send a tip to testuser":
            - generic:
              - text: Amount
              - spinbutton "Amount" [ref=e658]
              - paragraph: Amount in Stellar assets
            - generic:
              - text: Asset Code
              - textbox "Asset Code" [ref=e659]:
                - /placeholder: XLM
                - text: XLM
              - paragraph: e.g. XLM, USDC
            - generic:
              - text: Message (optional)
              - textbox "Message (optional)" [ref=e660]:
                - /placeholder: Thanks for the great content!
              - paragraph: A short message for the creator (max 200 characters)
            - button "Create Tip Intent" [ref=e661]
        - generic:
          - heading "Share Creator" [level=3]:
            - img [ref=e662]
            - text: Share Creator
          - generic:
            - generic:
              - generic:
                - heading "Share profile" [level=2]
                - paragraph: Let your audience know about this creator.
              - button "Share" [ref=e668]
            - generic:
              - text: "Current share counts:"
              - generic [ref=e669]: Twitter 0
              - generic [ref=e670]: Facebook 0
              - generic [ref=e671]: LinkedIn 0
              - generic [ref=e672]: Copied 0
        - generic:
          - heading "Creator Tag Cloud" [level=3]
          - generic:
            - heading "Popular Tags" [level=3]
            - generic:
              - generic: "#test-tag (1)"
  - generic [ref=e673]:
    - img [ref=e675]
    - button "Open Tanstack query devtools" [ref=e723] [cursor=pointer]:
      - img [ref=e724]
  - generic [ref=e772]:
    - img [ref=e774]
    - button "Open Tanstack query devtools" [ref=e822] [cursor=pointer]:
      - img [ref=e823]
  - alert [ref=e871]
```

# Test source

```ts
  1   | /**
  2   |  * Accessibility testing helpers for @axe-core/playwright.
  3   |  *
  4   |  * Usage:
  5   |  *   import { runAxe, forceTheme } from '../helpers/a11y';
  6   |  *   await forceTheme(page, 'dark');
  7   |  *   const violations = await runAxe(page);
  8   |  */
  9   | 
  10  | import AxeBuilder from '@axe-core/playwright';
  11  | import type { Page } from '@playwright/test';
  12  | import { expect } from '@playwright/test';
  13  | 
  14  | /** ImpactValue from axe-core */
  15  | type ImpactValue = 'minor' | 'moderate' | 'serious' | 'critical';
  16  | 
  17  | /**
  18  |  * Rules that produce known third-party / browser-default violations that we
  19  |  * cannot fix in our codebase.  Each entry MUST include an inline justification.
  20  |  */
  21  | const EXCLUDED_RULES: { id: string; reason: string }[] = [
  22  |   // next-themes injects a <script> tag before <head> content; axe flags it
  23  |   // as an html-has-lang timing issue during hydration — not fixable from app code.
  24  |   { id: 'html-has-lang', reason: 'Covered by locale layout; false-positive during SSR hydration in tests.' },
  25  | ];
  26  | 
  27  | /**
  28  |  * Run axe-core on the current page state and return violations.
  29  |  * Gated to serious + critical impact by default.
  30  |  *
  31  |  * @param page        Playwright Page
  32  |  * @param minImpact   Minimum violation impact level to include (default: 'serious')
  33  |  * @param include     Optional CSS selector to scope the scan to a subtree
  34  |  */
  35  | export async function runAxe(
  36  |   page: Page,
  37  |   minImpact: ImpactValue = 'serious',
  38  |   include?: string,
  39  | ): Promise<import('axe-core').Result[]> {
  40  |   const impactOrder: ImpactValue[] = ['minor', 'moderate', 'serious', 'critical'];
  41  |   const minIndex = impactOrder.indexOf(minImpact);
  42  | 
  43  |   let builder = new AxeBuilder({ page });
  44  | 
  45  |   EXCLUDED_RULES.forEach(({ id }) => builder = builder.disableRules([id]));
  46  | 
  47  |   if (include) {
  48  |     builder = builder.include(include);
  49  |   }
  50  | 
  51  |   const { violations } = await builder.analyze();
  52  | 
  53  |   return violations.filter(
  54  |     (v) => v.impact && impactOrder.indexOf(v.impact as ImpactValue) >= minIndex,
  55  |   );
  56  | }
  57  | 
  58  | /**
  59  |  * Assert zero serious/critical violations.  Prints a descriptive failure
  60  |  * message with each violation's help URL on failure.
  61  |  */
  62  | export async function expectNoViolations(
  63  |   page: Page,
  64  |   context = 'page',
  65  |   include?: string,
  66  | ): Promise<void> {
  67  |   const violations = await runAxe(page, 'serious', include);
  68  | 
  69  |   if (violations.length > 0) {
  70  |     const report = violations
  71  |       .map(
  72  |         (v) =>
  73  |           `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n` +
  74  |           `  Help: ${v.helpUrl}\n` +
  75  |           `  Nodes (${v.nodes.length}):\n` +
  76  |           v.nodes
  77  |             .slice(0, 3)
  78  |             .map((n) => `    - ${n.html}`)
  79  |             .join('\n'),
  80  |       )
  81  |       .join('\n\n');
  82  | 
> 83  |     throw new Error(
      |           ^ Error: 2 axe violation(s) on light theme > creator profile:
  84  |       `${violations.length} axe violation(s) on ${context}:\n\n${report}`,
  85  |     );
  86  |   }
  87  | 
  88  |   expect(violations).toHaveLength(0);
  89  | }
  90  | 
  91  | /**
  92  |  * Force a specific theme on the page by setting the class on <html> and
  93  |  * writing to localStorage so next-themes picks it up on reload.
  94  |  */
  95  | export async function forceTheme(page: Page, theme: 'light' | 'dark'): Promise<void> {
  96  |   await page.evaluate((t) => {
  97  |     // next-themes stores the value under this key by default
  98  |     localStorage.setItem('theme', t);
  99  |     document.documentElement.classList.toggle('dark', t === 'dark');
  100 |     document.documentElement.classList.toggle('light', t === 'light');
  101 |   }, theme);
  102 | }
  103 | 
  104 | /**
  105 |  * Navigate and wait for the page to fully settle (no network activity,
  106 |  * no pending animations) before running axe.
  107 |  */
  108 | export async function gotoAndSettle(page: Page, path: string): Promise<void> {
  109 |   await page.goto(path);
  110 |   // Hide Next.js dev overlay so it doesn't intercept pointer events
  111 |   await page.addStyleTag({
  112 |     content: 'nextjs-portal { display: none !important; }',
  113 |   });
  114 |   await page.waitForLoadState('networkidle');
  115 | }
  116 | 
```